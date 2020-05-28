<template>
  <div class="list-item" :class="{'disabled': itemData.state===1}">
    <el-card shadow="hover">
      <div class="info" @click="toDetails(itemData.type, itemData.state)">
        <img :src="appImg" alt="应用包">
        <p class="name">{{ itemData.name }}</p>
      </div>
      <div class="operation" v-if="!itemData.state">
        <el-button type="primary" class="green-btn" @click="$emit('open-update-dialog')">更新</el-button>
      </div>
    </el-card>
    <div class="state unvalid" v-if="itemData.state===1">失效</div>
  </div>
</template>

<script>
import apkImg from '@/assets/images/apk.png'
import zipImg from '@/assets/images/zip.png'

export default {
  name: 'PackageListItem',
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
    }
  },
  computed: {
    appImg() {
      return this.itemData.type === 1 ? apkImg : zipImg
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    toDetails(type = 1, state = 0) {
      /* type ： 1系统， 2应用 */
      /* state: 0可用， 1失效 */
      if (!state) {
        if (type === 1) {
          this.$router.push('./my-file/details/system')
        } else if (type === 2) {
          this.$router.push('./my-file/details/app')
        }
      } else {
        if (type === 1) {
          this.$router.push(`./new-share/details/system/${state}`)
        } else if (type === 2) {
          this.$router.push(`./new-share/details/app/${state}`)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$borderColor: #e6e6e6;
$hoverTextColor: #3b78fc;
.list-item {
  display: inline-block;
  width: 228px;
  height: 196px;
  margin: 10px 26px 10px 0;
  margin-right: 20px;
  position: relative;
  &.disabled{
    &::before{
      display: block;
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      top: 1px;
      right: 1px;
      border-top: 52px solid #BFC1C1;
      border-left: 56px solid transparent;
      // transform: rotate(45deg);
    }
    &::after{
      display: block;
      position: absolute;
      content: '';
      right: 1px;
      top: 1px;
      width: 0;
      height: 0;
      border-top: 22px solid #fff;
      border-left: 23px solid transparent;
    }
  }
 
  cursor: pointer;
  .el-card__body {
    height: 100%;
  }
  .el-card {
    height: 100%;
    text-align: center;
    .info{
      height: calc(100% - 35px);
      padding-top: 10px;
      .name{
        font-size: 16px;
      }
     
    }
    .operation{
      .el-button{
        width: 100px;
        border-radius: 15px;
      }
    }
  }
  .state.unvalid{
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    line-height: 38px;
    text-align: center;
    color: #fff;
    transform: rotate(45deg);
  }
}
</style>
