<template>
  <div class="no-result" :style="{height}">
    <div> 
      <img src="@/assets/images/no-result.png" alt="No search result">
      <p>{{$t('base.noResult.desc')}}</p>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin'

export default {
  name: '',
  components: {},
  mixins: [mixin],
  props: {},
  directive: {},
  data() {
    return {
      height: {
        type: String | Number,
        default: '660px'
      }
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
.no-result{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 660px;
  text-align: center;
  p{
    color: #172B4D;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
