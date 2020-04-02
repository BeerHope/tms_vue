<template>
  <el-dialog
    custom-class="import-dialog"
    :title="$t('allocation.batch.title')"
    :visible.sync="dialogVisible"
    @close="closeDialog"
    width="40%"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="66px" label-position="left">
      <el-form-item :label="$t('allocation.batch.company')" prop="companyId">
        <el-select 
          class="filter-item" 
          v-model="formData.companyId" 
          :placeholder="$t('allocation.list.filter.companyName')">
          <el-option 
            v-for="item in companyData" 
            :key="item.id" :label="item.shortName" 
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="text" class="download-text" @click="downloadTemplate">{{ $t('base.upload.templateTips') }}</el-button>
    <el-upload
      class="upload-demo"
      drag
      ref="upload"
      :limit="1"
      :auto-upload="false"
      :on-exceed="handleExceed"
      :on-change="uploadChange"
      :headers="headers"
      :on-remove="removeFile"
      :action="uploadUrl">
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
import { downloadTemplate, batchImportAllocation } from '@/api/allocation'
import { getToken } from '@/utils/auth'
import { exportExcel, download } from '@/utils/global'

export default {
  name: 'ImportBatch',
  components: {},
  props: {
    companyData: {
      type: Array,
      default: () => []
    }
  },
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        companyId: null,
      },
      file: null,
      rules: {
        companyId: [
          {
            required: true,
            message: this.$t('allocation.batch.tips.company'),
            trigger: 'blur'
          }
        ]
      },
      
    }
  },
  computed: {
    uploadUrl() {
      return `${process.env.VUE_APP_BASE_URL}/machine/allocation`;
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
      downloadTemplate().then(res => {
        const blob = new Blob([res])
        download(blob, this.$t('allocation.batch.templateName'))
      }).catch(err => {
        console.log(err)
      })
    },
    uploadChange(file) {
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
      if (!isAcceptedType || !isLt5M) {
        this.$refs.upload.clearFiles()
        return
      }
      this.file = file
    },
    removeFile(file) {
      this.file = null
    },
    handleImport() {
      if (!this.file) {
        this.$message.error(this.$t('allocation.batch.tips.file'))
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { companyId } = this.formData
          const formData = new FormData()
          formData.append('file', this.file.raw)
          batchImportAllocation(companyId, formData).then(res => {
            // 此处回调展示上传的结果
            this.dialogVisible = false
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
                const jsonData = res.data.result
                const header = this.$t('allocation.batch.header')
                exportExcel(jsonData, header, this.$t('allocation.batch.fileName'))
              })
              .catch(() => {
                console.log("cancel to export ");
              });
          })
        }
      })
    },
    handleExceed() {
      this.$message.warning(this.$t('base.upload.exceedTips'))
    },
    closeDialog() {
      this.$refs.form.resetFields()
      this.$refs.upload.clearFiles()
    },
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
