<template>
  <el-tabs class="app-details common-tabs" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用详情" name="details">
      <div class="r m-b-20">
        <el-button type="primary" @click="openDetaisEdit">编辑</el-button>
        <el-button type="primary" class="green-btn" @click="handleDelete">删除</el-button>
      </div>
      <el-form label-width="100px" class="app-details-form clearfix">
        <el-form-item label="应用名称">
          <span>应用名称XXXX</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span>2020-02-20 12:12:35</span>
        </el-form-item>
        <el-form-item label="适用机型">
          <span>G2</span>
          <span>KD58</span>
          <span>……</span>
        </el-form-item>
        <el-form-item label="应用icon" class="img">
          <span class="el-icon-picture"></span>
          <p class="tips">不大于100KB，尺寸：144*144像素，格式：PNG</p>
        </el-form-item>
        <el-form-item label="应用简介">
          <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
        </el-form-item>
        <el-form-item label="应用截图" class="img">
          <span class="el-icon-picture"></span>
          <p class="tips">单张图片不大于200KB, 不大于100KB，尺寸：144*144像素，格式：PNG</p>
        </el-form-item>
        <el-form-item label="备注">
          <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="版本管理" name="version">
      <section class="update-record">
        <h4>
          <span class="common-title f-z-16">更新记录</span>
          <div class="r">
            <el-button class="line-type blue-btn" @click="updateApp">发布新版</el-button>
            <el-button class="line-type blue-btn" @click="toRecyclePage">版本垃圾桶</el-button>
          </div>
        </h4>
        <el-table class="update-list" :data="updateList" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
          <el-table-column label="上传时间" prop="uploadTime"></el-table-column>
          <el-table-column label="版本" prop="version"></el-table-column>
          <el-table-column label="应用名称" prop="appName"></el-table-column>
          <el-table-column label="适用机型" prop="suitableModel"></el-table-column>
          <el-table-column label="更新内容" prop="updatedContent">
            <template slot-scope="scope">
              <el-tooltip placement="bottom" :hide-after="0" effect="light" popper-class="custom-tooltip">
                <div slot="content">{{ scope.row.updatedContent }}</div>
                <el-button type="text" style="color: #5087E5">查看</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="文件大小" prop="fileSize"></el-table-column>
          <el-table-column label="上传操作用户" prop="uploadUser"></el-table-column>
          <el-table-column width="200">
            <template>
              <el-button type="primary" @click="openVersionEdit">编辑</el-button>
              <el-button class="green-btn" type="primary" @click="handleDelete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-tab-pane>
    <details-edit ref="detailsEdit"></details-edit>
    <version-edit ref="versionEdit"></version-edit>
    <app-update ref="update"></app-update>
  </el-tabs>
</template>

<script>
import DetailsEdit from './components/DetailsEdit'
import VersionEdit from './components/VersionEdit'
import AppUpdate from './components/AppUpdate'

export default {
  name: '',
  components: {
    DetailsEdit,
    VersionEdit,
    AppUpdate
  },
  props: {},
  directive: {},
  data() {
    return {
      activeName: 'version',
      // 模拟更新记录数据
      updateList: [
        {
          uploadTime: '2020-03-10 12:30:12',
          version: 'V1.0.0',
          updatedContent: '此处为更新内容详细信息111111111111',
          suitableModel: 'G2, T2, N2',
          appName: '应用名称',
          fileSize: '120MB',
          uploadUser: '张三'
        },
        {
          uploadTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          updatedContent: '更新内容，更新内容详情11111111122',
          suitableModel: 'G2, T2, N2',
          appName: '应用名称',
          fileSize: '120MB',
          uploadUser: '李四'
        },
        {
          uploadTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          updatedContent: '更新内容22',
          suitableModel: 'G2, T2, N2X',
          appName: '应用名称',
          fileSize: '120MB',
          uploadUser: '李四'
        },
        {
          uploadTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          updatedContent: '更新内容22',
          suitableModel: 'G2, T2, N2X',
          appName: '应用名称',
          fileSize: '120MB',
          uploadUser: '李四'
        },
      ],
      cellStyle: {
        textAlign: 'center',
        height: '80px'
      },
      headerCellStyle: {
        textAlign: 'center',
        color: '#172B4D',
        height: '60px',
      },
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
    handleClick() {
      console.log('handle tabs click')
    },
    openDetaisEdit() {
      const detailsEdit = this.$refs.detailsEdit
      detailsEdit.dialogVisible = true
    },
    openVersionEdit() {
      const versionEdit = this.$refs.versionEdit
      versionEdit.dialogVisible = true
    },
    handleDelete() {
      this.$confirm('删除应用……(机型)后，将无法继续推送安装该应用的任何版本，并同时取消对外共享该应用。请确认是否删除?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        customClass: 'delete-confirm'
      }).then(() => {
        // 进行删除操作
        this.$message.success('删除成功')
      }).catch(() => {
        console.log('取消删除操作！')
      })
    },
    toRecyclePage() {
      this.$router.push('./recycle')
    },
    updateApp() {
      const updateApp = this.$refs.update
      const appType = 2
      _.assign(updateApp, {
        dialogVisible: true,
        appType
      })
    }
  }
}
</script>

<style lang='scss'>
.app-details{
  .el-form.app-details-form{
    width: 400px;
    margin: auto;
    clear: both;
    .el-form-item__label{
      color: #172B4D;
      padding-right: 20px;
    }
    .el-form-item__content{
      word-wrap:break-word;
      p.tips{
        padding: 0;
        margin: -10px 0 0;
      }
    }
    .img {
      // line-height: 80px;
      margin-top: 40px;
      .el-form-item__content{
        margin-top: -30px;
        .el-icon-picture{
          font-size: 90px;
          color: #ddd;
        }
      }
    }
  }
  .el-tabs__content{
    padding-top: 30px;
    width: 80%;
    min-width: 600px;
    margin: auto;
  }
}
</style>
