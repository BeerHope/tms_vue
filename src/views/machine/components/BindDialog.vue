<template>
  <el-dialog
    title="查询"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form v-if="!isShowResult" class="common-form" :rules="rules" label-width="100px">
      <el-form-item label="设备序列号" prop="deviceSn">
        <el-input v-model="deviceSN" placeholder="请输入设备序列号"></el-input>
      </el-form-item>
    </el-form>
    <div v-else class="search-result">
      <div class="m-r-20">
        <img src="@/assets/images/tpos.png" alt="apk.png">
      </div>
      <div class="content">
        <el-row>
          <el-col :span="12">
            <span>客户名称：</span>
            <span>*****</span>
          </el-col>
          <el-col :span="12">
            <span>终端号: </span>
            <span>12345678</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span>智能POS：</span>
            <span>N5</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span>SN：</span>
            <span>12345678910</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSearch">查 询</el-button>
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
    return {
      dialogVisible: false,
      deviceSN: '',
      rules: {
        deviceSn: [
          {
            required: true, message: '请输入设备序列号', trigger: 'blur'
          }
        ]
      },
      isShowResult: false,
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
    handleSearch() {
      this.isShowResult = true
    }
  }
}
</script>

<style lang='scss' scoped>
.search-result{
  display: flex;
  width: 80%;
  margin: auto;
  .content{
    flex: auto;
  }
}
</style>
