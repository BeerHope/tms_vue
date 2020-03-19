<template>
  <el-dialog
    class="user-add-dialog"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form class="common-form" ref="userForm" :model="formData" :rules="rules" label-width="100px">
      <!-- 如果为最下级渠道商，则不显示"归属渠道商"，后期根据接口返回字段判断是否为最下级，目前处理为全部展示 -->
      <el-form-item :label="$t('user.add.form.label.companyId')" prop="companyId">
        <el-select v-model="formData.companyId">
          <el-option
            v-for="(item, index) in companyInfos" :key="index"
            :value="item.value" :label="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('user.add.form.label.account')" prop="account">
        <el-input v-model="formData.account" maxlength="50">
          <el-tooltip slot="suffix" class="item" effect="light" placement="top-end">
            <div slot="content">支持输入大小写英文字母、@、. 、数字；<br />长度1~50个字符</div>
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
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name">
          <el-tooltip slot="suffix" class="item" effect="light" placement="top-end">
            <div slot="content">支持字符长度：英文1~16位或中文2~8位</div>
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
            <div slot="content">eg: (86-755)888888888</div>
            <i class="el-input__icon el-icon-info"></i>
          </el-tooltip>
        </el-input>
      </el-form-item>
      <el-form-item label="失效日期" prop="expireTime">
        <el-date-picker
          v-model="formData.expireTime"
          type="datetime"
          :picker-options="pickerOptions"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="角色权限" prop="roles">
        <el-checkbox-group v-model="formData.roles">
          <el-checkbox v-for="item in roles" :key="item.prop" name="roles">
            <span>{{ item.label }}</span>
            <el-tooltip class="item" effect="light" placement="top-end">
              <div slot="content">角色说明</div>
              <i class="el-input__icon el-icon-question"></i>
            </el-tooltip>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="formData.remark" maxlength="100"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as UserService from '@/api/user'
export default {
  name: 'UserDialog',
  components: {},
  props: {},
  directive: {},
  data() {
    const validateAccount = (rule, value, callback) => {
      const regExp = /^[A-Za-z0-9_@\.]{1,50}$/
      if (!regExp.test(value)) {
        callback(new Error('登录账号不符合要求，请重新输入'))
      }
      // 如果通过校验，调接口判断该账号是否已经注册过，若有给出提示“该登录账号已被注册，请重新输入”
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      /* 匹配字母，数字和英文标点符号，必须包含大小写字母，数字，支持6~18 */
      const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,18}$/;
      if (!regExp.test(value)) {
        callback(new Error('支持6~18位字符, 必须包含大小写字母、数字'))
      }
      callback()
    }
    const validateName = (rule, value, callback) => {
      const regExp = /^[\u4e00-\u9fa5]{2,8}$|^[A-Za-z\s]{1,16}$/
      if (!regExp.test(value)) {
        callback(new Error('姓名不符合要求，请重新输入'))
      }
      callback();
    }
    const validateEmail = (rule, value, callback) => {
      const regExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (_.trim(value) && !regExp.test(value)) {
        callback(new Error('邮箱格式不符合，请重新输入'))
      }
      callback()
    }
    const validateTel = (rule, value, callback) => {
      const regExp = /^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$/
      if (_.trim(value) && !regExp.test(value)) {
        callback(new Error('联系电话格式不符合, 请重新输入'))
      }
      callback()
    }
    return {
      dialogTitle: '新增用户',
      dialogVisible: false,
      flag: 0,
      userId: false,
      formData: {
        companyId: 0,
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
        companyInfo: [
          { required: true, message: '请选择渠道商', trigger: 'blur' }
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
          {
            validator: validateEmail, trigger: 'blur'
          }
        ],
        cellphone: [
          {
            validator: validateTel, trigger: 'blur'
          }
        ],
        expireTime: [
          {
            required: true, message: '请选择失效日期', trigger: 'blur'
          }
        ],
        roles: [
          {
            required: true, message: '请选择角色', trigger: 'blur'
          }
        ]
      },
      /* 归属渠道商 */
      companyInfos: [
        {
          value: 0,
          label: '本司'
        },
        {
          value: 933,
          label: '直接下级渠道商1'
        },
        {
          value: 4343,
          label: '直接下级渠道商2'
        },
        {
          value: 3243,
          label: '直接下级渠道商3'
        }
      ],
      passwordType: 'password',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < moment(moment().format('YYYY-MM-DD')).valueOf()
        },
      },
      // 可授权的角色
      roles: [
        {
          prop: 'role1',
          label: 'role1'
        },
        {
          prop: 'role2',
          label: 'role2'
        },
        {
          prop: 'role3',
          label: 'role3'
        },
        {
          prop: 'role4',
          label: 'role4'
        }
      ]
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
    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    addUser() {
      const reqData = this.formData
      UserService.addUser(reqData).then(res => {
        console.log(res, 'res!!!!!!!!!!!')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
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
}
</style>
