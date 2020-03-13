<template>
  <el-dialog
    title="添加应用"
    width="40%"
    @close="handleClose"
    custom-class="package-dialog m-b-3vh"
    :visible.sync="dialogVisible">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-success="handleUploadSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip m-t-10" slot="tip">只支持zip文件格式，且不超过1G</div>
    </el-upload>
    <component :is="posType"></component>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SmartApp from './SmartApp'
import TraditionalApp from './TraditionalApp'

export default {
  name: 'PackageDialog',
  components: {
    SmartApp,
    TraditionalApp
  },
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      posType: 'smartApp'
      // posType: 'traditionalApp'
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
    padding:16px 40px;
  }
  .upload-demo{
    margin-bottom: 20px;
    .el-upload,.el-upload-dragger{
      width: 100%;
    }
  }
  .el-row{
    height: 34px;
  }
  .el-upload__tip{
    color: #b8b8b8;
  }
}
</style>
