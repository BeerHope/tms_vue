<template>
  <el-dialog
    custom-class="app-update"
    v-loading="isLoading"
    title="更新"
    width="40%"
    @close="handleClose"
    :visible.sync="dialogVisible">
    <div class="app-name">
      <p class="m-l-a">
        <!-- zip传统 -->
        <img v-if="appType === 1" class="m-r-20" src="@/assets/images/zip.png" alt="zip">
        <!-- 智能apk -->
        <img v-else class="m-r-20" src="@/assets/images/apk.png" alt="apk">
        <span>{{ appDetails.name }}</span>
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
    <div class="app-info traditional" v-if="appType === 1">
      <el-row>
        <el-col :span="12">
          <span>版本：</span>
          <span>{{ appDetails.version }}</span>
        </el-col>
        <el-col :span="12">
          <span>支持版本：</span>
          <span>{{ appDetails.supportVersion }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span>机型：</span>
          <span>{{ appDetails.model }}</span>
        </el-col>
        <el-col :span="12">
          <span>大小：</span>
          <span>{{ appDetails.size }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>文件MD5：</span>
          <span>{{ appDetails.fileMD5 }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="app-info smart" v-if="appType === 2">
      <el-row>
        <el-col :span="12">
          <span>版本：</span>
          <span>{{ appDetails.version }}</span>
        </el-col>
        <el-col :span="12">
          <span>大小：</span>
          <span>{{ appDetails.size }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>文件MD5：</span>
          <span>{{ appDetails.fileMD5 }}</span>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="24" class="df">
          <span class="dib" style="width: 100px">更新内容：</span>
          <el-input type="textarea">{{ appDetails.updateContent }}</el-input>
        </el-col>
      </el-row> -->
    </div>
    <el-form label-width="80px" label-position="left">
      <el-form-item label="更新内容">
        <el-input type="textarea" v-model="appDetails.updateContent"></el-input>
      </el-form-item>
    </el-form>
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
      appType: 1, // 1传统， 2智能
      packageName: '系统包名称',
      dialogVisible: false,
      currentStep: 'firstStep',
      appDetails: {
        name: '系统包名称',
        version: 'V2.0.0',
        supportVersion: 'V2.0.0及以上',
        size: '500MB',
        fileMD5: 'MD54324324343',
        model: 'G2,T2, N3……',
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
.app-update{
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
.app-info{
  .el-row {
    height: 46px;
    line-height: 46px;
  }
}
.app-name{
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
}
</style>
