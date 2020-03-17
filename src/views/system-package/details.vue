<template>
  <div class="package-details">
    <div class="del">
      <el-button type="primary" class="r" @click="deletePackages">删除</el-button>
    </div>
    <div class="main">
      <section :class="['basic-info', {'isEditing': isEditing}]">
        <h4>
          <span class="common-title f-z-16">基本信息</span>
          <span class="edit-btn" @click="toEdit" v-if="!isEditing">
            <i class="el-icon-edit-outline m-r-6"></i>
            编辑
          </span>
        </h4>
        <div class="content">
          <el-form class="common-form" :model="formData" :rules="rules" label-width="100px" label-position="right">
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称：" prop="name">
                  <span v-if="!isEditing">{{ formData.name }}</span>
                  <el-input v-else v-model="formData.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="更新时间：" prop="createdTime">
                  <span v-if="!isEditing">{{ formData.createdTime }}</span>
                  <el-date-picker
                    v-else v-model="formData.createdTime"
                    type="datetime" placeholder="请选择创建时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="适用机型：" prop="model">
              <span v-if="!isEditing">{{ checkedModels }}</span>
              <div class="model" v-else>
                <ul class="model-row" @click="changeSelectedPos">
                  <li v-for="item in posList" :key="item.textDesc">
                    <img
                      :src="item.imgPath" :alt="item.textDesc"
                      :class="{'active': selectedPosType==item.type}"
                      :data-type="item.type">
                    <p>{{ item.textDesc }}</p>
                  </li>
                </ul>
                <el-select v-model="formData.model" multiple>
                  <el-option
                    v-for="item in modelList" :key="item.label"
                    :value="item.value" :label="item.label">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
              <span v-if="!isEditing">{{ formData.remark }}</span>
              <el-input v-else v-model="formData.remark" type="textarea"></el-input>
            </el-form-item>
            <div v-if="isEditing" class="t-c m-t-30">
              <el-button class="cancel" type="primary" @click="handleCancel">取消</el-button>
              <el-button type="primary" @click="handleSave">保存</el-button>
            </div>
          </el-form>
        </div>
      </section>
      <section class="update-record">
        <h4>
          <span class="common-title f-z-16">更新记录</span>
          <div class="r">
            <el-button class="line-type blue-btn" @click="updatePackage">发布新版</el-button>
            <el-button class="line-type blue-btn" @click="toRecyclePage">版本垃圾桶</el-button>
          </div>
        </h4>
        <el-table class="update-list" :data="updateList" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
          <el-table-column label="上传时间" prop="uploadTime"></el-table-column>
          <el-table-column label="版本号" prop="version"></el-table-column>
          <el-table-column label="更新内容" prop="updatedContent">
            <template slot-scope="scope">
              <el-tooltip placement="bottom" :hide-after="0" effect="light" popper-class="custom-tooltip">
                <div slot="content">{{ scope.row.updatedContent }}</div>
                <el-button type="text" style="color: #5087E5">查看</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="支持版本" prop="supportVersion"></el-table-column>
          <el-table-column label="解压下发" prop="unzipIssue"></el-table-column>
          <el-table-column label="文件大小" prop="fileSize"></el-table-column>
          <el-table-column label="上传操作用户" prop="uploadUser"></el-table-column>
          <el-table-column width="200">
            <template>
              <el-button type="primary">推送</el-button>
              <el-button class="green-btn" type="primary" @click="handleDelete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
   
    <package-update ref="update"></package-update>
  </div>
</template>

<script>
import TPOS from '@/assets/images/tpos.png'
import SPOS from '@/assets/images/spos.png'
import MPOS from '@/assets/images/mpos.png'
import PackageUpdate from './components/PackageUpdate'
export default {
  name: '',   
  components: {
    PackageUpdate
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
          uploadTime: '2020-03-10 12:30:12',
          version: 'V1.0.0',
          updatedContent: '此处为更新内容详细信息111111111111',
          supportVersion: '支持版本XXX',
          unzipIssue: '解压下发',
          fileSize: '120MB',
          uploadUser: '张三'
        },
        {
          uploadTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          updatedContent: '更新内容，更新内容详情11111111122',
          supportVersion: '支持版本XXXX',
          unzipIssue: '解压下发',
          fileSize: '120MB',
          uploadUser: '李四'
        },
        {
          uploadTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          updatedContent: '更新内容22',
          supportVersion: '支持版本XXXX',
          unzipIssue: '解压下发',
          fileSize: '120MB',
          uploadUser: '李四'
        },
        {
          uploadTime: '2020-03-10 14:30:12',
          version: 'V1.0.1',
          updatedContent: '更新内容22',
          supportVersion: '支持版本XXXX',
          unzipIssue: '解压下发',
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
    toEdit() {
      this.isEditing = true
    },
    updatePackage() {
      const updatePackage = this.$refs.update
      updatePackage.dialogVisible = true
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
    /* 删除记录包 */
    handleDelete() {
      this.$confirm('删除版本${版本号}后，将无法继续推送安装改版本系统包，并同时取消对外共享该版本。请确认是否删除？', '提示', {
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
    deletePackages() {
      this.$confirm('删除版本${版本号}后，将无法继续推送该系统包的任何版本，并同时取消对外共享该版本。请确认是否删除？', '提示', {
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
.package-details{
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
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
    margin: 80px auto 40px;
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
    .model-row{
      padding: 0;
      display: flex;
      margin: 10px 0 10px;
      color: #505F79;
      li{
        list-style-type: none;
        flex: 1;
        text-align: center;
        img{
          @include common-box(10px);
          &:hover, &.active{
            border-color: #538AE6;
            cursor: pointer;
          }
        }
        p{
          pointer-events: none;
        }
        p {
          height: 24px;
          line-height: 20px;
          margin: 0;
        }
      }
    }
    /* end: 适用机型 */
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
