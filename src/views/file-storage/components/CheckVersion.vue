<template>
  <el-dialog
    title="检测到新版本"
    width="40%"
    :visible.sync="dialogVisible">
    <el-form :model="formData" label-width="80px">
      <el-row>
        <el-col :span="14">
          <el-form-item label="更新日期">
            <span>{{ formData.updatedTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="版本">
            <span>{{ formData.version }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item label="使用机型">
            <span>{{ formData.suitaleModel }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="文件大小">
            <span>{{ formData.fileSize }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="支持版本" v-if="packageType==='system'">
        <span>{{ formData.supportVersion }}</span>
      </el-form-item>
      <el-form-item label="更新内容">
        <span>{{ formData.content }}</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleUpdate(12323)">更 新</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    packageType: {
      required: true,
      type: String,
      default: 'system'
    } 
  },
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        updatedTime: '2020-03-16 14:12:30',
        version: 'v1.10.0',
        suitaleModel: 'G2, G3, T2……',
        fileSize: '300MB',
        supportVersion: 'v1.1.10+',
        content: '更新内容详情更新内容详情内容详情这是更新系统包的内容详情更新内容详情更新内容详情内容详情'
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
    // 更新系统包
    handleUpdate(id) {
      console.log('传入的系统包id', id)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
