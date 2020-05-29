<template>
  <div class="smart-app">
    <el-form class="app-info"
             :model="appDetails"
             label-width="80px">
      <el-row>
        <el-col :span="12">
          <span>应用名称：</span>
          <span>{{ appDetails.displayName }}</span>
        </el-col>
        <el-col :span="12">
          <span>版本：</span>
          <span>{{ appDetails.version }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span>大小：</span>
          <span>{{ appDetails.size }}</span>
        </el-col>
        <el-col :span="12">
          <span>文件MD5：</span>
          <span>{{ appDetails.fileMD5 }}</span>
        </el-col>
      </el-row>
    </el-form>
    <el-form class="editable-form"
             :model="formData"
             label-width="80px"
             label-position="left">
      <el-form-item label="应用名称"
                    required>
        <el-input v-model="formData.appname"></el-input>
      </el-form-item>
      <el-form-item label="适用机型"
                    required>
        <el-checkbox-group v-model="formData.model">
          <el-checkbox v-for="(item, index) in modelList"
                       :key="item+index"
                       :label="item"
                       name="model">
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="应用icon">
        <el-upload class="avatar-uploader common-avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl"
               :src="imageUrl"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="应用简介">
        <el-input type="textarea"
                  v-model="formData.abstract"></el-input>
      </el-form-item>
      <el-form-item label="应用截图">
        <el-upload class="common-avatar-uploader"
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
        <el-input type="textarea"
                  v-model="formData.remark"
                  maxlength="400"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import TPOS from "@/assets/images/tpos.png"
// import SPOS from "@/assets/images/spos.png"
// import MPOS from "@/assets/images/mpos.png"

export default {
  name: 'SmartApp',
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
        model: '机型111'
      },
      modelList: ['N2', 'G2', 'T2'],
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
  created() { },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt200K = file.size / 1024 <= 200
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt200K && isJPG) {
        this.$message.error('上传头像图片大小不能超过 200KB!')
      }
      // return isJPG && isLt200K;
      return isLt200K
    }
  }
}
</script>

<style lang='scss' scoped>
@mixin common-box($pad) {
  border: 1px solid #dcdfe6;
  padding: $pad;
  border-radius: 6px;
}
.app-info {
  .name {
    display: flex;
    align-items: center;
  }
}
</style>
