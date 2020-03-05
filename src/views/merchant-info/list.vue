<template>
  <div class="merchant-list common-list">
    <div class="filter-box p-t-6 p-b-6">
      <el-input class="filter-item" v-model="filter.merchantId" clearable placeholder="商户编号"></el-input>
      <el-input class="filter-item" v-model="filter.merchantName" clearable placeholder="商户名称"></el-input>
      <treeselect class="filter-item" v-model="filter.channel" :options="channelData" placeholder="渠道商"></treeselect>
      <el-button type="primary">
        <svg-icon icon-class="search"></svg-icon>
        搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog(0, -1, true)">
        <svg-icon icon-class="type-in"></svg-icon>
        录入商户
      </el-button>
      <el-button type="primary" class="green-btn" @click="openImportDialog">
        <svg-icon icon-class="batch-edit"></svg-icon>
        批量录入
      </el-button>
    </div>
    <div class="m-t-20">
      <list-item
        v-for="item in merchantList" :key="item.id"
        @open-edit-dialog="openDialog(1, item.id, true)"
        @view-details="openDialog(2, item.id, true)"
        :item-data="item">
      </list-item>
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
    <merchant-dialog ref="merchantDialog"></merchant-dialog>
    <import-dialog ref="importDialog" title="批量录入"></import-dialog>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import ImportDialog from '@/components/Upload'
import MerchantDialog from './components/MerchantDialog'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: '',
  components: {
    ListItem,
    ImportDialog,
    MerchantDialog,
    Treeselect
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        merchantId: '',
        merchantName: '',
        channel: null,
        terminalId: '',
        state: ''
      },
      cellStyle() {
        return {
          textAlign: 'center'
        }
      },
      headerStyle() {
        return {
          color: '#172B4D',
          fontSize: '16px',
          textAlign: 'center',
          padding: '20px 0'
        }
      },
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
      states: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '激活'
        },
        {
          value: 1,
          label: '冻结'
        }
      ],
      merchantList: [
        {
          id: 10056,
          name: '一级渠道商直属商户名称',
          operationTime: '2020-02-20 10:10:30',
          attributedChannel: '一级渠道商A简称',
          createdTime: '2019-05-30 20:04:05',
        },
        {
          id: 10057,
          name: '一级渠道商直属商户名称',
          operationTime: '2020-02-20 10:10:30',
          attributedChannel: '一级渠道商A简称',
          createdTime: '2019-05-30 20:04:05',
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
    handleSizeChange() {
      console.log('handleSizeChange!!!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!!!')
    },
    openDialog(flag = 0, merchantId = -1, dialogVisible = true) {
      const merchantDialog = this.$refs.merchantDialog
      _.assign(merchantDialog, {
        flag,
        merchantId,
        dialogVisible
      })
      console.log('添加渠道商！！！')
    },
    openImportDialog() {
      this.$refs.importDialog.dialogVisible = true
    },
  }
}
</script>

<style lang='scss' scoped>
.merchant-list{
  .filter-box{
    display: flex;
  }
}
</style>
<style lang="scss">
.merchant-list{
  .el-button{
    min-width: auto;
  }
}
</style>
