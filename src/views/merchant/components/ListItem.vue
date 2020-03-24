<template>
  <div class="merchant-list-item">
    <div class="item-left">
      <h4 class="m-t-16 m-b-20">
        <span class="first-line">【{{ $t('merchant.list.merchantNo') }} {{ itemData.merchantNo }}】</span>
        <span class="m-r-10">{{ itemData.name }}</span>
      </h4>
      <p class="details">
        <span class="m-r-30">{{ $t('merchant.list.company') }}{{ itemData.companyName }}</span>
        <span class="m-r-30">{{ $t('merchant.list.createTime') }}{{ itemData.createTime | mapTime }}</span>
      </p>
    </div>
    <div class="item-right">
      <el-button class="line-type green-btn" @click="$emit('open-edit-dialog')">{{ $t('merchant.list.edit') }}</el-button>
      <el-button class="line-type blue-btn" @click="$emit('view-details')">{{ $t('merchant.list.details') }}</el-button>
      <el-button class="line-type blue-btn" @click="toManageTerminal">{{ $t('merchant.list.manageTerminal') }}</el-button>
      <el-button class="line-type blue-btn" @click="toManageMachine">{{ $t('merchant.list.manageMachine') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MerchantListItem',
  components: {},
  filters: {
    mapTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
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

