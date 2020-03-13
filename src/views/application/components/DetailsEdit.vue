<template>
  <el-dialog
    custom-class="m-t-8vh"
    :visible.sync="dialogVisible"
    title="编辑" width="40%">
    <el-form class="common-form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="应用名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="适用机型" prop="suitableModel">
        <el-checkbox-group v-model="formData.suitableModel" @change="handleModelChange">
          <el-checkbox v-for="model in models" :label="model" :key="model">{{model}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="应用icon" prop="icon">
        <el-upload
          class="avatar-uploader common-avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          <img v-if="formData.icon" :src="formData.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="应用简介" prop="abstract">
        <el-input
          type="textarea" :autosize="{minRows: 4, maxRows: 8}"
          v-model="formData.abstract" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="应用截图" prop="shotScreen">
        <el-upload
          class="avatar-uploader common-avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          <img v-if="formData.shotScreen" :src="formData.shotScreen" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea" :autosize="{minRows: 4, maxRows: 8}"
          v-model="formData.remark" maxlength="200"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    const modelOptions = ['G2', 'T2', 'N2', 'KD58'];
    return {
      checkedModels: ['T2', 'KD58'],
      models: modelOptions,
      dialogVisible: false,
      formData: {
        name: '应用名称',
        suitableModel: [],
        icon: '',
        abstract: '应用简介0~500',
        shotScreen: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        suitableModel: [
          { required: true, message: '请勾选适用机型', trigger: 'blur' }
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
    handleModelChange() {
      console.log('handleModelChange!!!!!')
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
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
    handleCancel() {
      this.dialogVisible = false
    },
    handleSave() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss'>
.m-t-8vh{
  margin-top: 10vh !important;
}
</style>
