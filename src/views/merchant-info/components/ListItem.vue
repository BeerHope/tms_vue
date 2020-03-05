<template>
  <div class="merchant-list-item">
    <div class="item-left">
      <h4 class="m-t-16 m-b-20">
        <span class="first-line">【商户编号{{ itemData.id }}】</span>
        <span class="m-r-10">{{ itemData.name }}</span>
      </h4>
      <p class="details">
        <span class="m-r-30">所属渠道商：{{ itemData.attributedChannel }}</span>
        <span class="m-r-30">创建时间：{{ itemData.createdTime }}</span>
      </p>
    </div>
    <div class="item-right">
      <el-button class="line-type green-btn" @click="$emit('open-edit-dialog')">编辑</el-button>
      <el-button class="line-type blue-btn" @click="$emit('view-details')">详情</el-button>
      <el-button class="line-type blue-btn" @click="toManageTerminal">管理终端</el-button>
      <el-button class="line-type blue-btn" @click="toManageMachine">管理机具</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MerchantListItem',
  components: {},
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
    toManageTerminal() {
      this.$router.push('/merchant/terminal/list')
    },
    toManageMachine() {
      this.$router.push('/merchant/machine/list')
    }
  }
}
</script>

<style lang='scss' scoped>
  .merchant-list-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 118px;
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
    .el-button{
      min-width: 80px;
    }
  }
</style>

