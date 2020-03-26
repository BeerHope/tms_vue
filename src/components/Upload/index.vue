<template>
  <el-dialog
    custom-class="import-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    @close="closeDialog"
    width="40%"
  >
    <el-button type="text" class="download-text" @click="downloadTemplate">{{ $t('base.upload.templateTips') }}</el-button>
    <el-upload
      drag
      ref="upload"
      class="upload-demo"
      :action="uploadUrl"
      :headers="headers"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">{{ $t('base.upload.uploadTips') }}</div>
      <div class="el-upload__tip m-t-10" slot="tip">{{ $t('base.upload.fileCheckTips') }}</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">{{ $t('base.upload.cancel') }}</el-button>
      <el-button type="primary" @click="handleImport">{{ $t('base.upload.import') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'BatchImport',
  components: {},
  props: {
    title: {
      type: String,
      default: () => this.$t('base.upload.title'),
      required: true
    },
    uploadUrl: {
      type: String,
      default: () => '/',
    },
    templateName: {
      type: String,
      default: () => 'template'
    },
    download: {
      type: Function,
      default: () => {
        return new Promise((resolve) => {
          resolve()
        })
      }
    }
  },
  directive: {},
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    headers() {
      return {
        token: getToken()
      };
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    downloadTemplate() {
      this.download().then(res => {
        const blob = new Blob([res])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${this.templateName}.xlsx`
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
    },
    handleImport() {
      this.$refs.upload.submit()
    },
    closeDialog() {
      this.$refs.upload.clearFiles()
    },
    uploadSuccess(res, file) {
      if (res.code !== 200) {
        this.$message.error("上传失败");
        this.$refs.upload.clearFiles()
        return
      }
      const { successAmount, total } = res.data;
      const confirmText = [
        `${this.$t('base.upload.uploadRes.totalMerchant')}${total};`,
        `${this.$t('base.upload.uploadRes.successAmount')}${successAmount}；`,
        `${this.$t('base.upload.uploadRes.failureText')}`
      ];
      /* 下面处理confirm内容换行操作 */
      const newDatas = [];
      const h = this.$createElement
      for (const i in confirmText) {
        newDatas.push(h('p', null, confirmText[i]))
      }
      this.$confirm(this.$t('base.upload.uploadRes.title'), {
        message: h('div', null, newDatas),
        confirmButtonText: this.$t('base.buttons.yes'),
        cancelButtonText: this.$t('base.buttons.no'),
        customClass: "delete-confirm"
      })
        .then(() => {
          // 进行导出失败清单(todo)
          this.$message.success("失败清单导出成功");
        })
        .catch(() => {
          console.log("取消导出失败清单");
        });
    },
    beforeUpload(file) {
      const acceptTypes = ['xlsx']
      const type = file.name.slice(file.name.lastIndexOf('.') + 1)
      const isAcceptedType = _.includes(acceptTypes, type)
      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isAcceptedType) {
        this.$message.error(this.$t('base.upload.fileCheckType'))
      }
      if (!isLt5M) {
        this.$message.error(this.$t('base.upload.fileCheckSize'))
      }
      return isAcceptedType && isLt5M;
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
