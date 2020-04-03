<template>
  <el-dialog
    custom-class="allocation-details"
    :title="$t('allocation.details.title')"
    :visible.sync="dialogVisible"
    @open="getAllocationDetails"
    width="40%">
    <div v-if="detailsList.length || true" v-loading="loading">
      <el-button type="primary" class="r m-b-20" @click="handleExport">
        {{ $t('allocation.details.export') }}
      </el-button>
      <el-table
        height="420"
        :data="detailsList"
        style="width: 100%"
        class="f-z-14"
        :header-cell-style="headerStyle">
        <el-table-column 
          prop="modelName" 
          :label="$t('allocation.details.thead.modelName')" 
          align="center">
          <template slot-scope="scope">{{ scope.row.modelName || '--' }}</template>
        </el-table-column>
        <el-table-column 
          prop="sn" 
          :label="$t('allocation.details.thead.sn')" 
          align="center">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination p-b-0 m-t-0"
        @current-change="getAllocationDetails"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <no-result v-else height="558px" :result-text="$t('allocation.details.resultText')"></no-result>
  </el-dialog>
</template>

<script>
import { getAllocationDetails } from '@/api/allocation'
import { exportExcel } from '@/utils/global'
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      allocationId: -1,
      loading: false,
      filter: {
        page: 1,
        pageSize: 10
      },
      detailsList: [],
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
    getAllocationDetails() {
      this.loading = true
      console.log(this.allocationId)
      getAllocationDetails(this.allocationId).then(res => {
        console.log(res, 'res')
        this.detailsList = res.data
        this.total = res.data.length
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleExport() {
      const fileName = this.$t('allocation.details.exportFileName')
      const header = this.$t('allocation.details.header')
      exportExcel(this.detailsList, header, fileName, true)
    }
  }
}
</script>

<style lang='scss'>
.allocation-details{
  .el-dialog__body{
    width: calc(100% - 100px);
  }
}
</style>
