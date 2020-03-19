<template>
  <div class="user-list-item">
    <div class="item-left">
      <svg-icon icon-class="username"></svg-icon>
    </div>
    <div class="item-middle">
      <h4 class="m-t-16 m-b-16">
        <span class="m-r-10">{{ itemData.name }}</span>
        <span class="m-r-20">({{ itemData.account }})</span>
        <span :class="['state right', stateClass(itemData)]">
          {{ itemState('base.states', itemData) }}
        </span>
      </h4>
      <p class="details">
        <span class="m-r-30">{{ $t('user.list.createTime') }}{{ itemData.createTime }}</span>
        <span>{{ $t('user.list.companyName') }}{{ itemData.companyName }}</span>
      </p>
    </div>
    <div class="item-right" v-if="itemData.state === 1">
      <el-button class="line-type blue-btn" @click="$emit('open-password-dialog')">{{ $t('user.list.resetPassword') }}</el-button>
      <el-button class="line-type green-btn" type="primary" @click="toEdit(itemData.id)">{{ $t('user.list.edit') }}</el-button>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin'

export default {
  name: 'UserListItem',
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
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    toEdit(userId) {
      this.$router.push(`./${userId}/details`)
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
      margin-right: 20px;
      margin-top: -36px;
      .svg-icon{
        width: 40px;
        height: 40px;
        color: #87A7D6;
      }
    }
    .item-middle{
      font-size: 18px;
      color: #172B4D;
      width: 60%;
      max-width: 1000px;
      .details{
        font-size: 14px;
        color: #9297A3;
      }
    }
  }
</style>
