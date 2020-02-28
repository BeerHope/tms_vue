<template>
  <el-dialog
    width="40%"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @open="openDialog"
    @closed="closedDialog"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" class="common-form model-form">
      <el-form-item prop="type" label="类型">
        <el-select v-model="formData.type" placeholder="请选择">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="model" label="机型名称">
        <el-input v-model="formData.model" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item prop="vendor" label="厂商">
        <el-select v-model="formData.vendor" placeholder="请选择">
          <el-option v-for="item in vendors" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分辨率" required>
        <el-col :span="11" style="height: 32px">
          <el-form-item prop="width">
            <el-input class="t-c" placeholder="宽" v-model="formData.width"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="t-c b f-z-16" :span="2">*</el-col>
        <el-col :span="11" style="height: 32px">
          <el-form-item prop="height">
            <el-input class="t-c" placeholder="高" v-model="formData.height"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="desc" label="机型图片" required>
        <!-- 跨域 -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="desc" label="机型描述">
        <el-input type="textarea" v-model="formData.desc" max-length="256"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false" v-if="flag===0">新 增</el-button>
      <el-button type="primary" @click="dialogVisible = false" v-if="flag===1">保 存</el-button>
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
    const validateResolution = (rule, value, callback) => {
      const regExp = /^[1-9][0-9]{0,3}$/
      console.log(value, '正在检验！！！！')
      if (!regExp.test(value)) {
        callback(new Error('仅支持数字,范围为1~9999'))
      }
      callback();
    }
    return {
      imageUrl: '',
      dialogVisible: false,
      flag: 0,
      modelId: -1, /* 编辑接口需用到 */
      /* 暂写死 */
      types: [
        {
          value: 1,
          label: '传统pos'
        },
        {
          value: 2,
          label: '智能pos'
        },
        {
          value: 3,
          label: '移动pos'
        }
      ],
      vendors: [
        {
          prop: 'changshang1',
          label: '产商1'
        },
        {
          prop: 'changshang2',
          label: '产商2'
        },
        {
          prop: 'changshang3',
          label: '产商3'
        }
      ],
      formData: {
        type: '',
        model: '',
        vendor: '',
        width: '',
        height: '',
        img: '',
        desc: ''
      },
      rules: {
        type: [
          {
            required: true, message: '请选择类型', trigger: 'blur'
          }
        ],
        model: [
          {
            required: true, message: '请输入机型名称', trigger: 'blur'
          }
        ],
        resolution: [
          {
            required: true, message: '请输入分辨率', trigger: 'blur'
          }
        ],
        vendor: [
          {
            required: true, message: '请选择厂商', trigger: 'blur'
          }
        ],
        width: [
          { required: true, message: '请输入宽度', trigger: 'blur' },
          { validator: validateResolution, trigger: 'blur' }
        ],
        height: [
          { required: true, message: '请输入高度', trigger: 'blur' },
          { required: true, validator: validateResolution, trigger: 'blur' }
        ],
        img: [
          {
            required: true, message: '请上传图片', trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    dialogTitle() {
      return !this.flag ? '新增机型' : '编辑机型'
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
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt200K = file.size / 1024 <= 200
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt200K) {
        this.$message.error('上传头像图片大小不能超过 200KB!')
      }
      return isJPG && isLt200K;
    },
    openDialog() {
      if (this.flag) {
        // 调接口，获取详情
        console.log('此处调用详情接口！！！！')
      }
    },
    closedDialog() {
      this.resetForm()
    },
    /* 重置表单 */
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='scss'>
/* scoped */
.model-form{
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
    border-color: #409EFF;
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
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
