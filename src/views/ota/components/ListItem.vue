<template>
  <div class="list-item">
    <el-card shadow="hover">
      <div class="info" @click="toDetails(itemData.id)">
        <svg-icon style="font-size: 50px;" icon-class="package"></svg-icon>
        <p class="name">{{ itemData.name }}</p>
        <p class="model">${机型}</p>
      </div>
      <div class="operation">
        <span @click.stop="$emit('open-update-dialog')">{{ $t('ota.list.update') }}</span>
        <span class="line"></span>
        <span>{{ $t('ota.list.push') }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
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
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    toDetails(otaId) {
      this.$router.push(`./details/${otaId}`)
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
  height: 216px;
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
