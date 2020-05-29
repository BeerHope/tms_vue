<template>
  <div>
    这里是时区插件！！！！！
  </div>
</template>

<script>
import momentTimezone from 'moment-timezone'

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log(momentTimezone.tz.names(), 'moment-timezone！！！！')
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang='scss' scoped>

</style>
