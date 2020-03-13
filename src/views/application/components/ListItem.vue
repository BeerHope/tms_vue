<template>
  <div class="list-item">
    <el-card shadow="hover">
      <div class="info" @click="toDetails">
        <img :src="appImg" alt="应用包">
        <p class="name">{{ itemData.name }}</p>
        <p class="model">{{ itemData.model }}</p>
      </div>
      <div class="operation">
        <span @click="$emit('open-update-dialog')">更新</span>
        <span class="line"></span>
        <span>推送</span>
      </div>
    </el-card>
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
      return this.itemData.type ? apkImg: zipImg
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    toDetails() {
      this.$router.push('./details')
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
  height: 220px;
  margin: 10px 26px 10px 0;
  margin-right: 20px;
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
      .model{
        color: #666;
      }
    }
    .operation{
      display: flex;
      justify-content: space-around;
      border-top: 1px solid $borderColor;
      height: 50px;
      line-height: 30px;
      padding: 10px 0;
      .line{
        width: 1px;
        background-color: $borderColor;
      }
      span:not(.line) {
        cursor: pointer;
        &:hover{
          color: $hoverTextColor;
        }
      }
    }
  }
}
</style>
