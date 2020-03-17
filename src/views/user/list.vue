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
      <el-button type="primary" @click="getUserList">
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
        @size-change="getUserList"
        @current-change="getUserList"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <add-dialog ref="addDialog"></add-dialog>
    <password-dialog ref="passwordDialog"></password-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'
import ListItem from './components/ListItem'
import AddDialog from './components/UserAdd'
import PasswordDialog from './components/PasswordDialog'

export default {
  name: 'UserList',
  components: {
    ListItem,
    AddDialog,
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
        page: 1,
        pageSize: 20,
      },
      total: 10,
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
          name: '张三11111',
          account: 2323264324327,
          state: 0,
          createTime: '2020-02-10',
          companyName: '李四11111'
        },
        {
          name: '张三11111111',
          account: 2323264324327,
          state: 0,
          createTime: '2020-02-10',
          companyName: '李四2222222'
        },
        {
          name: '张三11111111',
          account: 2323264324327,
          state: 1,
          createTime: '2020-02-10',
          companyName: '李四2222222'
        }
      ],
      total: 50
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserList()
  },
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
    getUserList() {
      getUserList(this.filter).then((res) => {
        cosnole.log(res, 'res!!!!!!!!!!!!!!')
      })
    },
    openAddDialog(flag = 0, userId = -1, dialogVisible = true) {
      const addDialog = this.$refs.addDialog
      _.assign(addDialog, {
        flag,
        userId,
        dialogVisible
      })
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
