<template>
  <el-dialog
    width="40%"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @open="openDialog"
    @closed="closedDialog"
  >
    <el-form
      v-loading="loading"
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="80px"
      class="common-form model-form">
      <el-form-item prop="type" :label="$t('model.form.label.type')">
        <el-select v-model="formData.type">
          <el-option
            v-for="item in posType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name" :label="$t('model.form.label.name')">
        <el-input v-model="formData.name" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item prop="vendorId" :label="$t('model.form.label.vendorId')">
        <el-select v-model="formData.vendorId">
          <el-option
            v-for="item in vendorList"
            :key="item.code"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('model.form.label.resolution')" required>
        <el-col :span="11" style="height: 36px">
          <el-form-item prop="resolutionX">
            <el-input-number 
              class="t-c w-100" :min="1" :max="9999"
              v-model="formData.resolutionX"
              :label="$t('model.form.label.resolutionX')">
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col class="t-c b f-z-16" :span="2">*</el-col>
        <el-col :span="11" style="height: 36px">
          <el-form-item prop="resolutionY">
            <el-input-number 
              class="t-c w-100" :min="1" :max="9999"
              v-model="formData.resolutionY"
              :label="$t('model.form.label.resolutionY')">
            </el-input-number>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="picUrl" :label="$t('model.form.label.picUrl')" required>
        <el-upload
          name="pic"
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="headers"
          accept="image/png,image/jpeg,image/jpg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="flag === 0 && imageUrl" :src="formData.picUrl" class="avatar" />
          <img v-if="flag === 1 && formData.picUrl" :src="formData.picUrl" class="avatar" />
          <i v-if="flag === 0 && !imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="remark" :label="$t('model.form.label.remark')">
        <el-input type="textarea" v-model="formData.remark" max-length="256"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        class="cancel"
        @click="dialogVisible = false"
      >{{ $t('base.buttons.cancel') }}</el-button>
      <el-button
        type="primary"
        @click="addModel"
        v-if="flag===0"
      >{{ $t('base.buttons.add') }}</el-button>
      <el-button
        type="primary"
        @click="updateModel"
        v-if="flag===1"
      >{{ $t('base.buttons.save') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'
import { addModel, getModelDetails, updateModel } from '@/api/model'

export default {
  name: "",
  components: {},
  props: {
    vendorList: {
      type: Array,
      default: () => []
    }
  },
  directive: {},
  data() {
    return {
      loading: false,
      imageUrl: "",
      dialogVisible: false,
      flag: 0,
      modelId: -1 /* 编辑接口需用到 */,
      formData: {
        type: "",
        name: "",
        vendorId: "",
        resolutionX: "",
        resolutionY: "",
        picUrl: "",
        remark: ""
      },
      rules: {
        type: [
          {
            required: true,
            message: this.$t("model.form.tips.type"),
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: this.$t("model.form.tips.name"),
            trigger: "blur"
          }
        ],
        vendorId: [
          {
            required: true,
            message: this.$t("model.form.tips.vendorId"),
            trigger: "blur"
          }
        ],
        resolutionX: [
          {
            required: true,
            message: this.$t("model.form.tips.resolutionX"),
            trigger: "blur"
          },
        ],
        resolutionY: [
          {
            required: true,
            message: this.$t("model.form.tips.resolutionY"),
            trigger: "blur"
          },
        ],
        picUrl: [
          {
            required: true,
            message: this.$t("model.form.tips.picUrl"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    dialogTitle() {
      return !this.flag ? this.$t("model.add.title") : this.$t("model.edit.title");
    },
    posType() {
      return _.filter(this.$t('base.posTypes'), 'value')
    },
    uploadUrl() {
      // return `${process.env.VUE_APP_BASE_API}/file/pic`
      return `${process.env.VUE_APP_BASE_URL}/file/pic`
    },
    headers() {
      return {
        token: getToken()
      }
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.formData.picUrl = res.data
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt200K = file.size / 1024 <= 200;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt200K) {
        this.$message.error("上传头像图片大小不能超过 200KB!");
      }
      return isLt200K;
      // return isJPG && isLt200K;
    },

    openDialog() {
      if (this.flag) {
        // 调接口，获取详情
        this.loading = true
        getModelDetails(this.modelId).then(res => {
          this.formData = _.pick(res.data, [
            'type',
            'name',
            'vendorId',
            'resolutionX',
            'resolutionY',
            'picUrl',
            'remark'
          ])
          this.loading = false
        })
      }
    },
    closedDialog() {
      this.$refs.form.resetFields();
    },
    addModel() {
      addModel(this.formData).then(res => {
        this.$emit('refresh')
        this.$message.success(this.$t('base.tips.addSuccess'))
        this.dialogVisible = false
      })
    },
    updateModel() {
      const { modelId, formData } = this
      updateModel(modelId, formData).then(res => {
        this.$emit('refresh')
        this.$message.success(this.$t('base.tips.saveSuccess'))
        this.dialogVisible = false
      })
    }
  }
};
</script>

<style lang='scss'>
/* scoped */
.model-form {
  .avatar-uploader {
    height: 130px;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
  .el-input-number__decrease,
  .el-input-number__increase{
    height: calc(100% - 2px);
    line-height: 34px;
  }
}
</style>
