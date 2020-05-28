<template>
  <div class="common-list app-list">
    <div class="filter-box p-t-6 p-b-6 m-b-10">
      <el-input class="filter-item" v-model="filter.name" placeholder="应用名称"></el-input>
      <el-button type="primary">
        <svg-icon icon-class="search" class="m-r-4"></svg-icon>搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openAddDialog">
        <svg-icon icon-class="add" class="m-r-4"></svg-icon>添加应用
      </el-button>
      <el-button type="primary" class="cancel del-history" @click="viewDeleteHistory">
        删除记录
      </el-button>
    </div>
    <div class="common-table">
      <list-item
        v-for="(item, index) in appList"
        :key="index"
        :item-data="item"
        @open-update-dialog="openUpdateDialog"
      ></list-item>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
    <application-add ref="applicationAdd"></application-add>
    <delete-history ref="deleteHistory"></delete-history>
    <app-edit ref="appEdit"></app-edit>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import ApplicationAdd from './components/ApplicationAdd'
import DeleteHistory from './components/DeleteHistory'
import AppEdit from './components/AppEdit'

export default {
  name: 'AppList',
  components: {
    ListItem,
    ApplicationAdd,
    DeleteHistory,
    AppEdit
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        name: ''
      },
      appList: [
        {
          id: 123,
          type: 1, // type标识智能和传统，传统的待zip，智能的待apk，1智能，0传统
          name: '应用名称1',
          model: '机型1111'
        },
        {
          id: 112,
          type: 0,
          name: '应用名称2',
          model: '机型222'
        },
        {
          id: 1231,
          type: 0,
          name: '应用名称3',
          model: '机型333'
        },
        {
          id: 1132,
          type: 0,
          name: '应用名称4',
          model: '机型6666'
        }
      ],
      currentPage: 1,
    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleSizeChange() {
      console.log('handleSizeChange')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!!')
    },
    /* posType: 区分传统和智能 */
    openAddDialog(posType) {
      const applicationAdd = this.$refs.applicationAdd
      applicationAdd.dialogVisible = true
    },
    openUpdateDialog() {
      const appEdit = this.$refs.appEdit
      appEdit.dialogVisible = true
    },
    viewDeleteHistory() {
      this.$refs.deleteHistory.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
.app-list{
  .del-history{
    margin-left: auto;
  }
}
</style>
