<template>
  <div class="menu-list common-container">
    <el-row class="pos-absolute w-100 h-100">
      <el-col :span="5" class="p-10 h-100 shadow">
        <div class="category-opt">
          <template v-if="isNodeDragged">
            <el-button size="mini" @click="resetMenuList">{{ $t('function.reset') }}</el-button>
            <el-button size="mini" type="primary" @click="saveMenuList">{{ $t('function.save') }}</el-button>
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
          <span slot-scope="{node, data}">
            <span class="f-z-14">{{ $t(`menu.menuTree.${data.label}`) }}</span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="19" class="p-l-10 h-100 pos-relative">
        <menu-edit
          v-loading="isLoading"
          v-if="isTreeNodeClicked && !isAddPageVisible && !isLoading"
          :title="menuTitle"
          :is-leaf="isLeaf"
          @showAddPage="showAddPage"
        ></menu-edit>
        <transition name="el-zoom-in-bottom">
          <menu-add
            v-if="isAddPageVisible"
            :title="menuTitle"
            :is-leaf="isLeaf"
            @closeAddPage="isAddPageVisible = false"
          ></menu-add>
        </transition>
        <div v-if="!isTreeNodeClicked" class="text-color-666 p-20">
          <i class="el-icon-info text-color-999"></i>
          {{ $t('menu.tipsInfo') }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MenuEdit from './components/MenuEdit'
import MenuAdd from './components/MenuAdd'
import { getList } from '@/api/menu'

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
      isAddPageVisible: false,
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
      getList().then(res => {
        this.menuData = res.data
      })
    },
    /* 点击树 */
    handleNodeClick(data) {
      this.isTreeNodeClicked = true
      this.isAddPageVisible = false
      // 后期添加中英文转换
      this.menuTitle = this.$t(`menu.menuTree.${data.label}`)
      this.isLeaf = !!(data.children && data.children.length)
      this.currentNode = data
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
    showAddPage() {
      this.isAddPageVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
.menu-list {
  .category-opt {
    text-align: right;
    height: 36px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .menu-edit,
  .menu-add {
    line-height: 30px;
    .el-card__header {
      height: 29px;
    }
  }
}
</style>
