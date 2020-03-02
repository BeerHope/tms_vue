<template>
  <el-dialog
    :title="dialogTitle"
    width="40%"
    :visible.sync="dialogVisible"
    @closed="resetForm"
    @opened="openedDialog"
  >
    <el-form ref="form" class="common-list" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="modelNum" label="型号" required>
        <el-col :span="12" style="height: 32px">
          <el-form-item>
            <el-select v-model="formData.type" clearable>
              <el-option
                v-for="item in types" :key="item.value+item.label"
                :value="item.value" :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="height: 32px"></el-col>
        <el-col :span="11" style="height: 32px">
          <el-form-item>
            <el-select v-model="formData.model" clearable>
              <el-option
                v-for="item in models" :key="item.value+item.label"
                :value="item.value" :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="sn" label="机身号">
        <el-input v-model="formData.sn" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="checkInCycle" label="报到周期(分钟)">
        <el-input v-model="formData.checkInCycle"></el-input>
      </el-form-item>
      <el-form-item prop="heartbeatCycle" label="心跳周期(秒)">
        <el-input v-model="formData.heartbeatCycle"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input type="textarea" v-model="formData.remark" maxlength="200"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" v-if="flag === 0">添 加</el-button>
      <el-button type="primary" v-if="flag === 1">保 存</el-button>
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
    const validateSn = (rule, value, callback) => {
      const regExp = /^[A-Za-z0-9]{11,20}$/
      if (_.trim(value) && !regExp.test(value)) {
        callback(new Error('支持大小写英文、数字，11~20个字符'))
      }
      callback()
    }
    const validateCheckinCycle = (rule, value, callback) => {
      const numberValue = _.toNumber(value)
      const minValue = 1440
      if (!numberValue) {
        callback(new Error('仅支持数字'))
      } else if (numberValue < minValue) {
        callback(new Error(`支持输入最小值为${minValue}`))
      }
      callback()
    }
    const validateHeartbeatCycle = (rule, value, callback) => {
      const numberValue = _.toNumber(value)
      const minValue = 3600
      if (!numberValue) {
        callback(new Error('仅支持数字'))
      } else if (numberValue < minValue) {
        callback(new Error(`支持输入最小值为${minValue}`))
      }
      callback()
    }
    return {
      dialogVisible: false,
      flag: 0,
      machineId: -1,
      formData: {
        type: '',
        model: '',
        sn: '',
        checkInCycle: 1440, /* 默认值 & 最小值： 1440min */
        heartbeatCycle: 3600, /* 默认值 & 心跳周期：3600s */
        remark: ''
      },
      rules: {
        type: [
          {
            required: true, message: '请选择机型', trigger: 'blur'
          }
        ],
        model: [
          {
            required: true, message: '请选择pos类型', trigger: 'blur'
          }
        ],
        sn: [
          { required: true, message: '请输入机身号', trigger: 'blur' },
          { validator: validateSn, trigger: 'blur' }
        ],
        checkInCycle: [
          { required: true, message: '请输入报到周期', trigger: 'blur' },
          { validator: validateCheckinCycle, trigger: 'blur' }
        ],
        heartbeatCycle: [
          { required: true, message: '请输入心跳周期', trigger: 'blur' },
          { validator: validateHeartbeatCycle, trigger: 'blur' }
        ]
      },
      models: [
        {
          value: 1,
          label: 'G2'
        },
        {
          value: 2,
          label: 'N3'
        },
      ],
      types: [
        {
          value: 1,
          label: 'TPOS'
        },
        {
          value: 2,
          label: 'SPOS'
        },
        {
          value: 3,
          label: 'MPOS'
        }
      ]
    }
  },
  computed: {
    dialogTitle() {
      return !this.flag ? '添加机具' : '编辑机具'
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /* 打开弹窗后回调 */
    openedDialog() {
      /* 若为编辑，调接口显示 */
      if (this.flag === 1) {
        console.log('编辑，调接口')
      }
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    /* 提交表单 */
    submitForm() {
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
