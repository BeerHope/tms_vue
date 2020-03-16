<template>
  <el-dialog
    width="40%"
    title="新增共享"
    :visible.sync="dialogVisible"
    custom-class="file-add">
    <ul class="file-type clear-fix" @click="changeSelectedFile">
      <li v-for="item in fileTypes" :key="item.textDesc">
        <img
          :src="item.imgPath" :alt="item.textDesc"
          :class="{'active': selectedFileType==item.type}"
          :data-type="item.type">
        <p>{{ item.textDesc }}</p>
      </li>
    </ul>
    <div class="filter-box p-t-6 p-b-6 m-b-10">
      <el-input prefix-icon="el-icon-search" class="w-100" v-model="filter.name" placeholder="输入系统包名称或应用名称搜索">
      </el-input>
    </div>
    <ul class="file-list">
      <li v-for="item in fileList" :key="item.name" @click="toDetails(item.type)">{{ item.name }}</li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" type="primary" @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">新 增</el-button>
    </span>
  </el-dialog>
</template>

<script>
/* 包图片暂时先这样引入，后期调整 */
import TPOS from '@/assets/images/tpos.png'
import SPOS from '@/assets/images/spos.png'
import MPOS from '@/assets/images/mpos.png'

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      filter: {
        name: ''
      },
      selectedFileType: -1,
      fileTypes: [
        {
          type: 1,
          imgPath: TPOS,
          textDesc: '我的应用',
        },
        {
          type: 2,
          imgPath: SPOS,
          textDesc: '我的系统包',
        },
        {
          type: 3,
          imgPath: MPOS,
          textDesc: '共享库',
        }
      ],
      fileList: [
        {
          name: 'G2-system-20200316001',
          type: 1,
        },
        {
          name: 'G1-system-20200316001',
          type: 1,
        },
        {
          name: 'QQ',
          type: 2,
        },
        {
          name: 'T2-system-20200316001',
          type: 1
        },
        {
          name: '抖音',
          type: 2,
        },
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
  methods: {
    /* 事件委托 */
    changeSelectedFile(e) {
      const fileType = e.target.dataset.type
      if (fileType) {
        this.selectedFileType = fileType
        /* 展示对应类型下的具体文件包类型 */
      }
    },
    handleAdd() {
      this.dialogVisible = false
    },
    /* 跳转系统包详情或者应用详情type:1系统包，2应用包 */
    toDetails(type, state = 0) {
      if (type === 1) {
        this.$router.push(`./new-share/details/system/${state}`)
      } else if (type === 2) {
        this.$router.push(`./new-share/details/app/${state}`)
      }
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
.file-add{
  .file-type{
    padding: 0;
    margin: 10px 0 10px;
    color: #505F79;
    li{
      list-style-type: none;
      text-align: center;
      &:not(:last-child) {
        margin-right: 26px;
      }
      float: left;
      img{
        @include common-box(10px);
        &:hover, &.active{
          border-color: #538AE6;
          cursor: pointer;
        }
      }
      p{
        pointer-events: none;
        height: 20px;
        line-height: 20px;
        margin: 0;
      }
    }
  }
  .file-list{
    padding: 0;
    margin: 0;
    li {
      line-height: 30px;
      list-style-type: none;
      color: #90BDEB;
      padding-left: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover{
        color: #7CABCD;
      }
    }
  }
}
</style>

<style lang="scss">
.file-add{
  .el-dialog__body{
    width: 400px !important;
  }
}
</style>
