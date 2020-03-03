<template>
  <div :class="['machine-app-item', customClass]" :style="{width: width,}">
    <div class="m-r-20">
      <img src="@/assets/images/apk.png" alt="apk.png">
    </div>
    <div class="content">
      <h4 class="m-0">{{ itemData.appName }}</h4>
      <p class="m-t-10 m-b-10">
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
  padding-top: 40px;
  float: left;
}
</style>
