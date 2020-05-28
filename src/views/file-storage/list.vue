<template>
  <div class="common-list file-list">
    <div class="filter-box p-t-6 p-b-6 m-b-10">
      <el-input class="filter-item" v-model="filter.name" placeholder="应用名称"></el-input>
      <el-select class="filter-item" v-model="filter.type" placeholder="类型" clearable>
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select class="filter-item" v-model="filter.state" placeholder="状态" clearable>
        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary">
        <svg-icon icon-class="search" class="m-r-4"></svg-icon>搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openAddDialog">
        <svg-icon icon-class="add" class="m-r-4"></svg-icon>新增共享
      </el-button>
    </div>
    <div class="common-table">
      <list-item
        v-for="(item, index) in fileList"
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
    <file-add ref="addDialog"></file-add>
    <file-update dialog-title="更新共享" ref="updateDialog"></file-update>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import FileAdd from './components/FileAdd'
import FileUpdate from './components/FileShare'

export default {
  name: '',
  components: {
    ListItem,
    FileAdd,
    FileUpdate
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        name: '',
        type: '',
        state: '',
      },
      types: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '系统包'
        },
        {
          value: 1,
          label: '应用'
        }
      ],
      states: [
        {
          value: -1,
          label: '全部',
        },
        {
          value: 0,
          label: '可用'
        },
        {
          value: 1,
          label: '失效'
        }
      ],
      fileList: [
        {
          id: 123,
          type: 1, // type： 1系统包， 2应用包
          name: '系统包名称',
          state: 0
        },
        {
          id: 112,
          type: 2,
          name: '应用名称1',
          state: 0

        },
        {
          id: 1231,
          type: 2,
          name: '应用名称2',
          state: 1
        },
        {
          id: 1132,
          type: 1,
          name: '系统包名称2',
          state: 1
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
    openAddDialog() {
      const addDialog = this.$refs.addDialog
      addDialog.dialogVisible = true
    },
    openUpdateDialog() {
      const updateDialog = this.$refs.updateDialog
      updateDialog.dialogVisible = true
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!')
    },
    handleSizeChange() {
      console.log('handleSizeChange!')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
