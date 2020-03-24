<template>
  <el-dialog
    custom-class="import-dialog"
    :title="$t('merchant.batch.title')"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-button
      type="text"
      class="download-text"
      @click="downloadTemplate"
    >{{ $t('merchant.batch.templateTips') }}</el-button>
    <el-upload
      ref="upload"
      class="upload-demo"
      drag
      :action="uploadUrl"
      :headers="headers"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">{{ $t('merchant.batch.uploadTips') }}</div>
      <div class="el-upload__tip m-t-10" slot="tip">{{ $t('merchant.batch.fileCheckTips') }}</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        class="cancel"
        @click="dialogVisible = false"
      >{{ $t('merchant.batch.cancel') }}</el-button>
      <el-button type="primary" @click="dialogVisible = false">{{ $t('merchant.batch.import') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from "@/utils/auth";
import axios from 'axios';
import { downloadTemplate } from "@/api/merchant";

export default {
  name: "ImportBatch",
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    uploadUrl() {
      return `${process.env.VUE_APP_BASE_URL}/merchant/batch`;
    },
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
      axios.get('merchant/template').then(res => {
        console.log(res, 'res')
        console.log('!!!!!!!!!!!!!!!')
      })
      // downloadTemplate().then(res => {
      //   console.log(res, 'res!!!!!!!')
      //   const blob = new Blob([res.json()]); //创建一个blob对象
      //   const a = document.createElement('a'); //创建一个<a></a>标签
      //   a.href = URL.createObjectURL(blob, {
      //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      //   }); // response is a blob
      //   a.download = "模板.xlsx";  //文件名称
      //   a.style.display = 'none';
      //   document.body.appendChild(a);
      //   a.click();
      //   a.remove();
      // })
    },
    uploadSuccess(res, file) {
      if (res.code !== 200) {
        this.$message.error("上传失败");
        this.$refs.upload.clearFiles()
        return;
      }
      const { successAmount, total, result } = res.data;
      const confirmText = [
        `${this.$t('merchant.batch.uploadRes.totalMerchant')}${total};`,
        `${this.$t('merchant.batch.uploadRes.successAmount')}${successAmount}；`,
        `${this.$t('merchant.batch.uploadRes.failureText')}`
      ];
      const newDatas = [];
      const h = this.$createElement
      for (const i in confirmText) {
        newDatas.push(h('p', null, confirmText[i]))
      }
      this.$confirm(this.$t('merchant.batch.uploadRes.title'), {
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
        this.$message.error(this.$t('merchant.batch.fileCheckType'))
      }
      if (!isLt5M) {
        this.$message.error(this.$t('merchant.batch.fileCheckSize'))
      }
      return isAcceptedType && isLt5M;
    }
  }
};
</script>

<style lang="scss" scoped>
.download-text {
  color: #66b1ff;
  margin-bottom: 10px;
}
</style>
<style lang='scss'>
.import-dialog {
  .el-dialog__body {
    width: 380px;
  }
}
</style>
