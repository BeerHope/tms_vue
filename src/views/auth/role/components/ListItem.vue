<template>
  <div class="list-item">
    <el-card>
      <div :class="['state', itemData.state === 0 ? 'enabled' : 'disabled']">{{ itemData.state === 0 ? '启用': '禁用' }}</div>
      <div class="role-info">
        <el-avatar :size="72" :src="circleUrl"></el-avatar>
        <p class="name">{{ itemData.name }}</p>
        <p class="desc">{{ itemData.remark }}</p>
      </div>
      <div class="operation">
        <span @click="doEdit">编辑</span>
        <span @click="manageUser">管理用户</span>
        <span>新增用户</span>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'ListItem',
  components: {},
  props: {
    itemData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  directive: {},
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
    doEdit() {
      console.log('1111')
      this.$emit('edit')
    },
    manageUser () {
      console.log('管理用户')
      this.$emit('manageUser')
    }
  }
}
</script>

<style lang='scss' scoped>
  .list-item{
    display: inline-block;
    width: calc(25% - 19.5px);
    height: 302px;
    margin: 10px 0;
    &:nth-child(4n+2), &:nth-child(4n+3), &:nth-child(4n+4){
      margin-left: 26px;
    }
    .el-card__body{
      height: 100%;
    }
    .el-card{
      height: 100%;
      text-align: center;
      .el-card__body{
        .state{
          float: right;
          margin-top: -20px;
        }
        .role-info{
          margin-top: 46px;
          .name{
            font-size: 18px;
          }
          .desc{
            font-size: 14px;
            color: #666;
          }
        }
        .operation{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          text-align: left;
          margin-top: 26px;
          border-top: 1px solid #e6e6e6;
          padding-top: 20px;
          span{
            display: inline-block;
            cursor: pointer;
            &:first-child{
              text-align: left;
              padding-right: 24px;
              border-right: 1px solid #e6e6e6;
            }
            &:nth-child(2){
              text-align: center;
            }
            &:nth-child(3){
              text-align: right;
              padding-left: 24px;
              border-left: 1px solid #e6e6e6;
            }
          }
        }
      }
    }
  }
</style>
