<template>
  <div class="user-list common-list">
    <div class="filter-box p-t-6 p-b-6 m-b-20">
      <el-input v-model="filter.account" :placeholder="$t('user.list.filter.account')" clearable class="filter-item"></el-input>
      <el-input v-model="filter.name" :placeholder="$t('user.list.filter.name')" clearable class="filter-item"></el-input>
      <el-select v-model="filter.state" :placeholder="$t('user.list.filter.state')" clearable class="filter-item">
        <el-option
          v-for="item in $t('base.states')"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getUserList">
        <svg-icon icon-class="search"></svg-icon>
        {{ $t('user.list.search') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openAddDialog">
        <svg-icon icon-class="add"></svg-icon>
        {{ $t('user.list.add') }}
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
    <add-dialog @refresh="getUserList" ref="addDialog"></add-dialog>
    <password-dialog ref="passwordDialog"></password-dialog>
  </div>
</template>

<script>
import * as UserServive from '@/api/user'
import ListItem from './components/ListItem'
import AddDialog from './components/UserAdd'
import PasswordDialog from './components/PasswordDialog'
import { Loading } from 'element-ui'

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
      userList: [],
      total: 0,
      isLoading: false,
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
    getUserList() {
      const loading = Loading.service({ fullscreen: true })
      UserServive.getUserList(this.filter).then((res) => {
        this.userList = res.data.rows
        this.total = res.data.totalRecord
        loading.close()
      }).catch(() => {
        loading.close()
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
