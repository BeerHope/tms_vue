<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="详情"
    width="40%">
    <el-form class="common-form" label-width="80px">
      <el-form-item>
        <img slot="label" width="50" src="@/assets/images/zip.png" alt="">
        <!-- <svg-icon slot="label" icon-class="package" style="font-size: 60px"></svg-icon> -->
        <div class="desc">应用包名称</div>
        <div class="desc">版本20200220123030</div>
      </el-form-item>
      <el-form-item label="支持版本">
        <span>v1.10.19</span>
      </el-form-item>
      <el-form-item label="更新内容">
        <span>被删除包的更新详细信息被删除包的更新信息</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible=false">关 闭</el-button>
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
      dialogVisible: false
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
.desc{
  line-height: 20px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
