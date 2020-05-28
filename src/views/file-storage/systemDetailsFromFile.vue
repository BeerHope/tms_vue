<template>
  <div class="file-details">
    <div class="del">
      <el-button type="primary" class="r" @click="closeSharing">关闭共享</el-button>
    </div>
    <div class="main">
      <section :class="['basic-info', {'isEditing': isEditing}]">
        <h4>
          <span class="common-title f-z-16">基本信息</span>
        </h4>
        <div class="content">
          <el-form class="common-form" :model="formData" :rules="rules" label-width="100px" label-position="right">
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称：" prop="name">
                  <span>{{ formData.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="适用机型：" prop="model">
                  <span>{{ checkedModels }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注：" prop="remark">
              <span>{{ formData.remark }}</span>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <section class="update-record">
        <h4>
          <span class="common-title f-z-16">更新记录</span>
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
          <el-table-column label="状态" prop="state"></el-table-column>
          <el-table-column label="操作人" prop="operator"></el-table-column>
          <el-table-column width="200">
            <template>
              <el-button type="primary" @click="handleCancelSharing">取消共享</el-button>
              <el-button v-if="false" type="primary" @click="handleRecoverySharing">恢复共享</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
    <file-share ref="share"></file-share>
  </div>
</template>

<script>
import TPOS from '@/assets/images/tpos.png'
import SPOS from '@/assets/images/spos.png'
import MPOS from '@/assets/images/mpos.png'
import FileShare from './components/FileShare'

export default {
  name: '',   
  components: {
    FileShare,
  },
  props: {},
  directive: {},
  data() {
    return {
      isEditing: false,
      modelList: [
        {
          value: 1,
          label: 'G2'
        },
        {
          value: 2,
          label: 'T2'
        },
        {
          value: 3,
          label: 'N2'
        }
      ],
      selectedPosType: 0,
      checkedModels: 'G2, N3',
      posList: [
        {
          type: 1,
          imgPath: TPOS,
          textDesc: 'TPOS',
        },
        {
          type: 2,
          imgPath: SPOS,
          textDesc: 'SPOS',
        },
        {
          type: 3,
          imgPath: MPOS,
          textDesc: 'MPOS',
        }
      ],
      formData: {
        name: 'SPOS G2',
        createdTime: '2020-03-10 10:30:30',
        model: [],
        remark: '这里是备注信息,XXXXXXXXXXXXXXXX'
      },
      rules: {
        name: [
          { required: true, message: '请输入系统包名称', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '请选择适用机型', trigger: 'blur' }
        ]
      },
      // 模拟更新记录数据
      updateList: [
        {
          sharedTime: '2020-03-10 12:30:12',
          version: 'V1.0.0',
          state: '可用',
          operator: '张三'
        },
        {
          sharedTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          state: '失效',
          operator: '李四'
        },
        {
          sharedTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          state: '失效',
          operator: '李四'
        },
        {
          sharedTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          state: '可用',
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
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    toEdit() {
      this.isEditing = true
    },
    shareNewVersion() {
      const shareVersion = this.$refs.share
      shareVersion.dialogVisible = true
    },
    toRecyclePage() {
      this.$router.push('version/recycle')
    },
    handleCancel() {
      this.isEditing = false
    },
    handleSave() {
      console.log('handle save~~~~')
      const checkedModels = []
      _.forEach(this.modelList, (item) => {
        if (_.includes(this.formData.model, item.value)) {
          checkedModels.push(item.label)
        }
      })
      this.checkedModels = _.join(checkedModels, ',')
      this.isEditing = false
    },
    /* 事件委托 */
    changeSelectedPos(e) {
      const posType = e.target.dataset.type
      if (posType) {
        this.selectedPosType = posType
        /* 展示对应类型下的具体pos */
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
    /* 删除所有的底层包 */
    closeSharing() {
      this.$confirm('取消对外共享系统包{系统包}后，其他用户将将无法继续推送该系统包的任何版本。请确认是否取消共享？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        customClass: 'delete-confirm'
      }).then(() => {
        // 进行删除操作
        this.$message.success('删除成功')
      }).catch(() => {
        console.log('取消删除操作！')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@mixin common-box ($padding){
  border: 1px solid #DCDFE6;
  padding: $padding;
  border-radius: 6px;
}
.file-details{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  .del{
    position: absolute;
    width: 100%;
    line-height: 70px;
    left: 0;
    top: 0;
    overflow: hidden;
    padding: 16px 100px;
    box-shadow:0 2px 2px 0 rgba(158, 159, 162, 0.15);
  }
  .main{
    width: 90%;
    max-width: 1200px;
    min-width: 1000px;
    margin: 10px auto auto;
  }
  section{
    padding: 30px;
    &.isEditing{
      background-color: #f4f5f7;
    }
  }
  .basic-info{
    margin: 60px auto 0px;
    clear: both;
    .edit-btn{
      font-size: 14px;
      color: #3B78FC;
      cursor: pointer;
      float: right;
    }
    /* start: 适用机型 */
    .model{
      padding: 30px;
      text-align: center;
      .el-select{
        width: calc(66.66% + 100px);
      }
    }
  }
  .update-record{
    .el-table{
      margin-top: 40px;
    }
  }
  .content{
    .el-form{
      width: 580px;
    }
  }
}
</style>
