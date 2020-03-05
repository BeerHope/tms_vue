<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="40%">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item prop="merchant" label="所属商户">
        <el-select v-model="formData.merchant">
          <el-option
            v-for="item in merchants" :key="item.id"
            :value="item.id" :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="终端号" prop="terminalId">
        <el-input v-model="formData.terminalId" type="textarea" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" type="textarea" maxlength="200"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" v-if="flag===0">添 加</el-button>
      <el-button type="primary" v-if="flag===1">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'MerchantDialog',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      flag: 0,
      merchantId: -1,
      dialogVisible: false,
      formData: {
        merchant: '', // 所属商户
        terminalIds: '', // 终端号，支持多个输入，使用";"分割
        remark: ''
      },
      rules: {
        merchant: [
          { required: true, message: '请选择所属商户', trigger: 'blur' }
        ],
        terminalId: [
          { required: true, message: '请输入终端编号', trigger: 'blur' }
        ]
      },
      merchants: [
        {
          value: 213233,
          label: 'merchant111'
        },
        {
          value: 23214214,
          label: 'merchant22222'
        }
      ]
    }
  },
  computed: {
    dialogTitle() {
      return !this.flag ? '添加商户终端' : '编辑商户终端'
    }
  },
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
