<template>
  <div class="smart-app">
    <div class="app-info">
      <div class="name m-b-18">
        <svg-icon style="font-size: 50px;" icon-class="package"></svg-icon>
        <span class="m-l-20">文件名称(含后缀)</span>
      </div>
      <el-form :model="appDetails" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用包名">
              <el-input v-model="appDetails.displayName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本">
              <el-input v-model="appDetails.version" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="大小">
              <el-input v-model="appDetails.size" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件MD5">
              <el-input v-model="appDetails.fileMD5" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-form class="editable-form" :model="formData" label-width="80px">
      <el-form-item label="应用名称" required>
        <el-input v-model="formData.appname"></el-input>
      </el-form-item>
      <el-form-item label="适用机型" required>
        <el-checkbox-group v-model="formData.model">
          <el-checkbox
            v-for="item in modelList" :key="item+$index"
            :label="item" name="model">
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="应用icon">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="应用简介">
        <el-input type="textarea" v-model="formData.abstract"></el-input>
      </el-form-item>
      <el-form-item label="应用截图">
        <!-- 
          :on-preview="handlePictureCardPreview"
        -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 
        备注支持：
          1、支持输入中文、英文、数字、标点符号、空格、换行，不支持表情符号；
          2、支持0~200个中文或0-400个英文；
       -->
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formData.remark" maxlength="400"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TPOS from "@/assets/images/tpos.png"
import SPOS from "@/assets/images/spos.png"
import MPOS from "@/assets/images/mpos.png"

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      imageUrl: '',
      appDetails: {
        displayName: '应用名称',
        appname: '应用包名',
        version: 'V2.0.0',
        size: '500MB',
        fileMD5: 'MD54324324343',
        model: '机型111',
      },
      modelList: [ 'N2', 'G2', 'T2' ],
      formData: {
        appname: '',
        model: [], // 适用机型
        icon: '',
        abstract: '',
        screenshot: '',
        remark: ''
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt200K = file.size / 1024 <= 200
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt200K) {
        this.$message.error('上传头像图片大小不能超过 200KB!')
      }
      // return isJPG && isLt200K;
      return isLt200K;
    },
  }
}
</script>

<style lang="scss">
.smart-app{
  .editable-form{
    .avatar-uploader .el-upload{
      border: 1px dashed #d9d9d9 !important;
    }
    
    .el-upload-list--picture-card,
    .el-upload--picture-card{
      width: 128px;
      height: 128px;
      line-height: 126px;
    }
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

  .avatar-uploader.el-upload--text {
    height: 70px;
    .el-upload {
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 68px;
    line-height: 68px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 68px;
    display: block;
  }
}
</style>
