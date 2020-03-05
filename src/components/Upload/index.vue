<template>
  <el-dialog
    custom-class="import-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-button type="text" class="download-text" @click="downloadTemplate">请先点击下载模板${模板名称}</el-button>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip m-t-10" slot="tip">只能选择excel文件，仅支持xlsx后缀 ，且不超过5M</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">导 入</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ImportBatch',
  components: {},
  props: {
    title: {
      type: String,
      required: true,
      default: () => '信息'
    },
  },
  directive: {},
  data() {
    return {
      dialogVisible: false,
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
    downloadTemplate() {
      console.log('下载模板')
    }
  }
}
</script>

<style lang="scss" scoped>
.download-text{
  color: #66b1ff;
  margin-bottom: 10px;
}
</style>
<style lang='scss'>
.import-dialog{
  .el-dialog__body{
    width: 380px;
  }
}
</style>
