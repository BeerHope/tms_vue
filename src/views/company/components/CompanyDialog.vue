<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
  >
    <el-form class="common-form" ref="form" :rules="rules" :model="formData" label-width="100px">
      <el-form-item label="渠道商编号" prop="number" v-if="flag!== 0">
        <el-input v-model="formData.number" disabled></el-input>
      </el-form-item>
      <el-form-item label="渠道商名称" prop="name">
        <el-input v-model="formData.name" maxlength="40"></el-input>
      </el-form-item>
      <el-form-item label="简称" prop="abbreviation">
        <el-input v-model="formData.abbreviation" maxlength="20"></el-input>
      </el-form-item>
      <!-- 时区下拉插件 -->
      <el-form-item label="时区" prop="timezone">
        <el-select v-model="formData.timezone">
          <el-option 
            v-for="item in timezoneList" :key="item.id"
            :label="item.nameZh" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 国家下拉插件 -->
      <el-form-item label="国家地区" prop="counrty">
        <country-selector :language="language" v-model="formData.counrty"></country-selector>
      </el-form-item>
      <el-form-item label="经营地区" prop="businessArea">
        <el-input v-model="formData.businessArea" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="formData.remark" maxlength="100"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false" v-if="flag === 0">添 加</el-button>
      <el-button type="primary" @click="dialogVisible = false" v-if="flag === 1">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import CountrySelector from '@/components/Country/CountrySelector'
import { getLanguage } from '@/utils/cookies.js'
import { getTimezone } from '@/api/timezone'

export default {
  name: '',
  components: {
    CountrySelector
  },
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      flag: 0, /* 0：add，1：edit */
      companyInfoId: -1,
      formData: {
        number: '434343432432432', /* 添加渠道商无编号 */
        name: '',
        abbreviation: '',
        timezone: '',
        country: '',
        businessArea: '',
        remark: ''
      },
      rules: {
        name: [
          {
            required: true, message: '请输入渠道商名称', trigger: 'blur'
          }
        ],
        abbreviation: [
          {
            required: true, message: '请输入渠道商简称', trigger: 'blur'
          }
        ],
        timezone: [
          {
            required: true, message: '请选择时区', trigger: 'blur'
          }
        ],
      },
      timezoneList: [],
    }
  },
  computed: {
    language() {
      return getLanguage()
    },
    dialogTitle() {
      return this.flag === 0 ? '添加渠道商' : '编辑渠道商' 
    }
  },
  watch: {},
  created() {
    getTimezone().then(res => {
      this.timezoneList = res.data
    })
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang='scss' scoped>

</style>
