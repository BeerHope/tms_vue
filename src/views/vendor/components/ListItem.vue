<template>
  <div class="vendor-list-item list-item">
    <div class="vendor-bg-img">
      <img src="@/assets/images/vendor.png" alt="vendor.png">
    </div>
    <p class="info">
      <span>{{ data.name }}</span>
      <span>({{ data.code }})</span>
    </p>
    <el-button 
      class="green-btn edit-btn" type="primary"
      @click="$emit('handle-edit')">
      {{ $t('vendor.list.edit') }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return []
      }
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

.vendor-list-item{
  &.list-item{
    width: 246px;
    height: 250px;
    text-align: center;
    border: 1px solid #538AE6;
    border-radius: 8px;
    margin-right: 28px;
    margin-top: 40px;
    &:last-child{
      margin-right: 0;
    }
  }
  .vendor-bg-img{
    height: 52%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
  }
  .info{
    font-size: 14px;
    margin: 22px auto;
    color: #505F79;
  }
  .edit-btn{
    border-radius: 16px;
    min-width: 100px;
  }
}
</style>
