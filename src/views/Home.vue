<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-input v-model="value" :style="{width: '200px'}">
      <svg-icon slot="prefix" icon-class="allocation" class="m-r-4"></svg-icon>搜索

    </el-input>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      value: 'test000001'
    }
  }
}
</script>
