<template>
  <div class="menu-list common-container">
    <el-row class="w-100 h-100">
      <el-col :span="5" class="h-100 content-left">
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
            <i :class="['m-l-6 m-r-4', data.type === 'catalog' ? 'el-icon-folder-opened' : 'el-icon-document']"></i>
            <span class="f-z-14">{{ $t(`menu.menuTree.${data.label}`) }}</span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="19" class="p-l-10 h-100 pos-relative">
        <menu-edit
          v-loading="isLoading"
          v-if="isTreeNodeClicked && !isLoading"
          :title="menuTitle"
          :is-leaf="isLeaf"
          @open-add-dialog="openAddDialog"
        ></menu-edit>
        <div v-if="!isTreeNodeClicked" class="text-color-666 p-20">
          <i class="el-icon-info text-color-999"></i>
          {{ $t('menu.tipsInfo') }}
        </div>
      </el-col>
    </el-row>
    <!-- ${currentNode.label}  -->
    <menu-add ref="addDialog" :dialog-title="`${currentNode && currentNode.label}->新增子菜单`"></menu-add>
  </div>
</template>

<script>
import MenuEdit from './components/MenuEdit'
import MenuAdd from './components/MenuAdd'
import { getMenus } from '@/api/menu'

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
        children: 'children',
        label: 'label'
      },
      menuData: [],
      isTreeNodeClicked: false,
      menuTitle: '',
      isLeaf: false,
      isLoading: false,
      isNodeDragged: false,
      currentNode: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getMenuList()
  },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    getMenuList() {
      getMenus().then(res => {
        console.log(res, '####')
        this.menuData = res.data
      })
    },
    /* 点击树 */
    handleNodeClick(data) {
      this.isTreeNodeClicked = true
      // 后期添加中英文转换
      this.menuTitle = this.$t(`menu.menuTree.${data.label}`)
      this.isLeaf = !!(data.children && data.children.length)
      this.currentNode = data
      console.log(this.currentNode, 'currentNode!!!!')
      this.$refs.menuTree.setCurrentKey(data.id)
      /* 模拟异步调用 */
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 100)
    },
    /* 拖拽成功完成时触发的事件 */
    dropNode(before, after, inner, event) {
      console.log('成功拖拽节点了！！！')
      console.log(before, 'before!!!')
      console.log(after, 'after!!!')
      console.log(inner, 'inner!!!')
      console.log(event, 'event!!!')
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
  height: 100%;
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
  }
  .el-card{
    border-color: transparent;
  }
}
</style>
