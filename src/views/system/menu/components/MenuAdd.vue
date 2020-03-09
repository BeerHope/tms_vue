<template>
  <el-dialog
    width="300px"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
  >
    <menu-form mode="add" :parent-name="title"></menu-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible=false">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MenuForm from './MenuForm'

export default {
  name: '',
  components: {
    MenuForm
  },
  props: {
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
    return {
      dialogVisible: false,
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
