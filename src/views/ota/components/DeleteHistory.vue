<template>
  <el-dialog
    @open="opendDialog"
    custom-class="deleted-ota-list"
    :visible.sync="dialogVisible"
    :title="$t('ota.deletedList.title')"
    width="40%">
    <div v-loading="loading">
      <template v-if="deletedOtaList.length">
        <el-table
          :data="deletedOtaList"
          style="width: 100%"
          class="f-z-14"
          height="480"
          :header-cell-style="headerStyle">
          <el-table-column prop="name" :label="$t('ota.deletedList.thead.name')" align="center"></el-table-column>
          <el-table-column prop="deleteBy" :label="$t('ota.deletedList.thead.deleteBy')" align="center"></el-table-column>
          <el-table-column prop="deleteTime" :label="$t('ota.deletedList.thead.deleteTime')" align="center"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          class="common-pagination m-t-20"
          @size-change="getDeletedOtaList"
          @current-change="getDeletedOtaList"
          :current-page.sync="filter.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="filter.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </template>
      <no-result v-else height="558px" :result-text="$t('ota.deletedList.resultText')"></no-result>
    </div>
  </el-dialog>
</template>

<script>
import { getDeletedOtaList } from '@/api/ota'

export default {
  name: 'DeleteHistory',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      loading: false,
      dialogVisible: false,
      allocationId: -1,
      deletedOtaList: [],
      total: 0,
      filter: {
        page: 1,
        pageSize: 10
      },
      headerStyle() {
        return "background: #E2E4E9; color: #172B4D;height: 42px;"
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDeletedOtaList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getDeletedOtaList() {
      this.loadig = true
      getDeletedOtaList(this.filter).then(res => {
        const resData = res.data
        this.deletedOtaList = resData.rows
        this.total = resData.totalRecord
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    opendDialog() {
      this.loading = true
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss'>
.deleted-ota-list{
  .el-dialog__body{
    width: calc(100% - 100px);
  }
}
</style>
