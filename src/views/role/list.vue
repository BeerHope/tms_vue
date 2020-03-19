<template>
  <div class="common-list role-list">
    <div>
      <div class="filter-box p-t-6 p-b-6 m-b-10">
        <el-input v-model="filter.name" class="filter-item" :placeholder="$t('role.list.filter.name')" clearable></el-input>
        <el-select v-model="filter.state" class="filter-item" :placeholder="$t('role.list.filter.state')" clearable>
          <el-option v-for="item in $t('base.states')" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" @click="getRoleList">
          <svg-icon icon-class="search" class="m-r-4"></svg-icon>
          {{ $t('role.list.search') }}
        </el-button>
        <el-button type="primary" class="green-btn" @click="openDialog(0, -1, true)">
          <svg-icon icon-class="add" class="m-r-4"></svg-icon>
          {{ $t('role.list.add') }}
        </el-button>
      </div>
      <div class="common-table">
        <list-item
          v-for="(item, index) in roleList"
          :key="index"
          :item-data="item"
          @edit="openDialog(1, item.id, true)"
        ></list-item>
        <!-- 分页 -->
        <el-pagination
          class="common-pagination"
          @size-change="getRoleList"
          @current-change="getRoleList"
          :current-page.sync="filter.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="filter.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增/编辑 角色 -->
    <role-add ref="dialog" @refresh="getRoleList"></role-add>
  </div>
</template>

<script>
import * as roleService from '@/api/role'
import RoleAdd from './components/RoleAdd'
import ListItem from './components/ListItem'
import { Loading } from 'element-ui'

export default {
  name: 'RoleList',
  components: {
    RoleAdd,
    ListItem
  },
  props: {},
  directive: {},
  data() {
    return {
      roleName: '',
      filter: {
        name: '',
        state: '',
        page: 1,
        pageSize: 10,
      },
      roleList: [],
      total: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getRoleList()
  },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    handleSizeChange() {
      console.log('handle size change!!!!')
    },
    handleCurrentChange() {
      console.log('curren change!!!')
    },
    getRoleList() {
      const loading = Loading.service({ fullscreen: true })
      roleService.getRoleList(this.filter).then(res => {
        this.roleList = res.data && res.data.rows
        this.total = res.data.totalRecord
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    /* 
      flag: 新增（0）、编辑（1）
      dialogVisible: 弹窗显示隐藏
      roleId: 角色ID，新增(-1), 编辑(当前操作角色对应ID)
    */
    openDialog(flag = 0, roleId = -1, dialogVisible = true) {
      const selfDialog = this.$refs.dialog
      _.assign(selfDialog, {
        flag,
        roleId,
        dialogVisible
      })
      this.$refs.dialog.dialogVisible = true
    },
    /* 暂时将该功能删除 */
    deleteRole() {
      this.$confirm('此操作将永远删除该角色，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 进行删除操作
        this.$message.success('删除成功')
      }).catch(() => {
        console.log('取消删除操作')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
