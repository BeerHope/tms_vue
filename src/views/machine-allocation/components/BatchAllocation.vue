<template>
  <el-dialog
    custom-class="import-dialog"
    title="批量调拨"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form ref="form" :model="formData" label-width="66px" label-position="left">
      <el-form-item label="渠道商" required>
        <treeselect class="filter-item" v-model="formData.channel" :options="channelList" placeholder="渠道商"></treeselect>
      </el-form-item>
    </el-form>
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'ImportBatch',
  components: {
    Treeselect
  },
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        channel: null
      },
      /* 下拉可搜索渠道商 */
      channelList: [
        {
          id: '0',
          label: '全部渠道商'
        },
        {
          id: '1',
          label: '渠道商1',
          children: [
            {
              id: '1-1',
              label: '渠道商1-1',
            },
            {
              id: '1-2',
              label: '渠道商1-2',
            }
          ],
        },
        {
          id: '2',
          label: '渠道商2',
          children: [
            {
              id: '2-1',
              label: '渠道商2-1'
            }
          ]
        }
      ],
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
