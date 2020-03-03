<template>
  <div class="user-list-item">
    <div class="item-left">
      <svg-icon icon-class="username"></svg-icon>
    </div>
    <div class="item-middle">
      <h4 class="m-t-16 m-b-16">
        <span class="m-r-10">{{ itemData.username }}</span>
        <span class="m-r-20">({{ itemData.account }})</span>
        <span :class="['state right', itemData.state === 0 ? 'enabled' : 'disabled']">
          {{ itemData.state === 0 ? '启用': '禁用' }}
        </span>
      </h4>
      <p class="details">
        <span class="m-r-30">创建时间：{{ itemData.createdTime }}</span>
        <span>所属渠道商：{{ itemData.channelProvider }}</span>
      </p>
    </div>
    <div class="item-right" v-if="itemData.state === 0">
      <el-button class="line-type blue-btn" @click="$emit('open-password-dialog')">重置密码</el-button>
      <el-button class="line-type green-btn" type="primary" @click="$emit('open-edit-dialog')">编辑</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserListItem',
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
  methods: {}
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
      margin-right: 20px;
      margin-top: -36px;
      .svg-icon{
        width: 40px;
        height: 40px;
        color: #87A7D6;
      }
    }
    .item-middle{
      font-size: 18px;
      color: #172B4D;
      width: 60%;
      max-width: 1000px;
      .details{
        font-size: 14px;
        color: #9297A3;
      }
    }
    .user-state {
      display: inline-block;
      margin-top: -20px;
      width: 56px;
      height: 28px;
      line-height: 28px;
      position: relative;
      text-align: left;
      text-indent: 10px;
      font-size: 14px;
      &:after {
        content: '';
        position: absolute;
        width: 0;
        border-top: 14px solid transparent;
        border-right: 12px solid #fff;
        border-bottom: 14px solid transparent;
        right: 0;
        bottom: 0;
      }
    }
  }
</style>
