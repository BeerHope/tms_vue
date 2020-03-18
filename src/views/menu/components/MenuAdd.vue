<template>
  <el-dialog
    width="300px"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="closeDialog">
    <div class="menu-form">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item :label="$t('menu.form.label.className')" prop="className">
          <el-input v-model="formData.className"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.showOrder')" prop="showOrder">
          <el-input-number v-model="formData.showOrder" :min="1" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.name')" prop="name">
          <el-input v-model="formData.name" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.type')" prop="type">
          <el-select v-model="formData.type" placeholder>
            <el-option
              v-for="item in $t('menu.types')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.url')" prop="link">
          <el-input v-model="formData.link" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.remark')" prop="remark">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="addMenu">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addMenu } from '@/api/menu'

export default {
  name: '',
  components: {},
  props: {
    parent: {
      type: Object,
      default: null,
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    isLeaf: {
      type: Boolean,
      default: false
    }
  },
  directive: {},
  data() {
    const validateName = (rule, value, callback) => {
      const regExp = /^[\u4e00-\u9fa5\s0-9A-Za-z]{1,15}$/
      if (!regExp.test(value)) {
        return callback(new Error(this.$t('menu.form.tips.name')))
      }
      callback()
    }
    const validateUrl = (rule, value, callback) => {
      const regExp = /^[0-9A-Za-z\.\?#:-_/]{0,100}$/
      if (!regExp.test(value)) {
        return callback(new Error(this.$t('menu.form.tips.url')))
      }
      callback()
    }
    return {
      dialogVisible: false,
      formData: {
        className: '',
        name: '',
        type: 1,
        link: '',
        showOrder: '',
        remark: '',
      },
      rules: {
        className: [
          {
            required: true, message: '请填写标识', trigger: 'blur'
          }
        ],
        showOrder: [
          {
            required: true
          }
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateName
          }
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        link: [
          {
            trigger: 'blur',
            validator: validateUrl
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
  methods: {
    addMenu() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = {
            ...this.formData,
            parentId: this.parent.id
          }
          addMenu(reqData).then(res => {
            this.dialogVisible = false
            this.$emit('refresh-menu')
            this.$message.success(`${this.$t('menu.add.tips.0')}`)
          }) 
        }
      })
    },
    closeDialog() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
  .menu-add{
    position: absolute;
    top: 0;
    width: calc(100% - 10px);
  }

  .menu-form{
    text-align: left;
    .el-input-number,
    .el-select{
      width: 100%;
    }
  }
</style>
