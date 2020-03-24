<template>
  <div class="merchant-list-item">
    <div class="item-left">
      <h4 class="m-t-16 m-b-20">
        <span class="first-line">【商户编号{{ itemData.id }}】</span>
        <span class="m-r-10">{{ itemData.name }}</span>
        <span v-if="itemData.state" class="state right disabled">未绑定</span>
      
      </h4>
      <p class="details">
        <span class="m-r-30">终端号：{{ itemData.terminalId }}</span>
        <span class="m-r-30">绑定设备：{{ itemData.equipment }}</span>
        <span class="m-r-30">所属渠道商：{{ itemData.attributedChannel }}</span>
        <span class="m-r-30">创建时间：{{ itemData.createdTime }}</span>
      </p>
    </div>
    <div class="item-right">
      <el-button class="line-type green-btn" @click="$emit('open-edit-dialog')">编辑</el-button>
      <el-button class="line-type blue-btn" @click="$emit('view-details')">详情</el-button>
      <el-button class="line-type blue-btn" v-if="!itemData.state" @click="$emit('handle-unbind')">解绑</el-button>
      <el-button class="line-type blue-btn" v-if="itemData.state" @click="$emit('open-bind-dialog')">绑定</el-button>
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

