<template>
  <div class="common-list machine-list">
    <div class="filter-box p-t-6 p-b-6 m-b-20">
      <!-- 机身号：精确查询 -->
      <el-input class="filter-item" v-model="filter.sn" placeholder="机身号" clearable></el-input>
      <el-select class="filter-item" v-model="filter.state" placeholder="绑定状态" clearable>
        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.prop"></el-option>
      </el-select>
      <treeselect class="filter-item" v-model="filter.channel" :options="channelData" placeholder="渠道商"></treeselect>
      <!-- 商户编号：精确查询 -->
      <el-input class="filter-item" v-model="filter.marchantId" placeholder="商户编号" clearable></el-input>
      <el-input class="filter-item" v-model="filter.marchantName" placeholder="商户名称" clearable></el-input>
      <el-button type="primary">
        <svg-icon icon-class="search"></svg-icon>
        搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog()">
        <svg-icon icon-class="add"></svg-icon>
        添加机具
      </el-button>
      <el-button type="primary" class="green-btn">
        <i class="el-icon-upload2"></i>
        批量导入
      </el-button>
    </div>
    <div class="common-table">
      <list-item
        v-for="item in machineList" :key="item.id"
        :item-data="item"
        @handle-edit="openDialog(1, item.id, true)"
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
    <machine-dialog ref="machineDialog"></machine-dialog>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import MachineDialog from './components/MachineDialog'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'MachineList',
  components: {
    ListItem,
    MachineDialog,
    Treeselect
  },
  props: {},
  directive: {},
  data() {
    return {
      /* 无详情，以下字段后期修改 */
      filter: {
        sn: '',
        state: '',
        channel: null,
        merchantId: '', /* 商户编号 */
        merchantName: '', /* 商户名称 */
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
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '解绑'
        },
        {
          value: 1,
          label: '未解绑'
        }
      ],
      /* 类型：type： 1, 2, 3 -> 传统pos， 智能pos， 移动pos */
      /* 所属渠道商: attributionChannel */
      /* state: 0, 1 -> 解绑，未解绑 */
      /* 商户Id：merchantId */
      /* 商户名称：merchantName */
      /* 终端号： terminalId、 */
      machineList: [
        {
          id: 14423324,
          type: 1,
          model: 'G2',
          state: 0,
          sn: 'G2133021651',
          attributionChannel: '100056 一级渠道商A简称',
          merchantId: '76577',
          merchantName: '',
          terminalId: '',
          createdTime: '2020-02-12 10:09:28',
          operatedTime: '2020-02-17 10:09:28'
        },
        {
          id: 1442332324,
          type: 2,
          model: 'G2',
          state: 1,
          sn: 'G213302113431',
          attributionChannel: '100056 一级渠道商A简称',
          merchantId: '4324324',
          merchantName: '',
          terminalId: '',
          createdTime: '2020-02-12 12:09:28',
          operatedTime: '2020-02-22 10:09:28'
        },
        {
          id: 244233232422,
          type: 3,
          model: 'G2',
          state: 1,
          sn: 'G213302113431',
          attributionChannel: '100056 一级渠道商A简称',
          merchantId: '4324324',
          merchantName: '',
          terminalId: '',
          createdTime: '2020-02-12 12:09:28',
          operatedTime: '2020-02-22 10:09:28'
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
    openDialog(flag = 0, machineId = -1, dialogVisible = true) {
      const machineDialog = this.$refs.machineDialog
      _.assign(machineDialog, {
        flag,
        machineId,
        dialogVisible
      })
    },
    handleSizeChange() {
      console.log('handleSizeChange!!!!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!!')
    }
  }
}
</script>

<style lang='scss' scoped>
.machine-list{
  .filter-box{
    display: flex;
  }
}
</style>
