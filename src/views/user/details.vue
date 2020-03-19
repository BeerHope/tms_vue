<template>
  <div class="user-details">
    <section :class="['user-info', {'isEditing': isEditingInfo}]">
      <h4>
        <span class="common-title f-z-16">{{ $t('user.details.userInfo') }}</span>
        <span class="edit-btn" @click="isEditingInfo = true" v-if="!isEditingInfo">
          <i class="el-icon-edit-outline m-r-6"></i>
          {{ $t('user.details.edit') }}
        </span>
      </h4>
      <div class="content">
        <el-form class="common-form" :model="userInfo" :rules="userInfoRules" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('user.details.form.label.account')" prop="account">
                <span v-if="!isEditingInfo">{{ userInfo.account }}</span>
                <span v-else class="p-l-16">{{ userInfo.account }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('user.details.form.label.name')" prop="name">
                <span v-if="!isEditingInfo">{{ userInfo.name }}</span>
                <el-input v-else v-model="userInfo.name" maxlength="16"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('user.details.form.label.email')" prop="email">
                <span v-if="!isEditingInfo">{{ userInfo.email }}</span>
                <el-input v-else v-model="userInfo.email" maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('user.details.form.label.cellphone')" prop="cellphone">
                <span v-if="!isEditingInfo">{{ userInfo.cellphone }}</span>
                <el-input v-else v-model="userInfo.cellphone" maxlength="25"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="$t('user.details.form.label.remark')" prop="remark">
            <span v-if="!isEditingInfo">{{ userInfo.remark }}</span>
            <el-input v-else v-model="userInfo.remark" type="textarea"></el-input>
          </el-form-item>
          <div v-if="isEditingInfo" class="t-c m-t-30">
            <el-button class="cancel" type="primary" @click="cancelUserInfo">{{ $t('base.buttons.cancel') }}</el-button>
            <el-button type="primary" @click="saveUserInfo">{{ $t('base.buttons.save') }}</el-button>
          </div>
        </el-form>
      </div>
    </section>
    <section :class="['permision', {'isEditing': isEditingAuth}]">
      <h4>
        <span class="common-title f-z-16">{{ $t('user.details.authControl') }}</span>
        <span class="edit-btn" @click="isEditingAuth = true" v-if="!isEditingAuth">
          <i class="el-icon-edit-outline m-r-6"></i>
          {{ $t('user.details.edit') }}
        </span>
      </h4>
      <div class="content">
        <el-form class="common-form" :model="authInfo" :rules="authRules" label-width="100px">
          <el-form-item :label="$t('user.details.form.label.state')" prop="state">
            <span v-if="!isEditingAuth">{{ itemState('base.states', authInfo) }}</span>
            <el-select v-else v-model="authInfo.state">
              <el-option 
                v-for="item in states" :key="item.value"
                :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('user.details.form.label.expireTime')" prop="expireTime">
            <span v-if="!isEditingAuth">{{ expireTime }}</span>
            <el-date-picker
              v-else
              v-model="authInfo.expireTime"
              type="datetime"
              :picker-options="pickerOptions"
              :placeholder="$t('user.details.form.placeholder.expireTime')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('user.details.form.label.roles')" prop="roles">
            <span v-if="!isEditingAuth">{{ roles }}</span>
            <el-checkbox-group v-else v-model="authInfo.roles">
              <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
                <span>{{ item.name }}</span>
                <el-tooltip class="item" effect="light" placement="top-end" v-if="item.remark">
                  <div slot="content">{{ item.remark }}</div>
                  <i class="el-input__icon el-icon-question"></i>
                </el-tooltip>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div v-if="isEditingAuth" class="t-c m-t-30">
            <el-button class="cancel" type="primary" @click="cancelAuth">{{ $t('base.buttons.cancel') }}</el-button>
            <el-button type="primary" @click="saveAuth">{{ $t('base.buttons.save') }}</el-button>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { getUserDetails, editUser, updateAuth } from '@/api/user'
import { getUserRole } from '@/api/user'
import { Loading } from 'element-ui'
import mixin from '@/utils/mixin'
import moment from 'moment'

export default {
  name: '',
  components: {},
  mixins: [mixin],
  props: {},
  directive: {},
  data() {
    const validateName = (rule, value, callback) => {
      const regExp = /^[\u4e00-\u9fa5]{2,8}|^[A-Za-z\s]{1,16}$/
      if (!regExp.test(value)) {
        callback(new Error('姓名不符合要求，请重新输入'))
      }
      callback();
    }
    return {
      isEditingInfo: false,
      isEditingAuth: false,
      userInfo: {},
      authInfo: {},
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
      authRules: {
        state: [
          {
            required: true, trigger: 'blur'
          }
        ],
        expireTime: [
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
      expireTime: '',
      roles: '',
      // 角色授权列表
      roleList: [],
      userInfoBak: {},
      authInfoBak: {}
    }
  },
  computed: {
    userId() {
      return this.$route.params.userId
    },
    states() {
      return _.filter(this.$t('base.states'), 'value')
    },
    role() {
      const { roles } = this.authInfo
      return roles.length ? _.join(roles, ',') : ''
    }
  },
  watch: {},
  created() {
    this.getUserDetails()
    this.getRoleList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getRoleList() {
      getUserRole().then(res => {
        this.roleList = res.data
      }) 
    },  
    getUserDetails() {
      const { userId } = this
      const loading = Loading.service({ fullscreen: true })
      getUserDetails(userId).then(res => {
        const resData = res.data
        /* 用户信息 */
        this.userInfo = _.pick(resData, [
          'account',
          'name',
          'cellphone',
          'email',
          'remark'
        ])
        /* 权限控制信息 */
        this.authInfo = _.pick(resData, [
          'state',
          'expireTime',
          'roles'
        ])
        /* 备份数据 */
        this.userInfoBak = _.clone(this.userInfo)
        this.authInfoBak = _.clone(this.authInfo)
        const { expireTime, roles } = this.authInfo
        this.expireTime = moment(expireTime).format('YYYY-MM-DD HH:mm:ss')
        this.roles = _.join(roles, ',')
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    saveAuth(){
      const { userId, authInfo } = this
      authInfo.expireTime = moment(authInfo.expireTime).format('YYYY-MM-DD HH:mm:ss')
      updateAuth(userId, authInfo).then(res => {
        this.getUserDetails()
        this.$message.success(this.$t('base.tips.saveSuccess'))
      })
      this.isEditingAuth = false
    },
    cancelAuth() {
      this.authInfo = _.cloneDeep(this.authInfoBak)
      this.isEditingAuth = false
    },
    saveUserInfo() {
      const { userId } = this
      const reqData = _.omit(this.userInfo, 'account')
      editUser(userId, reqData).then(res => {
        this.$message.success(this.$t('base.tips.saveSuccess'))
        this.isEditingInfo = false
      })
    },
    cancelUserInfo() {
      this.userInfo = _.cloneDeep(this.userInfoBak)
      this.isEditingInfo = false
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
