<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @open="openDialog"
    @close="closeDialog"
    width="40%"
  >
    <el-form
      v-loading="loading"
      class="common-form"
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item
        prop="merchantNo"
        :label="$t('merchant.form.label.merchantNo')"
        :required="!isDetailsMode"
      >
        <el-input v-model="formData.merchantNo" maxlength="20" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item
        prop="merchantName"
        :label="$t('merchant.form.label.merchantName')"
        :required="!isDetailsMode"
      >
        <el-input v-model="formData.merchantName" maxlength="40" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item prop="contactName" :label="$t('merchant.form.label.contactName')">
        <el-input v-model="formData.contactName" maxlength="16" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item prop="contactPhone" :label="$t('merchant.form.label.contactPhone')">
        <el-input v-model="formData.contactPhone" maxlength="16" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item prop="address" :label="$t('merchant.form.label.address')">
        <el-input v-model="formData.address" maxlength="200" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item
        v-if="flag===0"
        prop="terminalNos"
        :label="$t('merchant.form.label.terminalNos')"
      >
        <el-input
          v-model="formData.terminalNos"
          type="textarea"
          :autosize="{minRows: 2, maxRows: 10}"
          maxlength="200"
          :disabled="isDetailsMode"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('merchant.form.label.createBy')" v-if="flag===2">
        <el-input v-model="formData.createBy" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item :label="$t('merchant.form.label.remark')" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          maxlength="200"
          :disabled="isDetailsMode"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :class="{'cancel': !isDetailsMode}"
        @click="dialogVisible=false"
      >{{ !isDetailsMode ? $t('base.buttons.cancel') : $t('base.buttons.close') }}</el-button>
      <el-button type="primary" v-if="flag===0" @click="addMerchant">{{ $t('merchant.add.typeIn') }}</el-button>
      <el-button
        type="primary"
        v-if="flag===1"
        @click="updateMerchant"
      >{{ $t('merchant.edit.save') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as merchantService from "@/api/merchant";

export default {
  name: "MerchantDialog",
  components: {},
  props: {},
  directive: {},
  data() {
    /* 联系电话 */
    const validateTel = (rule, value, callback) => {
      const regExp = /^((\(86\))|(\+?86))?(-?\s?)((1\d{10,})|(\d{8,}))$/;
      if (_.trim(value) && !regExp.test(value)) {
        callback(new Error(this.$t("merchant.form.tips.contactPhone")));
      }
      callback();
    };
    /* 姓名校验 */
    const validateName = (rule, value, callback) => {
      const regExp = /^[\u4e00-\u9fa5]{2,8}$|^[A-Za-z\s]{1,16}$/;
      if (!regExp.test(value)) {
        callback(new Error(this.$t("merchant.form.tips.contactName")));
      }
      callback();
    };
    return {
      loading: false,
      flag: 0,
      merchantId: -1,
      dialogVisible: false,
      formData: {
        merchantNo: "",
        merchantName: "",
        contactName: "",
        contactPhone: "",
        address: "",
        terminalNos: "", // 终端号，支持多个输入，使用";"分割
        creatBy: "", // 创建人
        remark: ""
      },
      rules: {
        merchantNo: [
          { required: true, message: this.$t("merchant.form.tips.merchantNo"), trigger: "blur" }
        ],
        merchantName: [
          {
            required: true,
            message: this.$t("merchant.form.tips.merchantName"),
            trigger: "blur"
          }
        ],
        contactPhone: [{ validator: validateTel, trigger: "blur" }],
        contactName: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  computed: {
    isDetailsMode() {
      return this.flag === 2;
    },
    dialogTitle() {
      let title = "";
      switch (this.flag) {
        case 0:
          title = this.$t('merchant.add.title')
          break;
        case 1:
          title = this.$t('merchant.edit.title')
          break;
        case 2:
          title = this.$t('merchant.details.title')
          break;
        default:
          break;
      }
      return title;
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    openDialog() {
      if (this.flag) {
        this.loading = true;
        merchantService.getMerchantDetails(this.merchantId).then(res => {
          this.formData = res.data;
          this.loading = false;
        });
      }
    },
    closeDialog() {
      this.$refs.form.resetFields();
    },
    addMerchant() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.omit(this.formData, 'terminalNos')
          reqData.terminalNos = _.split(this.formData.terminalNos, ';')
          merchantService.addMerchant(reqData).then(res => {
            this.$emit('refresh')
            this.dialogVisible = false
            this.$message.success(this.$t('merchant.add.tips.typeInSuccess'))
          })
        }
      })
    },
    updateMerchant() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.omit(this.formData, 'terminalNos')
          merchantService.updateMerchant(this.merchantId, reqData).then(res => {
            this.$emit('refresh')
            this.dialogVisible = false
            this.$message.success(this.$t('base.tips.saveSuccess'))
          })
        }
      })
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
