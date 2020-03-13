<template>
  <el-dialog
    title="更新"
    :visible.sync="dialogVisible"
    width="40%">
    <el-form label-width="80px" :rules="rules" label-position="right">
      <el-form-item>
        <img slot="label" src="@/assets/images/apk.png" alt="apk.png">
        <span>应用名称</span>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应用名称">
            <span>XXXXXXXXXXX</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="版本">
            <span>V1.0.10</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="机型">
            <span>XXXXXXXXXXX</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="大小">
            <span>500MB</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="文件MD5">
            <span>XXXXXXXXXXX</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="更新内容" prop="content">
        <el-input type="textarea" v-model="formData.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handelSave">更 新</el-button>
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
    return {
      dialogVisible: false,
      formData: {
        packageUrl: '',
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请填写更新内容', trigger: 'blur' }
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
    handleCancel() {
      this.dialogVisible = false
    },
    handleSave() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
