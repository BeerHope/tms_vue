<template>
  <div class="common-list package-list">
    <div class="filter-box p-t-6 p-b-6 m-b-10">
      <el-input class="filter-item" v-model="filter.name" placeholder="系统包名称"></el-input>
      <el-button type="primary" @click="getOtaList">
        <svg-icon icon-class="search" class="m-r-4"></svg-icon>
        {{ $t('ota.list.search') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openAddDialog">
        <svg-icon icon-class="add" class="m-r-4"></svg-icon>
        {{ $t('ota.list.add') }}
      </el-button>
      <el-button type="primary" class="cancel del-history" @click="viewDeleteHistory">
        {{ $t('ota.list.deletedRecord') }}
      </el-button>
    </div>
    <div v-if="otaList.length" class="common-table">
      <list-item
        v-for="(item, index) in otaList"
        :key="index"
        :item-data="item"
        @open-update-dialog="openUpdateDialog"
      ></list-item>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="getOtaList"
        @current-change="getOtaList"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <no-result v-else></no-result>
    <package-add ref="packageAdd"></package-add>
    <package-update ref="packageUpdate"></package-update>
    <delete-history ref="deleteHistory"></delete-history>
  </div>
</template>

<script>
import { ListItem, PackageAdd, PackageUpdate, DeleteHistory } from './components'
import { getOtaList } from '@/api/ota'
import { Loading } from 'element-ui'

export default {
  name: 'OtaList',
  components: {
    ListItem,
    PackageAdd,
    PackageUpdate,
    DeleteHistory
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        name: '',
        page: 1,
        pageSize: 10
      },
      otaList: [],
      total: 1,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getOtaList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getOtaList() {
      const loading = Loading.service()
      getOtaList(this.filter).then(res => {
        const resData = res.data
        this.otaList = resData.rows
        this.total = resData.totalRecord
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    openAddDialog() {
      const packageAdd = this.$refs.packageAdd
      packageAdd.dialogVisible = true
    },
    openUpdateDialog() {
      const packageUpdate = this.$refs.packageUpdate
      packageUpdate.dialogVisible = true
    },
    viewDeleteHistory() {
      this.$refs.deleteHistory.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
.package-list{
  .del-history{
    margin-left: auto;
  }
}
</style>
