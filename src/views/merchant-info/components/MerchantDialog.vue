<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="40%">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item prop="merchantId" label="商户编号" :required="!isDetailsMode">
        <el-input v-model="formData.merchantId" maxlength="20" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item prop="merchantName" label="商户名称" :required="!isDetailsMode">
        <el-input v-model="formData.merchantName" maxlength="40" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item prop="contact" label="联系人姓名">
        <el-input v-model="formData.contact" maxlength="16" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item prop="tel" label="联系电话">
        <el-input v-model="formData.tel" maxlength="16" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item prop="bussAdress" label="经营地址">
        <el-input v-model="formData.bussAdress" maxlength="200" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item label="终端号" prop="terminalId" v-if="flag===0">
        <el-input v-model="formData.terminalId" type="textarea" maxlength="200" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item label="创建人" v-if="flag===2">
        <el-input v-model="formData.creator" :disabled="isDetailsMode"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" type="textarea" maxlength="200" :disabled="isDetailsMode"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary" :class="{'cancel': !isDetailsMode}"
        @click="dialogVisible=false">
        {{ !isDetailsMode ? '取消' : '关闭' }}
      </el-button>
      <el-button type="primary" v-if="flag===0">添 加</el-button>
      <el-button type="primary" v-if="flag===1">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'MerchantDialog',
  components: {},
  props: {},
  directive: {},
  data() {
    /* 联系电话 */
    const validateTel = (rule, value, callback) => {
      const regExp = /^((\(86\))|(\+?86))?(-?\s?)((1\d{10,})|(\d{8,}))$/
      if (_.trim(value) && !regExp.test(value)) {
        callback(new Error('联系电话格式不符'))
      }
      callback()
    }
    /* 姓名校验 */
    const validateName = (rule, value, callback) => {
      const regExp = /^[\u4e00-\u9fa5]{2,8}$|^[A-Za-z\s]{1,16}$/
      if (!regExp.test(value)) {
        callback(new Error('姓名不符合要求，请重新输入'))
      }
      callback();
    }
    return {
      flag: 0,
      merchantId: -1,
      dialogVisible: false,
      /* 
        商户编号，商户名称，联系人姓名，联系电话,
        经营地址，终端号，备注
      */
      formData: {
        merchantId: '',
        merchantName: '',
        contact: '',
        tel: '',
        bussAdress: '',
        terminalIds: '', // 终端号，支持多个输入，使用";"分割
        creator: '', // 创建人
        remark: ''
      },
      rules: {
        merchant: [
          { required: true, message: '请选择所属商户', trigger: 'blur' }
        ],
        tel: [
          { validator: validateTel, trigger: 'blur' }
        ],
        contact: [
          { validator: validateName, trigger: 'blur' }
        ]
      },
      merchants: [
        {
          value: 213233,
          label: 'merchant111'
        },
        {
          value: 23214214,
          label: 'merchant22222'
        }
      ]
    }
  },
  computed: {
    isDetailsMode() {
      return this.flag === 2
    },
    dialogTitle() {
      let title = ''
      switch (this.flag) {
        case 0:
          title = '录入商户'
          break;
        case 1:
          title = '编辑商户'
          break;
        case 2:
          title = '商户详情'
          break;
        default:
          break;
      }
      return title
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang='scss' scoped>

</style>
