<template>
  <div class="tradition-pos">
    <div class="app-info">
      <div class="name m-b-18">
        <svg-icon style="font-size: 50px;" icon-class="package"></svg-icon>
        <span class="m-l-20">文件名称</span>
      </div>
      <el-form :model="appDetails" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用名称">
              <el-input v-model="appDetails.displayName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本">
              <el-input v-model="appDetails.version" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用包名">
              <el-input v-model="appDetails.appname" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="大小">
              <el-input v-model="appDetails.size" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机型">
              <el-input v-model="appDetails.model" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件MD5">
              <el-input v-model="appDetails.fileMD5" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-form class="eidtable-form" label-width="80px">
      <el-form-item label="应用icon"></el-form-item>
    </el-form>
  </div>
</template>

<script>
import TPOS from "@/assets/images/tpos.png"
import SPOS from "@/assets/images/spos.png"
import MPOS from "@/assets/images/mpos.png"

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    const modelOptions = ['G2', 'N2', 'K206', 'T2'];
    return {
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
      appDetails: {
        displayName: '应用名称',
        appname: '应用包名',
        version: 'V2.0.0',
        size: '500MB',
        fileMD5: 'MD54324324343',
        model: '机型111',
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
  methods: {}
}
</script>

<style lang='scss' scoped>
@mixin common-box ($pad){
  border: 1px solid #DCDFE6;
  padding: $pad;
  border-radius: 6px;
}
.app-info{
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
</style>
