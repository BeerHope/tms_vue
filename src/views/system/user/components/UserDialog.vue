<template>
  <el-dialog
    class="user-dialog"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <!-- <span>表单内容！！！！！！！</span> -->
    <el-form ref="userForm" :model="formData" :rules="userRules" label-width="100px">
      <el-form-item label="账号归属">
        <el-input v-model="formData.channel" prop='channel'></el-input>
      </el-form-item>
      <el-form-item label="登录账号">
        <el-input v-model="formData.account" prop="account"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="formData.password" prop="password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserDialog',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogTitle: '新增用户',
      dialogVisible: false,
      flag: 0,
      userId: false,
      formData: {
        channel: 'test111',
        account: 'account',
        password: '123456',
        name: 'username',
        tel: '1678234511',
        mail: '123456@qq.com',
        state: 0,
        role: 'zhubxia!!!!!',
        validTime: '2020-02-02',
        remark: '评论！！！'
      },
      userRules: {}
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
    handleClose() {

    }
  }
}
</script>

<style lang='scss' scoped>

</style>
