<template>
  <el-dialog
    title="新增系统包"
    width="40%"
    @close="handleClose"
    custom-class="package-dialog m-b-3vh"
    :visible.sync="dialogVisible">
    <div class="second-step">
      <div class="package-info">
        <el-upload
          class="upload-demo t-c m-a"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleUploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip m-t-10 m-b-18 t-l " slot="tip">只支持zip文件格式，且不超过1G</div>
        </el-upload>
        <el-form :model="packageDetails" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="版本">
                <!-- <span>{{ packageDetails.version }}</span> -->
                <el-input v-model="packageDetails.version" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支持版本">
                <!-- <span>{{ packageDetails.supportVersion }}</span> -->
                <el-input v-model="packageDetails.supportVersion" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="大小">
                <!-- <span>{{ packageDetails.size }}</span> -->
                <el-input v-model="packageDetails.size" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件MD5">
                <!-- <span>{{ packageDetails.fileMD5 }}</span> -->
                <el-input v-model="packageDetails.fileMD5" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="解压下发">
            <!-- <span>{{ packageDetails.unzipDispatch }}</span> -->
            <el-input v-model="packageDetails.unzipDispatch" disabled></el-input>
          </el-form-item>
          <el-form-item label="更新内容">
            <el-input type="textarea" v-model="packageDetails.updateContent" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-form class="editable-form" ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item prop="name" label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="model" class="model" label="适用机型">
          <ul class="model-row" @click="changeSelectedPos">
            <li
              v-for="item in posList" :key="item.textDesc"
              :class="{'active': selectedPosType==item.type}"
              :data-type="item.type">
              <img :src="item.imgPath" :alt="item.textDesc">
              <p>{{ item.textDesc }}</p>
            </li>
          </ul>
          <el-select multiple v-model="checkedModels">
            <el-option
              v-for="item in modelList" :key="item.label"
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" label="备注" maxlength="200">
          <el-input v-model="formData.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import TPOS from "@/assets/images/tpos.png"
import SPOS from "@/assets/images/spos.png"
import MPOS from "@/assets/images/mpos.png"

export default {
  name: 'PackageDialog',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      checkedModels: 'G2, K206',
      modelList: [
        {
          value: 1,
          label: 'G2'
        },
        {
          value: 2,
          label: 'T2'
        },
        {
          value: 3,
          label: 'N2'
        }
      ],
      // 选中pos 1: 传统, 2：智能，3：移动
      selectedPosType: 0,
      posList: [
        {
          type: 1,
          imgPath: TPOS,
          textDesc: 'TPOS',
        },
        {
          type: 2,
          imgPath: SPOS,
          textDesc: 'SPOS',
        },
        {
          type: 3,
          imgPath: MPOS,
          textDesc: 'MPOS',
        }
      ],
      packageDetails: {
        version: 'V2.0.0',
        supportVersion: 'V2.0.0及以上',
        size: '500MB',
        fileMD5: 'MD54324324343',
        unzipDispatch: '解压下发了',
        updateContent: '这里是更新内容'
      },
      formData: {
        name: '',
        model: '',
        remark: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
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
    handleUploadSuccess(response, file, fileList) {
      // 上传成功后跳转下一步页面
      console.log('上传成功了！！！')
    },
    /* 事件委托 */
    changeSelectedPos(e) {
      const posType = e.target.dataset.type
      if (posType) {
        this.selectedPosType = posType
        /* 展示对应类型下的具体pos */
      }
    },
    // 处理新增
    handleClose() {
      // 重置表单
      const myForm = this.$refs.form
      myForm && myForm.resetFields()
    },
    handleAdd() {
      this.dialogVisible = false
      this.$message.success('新增成功！')
      console.log('此处为新增系统包处理')
    }
  }
}
</script>

<style lang="scss">
.package-dialog{
  &.m-b-3vh{
    margin-top: 3vh !important;
  }
  .el-dialog__body{
    padding: 20px;
  }
  
  .el-form-item--small.el-form-item{
    margin-bottom: 14px;
  }
  .editable-form{
    .el-form-item--small.el-form-item{
      margin-bottom: 18px;
    }
  }
  .el-upload, .el-upload-dragger{
    width: 100%;
  }
}
</style>

<style lang='scss' scoped>
@mixin common-box ($padding){
  border: 1px solid #DCDFE6;
  padding: $padding;
  border-radius: 6px;
}
.model{
  .el-select{
    margin-top: 18px;
    width: 100%;
  }
}
.model-row{
  padding: 0;
  margin: 0;
  display: flex;
  li{
    list-style-type: none;
    flex: 1;
    text-align: center;
    @include common-box(10px);
    &:not(:first-child) {
      margin-left: 20px;
    }
    &:hover, &.active{
      border-color: #538AE6;
      cursor: pointer;
    }
    img{
      &:hover, &.active{
        border-color: #538AE6;
        cursor: pointer;
      }
    }
    p{
      pointer-events: none;
      height: 20px;
      line-height: 20px;
      margin: 0;
    }
  }
}

</style>
