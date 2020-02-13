<template>
  <div class="menu-list common-container">
    <el-row class="pos-absolute w-100 h-100">
      <el-col :span="5" class="p-10 h-100 shadow">
        <div class="category-opt">
          <template v-if="isNodeDragged">
            <el-button size="mini">{{ $t('function.reset') }}</el-button>
            <el-button size="mini" type="primary">{{ $t('function.save') }}</el-button>
          </template>
        </div>
        <el-tree draggable default-expand-all :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false">
          <span slot-scope="{node, data}">
            <span class="f-z-14">{{ $t(`menuList.menuTree.${data.label}`) }}</span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="19" class="p-l-10 h-100 pos-relative">
        <menu-edit v-loading="isLoading" v-if="isTreeNodeClicked && !isAddPageVisible && !isLoading" :title="menuTitle" :is-leaf="isCurrentNodeLeaf" @showAddPage="showAddPage"></menu-edit>
        <transition name="el-zoom-in-bottom">
          <menu-add v-if="isAddPageVisible" :title="menuTitle" :is-leaf="isCurrentNodeLeaf" @closeAddPage="isAddPageVisible = false"></menu-add>
        </transition>
        <div v-if="!isTreeNodeClicked" class="text-color-666 p-20">
          <i class="el-icon-info text-color-999"></i>
          {{ $t('menuList.tipsInfo') }}
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
      treeData: [
        {
          label: 'parentMenu',
          children: [
            {
              label: 'terminalManagement',
              children: [
                {
                  label: 'terminalList',
                  children: [
                    {
                      label: 'addTerminal',
                      children: []
                    },
                    {
                      label: 'editTerminal',
                      children: []
                    },
                    {
                      label: 'deleteTerminal',
                      children: []
                    },
                    {
                      label: 'importTerminal',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      isTreeNodeClicked: false,
      menuTitle: '',
      isCurrentNodeLeaf: false,
      isAddPageVisible: false,
      isLoading: false,
      isNodeDragged: false
    }
  },
  computed: {},
  watch: {},
  created() {
    getList().then(res => {
      console.log('获取请求的数据：', res)
    })
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /* 点击树 */
    handleNodeClick(data) {
      this.isTreeNodeClicked = true
      this.isAddPageVisible = false
      // 后期添加中英文转换
      this.menuTitle = this.$t(`menuList.menuTree.${data.label}`)
      this.isCurrentNodeLeaf = !!data.children.length
      /* 模拟异步调用 */
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 100)
    },
    showAddPage() {
      this.isAddPageVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
  .menu-list{
    .category-opt{
      text-align: right;
      height: 36px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .menu-edit, .menu-add{
      line-height: 30px;
      .el-card__header{
        height: 29px;
      }
    }
  }
</style>
