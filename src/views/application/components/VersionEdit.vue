<template>
 <el-dialog
  title="编辑应用版本"
  :visible.sync="dialogVisible"
  width="40%">
  <el-form :model="formData" :rules="rules" label-width="100px">
    <el-form-item prop="name">
      <img slot="label" src="@/assets/images/apk.png" alt="">
      <span>{{ formData.name }}</span>
    </el-form-item>
    <el-form-item label="更新内容" prop="content">
      <el-input type="textarea" :autosize="{minRows: 6, maxRow: 8}" v-model="formData.content" maxlength="500"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button class="cancel" type="primary" @click="handleCancel">取消</el-button>
    <el-button type="primary" @click="handleSave">保存</el-button>
  </span>
 </el-dialog>
</template>

<script>
import apkImg from '@/assets/images/apk.png'
import zipImg from '@/assets/images/zip.png'

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        name: '应用名称',
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
