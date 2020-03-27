<template>
  <div :class="['machine-app-item', customClass]" :style="{width: width,}">
    <el-checkbox class="m-r-20"></el-checkbox>
    <div class="m-r-20">
      <img src="@/assets/images/apk.png" alt="apk.png">
    </div>
    <div class="content">
      <h4 class="m-0">{{ itemData.appName }}</h4>
      <p class="m-t-0 m-b-16">
        <span>{{ itemData.version }}</span>
        <span>{{ itemData.apkName }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    itemData: {
      type: Object,
      default: () => null
    },
    width: {
      type: String,
      default: () => '220px'
    },
    customClass: {
      type: String,
      default: () => 'default-custom-class'
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
  methods: {}
}
</script>

<style lang='scss' scoped>
.machine-app-item{
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 20px;
  }
  .content{
    flex: auto;
    border-bottom: 1px solid #EAEAEA;
  }
}
.default-custom-class{
  margin-top: 0;
  padding-top: 20px;
  float: left;
}
</style>
