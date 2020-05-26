<template>
  <el-dialog
    class="user-add-dialog"
    :title="$t('user.add.title')"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form class="common-form" ref="userForm" :model="formData" :rules="rules" label-width="100px">
      <!-- 如果为最下级渠道商，则不显示"归属渠道商"，后期根据接口返回字段判断是否为最下级，目前处理为全部展示 -->
      <el-form-item :label="$t('user.add.form.label.companyId')" prop="companyId">
        <treeselect 
          v-model="formData.companyId"
          :default-expand-level="Infinity"
          :options="companyTreeData">
        </treeselect>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.account')" prop="account">
        <el-input v-model="formData.account" maxlength="50">
          <el-tooltip slot="suffix" class="item" effect="light" placement="top-end">
            <div slot="content">{{ $t('user.add.form.placeholder.account') }}</div>
            <i class="el-input__icon el-icon-info"></i>
          </el-tooltip>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.password')" prop="password">
        <el-input v-model="formData.password" :type="passwordType" maxlength="18">
          <i
            slot="suffix"
            class="el-input__icon el-icon-view"
            :class="{'is-active': passwordType=='text'}"
            @click="showPassword"></i>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.name')" prop="name">
        <el-input v-model="formData.name">
          <el-tooltip slot="suffix" class="item" effect="light" placement="top-end">
            <div slot="content">{{ $t('user.add.form.placeholder.name') }}</div>
            <i class="el-input__icon el-icon-info"></i>
          </el-tooltip>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.email')" prop="email">
        <el-input v-model="formData.email" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.cellphone')" prop="cellphone">
        <el-input v-model="formData.cellphone" maxlength="25">
          <el-tooltip slot="suffix" class="item" effect="light" placement="top-end">
            <div slot="content">{{ $t('user.add.form.placeholder.cellphone') }}</div>
            <i class="el-input__icon el-icon-info"></i>
          </el-tooltip>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.expireTime')" prop="expireTime">
        <el-date-picker
          v-model="formData.expireTime"
          type="datetime"
          :picker-options="pickerOptions"
          :placeholder="$t('user.add.form.placeholder.expireTime')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.roles')" prop="roles">
        <el-checkbox-group v-model="formData.roles">
          <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
            <span>{{ item.name }}</span>
            <el-tooltip class="item" effect="light" placement="top-end" v-if="item.remark">
              <div slot="content">{{ item.remark }}</div>
              <i class="el-input__icon el-icon-question"></i>
            </el-tooltip>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.remark')" prop="remark">
        <el-input type="textarea" v-model="formData.remark" maxlength="100"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="dialogVisible = false">{{ $t('base.buttons.cancel') }}</el-button>
      <el-button type="primary" @click="addUser">{{ $t('base.buttons.add') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import * as UserService from '@/api/user'
import { getCompanySubordinate } from '@/api/company'
import mixin from '@/utils/mixin'
import moment from 'moment'

export default {
  name: 'UserDialog',
  components: {
    Treeselect
  },
  mixins: [mixin],
  props: {},
  directive: {},
  data() {
    const validateAccount = (rule, value, callback) => {
      const regExp = /^[A-Za-z0-9_@\.]{1,50}$/
      if (!regExp.test(value)) {
        callback(new Error(this.$t('user.add.form.tips.account')))
      }
      // 如果通过校验，调接口判断该账号是否已经注册过，若有给出提示“该登录账号已被注册，请重新输入”
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      /* 匹配字母，数字和英文标点符号，必须包含大小写字母，数字，支持6~18 */
      const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,18}$/;
      if (!regExp.test(value)) {
        callback(new Error(this.$t('user.add.form.tips.password')))
      }
      callback()
    }
    const validateName = (rule, value, callback) => {
      const regExp = /^[\u4e00-\u9fa5]{2,8}$|^[A-Za-z\s]{1,16}$/
      if (!regExp.test(value)) {
        callback(new Error(this.$t('user.add.form.tips.name')))
      }
      callback();
    }
    const validateEmail = (rule, value, callback) => {
      const regExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (_.trim(value) && !regExp.test(value)) {
        callback(new Error(this.$t('user.add.form.tips.email')))
      }
      callback()
    }
    const validateTel = (rule, value, callback) => {
      const regExp = /^(((\d{2}-)?0\d{2,3}-\d{7,8})|((\+\d{2}-)?(\d{2,3}-)?([1][3,4,5,7,8][0-9]\d{8})))$/
      if (!regExp.test(value)) {
        callback(new Error(this.$t('user.add.form.tips.cellphone')))
      }
      callback()
    }
    return {
      dialogVisible: false,
      flag: 0,
      userId: false,
      formData: {
        companyId: null,
        account: '',
        password: '',
        name: '',
        cellphone: '',
        email: '',
        roles: [],
        expireTime: '',
        remark: ''
      },
      rules: {
        companyId: [
          { required: true, message: this.$t('user.add.form.tips.companyId'), trigger: 'blur' }
        ],
        account: [
          {
            required: true, min: 1, max: 5, validator: validateAccount, trigger: 'blur', 
          }
        ],
        password: [
          {
            required: true, min: 1, max: 5, validator: validatePassword, trigger: 'blur', 
          }
        ],
        name: [
          {
            required: true, min: 1, max: 5, validator: validateName, trigger: 'blur', 
          }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        cellphone: [
          { required: true, validator: validateTel, trigger: 'blur' }
        ],
        expireTime: [
          {
            required: true, message: this.$t('user.add.form.tips.companyId'), trigger: 'blur'
          }
        ],
        roles: [
          {
            required: true, message: this.$t('user.add.form.tips.companyId'), trigger: 'blur'
          }
        ]
      },
      companyTreeData: [],
      passwordType: 'password',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < moment(moment().format('YYYY-MM-DD')).valueOf()
        },
      },
      // 可授权的角色
      roleList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getRoleList()
    this.getCompanyTree()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    /* 待检验 */
    addUser() {
      const reqData = _.omit(this.formData, 'expireTime')
      const { expireTime, password } = this.formData
      reqData.expireTime = moment(expireTime).format('YYYY-MM-DD HH:mm:ss')
      reqData.password = this.encryptText(password)
      UserService.addUser(reqData).then(res => {
        this.$emit('refresh')
        this.dialogVisible = false
        this.$message.success(this.$t('base.tips.addSuccess'))
      })
    },
    sortTreeData(array) {
      if (!array.length) {
        return []
      }
      return _.map(array, (item) => {
        item.label = item.shortName
        if (item.child && item.child.length) {
          item.children = this.sortTreeData(item.child)
        }
        return item
      })
    },
    // 获取渠道商下拉树res.data.child
    getCompanyTree() {
      getCompanySubordinate().then(res => {
        const resData = (res.data && [res.data]) || []
        this.companyTreeData = this.sortTreeData(resData)
      })
    },
    getRoleList() {
      UserService.getUserRole().then(res => {
        this.roleList = res.data || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input__icon {
  color: #C0C4CC;
  &.el-icon-view{
    cursor: pointer;
    &:hover, &.is-active{
      color: #5087E5;
    }
  }
}
.el-checkbox-group{
  border: 1px solid #DCDFE6;
  padding: 6px 10px;
  border-radius: 4px;
  color: #DCDFE6;
  min-height: 60px;
  max-height: 120px;
  overflow-y: auto;
}
</style>
