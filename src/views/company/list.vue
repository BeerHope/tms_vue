<template>
  <div class="company-list common-list">
    <div class="filter-box p-t-6 p-b-6 m-b-20">
      <treeselect class="filter-item" v-model="filter.company" :options="companyData" placeholder="渠道商"></treeselect>
      <el-select class="filter-item" v-model="filter.company" clearable placeholder="归属">
        <el-option
          v-for="item in attributions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="filter-item" v-model="filter.state" clearable placeholder="状态">
        <el-option
          v-for="item in states"
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
        {{$t('company.list.add') }}
      </el-button>
    </div>
    <div class="common-table">
      <list-item
        v-for="(item, index) in companyList" :key="index"
        :item-data="item" @open-edit-dialog="openDialog(1, 123, true)"
        @view-level="viewLevel(1233)"
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
    <company-dialog ref="CompanyDialog"></company-dialog>
    <company-level ref="CompanyLevel"></company-level>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import ListItem from './components/ListItem.vue'
import CompanyDialog from './components/CompanyDialog'
import CompanyLevel from './components/CompanyLevel'
import { getCompanyList } from '@/api/company'
import moment from 'moment'

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
        companyIds: [], // 设为数组只是为了后台方便赋值，无多选之意
        companyId: '',
        level: -1,
        page: 1,
        pageSize: 10,
      },
      /* 可搜索的下拉树，暂时将渠道商写死，后期接口调用获取 */
      companyData: [
        {
          id: '0',
          label: '全部渠道商'
        },
        {
          id: '1',
          label: '渠道商1',
          children: [
            {
              id: '1-1',
              label: '渠道商1-1',
            },
            {
              id: '1-2',
              label: '渠道商1-2',
            }
          ],
        },
        {
          id: '2',
          label: '渠道商2',
          children: [
            {
              id: '2-1',
              label: '渠道商2-1'
            }
          ]
        }
      ],
      attributions: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '直接下级',
          value: 'directSubordinates '
        },
        {
          label: '间接下级',
          value: 'indirectSubordinates '
        }
      ],
      states: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '激活'
        },
        {
          value: 1,
          label: '冻结'
        }
      ],
      companyList: [
        {
          number: 32432423423,
          abbreviation: '渠道商1',
          createTime: '2020-02-10 11:09:30',
          state: 0, /* 0:激活，1：冻结 */
        },
        {
          number: 43244324321,
          abbreviation: '渠道商1',
          createTime: '2020-02-10 11:09:30',
          state: 1,
        }
      ],
      currentPage: 1,
      total: 0,
      defaultProps: {
        label: 'label',
        children: 'children'
      }
    }
  },
  computed: {},
  watch: {},
  created() {

    this.getCompanyList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    openDialog(flag = 0, companyId = -1, dialogVisible = true) {
      const CompanyDialog = this.$refs.CompanyDialog
      _.assign(CompanyDialog, {
        flag,
        companyId,
        dialogVisible
      })
    },
    viewLevel(companyId = 1, dialogVisible = true) {
      console.log('查看详情')
      const CompanyLevel = this.$refs.CompanyLevel
      _.assign(CompanyLevel, {
        companyId,
        dialogVisible
      })
    },
    getCompanyList() {
      getCompanyList(this.filter).then(res => {
        this.companyList = _.map(res.data.rows, (item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          return item
        })
        this.total = res.data.totalRecord
      })
    },
    handleSizeChange() {
      console.log('handleSiseChange！！！！')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!!')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
