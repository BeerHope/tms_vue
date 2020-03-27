<template>
  <el-dialog
    :title="dialogTitle"
    width="40%"
    :visible.sync="dialogVisible"
    @close="resetForm"
    @open="openDialog">
    <el-form v-loading="loading" ref="form" class="common-form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="model" :label="$t('machine.form.label.model')">
        <el-cascader
          v-model="formData.model"
          :options="modelTreeData"
          @change="handleChange"
          :props="{ expandTrigger: 'hover' }">
        </el-cascader>
      </el-form-item>
      <el-form-item prop="sn" :label="$t('machine.form.label.sn')">
        <el-input v-model="formData.sn" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="reportCycle" :label="$t('machine.form.label.reportCycle')">
        <el-input-number v-model="formData.reportCycle" :min="1440"></el-input-number>
      </el-form-item>
      <el-form-item prop="heartbeatCycle" :label="$t('machine.form.label.heartbeatCycle')">
        <el-input-number v-model="formData.heartbeatCycle" :min="3600"></el-input-number>
      </el-form-item>
      <el-form-item prop="remark" :label="$t('machine.form.label.remark')">
        <el-input type="textarea" v-model="formData.remark" maxlength="200"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">{{ $t('base.buttons.cancel') }}</el-button>
      <el-button type="primary" v-if="flag === 0" @click="addMachine">{{ $t('base.buttons.add') }}</el-button>
      <el-button type="primary" v-if="flag === 1">{{ $t('base.buttons.save') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getModelTree } from '@/api/model'
import { getMachineDetails, addMachine } from '@/api/machine'

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    const validateSn = (rule, value, callback) => {
      const regExp = /^[A-Za-z0-9]{11,20}$/
      if (_.trim(value) && !regExp.test(value)) {
        callback(new Error(this.$t('machine.form.tips.sn2')))
      }
      callback()
    }
    return {
      loading: false,
      dialogVisible: false,
      flag: 0,
      machineId: -1,
      formData: {
        type: '',
        model: '',
        sn: '',
        reportCycle: 1440, /* 默认值 & 最小值： 1440min */
        heartbeatCycle: 3600, /* 默认值 & 心跳周期：3600s */
        remark: ''
      },
      rules: {
        model: [
          {
            required: true, message: this.$t('machine.form.tips.model'), trigger: 'blur'
          }
        ],
        sn: [
          { required: true, message: this.$t('machine.form.tips.sn1'), trigger: 'blur' },
          { validator: validateSn, trigger: 'blur' }
        ],
        reportCycle: [
          { required: true, message: this.$t('machine.form.tips.reportCycle'), trigger: 'blur' },
        ],
        heartbeatCycle: [
          { required: true, message: this.$t('machine.form.tips.heartbeatCycle'), trigger: 'blur' },
        ]
      },
      modelTreeData: [],
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
      return !this.flag ? this.$t('machine.add.title') : this.$t('machine.edit.title')
    }
  },
  watch: {},
  created() {
    this.getModelTree()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getModelTree() {
      getModelTree().then(res => {
        const posTypes = this.$t('base.posTypes')
        this.modelTreeData = _.map(res.data, (item) => {
          item.label = _.find(posTypes, {
            value: item.value
          }).label
          return item
        })
      })
    },
    /* 打开弹窗后回调 */
    openDialog() {
      if (this.machineId !== -1) {
        console.log(this.machineId, 'machineId!!!')
        this.loading = true
        getMachineDetails(this.machineId).then(res => {
          console.log(res, 'res 详情结果')
          this.formData = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    addMachine() {
      /* formdata绑定的model是数组，只需产叶子节点下的modelId即可 */
      const reqData = _.omit(this.formData, 'model')
      reqData.modelId = _.last(this.formData.model)
      addMachine(reqData).then(res => {
        console.log(res, '新增返回的数据详情！！！')
        this.$emit('refresh')
        this.dialogVisible = false
        this.$message.success(this.$t('base.tips.addSuccess'))
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    /* 提交表单 */
    submitForm() {
    },
    handleChange() {
      console.log('handle change!!!')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
