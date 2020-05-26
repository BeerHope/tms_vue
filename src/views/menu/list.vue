<template>
  <div class="menu-list common-container">
    <el-row class="w-100 h-100 pos-absolute">
      <el-col :span="4" class="h-100 content-left">
        <!-- drag operation -->
        <div class="category-opt">
          <template v-if="isNodeDragged">
            <el-button @click="resetMenuList">{{ $t('function.reset') }}</el-button>
            <el-button type="primary" @click="saveMenuList">{{ $t('function.save') }}</el-button>
          </template>
        </div>
        <el-tree
          ref="menuTree"
          highlight-current
          draggable
          default-expand-all
          :data="menuData"
          node-key="id"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
          @node-drop="dropNode"
        >
          <span slot-scope="{node, data}" class="custom-tree-node">
            <svg-icon :class="['m-l-6 m-r-4']" :icon-class="data.type===1? 'directory' :'document'"></svg-icon>
            <span class="f-z-14">{{ data.name }}</span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="20" class="p-l-10 h-100 pos-relative">
        <menu-edit
          :menu-details="menuDetails"
          :backup-data="backupData"
          v-loading="isLoading"
          v-if="isTreeNodeClicked"
          :title="currentNode.name"
          :is-leaf="isLeaf"
          @open-add-dialog="openAddDialog"
          @refresh-menu="refreshMenu"
        ></menu-edit>
        <div v-if="!isTreeNodeClicked" class="text-color-666 p-20">
          <i class="el-icon-info text-color-999"></i>
          {{ $t('menu.list.tipsInfo') }}
        </div>
      </el-col>
    </el-row>
    <menu-add
      ref="addDialog" :parent="menuDetails"
      @refresh-menu="refreshMenu"
      :dialog-title="addDialogTitle">
    </menu-add>
  </div>
</template>

<script>
import MenuEdit from './components/MenuEdit'
import MenuAdd from './components/MenuAdd'
import { getMenus, getMenuDetails } from '@/api/menu'

export default {
  name: 'MenuList',
  components: {
    MenuEdit,
    MenuAdd
  },
  props: {},
  directive: {},
  data() {
    return {
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      menuData: [],
      isTreeNodeClicked: false,
      menuTitle: '',
      isLeaf: false,
      isLoading: false,
      isNodeDragged: false,
      currentNode: null,
      menuDetails: null,
      backupData: null,
    }
  },
  computed: {
    addDialogTitle() {
      return `${this.currentNode && this.currentNode.name}->${this.$t('menu.list.add')}`
    }
  },
  watch: {},
  created() {
    this.getMenuList()
  },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    refreshMenu() {
      this.getMenuList().then(() => {
        this.$nextTick(() => {
          this.handleNodeClick(this.currentNode)
        })
      })
    },
    getMenuList() {
      return new Promise((resolve) => {
        getMenus().then(res => {
          this.menuData = [res.data]
          resolve()
        })
      })
    },
    /* 点击树 */
    handleNodeClick(data) {
      this.isLeaf = !!(data.children && data.children.length)
      this.currentNode = data
      this.$refs.menuTree.setCurrentKey(data.id)
      this.isLoading = true
      getMenuDetails(data.id).then((res) => {
        this.menuDetails = res.data
        this.backupData = _.cloneDeep(res.data)
        this.isTreeNodeClicked = true
        setTimeout(() => {
          this.isLoading = false
        }, 100)
      })
    },
    /* 拖拽 */
    dropNode(before, after, inner, event) {
      console.log('树节点拖拽了')
      this.isNodeDragged = true
      this.$refs.menuTree.setCurrentKey(this.currentNode.id)
    },
    // 修改保存菜单
    saveMenuList() {
      console.log(this.menuData, 'this.menuData!!!')
    },
    // 重置菜单列表
    resetMenuList() {
      this.getMenuList()
      this.$nextTick(() => {
        if (this.currentNode) {
          this.$refs.menuTree.setCurrentKey(this.currentNode.id)
        }
      })
    },
    openAddDialog() {
      this.$refs.addDialog.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
.menu-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: calc(100% - 70px);
  .content-left{
    border: 1px solid #eee;
    border-top: none;
  }
  .category-opt {
    text-align: right;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eee;
    text-align: center;
    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.1);
    position: relative;
    z-index: 99;
  }
  .menu-edit,
  .menu-add {
    line-height: 33px;
    .el-card__header {
      height: 33px;
    }
  }
  .el-tree{
    color: #172B4D;
    height: calc(100% - 60px);
    overflow-y: auto;
  }
}
</style>
<style lang="scss">
.menu-list{
  .el-tree{
    padding: 10px;
    .el-tree-node__expand-icon:not(.is-leaf){
      color: #172B4D;
    }
  }
  .el-card__header {
    padding: 13px 16px;
    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.1);
    height: 59px;
  }
  .el-card{
    border-color: transparent;
  }
  /* 目录树的样式 */
  .el-tree-node__content{
    margin-bottom: 10px;
  }
  .el-tree--highlight-current .el-tree-node.is-current{
    &>.el-tree-node__content {
      background-color: #5087E5 !important;
      color: #ffffff !important;
    }
    &>.el-tree-node__content .el-tree-node__expand-icon:not(.is-leaf){
      color: #ffffff !important;
    }
  }
  .el-tree--highlight-current .el-tree-node.is-current.is-expanded{
    &>.el-tree-node__children{
      .el-tree-node__content{
        background-color: #EBECEF;
      }
    }
  }
}
</style>
