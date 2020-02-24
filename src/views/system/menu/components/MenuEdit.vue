<template>
  <el-card class="menu-edit h-100">
    <div slot="header" class="clearfix f-z-14">
      <span class="b">{{ title }}</span>
      <span>-> {{ $t('menu.configInfo') }}</span>
      <i class="el-icon-"></i>
      <el-button
        v-if="isLeaf"
        icon="el-icon-plus"
        class="r"
        type="primary"
        size="mini"
        @click="showAddPage"
      >{{ $t('menu.addSubMenu') }}</el-button>
    </div>
    <!-- form -->
    <menu-form mode="edit"></menu-form>
  </el-card>
</template>

<script>
import MenuForm from './MenuForm'

export default {
  name: '',
  components: {
    MenuForm
  },
  props: {
    title: {
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
    return {
    }
  },
  computed: {},
  watch: {},
  created() { },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    showAddPage() {
      this.$emit('showAddPage')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
