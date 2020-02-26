<template>
  <div class="user-list-item">
    <div class="item-left">
      <svg-icon icon-class="username"></svg-icon>
    </div>
    <div class="item-middle">
      <h4 class="m-t-16 m-b-16">
        <span class="m-r-10">{{ itemData.abbreviation }}</span>
        <span class="m-r-20">({{ itemData.number }})</span>
        <span :class="['state right', itemData.state === 0 ? 'enabled' : 'disabled']">
          {{ itemData.state === 0 ? '激活': '冻结' }}
        </span>
      </h4>
      <p class="details">
        <span class="m-r-30">创建时间：{{ itemData.createdTime }}</span>
      </p>
    </div>
    <div class="item-right" v-if="itemData.state === 0">
      <el-button class="line-type green-btn" @click="$emit('open-edit-dialog')">编辑</el-button>
      <el-button class="line-type blue-btn">冻结</el-button>
      <el-button class="line-type blue-btn">查看层级</el-button>
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
  }
</style>
