<template>
  <div class="user-list-item">
    <div class="item-left">
      <h4 class="m-t-16 m-b-16">
        <span class="first-line">【渠道商编号{{ itemData.customerCode }}】</span>
        <span class="m-r-10">{{ itemData.shortName }}</span>
        <span :class="['state right', stateClass(itemData)]">
          {{ itemState('base.states', itemData) }}
        </span>
      </h4>
      <p class="details">
        <span class="m-r-30">创建时间：{{ itemData.createTime }}</span>
      </p>
    </div>
    <div class="item-right">
      <el-button class="line-type green-btn" @click="$emit('open-edit-dialog')">编辑</el-button>
      <el-button class="line-type blue-btn" @click="freezeAccount()">冻结</el-button>
      <el-button class="line-type blue-btn" @click="$emit('view-level')">查看层级</el-button>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin'

export default {
  name: 'ChannelListItem',
  components: {},
  mixins: [mixin],
  props: {
    itemData: {
      type: Object,
      default: () => null
    }
  },
  directive: {},
  data() {
    return {
      curState: 1,
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
    freezeAccount() {
      this.$confirm('请确认是否冻结${渠道商简称}(${渠道商编号})', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        // customClass: 'delete-confirm'
      }).then(() => {
        // 进行删除操作
        this.$message.success('账号已经被冻结')
      }).catch(() => {
        console.log('取消冻结账号！！！')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .user-list-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 106px;
    padding: 16px 0;
    border-bottom: 1px solid #EAEAEA;
    .item-left{
      font-size: 18px;
      color: #172B4D;
      width: 60%;
      max-width: 1000px;
      .first-line{
        display: inline-block;
        text-indent: -8px;
      }
      .details{
        font-size: 14px;
        color: #9297A3;
      }
    }
  }
</style>
