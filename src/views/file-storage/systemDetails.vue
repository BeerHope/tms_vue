<template>
  <div class="file-system-details">
    <h4 class="title">
      <span class="m-r-20"><svg-icon icon-class="package"></svg-icon></span>
      <span>G3-system-20200218001</span>
      <el-button v-if="curState === 0" class="add-btn" type="primary" @click="$router.push('../../list')">添 加</el-button>
      <div v-if="curState === 1" style="margin-left:auto">
        <el-button type="primary">推送</el-button>
        <el-button class="green-btn" type="primary" @click="handleRemove">移除</el-button>
      </div>
    </h4>
    <!-- 可用状态 -->
    <section v-if="curState===0" class="content">
      <el-row>
        <el-col :span="12">
          <span class="field">名称</span>
          <span>应用包名称</span>
        </el-col>
        <el-col :span="12">
          <span class="field">版本</span>
          <span>V1.3.23</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="field">更新日期</span>
          <span>2020-03-12 12:20:00</span>
        </el-col>
        <el-col :span="12">
          <span class="field">文件大小</span>
          <span>XXXXX</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="field">支持版本</span>
          <span>XXXXX</span>
        </el-col>
        <el-col :span="12">
          <span class="field">适用机型</span>
          <span>XXXXX</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="field">更新内容</span>
          <span>这里是更新内容更新内容那个哈哈哈安徽的身份的交付的</span>
        </el-col>
      </el-row>
    </section>
    <!-- 失效状态 -->
    <section v-if="curState===1" class="content">
      <el-row>
        <el-col :span="16">
          <span class="field">更新日期</span>
          <span>2020-03-12 12:20:00</span>
        </el-col>
        <el-col :span="8">
          <span class="field">文件大小</span>
          <span>XXXXX</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <span class="field">版 本</span>
          <span>2020-03-12 12:20:00</span>
          <el-button size="mini" class="m-l-10 line-type blue-btn" @click="checkVersion">检查版本</el-button>
        </el-col>
        <el-col :span="8">
          <span class="field">版本状态</span>
          <span class="state right disabled">失效</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <span class="field">支持版本</span>
          <span>XXXXX</span>
        </el-col>
        <el-col :span="8">
          <span class="field">适用机型</span>
          <span>XXXXX</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="field">更新内容</span>
          <span>这里是更新内容更新内容那个哈哈哈安徽的身份的交付的</span>
        </el-col>
      </el-row>
    </section>
    <check-version ref="checkVersion" package-type="system"></check-version>
  </div>
</template>

<script>
import CheckVersion from './components/CheckVersion'
export default {
  name: '',
  components: {
    CheckVersion
  },
  props: {},
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
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
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
    handleRemove(id) {
      console.log('移除的ID号', id)
      this.$confirm('移除系统包${系统包名称}后，将无法继续推送安装该系统包。\n请确认是否移除?', '提示', {
        cancelButtonText: '否',
        confirmButtonText: '是',
        customClass: 'delete-confirm'
      }).then(res => {
        console.log('移除成功！')
      }).catch(err => {
        console.log(err, 'errr')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.file-system-details{
  width: 890px;
  margin: auto;
  .title{
    display: flex;
    align-items: center;
    padding: 20px 50px 32px;
    border-bottom: 1px solid #ECECEC;
    font-size: 20px;
    color: #172B4D;
    font-weight: normal;
    .add-btn{
      margin-left: auto;
    }
  }
  .svg-icon{
    font-size: 50px;
  }
  .content{
    padding: 0 100px;
  }
  .el-row{
    line-height: 50px;
    color: #172B4D;
    .field{
      display: inline-block;
      min-width: 80px;
    }
    .unvalid{
      line-height: 20px;
      padding: 2px 14px;
      display: inline-block;
      background-color: #FEF3F4;
      color: #FB515A;
    }
  }
}
</style>
