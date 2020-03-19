<template>
  <el-dialog
    title="查看层级"
    :visible.sync="dialogVisible"
    width="40%">
    <p class="level" v-for="(item, index) in levels" :key="item.id">
      <span :style="{marginRight: `${110+60*index}px`}">{{ item.level }}</span>
      <span :class="['shortname', {'active': index===levels.length-1}]">{{ item.shortName }}</span>
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
      companyInfoId: '',
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
.level{
  line-height: 80px;
  color: #172B4D;
  .shortname{
    &.active{
      line-height: 30px;
      display: inline-block;
      border-radius: 4px;
      padding: 2px 10px;
      color: #5087E5;
      border: 1px solid #5087E5;
      background-color: #EDF7FF;
    }
  }
}
</style>
