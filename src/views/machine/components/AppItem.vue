<template>
  <div class="machine-app-item">
    <div class="m-r-20">
      <img src="@/assets/images/apk.png" alt="apk.png">
    </div>
    <div class="content">
      <h4 class="m-t-0">{{ itemData.appName }}</h4>
      <p>
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
  float: left;
  margin-top: 0;
  padding-top: 40px;
  width: 220px;
  &:not(:last-child) {
    margin-right: 20px;
  }
  .content{
    border-bottom: 1px solid #EAEAEA;
  }
}
</style>
