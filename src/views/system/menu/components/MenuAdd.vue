<template>
  <el-dialog
    width="300px"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
  >
    <menu-form mode="add" :parent-name="dialogTitle"></menu-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="addMenu">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MenuForm from './MenuForm'
import { addMenu } from '@/api/menu'

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
    addMenu() {
      const reqData = {
        link: '/merchant',
        name: '商户管理',
        parentId: 3,
        remark: '此处填写备注',
        showOrder: 1,
        type: 1
      }
      addMenu(reqData).then(res => {
        console.log(res, 'res!!!!!!')
        this.dialogVisible = false
      }) 
    },
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
