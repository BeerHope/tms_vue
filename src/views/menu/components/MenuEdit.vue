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
          <el-input-number v-model="menuDetails.showOrder" :min="1" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('menu.form.label.name')" prop="name">
          <el-input v-model="menuDetails.name" maxlength="15"></el-input>
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
          <el-input v-model="menuDetails.link" maxlength="100"></el-input>
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
import { Loading } from 'element-ui'

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
    },
    backupData: {
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
      const regExp = /^[0-9A-Za-z\.\?#:-_/]{0,100}$/
      if (!regExp.test(value)) {
        return callback(new Error(this.$t('menu.form.tips.url')))
      }
      callback()
    }
    return {
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
            trigger: 'blur',
            validator: validateUrl
          }
        ]
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    updateMenu() {
      /* 检测是否修改 */
      if (_.isEqual(this.backupData, this.menuDetails)) {
        this.$message(`${this.$t('menu.edit.tips.1')}`)
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { id } = this.menuDetails
          const reqData = _.omit(this.menuDetails, ['id', 'level', 'parentId'])
          const loading = Loading.service({ fullscreen: true })
          updateMenu(id, reqData).then(res => {
            this.$emit('refresh-menu')
            loading.close();
            this.$message.success(`${this.$t('menu.edit.tips.0')}`)
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
  max-width: 400px;
  text-align: center;
  .el-input-number{
    width: 100%;
  }
}
</style>
