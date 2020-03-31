<template>
  <div>
    <!-- 选择商户终端弹窗 -->
    <el-dialog
      custom-class="bind-dialog"
      :title="$t('machine.bind.title')"
      :visible.sync="bindingDialogVisible"
      @close="closeDialog"
      width="40%">
      <div class="m-b-10">
        <span class="m-r-10" style="display: inline-block;width: 94px;text-align: right">{{ $t('machine.bind.label.sn') }}</span>
        <el-input style="width: 244px" v-model="currentMachine.sn" disabled></el-input>
      </div>
      <div class="m-b-20">
        <span class="m-r-10" style="display: inline-block;width: 94px;text-align: right">{{ $t('machine.bind.label.merchant') }}</span>
        <el-input 
          style="width: 244px"
          class="filter-item" 
          v-model="filter.keyword" 
          :placeholder="$t('machine.bind.placeholder.merchant')">
          <svg-icon
            slot="suffix"
            icon-class="search"
            class="search-btn"
            @click="getMerchantTerminal"
          ></svg-icon>
        </el-input>
      </div>
      <div v-loading="loading" style="height: calc(100% - 60px)">
        <el-table
          ref="table"
          :data="merchantList" 
          height="calc(100% - 80px)"
          style="width: 100%">
          <el-table-column :label="$t('machine.bind.thead.merchantNo')" prop="merchantNo"></el-table-column>
          <el-table-column :label="$t('machine.bind.thead.merchantName')" prop="merchantName"></el-table-column>
          <el-table-column :label="$t('machine.bind.thead.terminalNo')" prop="terminalNo"></el-table-column>
          <el-table-column :label="$t('machine.bind.thead.selection')" prop="selection" width="70px" align="center">
            <template slot-scope="scope">
              <el-checkbox @change="handleSelect(scope.row, scope.column)" v-model="scope.row.isSelected"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="common-pagination m-t-0"
          :pager-count="5"
          @size-change="getMerchantTerminal"
          @current-change="getMerchantTerminal"
          :current-page.sync="filter.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size.sync="filter.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          class="cancel"
          @click="bindingDialogVisible = false"
        >{{ $t('base.buttons.cancel') }}</el-button>
        <el-button type="primary" @click="handleBind">{{ $t('base.buttons.bind') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { queryMerchantTerminal, bindMerchantTerminal } from '@/api/machine'

export default {
  name: "",
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      bindingDialogVisible: false,
      merchantDialogVisible: false,
      loading: false,
      machineId: -1,
      filter: {
        keyword: '',
        page: 1,
        pageSize: 10,
      },
      currentMachine: {
        sn: "",
        merchant: ""
      },
      rules: {
        merchant: [
          {
            required: true,
            message: this.$t('machine.bind.tips.merchant'),
            trigger: "blur"
          }
        ]
      },
      merchantList: [],
      total: 1,
      bindingCellList: [], // 绑定的列表
      selectedMerchant: null,
    };
  },
  computed: {},
  watch: {},
  created() {
    /* 放在这里调用而不放在openDialog时调用，主要是出于性能考虑 */
    this.getMerchantTerminal()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleOpenBindDialog() {
      /* 下面代码暂时模拟 */
      _.forEach(this.merchantList, item => {
        item.isSelected = false;
      });
    },
    handleBind() {
      const bindingCellList = []
      const { merchantId, terminalId } = this.selectedMerchant
      if (terminalId) {
        bindingCellList.push({ merchantId, terminalId })
      } else {
        bindingCellList.push({ merchantId })
      }
      // return
      const reqData = {
        id: this.currentMachine.id,
        bindingCellList
      }
      bindMerchantTerminal(merchantId, reqData).then(res => {
        this.$emit('refresh')
        this.bindingDialogVisible = false
        this.$message.success(this.$t('base.tips.bindSuccess'))
      })
    },
    openMerchantDialog() {
      this.merchantDialogVisible = true
    },
    closeDialog() {
      this.clearSelection()
      this.currentMachine = null
    },
    getMerchantTerminal() {
      this.loading = true
      queryMerchantTerminal(this.filter).then(res => {
        this.merchantList = _.map(res.data.rows, item => {
          item.isSelected = false
          return item
        })
        this.total = res.data.totalRecord
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    clearSelection() {
      _.forEach(this.merchantList, (item) => {
        if (item.isSelected) {
          item.isSelected = false
        } 
      })
    },
    handleSelect(row, column) {
      if (column.property !== 'selection') {
        return
      }
      if (_.isEqual(this.selectedMerchant, row)) {
        this.selectedMerchant = null
        return
      }
      this.clearSelection()
      row.isSelected = true
      this.selectedMerchant = row
    }
  }
};
</script>

<style lang='scss' scoped>
.el-input__suffix {
  .search-btn {
    cursor: pointer;
    font-size: 16px;
    color: #5087e5;
    height: 34px;
    line-height: 34px;
  }
}
</style>
<style lang="scss">
.bind-dialog {
  .el-dialog__body {
    height: 60vh;
    width: calc(100% - 100px);
  }
  .el-table {
    thead{
      color: #172B4D;
    }
    td{
      border-bottom: none;
    }
    /deep/.diabled-selection .cell .el-checkbox__inner{
      display: none;
      position: relative;
    }
    /deep/.diabled-selection .cell:before{
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
    }
  }
}
</style>
