<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="closeDialog"
    @open="openDialog"
    width="40%"
  >
    <el-form v-loading="loading" class="common-form" ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item
        prop="merchantId"
        :label="$t('terminal.form.label.merchantId')"
      >
        <el-select v-model="formData.merchantId">
          <el-option
            v-for="item in directMerchantList"
            :key="item.id"
            :value="item.id"
            :label="item.merchantName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="!flag"
        :label="$t('terminal.form.label.terminalNos')"
        prop="terminalNos">
        <el-input v-model="formData.terminalNos" type="textarea" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item
        v-else
        :label="$t('terminal.form.label.terminalNos')"
        prop="terminalNo">
        <el-input v-model="formData.terminalNo" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item :label="$t('terminal.form.label.remark')">
        <el-input v-model="formData.remark" type="textarea" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item :label="$t('terminal.form.label.createPerson')" v-if="flag===2">
        <el-input v-model="formData.createPerson" maxlength="200"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :class="{'cancel': !isDetailsMode}"
        @click="dialogVisible=false"
      >{{ !isDetailsMode ? $t('base.buttons.cancel') : $t('base.buttons.close') }}</el-button>
      <el-button type="primary" v-if="flag===0" @click="addTerminal">{{ $t('base.buttons.add') }}</el-button>
      <el-button type="primary" v-if="flag===1" @click="updateTerminal">{{ $t('base.buttons.save') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDirectMerchants } from "@/api/merchant";
import { getTerminalDetails, addTerminal, updateTerminal } from "@/api/terminal";

export default {
  name: "MerchantDialog",
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      loading: false,
      flag: 0,
      terminalId: -1,
      dialogVisible: false,
      formData: {
        merchantId: "", // 所属商户
        terminalNos: "", // 新增时支持多行终端号输入
        terminalNo: '',
        createPerson: "",
        remark: ""
      },
      rules: {
        merchantId: [
          { 
            required: true,
            message: this.$t("terminal.form.tips.merchantId"),
            trigger: "blur" 
          }
        ],
        terminalNos: [
          {
            required: true,
            message: this.$t("terminal.form.tips.terminalNos"),
            trigger: "blur"
          }
        ]
      },
      directMerchantList: []
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
          title = this.$t("terminal.add.title");
          break;
        case 1:
          title = this.$t("terminal.edit.title");
          break;
        case 2:
          title = this.$t("terminal.details.title");
          break;
        default:
          break;
      }
      return title;
    }
  },
  watch: {},
  created() {
    // const res = await getDirectMerchants();
    // this.directMerchantList = res.data;
    this.getDirectMerchantList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    closeDialog() {
      this.$refs.form.resetFields();
      this.loading = false
    },
    openDialog() {
      // flag判断编辑还是详情
      const { terminalId } = this
      if (this.terminalId !== -1) {
        this.loading = true
        getTerminalDetails(terminalId).then(res => {
          this.formData = res.data
          this.loading = false
        })
      }
    },
    getDirectMerchantList() {
      getDirectMerchants().then(res => {
        this.directMerchantList = res.data;
      });
    },
    addTerminal() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.omit(this.formData, 'createPerson')
          reqData.terminalNos = _.split(reqData.terminalNos, ';')
          addTerminal(reqData).then(res => {
            this.$emit('refresh')
            this.$message.success(this.$t('base.tips.addSuccess'))
            this.dialogVisible = false
          })
        }
      })
    },
    updateTerminal() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.pick(this.formData, [
            'merchantId',
            'terminalNo',
            'remark'
          ])
          updateTerminal(this.terminalId, reqData).then(res => {
            this.$emit('refresh')
            this.$message.success(this.$t('base.tips.saveSuccess'))
            this.dialogVisible = false
          })
        }
      })
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
