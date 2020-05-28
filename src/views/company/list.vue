<template>
  <div class="company-list common-list">
    <div class="filter-box p-t-6 p-b-6 m-b-20">
      <treeselect 
        class="filter-item"
        v-model="filter.companyId"
        :default-expand-level="Infinity"
        :options="companyTreeData"
        :placeholder="$t('company.list.filter.company')">
      </treeselect>
      <el-select class="filter-item" v-model="filter.level" :placeholder="$t('company.list.filter.level')">
        <el-option
          v-for="item in $t('company.levels')"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="filter-item" v-model="filter.state" clearable :placeholder="$t('company.list.filter.state')">
        <el-option
          v-for="item in $t('company.states')"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getCompanyList">
        <svg-icon icon-class="search"></svg-icon>
        {{ $t('company.list.search') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog()">
        <svg-icon icon-class="add"></svg-icon>
        {{ $t('company.list.add') }}
      </el-button>
    </div>
    <div v-if="companyList.length" class="common-table">
      <list-item
        v-for="(item, index) in companyList" :key="index"
        :item-data="item" @open-edit-dialog="openDialog(1, item.id, true)"
        @view-level="viewLevel(item.id)"
        @refresh="getCompanyList"
      ></list-item>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="getCompanyList"
        @current-change="getCompanyList"
        :current-page="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <no-result v-else></no-result>
    <company-dialog @refresh="getCompanyList" ref="companyDialog"></company-dialog>
    <company-level ref="companyLevel"></company-level>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import ListItem from './components/ListItem.vue'
import CompanyDialog from './components/CompanyDialog'
import CompanyLevel from './components/CompanyLevel'
import { getCompanyTree, getCompanyList } from '@/api/company'
import moment from 'moment'
import { Loading } from 'element-ui'

export default {
  name: 'ChannelList',
  components: {
    Treeselect,
    ListItem,
    CompanyDialog, /* add or edit company */ 
    CompanyLevel
  },
  props: {},
  directive: {},
  data() {
    return {
      /* 查询条件 */
      selectedChannel: '',
      filter: {
        state: '',
        companyId: null,
        level: '',
        page: 1,
        pageSize: 10,
      },
      /* 下拉树渠道商 */
      companyTreeData: [],
      companyList: [],
      total: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getCompanyTree()
    this.getCompanyList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    openDialog(flag = 0, companyId = -1, dialogVisible = true) {
      const companyDialog = this.$refs.companyDialog
      _.assign(companyDialog, {
        flag,
        companyId,
        dialogVisible
      })
    },
    viewLevel(companyId) {
      const companyLevel = this.$refs.companyLevel
      _.assign(companyLevel, {
        companyId,
        dialogVisible: true
      })
    },
    // 获取渠道商下拉树res.data.child
    getCompanyTree() {
      getCompanyTree().then(res => {
        const resData = (res.data && res.data.child) || []
        this.companyTreeData = this.sortTreeData(resData)
      })
    },
    sortTreeData(array) {
      return _.map(array, (item) => {
        item.label = item.shortName
        if (item.child.length) {
          item.children = this.sortTreeData(item.child)
        }
        return item
      })
    },
    getCompanyList() {
      const loading = Loading.service()
      const reqData = _.cloneDeep(this.filter)
      getCompanyList(reqData).then(res => {
        this.companyList = _.map(res.data.rows, (item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          return item
        })
        this.total = res.data.totalRecord
        loading.close()
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
