<template>
  <el-tabs class="app-details-from-file common-tabs" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用详情" name="details">
      <app-details origin="fromMyFile"></app-details>
    </el-tab-pane>
    <el-tab-pane label="共享版本" name="versions">
      <section class="share-record">
        <h4>
          <div class="r">
            <el-button class="line-type blue-btn" @click="shareNewVersion">共享新版本</el-button>
          </div>
        </h4>
        <el-table class="update-list" :data="updateList" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
          <el-table-column label="共享时间" prop="sharedTime"></el-table-column>
          <el-table-column label="版本" prop="version">
            <template slot-scope="scope">
              <el-tooltip placement="bottom" :hide-after="0" effect="light" popper-class="custom-tooltip">
                <div slot="content">
                  <p>
                    <span>支持版本</span>
                    <span>xxxxxx</span>
                  </p>
                  <p>
                    <span>解压下发</span>
                    <span>xxxxxx</span>
                  </p>
                  <p>
                    <span>大小</span>
                    <span>xxxxxx</span>
                  </p>
                  <p>
                    <span>更新内容</span>
                    <span>xxxxxxxxxxxxxxxxxx</span>
                  </p>
                </div>
                <el-button type="text" style="color: #5087E5">{{ scope.row.version }}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="state">
            <template slot-scope="scope">
              <span>{{ scope.row.state | filterState }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人" prop="operator"></el-table-column>
          <el-table-column width="200">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.state === 0" @click="handleCancelSharing">取消共享</el-button>
              <el-button type="primary" class="green-btn" v-if="scope.row.state === 1" @click="handleRecoverySharing">恢复共享</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppDetails from './appDetails'
import { getAppList } from '@/api/machine'
export default {
  name: '',
  components: {
    AppDetails
  },
  filters: {
    /* 0：已共享， 1：取消共享 */
    filterState(value) {
      if (value) {
        return '已共享'
      }
      return '取消共享'
    }
  },
  props: {},
  directive: {},
  data() {
    return {
      activeName: 'details',
      updateList: [
        {
          sharedTime: '2020-03-10 12:30:12',
          version: 'V1.0.0',
          state: 0,
          operator: '张三'
        },
        {
          sharedTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          state: 1,
          operator: '李四'
        },
        {
          sharedTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          state: 1,
          operator: '李四'
        },
        {
          sharedTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          state: 0,
          operator: '李四'
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
  created() {
    // this.getAppList()
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
    /* 恢复共享 */
    handleRecoverySharing() {
      this.$confirm('恢复对外共享版本${版本号}后，其他用户将可继续推送安装该版本。请确认是否恢复共享？', '提示', {
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
    /* 取消共享 */
    handleCancelSharing() {
      this.$confirm('取消对外共享版本${版本号}后，将无法继续推送安装改版本系统包，并同时取消对外共享该版本。请确认是否删除？', '提示', {
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
    shareNewVersion() {
      console.log('共享新版本！！！！！！！！')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tabs__content{
  max-width: 1200px;
}
.share-record{
  width: calc(100% - 200px);
  margin: auto;
}
</style>

