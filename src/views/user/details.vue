<template>
  <div class="user-details">
    <section :class="['user-info', {'isEditing': isEditingInfo}]">
      <h4>
        <span class="common-title f-z-16">用户信息</span>
        <span class="edit-btn" @click="toEditUserInfo" v-if="!isEditingInfo">
          <i class="el-icon-edit-outline m-r-6"></i>
          编辑
        </span>
      </h4>
      <div class="content">
        <el-form class="common-form" :model="userInfo" :rules="userInfoRules" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="account">
                <span v-if="!isEditingInfo">{{ userInfo.account }}</span>
                <el-input v-else v-model="userInfo.account" maxlength="50">
                  <el-tooltip slot="suffix" class="item" effect="light" placement="top-end">
                    <div slot="content">支持输入大小写英文字母、@、. 、数字；<br />长度1~50个字符</div>
                    <i class="el-input__icon el-icon-info"></i>
                  </el-tooltip>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <span v-if="!isEditingInfo">{{ userInfo.name }}</span>
                <el-input v-else v-model="userInfo.name" maxlength="16"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系邮箱" prop="model">
                <span v-if="!isEditingInfo">{{ userInfo.email }}</span>
                <el-input v-else v-model="userInfo.email" maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="model">
                <span v-if="!isEditingInfo">{{ userInfo.tel }}</span>
                <el-input v-else v-model="userInfo.tel" maxlength="25"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" prop="remark">
            <span v-if="!isEditingInfo">{{ userInfo.remark }}</span>
            <el-input v-else v-model="userInfo.remark" type="textarea"></el-input>
          </el-form-item>
          <div v-if="isEditingInfo" class="t-c m-t-30">
            <el-button class="cancel" type="primary" @click="cancelUserInfo">取消</el-button>
            <el-button type="primary" @click="saveUserInfo">保存</el-button>
          </div>
        </el-form>
      </div>
    </section>
    <section :class="['permision', {'isEditing': isEditingPermision}]">
      <h4>
        <span class="common-title f-z-16">权限控制</span>
        <span class="edit-btn" @click="toEditPermision()" v-if="!isEditingPermision">
          <i class="el-icon-edit-outline m-r-6"></i>
          编辑
        </span>
      </h4>
      <div class="content">
        <el-form class="common-form" :model="permissionInfo" :rules="permissionRules" label-width="100px">
          <el-form-item label="状态" prop="state">
            <span v-if="!isEditingPermision">{{ permissionInfo.state ? '禁用' : '启用' }}</span>
            <el-select v-else v-model="permissionInfo.state">
              <el-option label="启用" :value="0"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="失效日期" prop="expiryDate">
            <span v-if="!isEditingPermision">{{ permissionInfo.expiryDate }}</span>
            <el-date-picker
              v-else
              v-model="permissionInfo.expiryDate"
              type="datetime"
              :picker-options="pickerOptions"
              placeholder="失效日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="角色权限" prop="roles">
            <span v-if="!isEditingPermision">{{ permissionInfo.roles.join(', ') }}</span>
            <el-checkbox-group v-else v-model="permissionInfo.roles">
              <el-checkbox v-for="item in roles" :key="item.prop" name="roles">
                <span>{{ item.label }}</span>
                <el-tooltip class="item" effect="light" placement="top-end">
                  <div slot="content">角色说明</div>
                  <i class="el-input__icon el-icon-question"></i>
                </el-tooltip>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div v-if="isEditingPermision" class="t-c m-t-30">
            <el-button class="cancel" type="primary" @click="cancelPermission">取消</el-button>
            <el-button type="primary" @click="savePermission">保存</el-button>
          </div>
        </el-form>
      </div>
    </section>
  </div>
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
      isEditingInfo: false,
      isEditingPermision: false,
      userInfo: {
        account: 'account',
        name: 'name',
        email: '1234567@qq.com',
        tel: '13677826272',
        remark: '备注内容xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      },
      permissionInfo: {
        state: 0, /* 0：起用， 1： 禁用 */
        expiryDate: '2020-10-10 12:20:20',
        roles: ['role1', 'role3']
      },
      userInfoRules: {
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
    savePermission() {
      console.log('保存permission')
      this.isEditingPermision = false
    },
    cancelPermission() {
      console.log('取消修改permission')
      this.isEditingPermision = false
    },
    toEditUserInfo() {
      console.log(this.isEditingInfo, 'this.isEdit!!!!!!!!!!!')
      this.isEditingInfo = true
    },
    toEditPermision() {
      this.isEditingPermision = true
    },
    saveUserInfo() {
      console.log('保存用户信息')
      this.isEditingInfo = false
    },
    cancelUserInfo() {
      this.isEditingInfo = false
      console.log('取消保存用户信息！')
    }
  }
}
</script>

<style lang='scss' scoped>
section{
  padding: 30px;
  &.isEditing{
    background-color: #f4f5f7;
  }
  .content{
    .el-form{
      width: 580px;
    }
  }
}
.user-details{
  width: 90%;
  max-width: 1200px;
  min-width: 1000px;
  margin: 10px auto auto;
}
.user-info{
  margin: 20px auto 40px;
  clear: both;
}
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

<style lang="scss">
.user-details{
  .el-form-item__label{
    padding-right: 20px;
  }
  .edit-btn{
    font-size: 14px;
    color: #3B78FC !important;
    cursor: pointer;
    float: right;
  }
}
</style>
