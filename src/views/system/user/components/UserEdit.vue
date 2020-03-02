<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="40%"
    custom-class="user-edit-dialog"
    :show-close="false"
  >
    <el-card class="user-info" shadow="never">
      <div slot="header" class="clearfix p-0">
        <span>用户信息</span>
        <el-button v-if="!isEditingInfo" type="primary" class="r" @click="isEditingInfo=true">编 辑</el-button>
        <el-button v-if="isEditingInfo" type="primary" class="r" @click="saveInfo">保 存</el-button>
        <el-button v-if="isEditingInfo" type="primary" class="blue-btn cancel r m-r-10" @click="cancelEdittingInfo">取 消</el-button>
      </div>
      <el-form label-width="100px" :rules="infoRules" :model="basicInfo">
        <el-form-item prop="account" label="登陆账号">
          <el-input v-model="basicInfo.account" maxlength="50">
            <el-tooltip slot="suffix" class="item" effect="light" placement="top-end">
              <div slot="content">支持输入大小写英文字母、@、. 、数字；<br />长度1~50个字符</div>
              <i class="el-input__icon el-icon-info"></i>
            </el-tooltip>
          </el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="basicInfo.name" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="联系邮箱">
          <el-input v-model="basicInfo.email" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="联系电话">
          <el-input v-model="basicInfo.tel" maxlength="25"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input v-model="basicInfo.remark" maxlength="100"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="permission box-card" shadow="never">
      <div slot="header" class="clearfix p-0">
        <span>权限控制</span>
        <el-button v-if="!isEditingPermission" type="primary" class="r" @click="isEditingPermission=true">编 辑</el-button>
        <el-button v-if="isEditingPermission" type="primary" class="r" @click="savePermission">保 存</el-button>
        <el-button v-if="isEditingPermission" type="primary" class="blue-btn cancel r m-r-10" @click="cancelPermission">取 消</el-button>
      </div>
      <el-form :model="permissionInfo" :rules="permissionRules" label-width="100px">
        <el-form-item prop="state" label="状态">
          <el-select v-model="permissionInfo.state">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="expiryDate" label="失效日期">
          <el-date-picker
            v-model="permissionInfo.expiryDate"
            type="datetime"
            :picker-options="pickerOptions"
            placeholder="失效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="角色权限" prop="roles">
          <el-checkbox-group v-model="permissionInfo.roles">
            <el-checkbox v-for="item in roles" :key="item.prop" name="roles">
              <span>{{ item.label }}</span>
              <el-tooltip class="item" effect="light" placement="top-end">
                <div slot="content">角色说明</div>
                <i class="el-input__icon el-icon-question"></i>
              </el-tooltip>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
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
    const validateName = (rule, value, callback) => {
      const regExp = /^[\u4e00-\u9fa5]{2,8}$|^[A-Za-z\s]{1,16}$/
      if (!regExp.test(value)) {
        callback(new Error('姓名不符合要求，请重新输入'))
      }
      callback();
    }
    return {
      dialogVisible: false,
      isEditingInfo: false, // 用户信息编辑标志
      isEditingPermission: false, // 用户信息编辑标志
      basicInfo: {
        account: 'account',
        name: 'name',
        email: 'email',
        tel: 'tel',
        remark: '备注'
      },
      permissionInfo: {
        state: 0, /* 0：起用， 1： 禁用 */
        expiryDate: '',
        roles: []
      },
      infoRules: {
        account: [
          {
            required: true, trigger: 'blur'
          }
        ],
        name: [
          {
            required: true, validator: validateName, trigger: 'blur'
          }
        ],

      },
      permissionRules: {
        state: [
          {
            required: true, trigger: 'blur'
          }
        ],
        expiryDate: [
          {
            required: true, message: '请选择失效日期', trigger: 'blur'
          }
        ],
        roles: [
          {
            required: true, message: '请勾选用户权限', trigger: 'blur'
          }
        ]

      },
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
    cancelEdittingInfo() {
      console.log('取消编辑用户信息！！！！')
      this.isEditingInfo = false
    },
    /* 保存编辑的用户信息 */
    saveInfo() {
      console.log('调用接口保存信息')
      this.isEditingInfo = false
    },
    savePermission() {
      console.log('保存permission')
      this.isEditingPermission = false
    },
    cancelPermission() {
      console.log('取消修改permission')
      this.isEditingPermission = false
    }
  }
}
</script>

<style lang='scss' scoped>
.el-input__icon {
  color: #C0C4CC;
}
.el-checkbox-group{
  border: 1px solid #DCDFE6;
  padding: 6px 10px;
  border-radius: 4px;
  color: #DCDFE6;
}
.el-form{
  width: 80%;
  margin: auto;
}
</style>
