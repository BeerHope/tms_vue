<template>
  <div>
    <el-dialog
      @open="handleOpenBindDialog"
      custom-class="bind-dialog"
      title="绑定终端商户"
      :visible.sync="bindingDialogVisible"
      width="632px">
      <el-form ref="form" :model="formData" v-if="!isShowResult" class="common-form" :rules="rules" label-width="120px">
        <el-form-item label="机身号" prop="deviceSn">
          <el-input v-model="formData.deviceSN" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定商户终端" prop="merchant">
          <el-input v-model="formData.merchant" readonly>
            <svg-icon slot="suffix" icon-class="search" class="search-btn" @click="openMerchantDialog"></svg-icon>
          </el-input>
        </el-form-item>
      </el-form>
      <div v-else class="search-result">
        <div class="m-r-30">
          <img src="@/assets/images/mpos.png" alt="apk.png">
        </div>
        <div class="content">
          <el-row>
            <el-col :span="12">
              <span>客户名称：</span>
              <span>*****</span>
            </el-col>
            <el-col :span="12">
              <span>终端号: </span>
              <span>12345678</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>智能POS：</span>
              <span>N5</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>SN：</span>
              <span>12345678910</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancel" @click="bindingDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBind">绑 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择商户终端弹窗 -->
    <el-dialog
      custom-class="merchant-dialog"
      title="选择商户终端"
      :visible.sync="merchantDialogVisible"
      width="40%">
      <div class="filter-box">
        <el-input class="filter-item" v-model="filter.merchant" placeholder="请输入商户编号或者名称" clearable></el-input>
        <el-button type="primary">
          <svg-icon icon-class="search"></svg-icon>
          搜索
        </el-button>
      </div>
      <div class="m-t-20 h-100">
        <el-table
          :data="merchantList"
          height="calc(100% - 100px)"
          style="width: 100%">
          <el-table-column label="商户编号" prop="id"></el-table-column>
          <el-table-column label="商户名称" prop="name"></el-table-column>
          <el-table-column label="终端号" prop="terminalId"></el-table-column>
          <el-table-column label="选择">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isSelected"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="common-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="3">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancel" @click="merchantDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectMerchant">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      bindingDialogVisible: false,
      merchantDialogVisible: false,
      filter: {
        merchant: ''
      },
      formData: {
        deviceSN: '1243243247890',
        merchant: ''
      },
      rules: {
        merchant: [
          { required: true, message: '请点击搜索选择终端', trigger: 'blur' }
        ]
      },
      merchantList: [
        {
          id: '23213213213',
          name: '商户11',
          terminalId: '32423213223',
          isSelected: false,
        },
        {
          id: '23213213213',
          name: '商户12',
          terminalId: '332222432423',
          isSelected: false,
        },
      ],
      currentPage: 1,
      isShowResult: false,
      currentMerchant: -1,
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
    handleOpenBindDialog() {
      /* 下面代码暂时模拟 */
      _.forEach(this.merchantList, (item) => {
        item.isSelected = false
      })
    },
    handleBind() {
      if (this.$refs.form) {
        /* 校验是否通过 */
        this.$refs.form.validate().catch(err => console.log(err))
      } else {
        /* 此处调用绑定接口，然后关闭dialog */
        this.bindingDialogVisible = false
      }
    },
    openMerchantDialog() {
      this.merchantDialogVisible = true
    },
    handleSizeChange() {
      console.log('handleSizeChange!!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!')
    },
    selectMerchant() {
      const isSelectedOne = _.filter(this.merchantList, (item) => {
        return item.isSelected
      }).length === 1
      if (!isSelectedOne) {
        this.$message.warning('请选择一个要绑定的商户')
        return
      }
      /* 更新表单 */
      this.isShowResult = true
      this.merchantDialogVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>
.el-input__suffix{
  .search-btn {
    cursor: pointer;
    font-size: 16px;
    color: #5087E5;
    height: 34px;
    line-height: 34px;
  }
}
.search-result{
  display: flex;
  border: 1px solid #BEC1C6;
  padding: 20px;
  border-radius: 10px;
  margin: 0 16px;
  width: 100%;
  .el-row{
    height: 30px;
  }
  .content{
    flex: auto;
  }
}
</style>
<style lang="scss">
.bind-dialog {
  margin-top: calc(50vh - 160px) !important;
  .el-dialog__header{
    padding: 20px 30px;
  }
  .el-dialog__body{
    width: 100%;
    height: 192px;
    display: flex;
  }
}
.merchant-dialog{
  .el-dialog__body{
    height: 60vh;
  }
}
</style>
