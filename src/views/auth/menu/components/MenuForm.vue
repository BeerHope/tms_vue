<template>
  <div class="menu-form common-form">
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <!-- parent field only shown in add mode -->
      <el-form-item v-if="mode==='add'" :label="$t('menu.form.label.parent')" prop="parent">
        <el-input v-model="formData.parent" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.form.label.name')" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item v-if="mode==='edit'" :label="$t('menu.form.label.state')" prop="state">
        <el-select v-model="formData.state">
          <el-option
            v-for="item in $t('menu.states')"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      <el-form-item :label="$t('menu.form.label.url')" prop="url">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <template v-if="mode==='edit'">
        <el-button class="r m-t-30" type="primary" size="mini">{{ $t('function.modify') }}</el-button>
      </template>
      <template v-if="mode==='add'">
        <el-button
          class="r m-t-30 m-l-20"
          type="primary"
          size="mini"
          @click="closeAddPage"
        >{{ $t('function.add') }}</el-button>
        <el-button class="r m-t-30" type="default" size="mini">{{ $t('function.cancel') }}</el-button>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    mode: {
      type: String,
      default: 'edit'
    },
    parentName: {
      type: String,
      default: ''
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
        name: '',
        state: 0,
        type: 1,
        url: ''
      },
      /* 规则配置和校验 */
      rules: {
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
        url: [
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
    if (this.mode === 'add') {
      this.formData.parent = this.parentName
    }
  },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {}
}
</script>

<style lang='scss' scoped>
.menu-form {
  max-width: 500px;
}
</style>
