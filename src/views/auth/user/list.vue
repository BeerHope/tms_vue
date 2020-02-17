<template>
  <div class="user-list common-list">
    <div class="filter-box p-t-6 p-b-6 m-b-10">
      <el-select v-model="roleName" placeholder="角色名称" clearable>
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="roleName" placeholder="状态" clearable>
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary"><i class="el-icon-search m-r-4"></i>搜索</el-button>
      <el-button type="primary"><i class="el-icon-plus m-r-4"></i>新增</el-button>
    </div>
    <div class="common-table">
      <el-table height="calc(100% - 40px)" :data="roleList" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column v-for="item in tableHead" :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作">
          <!-- slot-scope="scope" -->
          <template>
            <el-button type="primary" size="mini">查看</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
export default {
  name: 'UserList',
  components: {},
  props: {},
  directive: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang='scss' scoped>

</style>
