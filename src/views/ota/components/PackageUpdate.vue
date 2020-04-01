<template>
  <el-dialog
    custom-class="package-update"
    v-loading="isLoading"
    title="更新"
    width="40%"
    @close="handleClose"
    :visible.sync="dialogVisible">
    <div class="package-name">
      <p class="m-l-a">
        <span>名称：</span>
        <span>{{ packageDetails.name }}</span>
        <!-- <el-input v-model="packageDetails.name" disabled></el-input> -->
      </p>
    </div>
    <div class="first-step">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="handleBeforeUpload"
        :on-success="handleUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip m-t-18 m-b-18" slot="tip">只支持zip文件格式，且不超过1G</div>
      </el-upload>
    </div>
    <div class="package-info">
      <el-row>
        <el-col :span="12">
          <span>版本：</span>
          <span>{{ packageDetails.version }}</span>
        </el-col>
        <el-col :span="12">
          <span>支持版本：</span>
          <span>{{ packageDetails.supportVersion }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span>大小：</span>
          <span>{{ packageDetails.size }}</span>
        </el-col>
        <el-col :span="12">
          <span>文件MD5：</span>
          <span>{{ packageDetails.fileMD5 }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>解压下发：</span>
          <span>{{ packageDetails.unzipDispatch }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>更新内容：</span>
          <span>{{ packageDetails.updateContent }}</span>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">更 新</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'PackageDialog',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      isLoading: false,
      packageName: '系统包名称',
      dialogVisible: false,
      currentStep: 'firstStep',
      packageDetails: {
        name: '系统包名称',
        version: 'V2.0.0',
        supportVersion: 'V2.0.0及以上',
        size: '500MB',
        fileMD5: 'MD54324324343',
        unzipDispatch: '解压下发了',
        updateContent: '这里是更新内容'
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
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
    handleBeforeUpload(file) {
      this.isLoading = true
      // return true
    },
    handleUploadSuccess(response, file, fileList) {
      // 上传成功后跳转下一步页面
      this.currentStep = 'secondStep'
      this.isLoading = false
    },
    // 处理新增
    handleClose() {
      // 重置表单
      // this.$refs.form.resetFields();
      this.currentStep = 'firstStep'
    },
    handleAdd() {
      this.dialogVisible = false
      console.log('此处为新增系统包处理')
    },
    // 重传
    handleReUpload() {
      this.currentStep = 'firstStep'
      console.log('处理重传！！！')
    }
  }
}
</script>

<style lang="scss">
.package-update{
  &.m-b-3vh{
    margin-top: 3vh !important;
  }
  .el-upload-dragger,
  .upload-demo,
  .el-upload {
    width: 100%;
  }
}
</style>

<style lang='scss' scoped>
@mixin common-box ($pad){
  border: 1px solid #DCDFE6;
  padding: $pad;
  border-radius: 6px;
}
.package-info{
  .name{
    @include common-box(10px);
    display: flex;
    align-items: center;
  }
  .el-row {
    height: 46px;
    line-height: 46px;
  }
}
.editable-form{
  @include common-box(14px);
}
.package-name{
  margin-bottom: 14px;
  p{
    display: flex;
    align-items: center;
    width: 360px;
    text-align: left;
    &.m-a{
      margin: auto;
    }
    &.m-a{
      margin-right: auto;
    }
  }
  .el-input{
    width: 200px;
    flex: auto;
  }
}
.model-row{
  padding: 0;
  display: flex;
  margin: 0 0 10px;
  li{
    list-style-type: none;
    @include common-box(10px);
    margin: 0 8px;
    flex: 1;
    text-align: center;
    p,img{
      pointer-events: none;
    }
    p {
      height: 20px;
      line-height: 20px;
      margin: 0;
    }
    &:hover, &.active{
      border-color: #538AE6;
      cursor: pointer;
    }
  }
}
.line{
  width: 100%;
  height: 1px;
  background-color: #DCDFE6;
}
.el-checkbox-group{
  padding: 10px 10px 0;
}
</style>
