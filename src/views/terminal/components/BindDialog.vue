<template>
  <div>
    <el-dialog
      @close="handleDialogClose"
      custom-class="bind-dialog"
      :title="$t('terminal.bind.title')"
      :visible.sync="dialogVisible"
      width="632px">
      <el-form ref="form" :model="formData" v-if="!isShowResult" class="common-form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('terminal.bind.label.deviceSN')" prop="sn">
          <el-input v-model="formData.sn" clearable></el-input>
        </el-form-item>
      </el-form>
      <div v-else class="search-result">
        <div class="m-r-30">
          <img src="@/assets/images/mpos.png" alt="apk.png">
        </div>
        <div class="content">
          <el-row>
            <el-col :span="12">
              <span>{{ $t('terminal.bind.label.deviceSN') }}</span>
              <span>*****</span>
            </el-col>
            <el-col :span="12">
              <span>{{ $t('terminal.bind.label.terminalNo') }}</span>
              <span>12345678</span>
            </el-col>
          </el-row>
          <el-row>
            <!-- 下面是传入值 -->
            <el-col :span="24">
              <span>智能POS：</span>
              <span>N5</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>{{ $t('terminal.bind.label.sn') }}</span>
              <span>12345678910</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isShowResult" @click="querySN">{{ $t('terminal.bind.query') }}</el-button>
        <el-button type="primary" v-if="isShowResult" @click="isShowResult=false">{{ $t('terminal.bind.replace') }}</el-button>
        <el-button type="primary" v-if="isShowResult" @click="bindSN">{{ $t('terminal.bind.bind') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { querySN, bindSN } from '@/api/terminal'

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      merchantDialogVisible: false,
      terminalId: -1,
      formData: {
        sn: '',
        merchant: ''
      },
      rules: {
        sn: [
          { required: true, message: this.$t('terminal.bind.tips.sn'), trigger: 'blur' }
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
    handleDialogClose() {
      /* 下面代码暂时模拟 */
      this.$refs.form.resetFields()
    },
    querySN() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const sn = ''
          querySN(this.terminalId, sn).then(res => {
            console.log(res.data, '绑定设备 querySN接口数据')
            this.isShowResult = true
          })
        }
      })
    },
    bindSN() {
      bindSN(this.terminalId, this.formData.sn).then(res => {
      /* 此处调用绑定接口，然后关闭dialog */
        this.$emit('refresh')
        this.message.success(this.$t('base.tips.bindSuccess'))
        this.dialogVisible = false
      })
    },
    openMerchantDialog() {
      this.merchantDialogVisible = true
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
