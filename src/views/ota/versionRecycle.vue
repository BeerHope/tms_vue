<template>
  <div class="user-management-list">
    <h4 class="common-title">${系统包名称}已删除信息</h4>
    <section class="content">
      <el-table
        :data="userList"
        style="width: 100%"
        class="f-z-14 m-t-50"
        :header-cell-style="headerStyle">
        <el-table-column prop="version" label="版本" align="center">
          <template slot-scope="scope">
            <span class="cur-pointer" style="color: #6276B1;" @click="toViewDetails">{{ scope.row.version }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="删除操作人" align="center"></el-table-column>
        <el-table-column
          prop="deletedTime"
          label="删除时间"
          align="center"
        ></el-table-column>
      </el-table>
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
    </section>
    <package-details ref="details"></package-details>
  </div>
</template>

<script>
import PackageDetails from './components/PackageDetails'
export default {
  name: '',
  components: {
    PackageDetails
  },
  props: {},
  directive: {},
  data() {
    return {
      userList: [
        {
          version: 'V1.20.12',
          operator: 'test111',
          deletedTime: '2020-02-03 12:12:00',
        },
        {
          version: 'V1.22.12',
          operator: 'test111',
          deletedTime: '2020-02-03 12:12:00',
        }
      ],
      currentPage: 1,
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
      return "background: #E2E4E9; color: #172B4D;height: 42px;"
    },
    deleteUser() {
      this.$confirm('此操作将剔除该角色下的用户，是否继续?', '剔除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // customClass: 'delete-confirm'
      }).then(() => {
        // 进行删除操作
        this.$message.success('删除成功')
      }).catch(() => {
        console.log('取消删除操作')
      })
    },
    handleSizeChange() {
      console.log('handleSizeChange!!!!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChnage!!!')
    },
    toViewDetails() {
      this.$refs.details.dialogVisible = true
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
