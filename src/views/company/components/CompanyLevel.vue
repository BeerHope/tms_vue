<template>
  <el-dialog
    :title="$t('company.level.title')"
    :visible.sync="dialogVisible"
    @open="getLevelList"
    @close="resetLevel"
    width="40%">
    <div class="custom-dialog-body" v-loading="loading">
      <p class="level" v-for="(item, index) in levelList" :key="item.id">
        <span :style="{marginRight: `${110 + 60 * index}px`}">{{ item.level }}</span>
        <span :class="['shortname', {'active': index===levelList.length-1}]">{{ item.shortName }}</span>
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">{{ $t('company.level.close') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { viewLevel } from '@/api/company'
 
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      companyId: -1,
      levelList: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /* 渠道商层级转换翻译 */
    levelTranslate(val) {
      return this.$t(`company.level.level${val}`)
    },
    getLevelList() {
      this.loading = true
      viewLevel(this.companyId).then(res => {
        this.levelList = _.map(res.data, (item, index) => {
          const resItem = {}
          resItem.shortName = item
          resItem.level = this.levelTranslate(index + 1)
          return resItem
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    resetLevel() {
      this.levelList = []
    }
  }
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

<style lang="scss">
.custom-dialog-body {
  min-height: 400px;
}
</style>
