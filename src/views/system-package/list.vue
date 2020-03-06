<template>
  <div class="common-list package-list">
    <div class="filter-box p-t-6 p-b-6 m-b-10">
      <el-input class="filter-item" v-model="filter.name" placeholder="系统包名称"></el-input>
      <el-button type="primary">
        <svg-icon icon-class="search" class="m-r-4"></svg-icon>搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openAddDialog">
        <svg-icon icon-class="add" class="m-r-4"></svg-icon>新增系统包
      </el-button>
      <el-button type="primary" class="cancel del-history" @click="viewDeleteHistory">
        <svg-icon icon-class="add" class="m-r-4"></svg-icon>删除记录
      </el-button>
    </div>
    <div class="common-table">
      <list-item
        v-for="(item, index) in packageList"
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
    <package-add ref="packageAdd"></package-add>
    <package-update ref="packageUpdate"></package-update>
    <delete-history ref="deleteHistory"></delete-history>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import PackageAdd from './components/PackageAdd'
import PackageUpdate from './components/PackageUpdate'
import DeleteHistory from './components/DeleteHistory'

export default {
  name: 'PackageList',
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
        name: ''
      },
      packageList: [
        {
          id: 123,
          name: '系统包名称1'
        },
        {
          id: 112,
          name: '系统包名称2'
        },
        {
          id: 1231,
          name: '系统包名称3'
        },
        {
          id: 1132,
          name: '系统包名称4'
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
