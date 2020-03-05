<template>
  <div class="allocation-list common-list">
    <div class="filter-box p-t-6 p-b-6">
      <treeselect class="filter-item" v-model="filter.channel" :options="channelData" placeholder="渠道商"></treeselect>
      <el-button type="primary">
        <svg-icon icon-class="search"></svg-icon>
        搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openBatchAllocation">
        <svg-icon icon-class="allocation"></svg-icon>
        批量调拨
      </el-button>
    </div>
    <div class="m-t-30">
      <el-table
        :data="alllocationList"
        style="width: 100%"
        class="f-z-14"
        :header-cell-style="headerStyle">
        <el-table-column prop="allocatedTime" label="挑拨时间" align="center"></el-table-column>
        <el-table-column prop="channel" label="接收机具渠道商" align="center"></el-table-column>
        <el-table-column prop="number" label="数量" align="center"></el-table-column>
        <el-table-column prop="batch" label="调拨批次" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button class="line-type blue-btn" @click="viewDetails(scope.row.id)">详情</el-button>
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
    <batch-allocation ref="allocation"></batch-allocation>
    <details-dialog ref="details"></details-dialog>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import BatchAllocation from './components/BatchAllocation'
import DetailsDialog from './components/DetailsDialog'

export default {
  name: '',
  components: {
    Treeselect,
    BatchAllocation,
    DetailsDialog
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        channel: null,
      },
      alllocationList: [
        {
          id: 12323,
          allocatedTime: '2020-02-19 12:20:18',
          channel: '1000645 渠道商简称',
          number: 100,
          batch: '批次1',
          operator: '西欧奥明',
        },
        {
          id: 332322,
          allocatedTime: '2020-02-19 12:20:18',
          channel: '1000645 渠道商简称',
          number: 100,
          batch: '批次1',
          operator: '西欧奥明',
        },
      ],
      /* 可搜索的下拉树，暂时将渠道商写死，后期接口调用获取 */
      channelData: [
        {
          id: '0',
          label: '全部渠道商'
        },
        {
          id: '1',
          label: '渠道商1',
          children: [
            {
              id: '1-1',
              label: '渠道商1-1',
            },
            {
              id: '1-2',
              label: '渠道商1-2',
            }
          ],
        },
        {
          id: '2',
          label: '渠道商2',
          children: [
            {
              id: '2-1',
              label: '渠道商2-1'
            }
          ]
        }
      ],
      currentPage: 1,
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
    headerStyle() {
      return "background: #F6F6F6; color: #172B4D;height: 42px;"
    },
    handleSizeChange() {
      console.log('handleSizeChange!!!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!!!')
    },
    /* 打开批量调拨 */
    openBatchAllocation() {
      this.$refs.allocation.dialogVisible = true
    },
    /* 查看详情 */
    viewDetails(id) {
      console.log(id)
      const detailsDialog = this.$refs.details
      detailsDialog.dialogVisible = true
      detailsDialog.allocationId = id
    }
  }
}
</script>

<style lang="scss">
.allocation-list {
  .content {
    padding: 0 120px;
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
