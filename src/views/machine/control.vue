<template>
  <div class="machine-control">
    <section class="content">
      <dl>
        <dt>日志管理</dt>
        <dd>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="打开Error日志"></el-checkbox>
            <el-checkbox label="打开Debug日志"></el-checkbox>
            <el-checkbox label="打开Info日志"></el-checkbox>
          </el-checkbox-group>
        </dd>
      </dl>
      <dl>
        <dt>OTA升级</dt>
        <dd>
          <el-radio-group v-model="radio">
            <el-radio label="open">开启</el-radio>
            <el-radio label="close">关闭</el-radio>
          </el-radio-group>
        </dd>
      </dl>
      <dl style="overflow: hidden;">
        <dt>远程控制命令</dt>
        <dd>
          <div>
            <el-select v-model="currentDirective" class="m-r-40">
              <el-option
                v-for="(item, index) in directives" :key="item.value+index"
                :value="item.value" :label="item.label">
              </el-option>
            </el-select>
            <el-button type="primary" class="m-l-0">设置</el-button>
            <el-button type="primary">清除命令</el-button>
          </div>
          <app-item v-for="item in appList" :key="item.id" :item-data="item"
            width="100%" custom-class="custom-app-list">
          </app-item>
        </dd>
      </dl>
      <dl>
        <dt class="clearfix">最近下发指令</dt>
        <dd>
          <el-table :data="recentDirectiveList">
            <el-table-column prop="setTime" label="设置时间"></el-table-column>
            <el-table-column prop="directive" label="指令"></el-table-column>
            <el-table-column prop="sendTime" label="下发时间"></el-table-column>
          </el-table>
        </dd>
      </dl>
    </section>
  </div>
</template>

<script>
import AppItem from './components/AppItem'

export default {
  name: '',
  components: {
    AppItem
  },
  props: {},
  directive: {},
  data() {
    return {
      checkList: [],
      radio: '',
      currentDirective: '',
      directives: [
        {
          value: 1,
          label: '打开debug'
        },
        {
          value: 2,
          label: '未设置'
        },
        {
          value: 3,
          label: '重启'
        }
      ],
      /* 最近下发指令，展示最新的5条记录 */
      recentDirectiveList: [
        {
          setTime: '2020-03-02 09:30:10',
          directive: '重启',
          sendTime: '2020-03-02 09::40:10'
        },
        {
          setTime: '2020-03-02 09:30:10',
          directive: '关机',
          sendTime: '2020-03-02 09::40:10'
        }
      ],
      appList: [
        {
          id: '2412412',
          appName: '微信',
          icon: '',
          version: 'V1.0.0',
          apkName: '应用包名称'
        },
        {
          id: '2412411212122',
          appName: '今日头条',
          icon: '',
          version: 'V1.0.0',
          apkName: '应用包名称'
        },
        {
          id: '241234342412',
          appName: '支付宝',
          icon: '',
          version: 'V1.0.0',
          apkName: '应用包名称'
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
.machine-control{
  padding: 0 120px;
 
  .content {
    max-width: 700px;
    margin: auto;
    dl{
      margin-bottom: 30px;
    }
    dt{
      padding-bottom: 20px;
      font-size: 16px;
      color: #172B4D;
      margin: 0;
    }
    dd {
      height: 34px;
      line-height: 34px;
      margin-left: 70px;
    }
    .el-checkbox, .el-radio{
      display: inline-block;
      width: 160px;
    }
    .custom-app-list{
      float: left;
      padding-top: 20px;
    }
  }
}
</style>
<style lang="scss">
.machine-control{
  .el-checkbox__inner, .el-radio__inner{
    border-color: #7A8190;
  }
  
}
</style>
