<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="$t('user.password.title')"
    width="40%"
    class="password-dialog"
  >
    <el-form class="common-form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item :label="$t('user.password.label.originPassword')" prop="originPassword">
        <el-input v-model="formData.originPassword" maxlength="18"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.password.label.password')" prop="password">
        <el-input v-model="formData.password" maxlength="18"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="dialogVisible = false">{{ $t('base.buttons.cancel') }}</el-button>
      <el-button type="primary" @click="updatePassword">{{ $t('base.buttons.modify') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import mixin from '@/utils/mixin'
import { updatePassword } from '@/api/user'

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
        callback(new Error('支持6~18位字符, 必须包含大小写字母、数字'))
      }
      callback()
    }
    return {
      dialogVisible: false,
      formData: {
        originPassword: '',
        password: ''
      },
      rules: {
        originPassword: [
          // {
          //   required: true, validator: validatePassword, trigger: 'blur'
          // },
          {
            required: true, message: this.$t('user.password.label.originPassword'), trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, validator: validatePassword, trigger: 'blur'
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
    updatePassword() {
      const { originPassword, password } = this.formData
      const reqData = {
        originPassword: this.encryptText(originPassword),
        password: this.encryptText(password)
      }
      updatePassword(reqData).then((res) => {
        this.$message.success(this.$t('user.password.tips.modifySuccess'))
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
