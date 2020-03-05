<template>
  <div class="channel-list common-list">
    <div class="filter-box p-t-6 p-b-6 m-b-20">
      <treeselect class="filter-item" v-model="filter.channel" :options="channelData" placeholder="渠道商"></treeselect>
      <el-select class="filter-item" v-model="filter.attribution" clearable placeholder="归属">
        <el-option
          v-for="item in attributions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select class="filter-item" v-model="filter.state" clearable placeholder="状态">
        <el-option
          v-for="item in states"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary">
        <svg-icon icon-class="search"></svg-icon>
        搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog()">
        <svg-icon icon-class="add"></svg-icon>
        添加渠道商
      </el-button>
    </div>
    <div class="common-table">
      <list-item
        v-for="(item, index) in channelList" :key="index"
        :item-data="item" @open-edit-dialog="openDialog(1, 123, true)"
        @view-level="viewLevel(1233)"
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
    <channel-dialog ref="channelDialog"></channel-dialog>
    <channel-level ref="channelLevel"></channel-level>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import ListItem from './components/ListItem.vue'
import ChannelDialog from './components/ChannelDialog'
import ChannelLevel from './components/ChannelLevel'

export default {
  name: 'ChannelList',
  components: {
    Treeselect,
    ListItem,
    ChannelDialog, /* add or edit channel */ 
    ChannelLevel
  },
  props: {},
  directive: {},
  data() {
    return {
      /* 查询条件 */
      selectedChannel: '',
      filter: {
        channel: null,
        attribution: '',
        state: '',
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
      attributions: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '直接下级',
          value: 'directSubordinates '
        },
        {
          label: '间接下级',
          value: 'indirectSubordinates '
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
      channelList: [
        {
          number: 32432423423,
          abbreviation: '渠道商1',
          createdTime: '2020-02-10 11:09:30',
          state: 0, /* 0:激活，1：冻结 */
        },
        {
          number: 43244324321,
          abbreviation: '渠道商1',
          createdTime: '2020-02-10 11:09:30',
          state: 1,
        }
      ],
      currentPage: 1,
      total: 10,
      defaultProps: {
        label: 'label',
        children: 'children'
      }
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
    openDialog(flag = 0, channelId = -1, dialogVisible = true) {
      const channelDialog = this.$refs.channelDialog
      _.assign(channelDialog, {
        flag,
        channelId,
        dialogVisible
      })
    },
    viewLevel(channelId = 1, dialogVisible = true) {
      console.log('查看详情')
      const channelLevel = this.$refs.channelLevel
      _.assign(channelLevel, {
        channelId,
        dialogVisible
      })
    },
    handleSizeChange() {
      console.log('handleSiseChange！！！！')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!!')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
