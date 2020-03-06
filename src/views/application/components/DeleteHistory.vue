<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="删除记录"
    width="40%">

    <el-table
      :data="detailsList"
      style="width: 100%"
      class="f-z-14"
      :header-cell-style="headerStyle">
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
      <el-table-column prop="deletedTime" label="删除时间" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="common-pagination m-t-20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
  </el-dialog>
</template>

<script>
export default {
  name: 'DeleteHistory',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      allocationId: -1,
      detailsList: [
        {
          name: 'packageName11111(要附上icon)',
          operator: '小明',
          deletedTime: '2020-03-02 10:20:12',
        },
        {
          name: 'package name 222(要附上icon)',
          operator: '李四',
          deletedTime: '2020-03-02 10:20:12',
        },
      ],
      currentPage: 1,
      headerStyle() {
        return "background: #F6F6F6; color: #172B4D;height: 42px;"
      },
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
      console.log('handleSizeChange!!!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!!')
    },
    handleExport() {
      console.log('处理导出操作！！')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
