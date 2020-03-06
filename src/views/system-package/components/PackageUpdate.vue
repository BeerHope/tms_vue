<template>
  <el-dialog
    v-loading="isLoading"
    title="新增系统包"
    width="40%"
    @close="handleClose"
    :visible.sync="dialogVisible">
    <div class="package-name">
      <p :class="currentStep === 'firstStep' ? ' m-a' : 'm-l-a'">
        <span>名称：</span>
        <el-input v-model="packageDetails.name" disabled></el-input>
      </p>
    </div>
    <div class="first-step t-c" v-if="currentStep === 'firstStep'">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="handleBeforeUpload"
        :on-success="handleUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip m-t-10" slot="tip">只支持zip文件格式，且不超过1G</div>
      </el-upload>
    </div>
    <div class="second-step" v-if="currentStep === 'secondStep'">
      <div class="package-info">
        <div class="name m-b-18">
          <svg-icon style="font-size: 50px;" icon-class="package"></svg-icon>
          <span class="m-l-20">文件名称</span>
          <el-button type="primary" style="margin-left: auto;" @click="handleReUpload">重 传</el-button>
        </div>
        <el-form :model="packageDetails" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="版本">
                <el-input v-model="packageDetails.version" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支持版本">
                <el-input v-model="packageDetails.supportVersion" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="大小">
                <el-input v-model="packageDetails.size" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件MD5">
                <el-input v-model="packageDetails.fileMD5" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="解压下发">
            <el-input v-model="packageDetails.unzipDispatch" disabled></el-input>
          </el-form-item>
          <el-form-item label="更新内容">
            <el-input type="textarea" v-model="packageDetails.updateContent" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer" v-if="currentStep==='secondStep'">
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
      this.$message.success('新增成功！')
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
.package-dialog{
  &.m-b-3vh{
    margin-top: 3vh !important;
  }
  .el-dialog__body{
    padding: 20px;
  }
  
  .el-form-item--small.el-form-item{
    margin-bottom: 14px;
  }
  .editable-form{
    .el-form-item--small.el-form-item{
      margin-bottom: 18px;
    }
  }
}
.model{
  .el-form-item__content{
    border: 1px solid #DCDFE6;
    border-radius: 6px;
    padding: 10px;
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
  @include common-box(14px);
  .name{
    @include common-box(10px);
    display: flex;
    align-items: center;
  }
  margin-bottom: 30px;
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
