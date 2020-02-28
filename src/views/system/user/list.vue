<template>
  <div class="user-list common-list">
    <div class="filter-box p-t-6 p-b-6 m-b-20">
      <el-input v-model="filter.account" placeholder="登录账号" clearable class="filter-item"></el-input>
      <el-input v-model="filter.name" placeholder="姓名" clearable class="filter-item"></el-input>
      <el-select v-model="filter.state" placeholder="状态" clearable class="filter-item">
        <el-option
          v-for="item in state"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary">
        <svg-icon icon-class="search"></svg-icon>
        搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openAddDialog">
        <svg-icon icon-class="add"></svg-icon>
        新增
      </el-button>
    </div>
    <div class="common-table">
      <list-item
        v-for="(item, index) in userList" :key="index"
        :item-data="item" @open-password-dialog="openPasswordDialog"
        @open-edit-dialog="openEditDialog(1, 123, true)"
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
        :total="400">
      </el-pagination>
    </div>
    <add-dialog ref="addDialog"></add-dialog>
    <edit-dialog ref="editDialog"></edit-dialog>
    <password-dialog ref="passwordDialog"></password-dialog>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import AddDialog from './components/UserAdd'
import EditDialog from './components/UserEdit'
import PasswordDialog from './components/PasswordDialog'

export default {
  name: 'UserList',
  components: {
    ListItem,
    AddDialog,
    EditDialog,
    PasswordDialog
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        account: '',
        name: '',
        state: '',
      },
      state: [
        {
          value: 0,
          label: '启用'
        },
        {
          value: 1,
          label: '禁用'
        }
      ],
      userList: [
        {
          username: '张三11111',
          account: 2323264324327,
          state: 0,
          createdTime: '2020-02-10',
          channelProvider: '李四11111'
        },
        {
          username: '张三11111111',
          account: 2323264324327,
          state: 0,
          createdTime: '2020-02-10',
          channelProvider: '李四2222222'
        },
        {
          username: '张三11111111',
          account: 2323264324327,
          state: 1,
          createdTime: '2020-02-10',
          channelProvider: '李四2222222'
        }
      ],
      currentPage: 1,
      total: 50
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
    handleSizeChange() {
      console.log('handleSizeChange!!!!!!!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange')
    },
    openAddDialog(flag = 0, userId = -1, dialogVisible = true) {
      const addDialog = this.$refs.addDialog
      _.assign(addDialog, {
        flag,
        userId,
        dialogVisible
      })
    },
    openEditDialog() {
      const editDialog = this.$refs.editDialog
      editDialog.dialogVisible = true
    },
    openPasswordDialog() {
      const passwordDialog = this.$refs.passwordDialog
      passwordDialog.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
