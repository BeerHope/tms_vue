<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="$t('user.password.title')"
    width="40%"
    @close="closeDialog"
    class="password-dialog"
  >
    <el-form ref="form" class="common-form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item :label="$t('user.password.label.originPassword')" prop="originPassword">
        <el-input v-model="formData.originPassword" maxlength="18"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.password.label.password')" prop="password">
        <el-input v-model="formData.password" maxlength="18"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="dialogVisible = false">{{ $t('base.buttons.cancel') }}</el-button>
      <el-button type="primary" @click="resetPassword">{{ $t('user.password.reset') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import mixin from '@/utils/mixin'
import { resetPassword } from '@/api/user'

export default {
  name: '',
  components: {},
  mixins: [mixin],
  props: {},
  directive: {},
  data() {
    const validatePassword = (rule, value, callback) => {
      /* 匹配字母，数字和英文标点符号，必须包含大小写字母，数字，支持6~18 */
      const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,18}$/;
      if (!regExp.test(value)) {
        callback(new Error(this.$t('user.password.tips.password')))
      }
      callback()
    }
    const validateAgainPassword = (rule, value, callback) => {
      if (_.trim(value) && !_.isEqual(value, this.formData.originPassword)) {
        callback(new Error(this.$t('user.password.tips.consistencyCheck')))
      }
      callback()
    }
    return {
      dialogVisible: false,
      user: -1,
      formData: {
        originPassword: '',
        password: ''
      },
      rules: {
        originPassword: [
          {
            required: true, message: this.$t('user.password.tips.requiredTips'), trigger: 'blur'
          },
          {
            validator: validatePassword, trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, validator: this.$t('user.password.tips.requiredTipsAgain'), trigger: 'blur'
          },
          {
            validator: validateAgainPassword, trigger: 'blur'
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
  methods: {
    resetPassword(id) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { password } = this.formData
          const reqData = {
            id: this.userId,
            password: this.encryptText(password)
          }
          resetPassword(reqData).then((res) => {
            this.$emit('refresh')
            this.$message.success(this.$t('user.password.tips.resetSuccess'))
            this.dialogVisible = false
          })
        }
      })
    },
    closeDialog() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
