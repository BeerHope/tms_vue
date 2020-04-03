<template>
  <div class="machine-list-item">
    <div class="item-left">
      <img width="80%" class="m-t-6" :src="itemData.modelPic" alt="pos image">
    </div>
    <div class="item-middle">
      <h4 class="m-t-16 m-b-16">
        <span class="m-r-10">{{ itemData.sn }}</span>
        <span class="m-r-20">({{ itemData.modelName }})</span>
      </h4>
      <p class="details bind-info">
        <!-- <span class="m-r-8">商户编号</span> -->
        <span>{{ $t('machine.list.merchant') }}</span>
        <span class="m-r-30">
          <span v-if="itemData.merchantNo" class="m-r-4">{{ itemData.merchantNo }}</span>
          <span>{{ itemData.merchantName || '--' }}</span>
        </span>
        <span class="m-r-30">({{ $t('machine.list.terminalNo') }}{{ itemData.terminalNo || '--' }})</span>
        <span>{{ itemData.state === 1 ? $t('machine.list.bindTimeText') : $t('machine.list.unbindTimeText') }}
          {{ itemData.bindOrUnBindTime | formatTime }}
        </span>
      </p>
      <p class="details">
        <span class="m-r-30">
          {{ $t('machine.list.companyName') }}{{ itemData.companyName }}
        </span>
        <span class="m-r-30">
          {{ $t('machine.list.createTime') }}{{ itemData.createTime | formatTime }}
        </span>
      </p>
    </div>
    <div class="item-right">
      <el-button class="line-type green-btn" @click="$emit('open-edit-dialog')">
        {{ $t('machine.list.edit') }}
      </el-button>
      <el-button class="line-type blue-btn" @click="toDetails(itemData.id)">
        {{ $t('machine.list.details') }}
      </el-button>
      <!-- 可进行解绑操作，表示为未解绑 -->
      <el-button
        v-if="itemData.state === 1" class="line-type blue-btn"
        @click="handleUnbind(itemData)">
        {{ $t('machine.list.unbind') }}
      </el-button>
      <el-button 
        v-else 
        class="line-type blue-btn" 
        @click="$emit('open-bind-dialog')">
        {{ $t('machine.list.bind') }}
      </el-button>
      <el-button class="line-type blue-btn" @click="toControl(itemData.id)">
        {{ $t('machine.list.remote') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { unbindTerminal } from '@/api/machine'
import { formatTime } from '@/utils/global'

export default {
  name: 'UserListItem',
  components: {},
  filters: {
    formatTime
  },
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
    handleUnbind(item) {
      const {
        sn,
        merchantName,
        terminalNo,
        id: machineId
      } = item
      const content = 
        `${this.$t('machine.unbind.content1')}
        ${sn}${this.$t('machine.unbind.content2')}
        ${merchantName}(${this.$t('machine.unbind.content3')}${terminalNo})
        ${this.$t('machine.unbind.content4')}?`
      this.$confirm(content, this.$t('machine.unbind.title'), {
        confirmButtonText: this.$t('base.buttons.yes'),
        cancelButtonText: this.$t('base.buttons.no'),
        customClass: 'delete-confirm'
      }).then(() => {
        unbindTerminal(machineId).then(res => {
          this.$emit('refresh')
          this.$message.success(this.$t('base.tips.unbindSuccess'))
        })
      }).catch(() => {
        console.log('cancel to unbind')
      })
    },
    toDetails(machineId) {
      this.$router.push(`./details/${machineId}`)
    },
    toControl(machineId) {
      this.$router.push(`./control/${machineId}`)
    }
  }
}
</script>

<style lang='scss' scoped>
  $color-172B4D: #172B4D;
  $color-7A8190: #7A8190;
  
  .machine-list-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 140px;
    padding: 16px 0;
    border-bottom: 1px solid #EAEAEA;
    .item-left{
      margin-right: 20px;
      margin-top: -20px;
      text-align: center;
    }
    .item-middle{
      font-size: 18px;
      color: $color-172B4D;
      width: 52%;
      max-width: 1000px;
      .details{
        font-size: 14px;
        color: $color-7A8190;
        &.bind-info{
          color: $color-172B4D;
        }
      }
    }
  }
</style>
