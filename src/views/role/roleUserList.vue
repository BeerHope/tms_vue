<template>
  <div class="user-management-list">
    <h4 class="common-title">{{ $t('role.manageUser.title') }}</h4>
    <section v-if="userList.length" class="content">
      <el-table
        :data="userList"
        style="width: 100%"
        class="f-z-14"
        :header-cell-style="headerStyle">
        <el-table-column
          prop="account"
          :label="$t('role.manageUser.thead.account')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name" :label="$t('role.manageUser.thead.name')"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyName"
          :label="$t('role.manageUser.thead.companyName')"
          align="center">
        </el-table-column>
        <el-table-column
          prop="operation"
          :label="$t('role.manageUser.thead.operation')"
          align="center">
          <template slot-scope="scope">
            <span class="delete" @click="deleteUser(scope.row.id)">
              {{ $t('role.manageUser.remove') }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="common-pagination"
        @size-change="getRoleUser"
        @current-change="getRoleUser"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </section>
    <no-result v-else></no-result>
  </div>
</template>

<script>
import { getRoleUser, deleteUser } from '@/api/role'
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        page: 1,
        pageSize: 10,
      },
      userList: [],
      total: 0,
    }
  },
  computed: {
    roleId() {
      return this.$route.params.roleId
    }
  },
  watch: {},
  created() { 
    this.getRoleUser()
  },
  beforeMount() { },
  mounted() { },
  beforeDestroy() { },
  destroyed() { },
  methods: {
    headerStyle() {
      return "background: #E2E4E9; color: #172B4D;height: 42px;"
    },
    deleteUser(userId) {
      this.$confirm(
        this.$t('role.manageUser.removeContent'),
        this.$t('role.manageUser.remove'),
        {
          confirmButtonText: this.$t('base.buttons.confirm'),
          cancelButtonText: this.$t('base.buttons.cancel'),
          customClass: 'delete-confirm'
        }).then(() => {
        deleteUser(this.roleId, userId).then(res => {
          this.getRoleUser()
          this.$message.success(this.$t('base.tips.removeSuccess'))
        })
      }).catch(() => {
        console.log($t('base.tips.cancelRemove'))
      })
    },
    getRoleUser() {
      const { roleId, filter } = this
      getRoleUser(roleId, filter).then(res => {
        this.userList = res.data.rows
        this.total = res.data.totalRecord
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.user-management-list {
  padding: 0 120px;
  .content {
    font-size: 14px !important;
    max-width: 1000px;
    margin: auto;
    .el-table__row {
      height: 42px;
    }
    .delete {
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>
