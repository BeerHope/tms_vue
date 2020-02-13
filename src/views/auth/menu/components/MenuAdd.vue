<template>
  <el-card class="menu-add h-100">
    <div slot="header" class="clearfix f-z-14">
      <span class="b">{{ title }}</span>
      <span> -> </span>
      <span class="r cur-pointer f-z-16 custom-hover">
        <i class="el-icon-close" @click="closeAddPage"></i>
      </span>
      <!-- <el-button v-if="isLeaf" icon="el-icon-plus" class="r" type="primary" size="mini">{{ $t('menuList.addChildMenu') }}</el-button> -->
    </div>
    <!-- form -->
    <menu-form mode="add" :parent-name="title"></menu-form>
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
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    closeAddPage() {
      this.$emit('closeAddPage')
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
</style>
