<template>
  <div class="user-management-list">
    <h4 class="common-title">管理用户</h4>
    <section class="content">
      <el-table
        :data="userList"
        style="width: 100%"
        class="f-z-14"
        :header-cell-style="headerStyle"
      >
        <el-table-column
          prop="account"
          :label="$t('role.userManagement.thead.account')"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" :label="$t('role.userManagement.thead.name')" align="center"></el-table-column>
        <el-table-column
          prop="channel"
          :label="$t('role.userManagement.thead.channel')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operation"
          :label="$t('role.userManagement.thead.operation')"
          align="center"
        >
          <template slot-scope="scope">
            <span class="delete" @click="deleteUser(scope)">剔除</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      userList: [
        {
          account: 'account111111111111',
          name: 'test111',
          channel: '所属渠道商111',
        },
        {
          account: 'account111111111111',
          name: 'test111',
          channel: '所属渠道商111',
        }
      ],
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
    headerStyle() {
      return "background: #F6F6F6; color: #172B4D;height: 42px;"
    },
    deleteUser() {
      this.$confirm('此操作将剔除该角色下的用户，是否继续?', '剔除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning'
        customClass: 'delete-confirm'
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
.user-management-list {
  padding: 0 120px;
  .content {
    font-size: 14px !important;
    max-width: 1090px;
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
