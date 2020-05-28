<template>
  <div class="common-list machine-list">
    <div class="filter-box p-t-6 p-b-6">
      <!-- 机身号：精确查询 -->
      <el-input class="filter-item" v-model="filter.sn" :placeholder="$t('machine.list.filter.sn')" clearable></el-input>
      <el-select class="filter-item" v-model="filter.state" :placeholder="$t('machine.list.filter.state')" clearable>
        <el-option 
          v-for="item in $t('machine.states')" :key="item.value" 
          :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <treeselect 
        class="filter-item" v-model="filter.companyId" 
        :default-expand-level="Infinity"
        :options="companyTreeData" 
        :placeholder="$t('machine.list.filter.companyId')">
      </treeselect>
      <!-- 商户编号：精确查询 -->
      <el-input class="filter-item" v-model="filter.marchantId" :placeholder="$t('machine.list.filter.merchantNo')" clearable></el-input>
      <el-input class="filter-item" v-model="filter.marchantName" :placeholder="$t('machine.list.filter.merchantName')" clearable></el-input>
      <el-button type="primary" @click="getMachineList">
        <svg-icon icon-class="search"></svg-icon>
        {{ $t('machine.list.search') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog()">
        <svg-icon icon-class="add"></svg-icon>
        {{ $t('machine.list.add') }}
      </el-button>
    </div>
    <div class="m-t-14">
      <el-button type="primary" @click="openImportDialog">
        <svg-icon icon-class="batch-import"></svg-icon>
        {{ $t('machine.list.batchImport') }}
      </el-button>
    </div>
    <div v-if="machineList.length" class="common-table m-t-20">
      <list-item
        v-for="item in machineList" :key="item.id"
        @refresh="getMachineList"
        :item-data="item" @open-bind-dialog="openBindDialog(item)"
        @open-edit-dialog="openDialog(1, item.id, true)"
      ></list-item>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="getMachineList"
        @current-change="getMachineList"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <no-result v-else></no-result>
    <machine-dialog @refresh="getMachineList" ref="machineDialog"></machine-dialog>
    <bind-dialog ref="bindDialog" @refresh="getMachineList"></bind-dialog>
    <upload
      ref="importDialog"
      :file-name="$t('machine.batchImport.fileName')"
      :table-header="$t('machine.batchImport.header')"
      :title="$t('machine.batchImport.title')"
      :template-name="$t('machine.batchImport.templateName')"
      :upload-url="bindUploadUrl" :download="downloadTemplate">
    </upload>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import Upload from '@/components/Upload'
import MachineDialog from './components/MachineDialog'
import BindDialog from './components/BindDialog'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
/* 后期整合优化 */
import { sortCompanyTree } from "@/utils/global";
import { getCompanyTree } from '@/api/company'
import { getMachineList, downloadTemplate } from '@/api/machine'
import { Loading } from 'element-ui'

export default {
  name: 'MachineList',
  components: {
    ListItem,
    Upload,
    MachineDialog,
    BindDialog,
    Treeselect
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        sn: '',
        state: '',
        companyId: null,
        merchantNo: '',
        merchantName: '',
        page: 1,
        pageSize: 10
      },
      companyTreeData: [],
      machineList: [],
      total: 0,
    }
  },
  computed: {
    bindUploadUrl() {
      return `${process.env.VUE_APP_BASE_URL}/machine/batch`
    }
  },
  watch: {},
  created() {
    this.getCompanyTree()
    this.getMachineList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getCompanyTree() {
      getCompanyTree().then(res => {
        const resData = (res.data && [res.data]) || [];
        this.companyTreeData = sortCompanyTree(resData);
      })
    },
    getMachineList() {
      const loading = Loading.service()
      getMachineList(this.filter).then(res => {
        this.machineList = res.data.rows
        this.total = res.data.totalRecord
        loading.close()
      })
    },
    openDialog(flag = 0, machineId = -1, dialogVisible = true) {
      const machineDialog = this.$refs.machineDialog
      _.assign(machineDialog, {
        flag,
        machineId,
        dialogVisible
      })
    },
    openBindDialog(item) {
      const bindDialog = this.$refs.bindDialog
      bindDialog.bindingDialogVisible = true
      bindDialog.currentMachine = item
    },
    openImportDialog() {
      this.$refs.importDialog.dialogVisible = true
    },
    downloadTemplate() {
      return downloadTemplate()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
