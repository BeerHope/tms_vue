<template>
  <el-dialog
    title="调拨详情"
    :visible.sync="dialogVisible"
    width="40%">
    <div>
      <el-button type="primary" class="r m-b-20" @click="handleExport">导出</el-button>
      <el-table
        :data="detailsList"
        style="width: 100%"
        class="f-z-14"
        :header-cell-style="headerStyle">
        <el-table-column prop="model" label="机型" align="center"></el-table-column>
        <el-table-column prop="machineSN" label="机身号SN" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination m-t-20"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      allocationId: -1,
      filter: {
        page: 1,
        pageSize: 10
      },
      detailsList: [
        {
          model: 'G2',
          machineSN: 'G2452365481',
        },
        {
          model: 'N2',
          machineSN: 'N2452365481',
        },
      ],
      total: 0,
      headerStyle() {
        return "background: #E2E4E9; color: #172B4D;height: 42px;"
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
