<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="closeDialog"
    @open="openDialog"
  >
    <el-form v-loading="loading" class="common-form" ref="form" :rules="rules" :model="formData" label-width="100px">
      <el-form-item
        v-if="flag!== 0"
        :label="$t('company.form.label.customerCode')"
        prop="customerCode"
      >
        <el-input v-model="formData.customerCode" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('company.form.label.name')" prop="name">
        <el-input v-model="formData.name" maxlength="40"></el-input>
      </el-form-item>
      <el-form-item :label="$t('company.form.label.shortName')" prop="shortName">
        <el-input v-model="formData.shortName" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item :label="$t('company.form.label.timezone')" prop="timezoneId">
        <el-select v-model="formData.timezoneId" filterable>
          <el-option
            v-for="item in timezoneList"
            :key="item.id"
            :label="item | timezoneName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('company.form.label.area')" prop="area">
        <country-selector :language="language" :value="formData.area"></country-selector>
      </el-form-item>
      <el-form-item :label="$t('company.form.label.address')" prop="address">
        <el-input v-model="formData.address" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item :label="$t('company.form.label.remark')" prop="remark">
        <el-input
          type="textarea"
          :autosize="{minRows: 4, maxRows: 6}"
          v-model="formData.remark"
          maxlength="100"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        class="cancel"
        @click="dialogVisible = false"
      >{{ $t('base.buttons.cancel') }}</el-button>
      <el-button type="primary" v-if="flag === 0" @click="addCompany">{{ $t('base.buttons.add') }}</el-button>
      <el-button
        type="primary"
        @click="updateCompany"
        v-if="flag === 1"
      >{{ $t('base.buttons.save') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import CountrySelector from "@/components/Country/CountrySelector";
import { getLanguage } from "@/utils/cookies.js";
import { getTimezone } from "@/api/timezone"
import { addCompany, getCompanyDetails, updateCompany } from "@/api/company";

export default {
  name: '',
  components: {
    CountrySelector
  },
  filters: {
    timezoneName(item) {
      const lang = getLanguage();
      return lang === "zh" ? item.nameZh : item.nameEn;
    }
  },
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      flag: 0 /* 0：add，1：edit */,
      companyId: -1,
      formData: {
        customerCode: '' /* 添加渠道商无编号 */,
        name: '',
        shortName: '',
        timezoneId: '',
        area: '',
        address: '',
        remark: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t("company.form.tips.company"),
            trigger: "blur"
          }
        ],
        shortName: [
          {
            required: true,
            message: this.$t("company.form.tips.shortName"),
            trigger: "blur"
          }
        ],
        timezoneId: [
          {
            required: true,
            message: this.$t("company.form.tips.timezoneId"),
            trigger: "blur"
          }
        ]
      },
      timezoneList: [],
      loading: false
    };
  },
  computed: {
    language() {
      return getLanguage();
    },
    dialogTitle() {
      return this.flag
        ? this.$t("company.add.title")
        : this.$t("company.edit.title");
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
  methods: {
    closeDialog() {
      this.$refs.form.resetFields();
    },
    openDialog() {
      if (this.flag) {
        const { companyId } = this;
        this.loading = true;
        getCompanyDetails(companyId)
          .then(res => {
            this.formData = res.data;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    addCompany() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.omit(this.formData, "customerCode");
          addCompany(reqData).then(res => {
            this.$emit("refresh");
            this.$message.success(this.$t("base.tips.addSuccess"));
            this.dialogVisible = false;
          });
        }
      })
    },
    updateCompany() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.omit(this.formData, ['customerCode', 'id']);
          updateCompany(this.companyId, reqData).then(res => {
            this.$emit("refresh");
            this.$message.success(this.$t("base.tips.editSuccess"));
            this.dialogVisible = false;
          });
        }
      })
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
