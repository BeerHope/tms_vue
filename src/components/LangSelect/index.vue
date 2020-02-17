<template>
  <el-dropdown
    trigger="click"
    class="international cur-pointer"
    @command="handleSetLanguage"
  >
    <div>
      <span class="el-dropdown-link">
        {{ langTxt }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="language==='zh'"
        command="zh"
      >
        {{ $t('login.langs.zh') }}
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='en'"
        command="en"
      >
        {{ $t('login.langs.en') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { getLanguage, setLanguage } from '@/utils/cookies'

export default {
  name: 'LangSelect',
  data() {
    return {
      language: getLanguage() || navigator.language.toLowerCase().slice(0, 2)
    }
  },
  computed: {
    langTxt() {
      return this.language === 'zh' ? this.$t('login.langs.zh') : this.$t('login.langs.en')
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.language = lang
      setLanguage(lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon.lang{
  cursor: pointer;
  font-size: 20px;
}
</style>
