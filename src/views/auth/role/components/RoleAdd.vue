<template>
  <div class="role-add role-dialog">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :rules="rules" :model="formData" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item v-if="flag!==0" label="状态" prop="state">
          <el-select v-model="formData.state" class="w-100">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明" prop="desc">
          <el-input type="textarea" v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item label="选择权限" prop="auth" :class="['tree-wrapper']">
          <el-tree
            show-checkbox
            node-key="id"
            ref="authTree"
            :data="authData"
            :default-expand-all="true"
            :props="defaultProps"
          ></el-tree>
          <!-- <el-input type="textarea" v-model="formData.auth"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      flag: 0,
      roleId: '',
      dialogVisible: false,
      formData: {
        name: "",
        state: "",
        desc: "",
        auth: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: "请勾选状态",
            trigger: "blur"
          }
        ]
      },
      authData: [
        {
          id: '1',
          label: '权限1',
          children: [
            {
              id: '1-1',
              label: '权限1-1',
              children: []
            },
            {
              id: '1-2',
              label: '权限1-2',
              children: []
            }
          ]
        },
        {
          id: '2',
          label: '权限2',
          children: [
            {
              id: '2-1',
              label: '权限2-1',
              children: []
            },
            {
              id: '2-2',
              label: '权限2-2',
              children: []
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  computed: {
    dialogTitle() {
      return this.flag === 0 ? '新增角色' : '编辑角色'
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleClose() {
      this.dialogVisible = false;
      console.log("关闭了弹窗！！！！");
    }
  }
};
</script>

<style lang="scss" scoped>
.role-dialog{
  .tree-wrapper{
    .el-form-item__content{
      height: 150px !important;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
  }
}
</style>
