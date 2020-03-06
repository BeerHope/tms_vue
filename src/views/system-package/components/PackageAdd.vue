<template>
  <el-dialog
    title="新增系统包"
    width="40%"
    @close="handleClose"
    :custom-class="currentStep === 'secondStep' ? 'package-dialog m-b-3vh' : 'package-dialog'"
    :visible.sync="dialogVisible">
    <div class="first-step t-c" v-if="currentStep === 'firstStep'">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip m-t-10" slot="tip">只支持zip文件格式，且不超过1G</div>
      </el-upload>
    </div>
    <div class="second-step" v-if="currentStep === 'secondStep'">
      <div class="package-info">
        <div class="name m-b-18">
          <svg-icon style="font-size: 50px;" icon-class="package"></svg-icon>
          <span class="m-l-20">文件名称</span>
        </div>
        <el-form :model="packageDetails" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="版本">
                <el-input v-model="packageDetails.version" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支持版本">
                <el-input v-model="packageDetails.supportVersion" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="大小">
                <el-input v-model="packageDetails.size" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件MD5">
                <el-input v-model="packageDetails.fileMD5" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="解压下发">
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
        <el-form-item prop="model" class="model" label="适用机型" required>
          <ul class="model-row" @click="changeSelectedPos">
            <li
              v-for="item in posList" :key="item.textDesc"
              :class="{'active': selectedPosType==item.type}"
              :data-type="item.type">
              <img :src="item.imgPath" :alt="item.textDesc">
              <p>{{ item.textDesc }}</p>
            </li>
          </ul>
          <div class="line"></div>
          <el-checkbox-group 
            v-model="checkedModels"
            :min="1"
            :max="5">
            <el-checkbox v-for="model in modelList" :label="model" :key="model">{{ model }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="remark" label="备注" maxlength="200">
          <el-input v-model="formData.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer" v-if="currentStep==='secondStep'">
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
    const modelOptions = ['G2', 'N2', 'K206', 'T2'];
    return {
      dialogVisible: false,
      currentStep: 'firstStep',
      checkedModels: ['G2', 'K206'],
      modelList: modelOptions,
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
      this.currentStep = 'secondStep'
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
      this.currentStep = 'firstStep'
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
}
.model{
  .el-form-item__content{
    border: 1px solid #DCDFE6;
    border-radius: 6px;
    padding: 10px;
  }
}
</style>

<style lang='scss' scoped>
@mixin common-box ($pad){
  border: 1px solid #DCDFE6;
  padding: $pad;
  border-radius: 6px;
}
.package-info{
  @include common-box(14px);
  .name{
    @include common-box(10px);
    display: flex;
    align-items: center;
  }
  margin-bottom: 30px;
}
.editable-form{
  @include common-box(14px);
}
.model-row{
  padding: 0;
  display: flex;
  margin: 0 0 10px;
  li{
    list-style-type: none;
    @include common-box(10px);
    margin: 0 8px;
    flex: 1;
    text-align: center;
    p,img{
      pointer-events: none;
    }
    p {
      height: 20px;
      line-height: 20px;
      margin: 0;
    }
    &:hover, &.active{
      border-color: #538AE6;
      cursor: pointer;
    }
  }
}
.line{
  width: 100%;
  height: 1px;
  background-color: #DCDFE6;
}
.el-checkbox-group{
  padding: 10px 10px 0;
}
</style>
