<template>
  <el-tabs class="machine-details" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="机具详情" name="details">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix basic-info">
          <span>基本信息</span>
        </div>
        <div class="content">
          <el-row>
            <el-col :span="12">
              <span>型号：</span>
              <span>TPOS/G2</span>
            </el-col>
            <el-col :span="12">
              <span>机身号：</span>
              <span>SN243240734273421</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>报道周期(分钟)：</span>
              <span>TPOS/G2</span>
            </el-col>
            <el-col :span="12">
              <span>心跳周期(秒)</span>
              <span>SN243240734273421</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>创建人：</span>
              <span>TPOS/G2</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span>备注：</span>
              <span>SN243240734273421</span>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix run-info">
          <span>运行信息</span>
        </div>
        <div class="content">
          <el-row>
            <el-col :span="12">
              <span>OTA/固件版本：</span>
              <span>展示最新数据</span>
            </el-col>
            <el-col :span="12">
              <span>下次报道时间：</span>
              <span>2020-03-02</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>经纬度：</span>
              <span> 116:28E 39:54N</span>
            </el-col>
            <el-col :span="12">
              <span>布放时间：</span>
              <span>2020-03-02</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>电池状态：</span>
              <span>充电</span>
            </el-col>
            <el-col :span="12">
              <span>打印机状态：</span>
              <span>启用</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>读卡器状态：</span>
              <span>运行时</span>
            </el-col>
            <el-col :span="12">
              <span>摄像头状态：</span>
              <span>监控启动状态</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>密码键盘状态：</span>
              <span>锁定</span>
            </el-col>
            <el-col :span="12">
              <span>内存状态：</span>
              <span>充足可用</span>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="应用信息" name="appInfo">
      <app-item v-for="item in appList" :key="item.id" :item-data="item"></app-item>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppItem from './components/AppItem'
import { getAppList } from '@/api/machine'
export default {
  name: '',
  components: {
    AppItem
  },
  props: {},
  directive: {},
  data() {
    return {
      activeName: 'details',
      appList: [
        {
          id: '2412412',
          appName: '微信',
          icon: '',
          version: 'V1.0.0',
          apkName: '应用包名称'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getAppList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleClick() {
      if (this.activeName === 'appInfo') {
        // this.getAppList()
        console.log('看情况确定要不要重新获取')
      }
    },
    getAppList() {
      getAppList()
        .then((res) => {
          this.appList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tabs__content{
  max-width: 1200px;
}
</style>
<style lang='scss'>
.machine-details{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  .el-tabs__nav-wrap{
    padding: 0 56px;
    height: 60px;
    line-height: 60px;
  }

  .el-tabs__content{
    padding: 0 56px;
    .el-card + .el-card{
      margin-top: 40px;
    }
    .el-card__header{
      font-weight: bold;
      color: #172B4D;
      font-size: 16px;
      background: #ECEDF0;
    }
    .el-card__body{
      height: 280px;
    }
  }
  #pane-details{
    max-width: 1200px;
    width: 80%;
    margin: auto;
    padding: 20px 0 30px;
    .content{
      width: 60%;
      max-width: 600px;
      margin: auto;
    }
    .el-row{
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
