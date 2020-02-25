<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="修改密码"
    width="40%"
    class="password-dialog"
  >
    <el-form class="common-form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="输入新密码" prop="password">
        <el-input v-model="formData.password" maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="againPassword">
        <el-input v-model="formData.againPassword" maxlength="18"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="line-type" type="primary" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">修 改</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    const validatePassword = (rule, value, callback) => {
      /* 匹配字母，数字和英文标点符号，必须包含大小写字母，数字，支持6~18 */
      const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,18}$/;
      if (!regExp.test(value)) {
        callback(new Error('支持6~18位字符, 必须包含大小写字母、数字'))
      }
      callback()
    }
    const checkPasswordAgain = (rule, value, callback) => {
      if (this.formData.password !== value) {
        callback(new Error('密码不一致，请检查后重置'))
      }
      callback()
    }
    return {
      dialogVisible: false,
      formData: {
        password: '',
        againPassword: ''
      },
      rules: {
        password: [
          {
            required: true, validator: validatePassword, trigger: 'blur'
          }
        ],
        againPassword: [
          {
            required: true, validator: checkPasswordAgain, trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
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
