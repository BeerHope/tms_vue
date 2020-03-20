<template>
  <div class="user-list-item">
    <div class="item-left">
      <h4 class="m-t-16 m-b-16">
        <span class="first-line">【{{ $t('company.list.customerCode') }}{{ itemData.customerCode }}】</span>
        <span class="m-r-10">{{ itemData.shortName }}</span>
        <span :class="['state right', stateClass(itemData)]">
          {{ itemState('base.states', itemData) }}
        </span>
      </h4>
      <p class="details">
        <span class="m-r-30">{{ $t('company.list.customerCode') }}{{ itemData.createTime }}</span>
      </p>
    </div>
    <div class="item-right">
      <el-button class="line-type green-btn" @click="$emit('open-edit-dialog')">{{ $t('company.list.edit') }}</el-button>
      <el-button v-if="mapState===1" class="line-type blue-btn" @click="freeze(itemData)">{{ $t('company.list.freeze') }}</el-button>
      <el-button v-else class="line-type blue-btn" @click="activate(itemData)">{{ $t('company.list.activate') }}</el-button>
      <el-button class="line-type blue-btn" @click="$emit('view-level')">{{ $t('company.list.viewLevel') }}</el-button>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin'
import { freezeCompany, activateCompany } from '@/api/company'

export default {
  name: 'ChannelListItem',
  components: {},
  mixins: [mixin],
  props: {
    itemData: {
      type: Object,
      default: () => null
    }
  },
  directive: {},
  data() {
    return {
      curState: 1,
    }
  },
  computed: {
    mapState() {
      return _.toNumber(this.itemData.state)
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    freeze(item) {
      const { shortName, customerCode, id: companyId } = item
      this.$confirm(
        `${this.$t('company.list.tips.freezeContent')}：${shortName}(${customerCode})`,
        this.$t('company.list.tips.freezeTitle'), {
          confirmButtonText: this.$t('base.buttons.yes'),
          cancelButtonText: this.$t('base.buttons.no'),
        }).then(() => {
        freezeCompany(companyId).then(res => {
          this.$emit('refresh')
          this.$message.success(this.$t('company.list.tips.freezeSuccess'))
        })
      }).catch(() => {
        console.log('cancel to freeze~~~')
      })
    },
    activate(item) {
      const { shortName, customerCode, id: companyId } = item
      this.$confirm(
        `${this.$t('company.list.tips.activateContent')}：${shortName}(${customerCode})`,
        this.$t('company.list.tips.activateTitle'), {
          confirmButtonText: this.$t('base.buttons.yes'),
          cancelButtonText: this.$t('base.buttons.no'),
        }).then(() => {
        activateCompany(companyId).then(res => {
          this.$emit('refresh')
          this.$message.success(this.$t('company.list.tips.activateSuccess'))
        })
      }).catch(() => {
        console.log('cancel to activate~~~')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .user-list-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 106px;
    padding: 16px 0;
    border-bottom: 1px solid #EAEAEA;
    .item-left{
      font-size: 18px;
      color: #172B4D;
      width: 60%;
      max-width: 1000px;
      .first-line{
        display: inline-block;
        text-indent: -8px;
      }
      .details{
        font-size: 14px;
        color: #9297A3;
      }
    }
  }
</style>
