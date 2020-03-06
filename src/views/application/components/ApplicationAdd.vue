<template>
  <el-dialog
    title="添加应用"
    width="40%"
    @close="handleClose"
    :custom-class="currentStep === 'secondStep' ? 'package-dialog m-b-3vh' : 'package-dialog'"
    :visible.sync="dialogVisible">
    <div class="first-step t-c" v-if="currentStep === 'firstStep'">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip m-t-10" slot="tip">只支持zip文件格式，且不超过1G</div>
      </el-upload>
    </div>
    <div class="second-step" v-if="currentStep === 'secondStep'">
      <smart-app></smart-app>
    </div>
    <span slot="footer" class="dialog-footer" v-if="currentStep==='secondStep'">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SmartApp from './SmartApp'
// import TraditionalApp from './TraditionalApp'

export default {
  name: 'PackageDialog',
  components: {
    SmartApp,
    // TraditionalApp
  },
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      currentStep: 'secondStep',
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
    handleUploadSuccess(response, file, fileList) {
      // 上传成功后跳转下一步页面
      this.currentStep = 'secondStep'
    },
    // 处理新增
    handleClose() {
      // 重置表单
      const myForm = this.$refs.form
      myForm && myForm.resetFields()
      // this.currentStep = 'firstStep'
    },
    handleAdd() {
      this.dialogVisible = false
      this.$message.success('新增成功！')
      console.log('此处为新增系统包处理')
    }
  }
}
</script>

<style lang="scss">
.package-dialog{
  &.m-b-3vh{
    margin-top: 3vh !important;
  }
  .el-dialog__body{
    padding: 20px;
  }
}
</style>

<style lang='scss' scoped>
.line{
  width: 100%;
  height: 1px;
  background-color: #DCDFE6;
}
.el-checkbox-group{
  padding: 10px 10px 0;
}
</style>
