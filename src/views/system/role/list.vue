<template>
  <div class="common-list role-list">
    <div v-if="!isShowUserManagement">
      <div class="filter-box p-t-6 p-b-6 m-b-10">
        <el-select v-model="roleName" placeholder="角色名称" clearable class="m-r-8">
          <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="roleName" placeholder="状态" clearable class="m-r-8">
          <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary">
          <svg-icon icon-class="search" class="m-r-4"></svg-icon>搜索
        </el-button>
        <el-button type="primary" class="green-btn" @click="openDialog(0, -1, true)">
          <svg-icon icon-class="add" class="m-r-4"></svg-icon>新增角色
        </el-button>
      </div>
      <div class="common-table">
        <list-item
          v-for="(item, index) in roleList"
          :key="index"
          :item-data="item"
          @edit="openDialog(1, 0, true)"
          @manageUser="manageUser"
        ></list-item>
        <!-- 分页 -->
        <el-pagination
          class="common-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增角色 -->
    <role-add ref="dialog" v-if="!isShowUserManagement"></role-add>
    <!-- 管理用户 -->
    <user-management v-else></user-management>
  </div>
</template>

<script>
import RoleAdd from './components/RoleAdd'
import ListItem from './components/ListItem'
import UserManagement from './components/UserManagement'

export default {
  name: 'RoleList',
  components: {
    RoleAdd,
    ListItem,
    UserManagement
  },
  props: {},
  directive: {},
  data() {
    return {
      roleName: '',
      roles: [
        {
          value: 1,
          label: '角色1'
        },
        {
          value: 2,
          label: '角色2'
        },
        {
          value: 3,
          label: '角色3'
        }
      ],
      tableHead: [
        {
          prop: 'name',
          label: '角色名称'
        },
        {
          prop: 'state',
          label: '是否锁定'
        },
        {
          prop: 'createdTime',
          label: '创建时间'
        },
        {
          prop: 'remark',
          label: '备注'
        }
      ],
      roleList: [
        {
          name: '角色1',
          state: 0,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色2',
          state: 0,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色1',
          state: 0,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色2',
          state: 1,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色1',
          state: 0,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色2',
          state: 0,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色1',
          state: 1,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色2',
          state: 0,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色1',
          state: 0,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        },
        {
          name: '角色2',
          state: 0,
          createdTime: '2019-01-01',
          remark: '备注内容，说明文字'
        }
      ],
      currentPage: 1,
      isShowUserManagement: false
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
    handleSizeChange() {
      console.log('handle size change!!!!')
    },
    handleCurrentChange() {
      console.log('curren change!!!')
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
    manageUser() {
      this.$router.push('/system/role/user-management')
      // this.isShowUserManagement = true
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
