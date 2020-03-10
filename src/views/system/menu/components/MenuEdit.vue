<template>
  <el-card class="menu-edit h-100">
    <div slot="header" class="clearfix f-z-14">
      <span class="b">{{ title }}</span>
      <span>-> {{ $t('menu.edit.info') }}</span>
      <!-- type: 3 表示功能 -->
      <el-button
        v-if="menuDetails.type < 2"
        icon="el-icon-plus"
        class="r green-btn"
        type="primary"
        @click="$emit('open-add-dialog')"
      >{{ $t('menu.list.add') }}</el-button>
    </div>
    <!-- form -->
    <menu-form mode="edit" class="m-t-30" :form-data="menuDetails">
      <el-button slot="operation" class="r m-t-30" type="primary" size="mini" @click="updateMenu">{{ $t('menu.edit.modify') }}</el-button>
    </menu-form>
  </el-card>
</template>

<script>
import MenuForm from './MenuForm'
import { updateMenu } from '@/api/menu'

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
    menuDetails: {
      type: Object,
      default: null,
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
    updateMenu() {
      const { id } = this.menuDetails
      const reqData = _.omit(this.menuDetails, ['id', 'level', 'parentId'])
      /* 菜单标识，暂写定 */
      reqData.className= 'menu.list.query'
      updateMenu(id, reqData).then(res => {
        this.$message.success('修改成功！！！')
        console.log(res, '修改后！！！！')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
