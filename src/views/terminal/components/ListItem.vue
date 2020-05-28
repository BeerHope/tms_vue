<template>
  <div class="terminal-list-item">
    <div class="item-left">
      <h4 class="m-t-16 m-b-20">
        <span class="first-line">【{{ $t('terminal.list.merchantNo') }}{{ itemData.merchantNo }}】</span>
        <span class="m-r-24">{{ itemData.merchantName }}</span>
        <span class="state right" :class="itemData.state === 1 ? 'enabled' : 'disabled'">{{ itemData.state | curState($t('terminal.states')) }}</span>
      </h4>
      <p class="details">
        <span :class="marginRight">{{ $t('terminal.list.terminalNo') }}{{ itemData.terminalNo }}</span>
        <span :class="marginRight">{{ $t('terminal.list.sn') }}{{ itemData.sn || '--' }}</span>
        <span :class="marginRight">{{ $t('terminal.list.companyName') }}{{ itemData.companyName }}</span>
        <span>{{ $t('terminal.list.createTime') }}{{ itemData.createTime || '--' }}</span>
      </p>
    </div>
    <div class="item-right">
      <el-button class="line-type green-btn" @click="$emit('open-edit-dialog')">{{ $t('terminal.list.edit') }}</el-button>
      <el-button class="line-type blue-btn" @click="$emit('view-details')">{{ $t('terminal.list.details') }}</el-button>
      <el-button class="line-type blue-btn" v-if="itemData.state === 1" @click="$emit('handle-unbind')">{{ $t('terminal.list.unbind') }}</el-button>
      <el-button class="line-type blue-btn" v-if="itemData.state === 2" @click="$emit('open-bind-dialog')">{{ $t('terminal.list.bind') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TerminalList',
  components: {},
  filters: {
    curState(val, states) {
      const curState = _.find(states, { value: _.toNumber(val) })
      return curState && curState.label
    }
  },
  props: {
    itemData: {
      type: Object,
      default: () => null
    },
  },
  directive: {},
  data() {
    return {
      curState: 1,
    }
  },
  computed: {
    marginRight() {
      const screenWidth = window.screen.width
      if (screenWidth <= 1366) {
        return 'm-r-20'
      }
      return 'm-r-30'
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
  .terminal-list-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 118px;
    padding: 16px 0;
    border-bottom: 1px solid #EAEAEA;
    .item-left{
      font-size: 18px;
      color: #172B4D;
      width: 64%;
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
  @media screen and (max-width: 1440px){
    .terminal-list-item{
      .item-left{
        width: 70%;
      }
    }
  }
  @media screen and (max-width: 1366px){
    .terminal-list-item{
      .item-left{
        width: 70%;
      }
    }
  }
</style>
