<template>
  <div class="login-container">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="logo">
      <span class="m-l-20">{{ $t('login.systemName') }}</span>
    </div>
    <div class="login-body">
      <div class="system-title">
        <img src="@/assets/login_images/login_bg2.png" alt="">
      </div>
      <el-form
        ref="loginForm" :model="loginForm" :rules="loginRules"
        class="login-form" auto-complete="on" label-position="left">
        <h4 class="login-title">{{ $t('login.title') }}</h4>
        <el-form-item prop="username" class="m-b-34">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            :placeholder="$t('login.form.label.username')"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.form.label.password')"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <div class="lang-select">
          <LangSelect />
        </div>
        <!-- <span class="forget-pass">{{ $t('login.forgotPsd') }}</span> -->
        <el-button class="submit" :loading="loading" type="primary" @click.native.prevent="handleLogin">{{ $t('login.signIn') }}</el-button>
      </el-form>
    </div>
    <el-footer>{{ $t('login.copyright') }}</el-footer>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { JSEncrypt } from 'jsencrypt'

// import TimezonePicker from '@/components/TimezonePicker'

export default {
  name: 'Login',
  components: {
    LangSelect
  },
  data() {
    /* 密码校验后期增加 */
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      callback()
    }
    return {
      loginForm: {
        username: 'root',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5simUmTb1cbAaXLKUerWD+0BVsvLPW8FYryQnEFyqOFoA1P2SZXWkcv92eeodWvbonQGU9m3EL50o7W5s0EVvhDIo7kFKVlUmgCCL87SM67NFyy387db4EwR9TQkrBo3inxKp6TnFHlcbfeYuocfx1jqxUQsdn3lQ5C8K4qRIVQIDAQAB'
          const loginData = _.cloneDeep(this.loginForm)
          _.assign(loginData, {
            password: this.encryptedData(publicKey, loginData.password)
          })
          this.$store.dispatch('user/login', loginData).then(() => {
            this.$router.push({path: '/'})
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    /* 加密 */
    encryptedData(publicKey, data) {
      const encryptor = new JSEncrypt()
      // 设置公钥
      encryptor.setPublicKey(publicKey)
      // 加密数据
      return encryptor.encrypt(data)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  padding: 20px 10%;
  position: relative;
  .login-body{
    height: calc(100% - 160px);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
  }
  .login-form{
    .el-form-item--small.el-form-item{
      margin-bottom: 34px;
    }
  }
  .el-input {
    display: inline-block;
    height: 36px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 6px 6px 6px 16px;
      height: 36px;
      // caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__content{
    line-height: 30px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;
$login_bg: url('~@/assets/login_images/login_bg.png');

.login-container {
  min-height: 100%;
  width: 100%;
  background: $bg $login_bg 0 -124px no-repeat;
  overflow: hidden;
  background-size: 100% auto;
  .logo{
    position: relative;
    top: 30px;
    font-size: 32px;
    color: #fff;
    display: flex;
    align-items: center;
    margin-left: -10%;
  }
  .system-title{
    img{
      width: 90%;
      margin-left: 18%;
      margin-top: -10%;
    }
  }
  .login-form {
    position: relative;
    width: 510px;
    height: 562px;
    max-width: 100%;
    padding: 60px 90px 80px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.1);
    font-family: 'MicrosoftYaHei';
    .login-title{
      text-align: center;
      font-size: 24px;
      color: #333;
      margin-bottom: 60px;
      font-weight: normal;
    }
    .lang-select{
      width: auto;
      line-height: 36px;
      padding: 2px 10px 2px 14px;
      text-align: right;
      position: absolute;
      right: 20px;
      top: 20px;
      color: #333;
      .lang-desc{
        float: left;
        color: #333;
      }
    }
    .forget-pass{
      display: inline-block;
      margin-top: -14px;
      float: right;
    }
    .submit{
      width: 100%;
      margin-top: 50px;
      height: 42px;
      font-size: 18px;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  /* 页脚暂时写成fixed */
  .el-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px!important;
    line-height: 50px;
    text-align: center;
    color: #666;
    background-color: #F4F5F7;
  }
}

@media screen and (max-width: 1680px){
  .login-container{
    background-position-y: -40px;
    .login-form{
      width: 480px;
      height: 562px;
    }
    .system-title{
      img{
        width: 80%;
      }
    }
  }
}

@media screen and (max-width: 1600px){
  .login-container{
    background-position-y: -140px;
    .login-form{
      width: 460px;
      height: auto;
      padding: 40px 60px 70px;
    }
    .system-title{
      img{
        width: 80%;
      }
    }
  }
}

@media screen and (max-width: 1440px){
  .login-container{
    background-position-y: -60px;
    .login-form{
      width: 420px;
      padding: 60px 60px 80px;
    }
    .system-title{
      img{
        width: 78%;
      }
    }
  }
}

@media screen and (max-width: 1366px){
  .login-container{
    background-position-y: -150px;
    .login-body{
      height: calc(100% - 100px);
    }
    .login-form{
      width: 380px;
      padding: 30px 40px 30px;
    }
    .system-title{
      img{
        width: 66%;
      }
    }
  }
}
</style>
