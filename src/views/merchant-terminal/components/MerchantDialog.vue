<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="handleClose"
    @opened="handleOpened"
    width="40%">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item prop="merchant" label="所属商户" :required="!isDetailsMode">
        <el-select v-model="formData.merchant">
          <el-option
            v-for="item in merchants" :key="item.id"
            :value="item.id" :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="终端号" prop="terminalId" :required="!isDetailsMode">
        <el-input v-model="formData.terminalId" type="textarea" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" type="textarea" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="创建人" v-if="flag===2">
        <el-input v-model="formData.creator" maxlength="200"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary" :class="{'cancel': !isDetailsMode}"
        @click="dialogVisible=false">
        {{ !isDetailsMode ? '取消' : '关闭' }}
      </el-button>
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
        creator: '',
        remark: ''
      },
      rules: {
        merchant: [
          { message: '请选择所属商户', trigger: 'blur' }
        ],
        terminalId: [
          { message: '请输入终端编号', trigger: 'blur' }
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
    isDetailsMode() {
      return this.flag === 2
    },
    dialogTitle() {
      let title = ''
      switch (this.flag) {
        case 0:
          title = '添加终端'
          break;
        case 1:
          title = '编辑终端'
          break;
        case 2:
          title = '终端详情'
          break;
        default:
          break;
      }
      return title
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleClose() {
      this.$refs.form.resetFields()
    },
    handleOpened() {
      // flag判断编辑还是详情
      if (this.flag === 2) {
        console.log('详情！！！')
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
