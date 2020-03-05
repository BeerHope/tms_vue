<template>
  <el-dialog
    title="查看层级"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <span>查看层级！！！！！</span>
    <p v-for="item in levels" :key="item.id">
      <span :style="{marginLeft: `${100+10}`}">{{item.level}}</span>
      <span>{{item.label}}</span>
    </p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      channelId: '',
      levels: [
        {
          id: '122323',
          level: '一级渠道商',
          shortName: '渠道商简称',
        },
        {
          id: '4233434',
          level: '二级渠道商',
          shortName: '渠道商简称'
        },
        {
          id: '12323545',
          level: '三级渠道商',
          shortName: '渠道商简称'
        },
        {
          id: '4234324324',
          level: '四级渠道商',
          shortName: '渠道商简称'
        }
      ]
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

</style>
