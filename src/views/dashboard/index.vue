<template>
  <div class="dashboard-container">
    <div>首页</div>
    <div class="dashboard-text">username: {{ account }}</div>
    <!-- <div class="dashboard-text">test: {{ $t('login.submit') }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'account'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
