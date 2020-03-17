<template>
  <el-card class="menu-edit h-100">
    <div slot="header" class="clearfix f-z-14">
      <el-button
        v-if=" menuDetails.type && menuDetails.type < 2"
        icon="el-icon-plus"
        class="r green-btn"
        type="primary"
        @click="$emit('open-add-dialog')"
      >{{ $t('menu.list.add') }}</el-button>
    </div>
    <!-- form -->
    <div class="menu-form common-form">
      <el-form ref="form" :model="menuDetails" :rules="rules" label-width="80px">
        <el-form-item :label="$t('menu.form.label.className')" prop="className">
          <el-input v-model="menuDetails.className"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.showOrder')" prop="showOrder">
          <el-input v-model="menuDetails.showOrder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.name')" prop="name">
          <el-input v-model="menuDetails.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.state')" prop="state">
          <el-select v-model="menuDetails.state">
            <el-option
              v-for="item in $t('menu.states')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.type')" prop="type">
          <el-select v-model="menuDetails.type" placeholder>
            <el-option
              v-for="item in $t('menu.types')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.url')" prop="link">
          <el-input v-model="menuDetails.link"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.remark')" prop="remark">
          <el-input type="textarea" v-model="menuDetails.remark"></el-input>
        </el-form-item>
        <el-button class="m-l-50 m-t-20" type="primary" size="mini" @click="updateMenu">{{ $t('menu.edit.modify') }}</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { updateMenu } from '@/api/menu'

export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    menuDetails: {
      type: Object,
      default: null,
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
      const regExp = /^[0-9A-Za-z\.\?#:-_/]{1,100}$/
      if (!regExp.test(value)) {
        return callback(new Error(this.$t('menu.form.tips.url')))
      }
      callback()
    }
    return {
      formData: {
        parent: '',
        className: '',
        name: '',
        state: 1,
        type: 1,
        link: '',
        showOrder: '',
        remark: ''
      },
      rules: {
        className: [
          {
            required: true,
          }
        ],
        showOrder: [
          {
            required: true,
          }
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateName
          }
        ],
        state: [
          {
            required: true,
            message: '请选择名称',
            trigger: 'blur'
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
            required: true,
            trigger: 'blur',
            validator: validateUrl
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.menuDetails, 'details!!!!')
  },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    updateMenu() {
      const { id } = this.menuDetails
      const reqData = _.omit(this.menuDetails, ['id', 'level', 'parentId'])
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateMenu(id, reqData).then(res => {
            this.$message.success('修改成功！！！')
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.menu-form {
  margin-top: 20px;
  max-width: 460px;
  text-align: center;
}
</style>
