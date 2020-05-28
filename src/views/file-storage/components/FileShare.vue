<template>
  <!-- 共享新版本 -->
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    custom-class="file-share"
  >
    <el-form class="common-form" :model="formData" label-width="80px">
      <el-form-item label="选择版本">
        <el-select v-model="formData.selectedVersion">
          <el-option
            v-for="item in versions" :key="item.createdTime"
            :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="formData.version"></el-input>
      </el-form-item>
      <el-form-item label="更新内容">
        <el-input type="textarea" v-model="formData.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    dialogTitle: {
      type: String,
      default: '共享新版本'
    }
  },
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        selectedVersion: '',
        version: '',
        content: '',
      },
      versions: [
        {
          id: 12323213,
          createdTime: '2020-03-12 12:23:30',
          version: 'V1.0.10',
          support: '支持版本1'
        },
        {
          id: 4343434,
          createdTime: '2020-03-12 12:23:30',
          version: 'V1.0.13',
          support: '支持版本2'
        },
        {
          id: 546546123,
          createdTime: '2020-03-12 12:23:30',
          version: 'V1.0.20',
          support: '支持版本3'
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

</style>
