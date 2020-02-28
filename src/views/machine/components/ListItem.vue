<template>
  <div class="user-list-item">
    <div class="item-left">
      <svg-icon icon-class="username"></svg-icon>
    </div>
    <div class="item-middle">
      <h4 class="m-t-16 m-b-16">
        <span class="m-r-10">{{ itemData.id }}</span>
        <span class="m-r-20">({{ itemData.model }})</span>
        <span :class="['state right', itemData.state === 0 ? 'enabled' : 'disabled']">
          {{ itemData.state === 0 ? '解绑': '未解绑' }}
        </span>
      </h4>
      <p class="details">
        <!-- <span class="m-r-8">商户编号</span> -->
        <span class="m-r-8">{{ itemData.merchantId }}</span>
        <span class="m-r-8">商户名称</span>
        <span class="m-r-30">(终端号：342238)</span>
        <span>解绑时间：{{ itemData.operatedTime }}</span>
      </p>
      <p class="details">
        <span class="m-r-30">所属渠道商：{{ itemData.attributionChannel }}</span>
        <span class="m-r-30">创建时间：{{ itemData.createdTime }}</span>
      </p>
    </div>
    <div class="item-right" v-if="itemData.state === 0">
      <el-button class="line-type green-btn">编辑</el-button>
      <el-button class="line-type blue-btn">详情</el-button>
      <el-button class="line-type blue-btn">解绑</el-button>
      <el-button class="line-type blue-btn">远程控制</el-button>
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
  methods: {
    freezeAccount() {
      this.$confirm('请确认是否冻结${渠道商简称}(${渠道商编号})', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
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
    height: 140px;
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
