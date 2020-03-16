<template>
  <div class="file-app-details">
    <div class="header">
      <!-- 图片暂时写成这样 -->
      <span class="m-r-20"><svg-icon icon-class="package"></svg-icon></span>
      <div>
        <h5 class="title">抖音短视频</h5>
        <p class="desc">
          <span>版本号：V1.2</span>
          <span>日期：2020-02-24</span>
          <span>大小：35M</span>
        </p>
        <p class="desc">适用机型: N3  N5   ......</p>
      </div>
      <el-button 
        v-if="origin==='fromNewShare' && curState === 0" class="add-btn"
        type="primary" @click="$router.push('../../list')">
        添 加
      </el-button>
      <!-- 来源共享且有效可用 -->
      <el-button 
        v-if="origin==='fromMyFile'" class="add-btn"
        type="primary" @click="closeSharing">
        关闭共享
      </el-button>
      <!-- 来源于共享且无效 -->
      <div v-if="origin==='fromNewShare' && curState === 1" style="margin-left:auto;">
        <el-button class="add-btn" type="primary">推送</el-button>
        <el-button class="green-btn" type="primary" @click="checkVersion">检查更新</el-button>
        <el-button class="add-btn" type="primary" @click="handleRemove">移除</el-button>
      </div>
    </div>
    <div class="content">
      <section class="screen-shot">
        <h5>应用截图</h5>
        <el-carousel trigger="click" height="300px" class="child-content">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </section>
      <section class="app-abstract">
        <h5>应用介绍</h5>
        <p class="child-content">
          抖音短视频是中国收欢迎的原创短视频分享平台。《明星大侦探》何炅、白敬亭、鬼鬼吴映洁和抖音一起越玩越嗨，办案脑
          洞打开！罗志祥携抖音明星团空降《快了大本营》花絮！大张伟魔性推荐！《我想和你唱》李宇春，王俊凯，林忆莲，汪涵
          杨迪同台尬舞《高能少年团》张天爱玩到停不下来...
        </p>
      </section>
      <section class="update">
        <h5>更新内容</h5>
        <ul class="child-content">
          <li>更新内容哈哈哈哈哈嘎000001</li>
          <li>更新内容哈哈哈哈哈嘎000002</li>
          <li>更新内容哈哈哈哈哈嘎000003</li>
          <li>更新内容哈哈哈哈哈嘎000004</li>
        </ul>
      </section>
    </div>
    <check-version ref="checkVersion" package-type="app"></check-version>
  </div>
</template>
<script>
import CheckVersion from './components/CheckVersion'

export default {
  name: '',
  components: {
    CheckVersion
  },
  props: {
    /* origin标识来源：新增共享，我的文件 */
    origin: {
      type: String,
      default: 'fromNewShare'
    }
  },
  directive: {},
  data() {
    return {

    }
  },
  computed: {
    curState() {
      return _.toNumber(this.$route.params.state)
    }
  },
  watch: {
    $route(to, from) {
      this.curState = to.params.state
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /* 关闭共享 */
    closeSharing() {
      this.$confirm('取消对外共享应用${具体应用}后，将无法继续推送安装该应用的任一版本。\n请确认是否取消共享？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        customClass: 'delete-confirm'
      }).then(() => {
        // 进行删除操作
        this.$message.success('关闭共享成功')
      }).catch(() => {
        console.log('取消删除操作！')
      })
    },
    /* 检查更新 */
    checkVersion() {
      const isLatest = false
      if (isLatest) {
        this.$alert('恭喜您，本系统包已是最新版本！', '提示', {
          confirmButtonText: '关闭',
        })
      } else {
        const checkVersion = this.$refs.checkVersion
        checkVersion.dialogVisible = true
      }
    },
    /* 移除 */
    handleRemove() {
      this.$confirm('移除应用${应用名称}后，将无法继续推送安装该应用。\n请确认是否移除？', '提示', {
        cancelButtonText: '否',
        confirmButtonText: '是',
        customClass: 'delete-confirm'
      }).then(() => {
        this.$$message.success('移除成功！')
      }).catch(err => {
        console.log(err, '取消移除')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.file-app-details{
  width: 890px;
  margin: auto;
  .header{
    display: flex;
    align-items: center;
    padding: 20px 50px 20px;
    border-bottom: 1px solid #ECECEC;
    font-size: 20px;
    color: #172B4D;
    font-weight: normal;
    .title{
      margin: 4px 0 14px;
    }
    .desc{
      font-size: 12px;
      color: #8D8D8D;
      padding: 0;
      margin: 6px 0;
    }
    .add-btn{
      margin-left: auto;
    }
  }
  .svg-icon{
    font-size: 60px;
  }
  .content{
    padding: 10px 50px;
    .child-content{
      margin: 0 30px;
      color: #6E798D;
      line-height: 24px;
    }
    .update{
      ul{
        padding: 0;
        li{
          list-style-type: none;
        }
      }
    }
  }
  /* 暂时模拟截图 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
}
</style>
