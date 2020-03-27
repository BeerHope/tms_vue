<template>
  <div class="allocation-list common-list">
    <div class="filter-box p-t-6 p-b-6">
       <el-select 
          class="filter-item" 
          v-model="filter.companyId" 
          :placeholder="$t('allocation.list.filter.companyName')">
          <el-option 
            v-for="item in companyData" 
            :key="item.id" :label="item.shortName" 
            :value="item.id">
          </el-option>
        </el-select>
      <el-button type="primary" @click="getAllocationList">
        <svg-icon icon-class="search"></svg-icon>
        {{ $t('allocation.list.search')}}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openBatchAllocation">
        <svg-icon icon-class="allocation"></svg-icon>
        {{ $t('allocation.list.batchAllocate') }}
      </el-button>
    </div>
    <div class="m-t-30">
      <el-table
        :data="alllocationList"
        style="width: 100%"
        class="f-z-14"
        :header-cell-style="headerStyle">
        <el-table-column prop="createTime" :label="$t('allocation.list.thead.createTime')" align="center"></el-table-column>
        <el-table-column prop="companyName" :label="$t('allocation.list.thead.companyName')" align="center"></el-table-column>
        <el-table-column prop="machineAmount" :label="$t('allocation.list.thead.machineAmount')" align="center"></el-table-column>
        <el-table-column prop="batchNo" :label="$t('allocation.list.thead.batchNo')" align="center"></el-table-column>
        <el-table-column :label="$t('allocation.list.thead.operation')" align="center">
          <template slot-scope="scope">
            <el-button class="line-type blue-btn" @click="viewDetails(scope.row.id)">{{$t('allocation.list.details')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="getAllocationList"
        @current-change="getAllocationList"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <batch-allocation
      ref="allocation" 
      :company-data="companyData"
      :title="$t('allocation.batch.title')">
    </batch-allocation>
    <details-dialog ref="details"></details-dialog>
  </div>
</template>

<script>
import BatchAllocation from './components/BatchAllocation'
import DetailsDialog from './components/DetailsDialog'
import { getAllocationList } from '@/api/allocation'
import { getDirectCompany } from '@/api/company'
import { Loading } from 'element-ui'

export default {
  name: '',
  components: {
    BatchAllocation,
    DetailsDialog
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        companyId: null,
        page: 1,
        pageSize: 10
      },
      alllocationList: [],
      total: 0,
      companyData: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDirectCompany()
    this.getAllocationList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    headerStyle() {
      return "background: #E2E4E9; color: #172B4D;height: 42px;"
    },
    /* 打开批量调拨 */
    openBatchAllocation() {
      this.$refs.allocation.dialogVisible = true
    },
    getDirectCompany() {
      getDirectCompany().then(res => {
        this.companyData = res.data
      })
    },
    getAllocationList() {
      const loading = Loading.service()
      getAllocationList(this.filter).then(res => {
        this.alllocationList = res.data.rows
        this.total = res.data.totalRecords
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    /* 查看详情 */
    viewDetails(id) {
      console.log(id)
      const detailsDialog = this.$refs.details
      detailsDialog.dialogVisible = true
      detailsDialog.allocationId = id
    },
  }
}
</script>

<style lang="scss">
.allocation-list {
  .content {
    padding: 0 120px;
    font-size: 14px !important;
    max-width: 1090px;
    margin: auto;
    .el-table__row {
      height: 42px;
    }
    .delete {
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>
