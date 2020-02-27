<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form :model="formData" :rules="rules" label-width="100px">
      <el-form-item prop="name">
        <el-input v-model="formData.name" maxlength="40"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="formData.code" maxlength="20"></el-input>
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
    return {
      flag: 0, /* 0:新增， 1：编辑 */
      dialogVisible: false,
      vendorId: -1, /* 新增无，编辑时用到 */
      formData: {
        name: '',
        code: ''
      },
      rules: {
        name: [
          {
            required: true, message: '请输入厂商名称', trigger: 'blur'
          }
        ],
        code: [
          {
            required: true, message: '请输入产商代码', trigger: 'blur'
          }
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
