<template>
  <div class="tradition-pos">
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
  methods: {}
}
</script>

<style lang='scss' scoped>

</style>
