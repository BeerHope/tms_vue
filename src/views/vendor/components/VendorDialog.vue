<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogVisible"
             @open="openDialog"
             @close="closeDialog"
             width="40%">
    <el-form v-loading="loading"
             class="common-form"
             ref="form"
             :model="formData"
             :rules="rules"
             label-width="100px">
      <el-form-item prop="name"
                    :label="$t('vendor.form.label.name')">
        <el-input v-model="formData.name"
                  maxlength="40"></el-input>
      </el-form-item>
      <el-form-item prop="code"
                    :label="$t('vendor.form.label.code')">
        <el-input v-model="formData.code"
                  maxlength="20"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 class="cancel"
                 @click="dialogVisible = false">
        {{ $t('base.buttons.cancel') }}</el-button>
      <el-button type="primary"
                 @click="addVendor()"
                 v-if="flag===0">{{ $t('base.buttons.add') }}</el-button>
      <el-button type="primary"
                 @click="updateVendor()"
                 v-if="flag===1">{{ $t('base.buttons.save') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getVendorDetails, addVendor, updateVendor } from '@/api/vendor'

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      flag: 0 /* 0:新增， 1：编辑 */,
      dialogVisible: false,
      vendorId: -1 /* 新增无，编辑时用到 */,
      loading: false,
      formData: {
        name: '',
        code: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('vendor.form.tips.name'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: this.$t('vendor.form.tips.code'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    dialogTitle() {
      return !this.flag
        ? this.$t('vendor.add.title')
        : this.$t('vendor.edit.title')
    }
  },
  watch: {},
  created() { },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    closeDialog() {
      this.$refs.form.resetFields()
    },
    addVendor() {
      addVendor(this.formData).then(res => {
        this.$emit('refresh')
        this.$message.success(this.$t('base.tips.addSuccess'))
        this.dialogVisible = false
      })
    },
    openDialog() {
      /* 编辑 */
      if (this.vendorId !== -1) {
        this.loading = true
        getVendorDetails(this.vendorId).then(res => {
          this.formData = res.data
          this.loading = false
        })
      }
    },
    updateVendor() {
      const reqData = _.omit(this.formData, 'id')
      updateVendor(this.vendorId, reqData).then(res => {
        this.$emit('refresh')
        this.$message.success(this.$t('base.tips.saveSuccess'))
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
