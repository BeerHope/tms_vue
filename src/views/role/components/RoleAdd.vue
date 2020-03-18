<template>
  <div class="role-add role-dialog">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-form
        v-loading="loading" class="common-form"
        ref="form" :rules="rules" :model="formData"
        label-width="80px">
        <el-form-item :label="$t('role.form.label.name')" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item v-if="flag!==0" :label="$t('role.form.label.state')" prop="state">
          <el-select v-model="formData.state" class="w-100">
            <el-option 
              v-for="item in roleStates" :key="item.value" 
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('role.form.label.menus')" prop="menus" :class="['tree-wrapper']">
          <el-tree
            show-checkbox
            node-key="id"
            ref="authTree"
            :data="menuList"
            :default-expand-all="true"
            :props="defaultProps"
            @check="changeCheck"
          ></el-tree>
        </el-form-item>
        <el-form-item :label="$t('role.form.label.remark')" prop="remark">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancel" @click="dialogVisible = false">{{ $t('role.add.cancel') }}</el-button>
        <el-button v-if="flag === 0" type="primary" @click="addRole">{{ $t('role.add.add') }}</el-button>
        <el-button v-if="flag === 1" type="primary" @click="updateRole">{{ $t('role.edit.save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleTree, addRole, getRoleDetails, updateRole } from '@/api/role'
export default {
  name: "",
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      flag: 0,
      roleId: '',
      loading: false,
      dialogVisible: false,
      formData: {
        name: '',
        state: '',
        remark: '',
        menus: []
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('role.form.tips.name'),
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: this.$t('role.form.tips.state'),
            trigger: "blur"
          }
        ],
        menus: [
          {
            required: true,
            message: this.$t('role.form.tips.menus'),
            trigger: "blur"
          }
        ]
      },
      menuList: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      }
    };
  },
  computed: {
    dialogTitle() {
      return !this.flag ? this.$t('role.add.dialogTitle') : this.$t('role.edit.dialogTitle')
    },
    roleStates() {
      const states = this.$t('base.states')
      return _.filter(states, (item) => {
        return item.value
      })
    }
  },
  watch: {},
  created() {
    this.getRoleAuthData()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getRoleAuthData() {
      getRoleTree().then(res => {
        this.menuList = [res.data]
      })
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.$refs.authTree.setCheckedKeys([])
      this.dialogVisible = false;
    },
    handleOpen() {
      /* 编辑 */
      if (this.roleId !== -1) {
        this.loading = true
        getRoleDetails(this.roleId).then(res => {
          this.formData = _.cloneDeep(res.data)
          this.$refs.authTree.setCheckedKeys(this.formData.menus)
          setTimeout(() => {
            this.loading = false
          }, 150)
        })
      }
    },
    changeCheck(curData, checkedData) {
      if (!checkedData.checkedKeys.length) {
        this.$refs.form.validateField('menus')
      }
    },
    // 新增角色
    addRole() {
      this.formData.menus = this.$refs.authTree.getCheckedKeys()
      this.$refs.form.validate((valid) => {
        if (valid) {
          addRole(this.formData).then(res => {
            this.$emit('refresh')
            this.dialogVisible = false
            this.$message.success(this.$t('base.tips.addSuccess'))
          })
        }
      })
    },
    // 更新角色
    updateRole() {
      const { roleId } = this
      const reqData = _.cloneDeep(this.formData)
      reqData.menus = this.$refs.authTree.getCheckedKeys()
      updateRole(roleId, reqData).then(res => {
        this.$emit('refresh')
        this.dialogVisible = false
        this.$message.success(this.$t('base.tips.editSuccess'))
      })
    }
  }
};
</script>

<style lang="scss">
.role-dialog{
  .tree-wrapper{
    .el-form-item__content{
      height: 200px !important;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      padding: 12px;
    }
  }
}
</style>
