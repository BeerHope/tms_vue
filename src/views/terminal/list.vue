<template>
  <div class="merchant-list common-list">
    <div class="filter-box p-t-6 p-b-6">
      <el-input 
        class="filter-item" v-model="filter.merchantNo"
        clearable :placeholder="$t('terminal.list.filter.merchantNo')">
      </el-input>
      <el-input
        class="filter-item" v-model="filter.merchantName"
        clearable :placeholder="$t('terminal.list.filter.merchantName')">
      </el-input>
      <treeselect 
        class="filter-item" 
        v-model="filter.companyId" 
        :options="companyTreeData"
        :default-expand-level="Infinity"
        :placeholder="$t('terminal.list.filter.company')">
      </treeselect>
      <el-input 
        class="filter-item" v-model="filter.terminalNo" clearable
        :placeholder="$t('terminal.list.filter.terminalNo')">
      </el-input>
      <el-select class="filter-item" v-model="filter.state" clearable :placeholder="$t('terminal.list.filter.state')">
        <el-option
          v-for="item in $t('terminal.states')"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getTerminalList">
        <svg-icon icon-class="search"></svg-icon>
        {{ $t('terminal.list.search') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog(0, -1, true)">
        <svg-icon icon-class="add"></svg-icon>
        {{ $t('terminal.list.add') }}
      </el-button>
    </div>
    <div class="batch m-t-14">
      <el-button type="primary" @click="openImportDialog">
        <svg-icon icon-class="batch-import"></svg-icon>
        {{ $t('terminal.list.batchImport') }}
      </el-button>
      <el-button type="primary" @click="openBatchBindDialog">
        <svg-icon icon-class="bind"></svg-icon>
        {{ $t('terminal.list.batchBind') }}
      </el-button>
    </div>
    <div class="m-t-20 list-wrapper">
      <list-item
        v-for="item in terminalList" :key="item.id"
        @open-edit-dialog="openDialog(1, item.id, true)"
        @open-bind-dialog="openBindDialog(item.id)"
        @handle-unbind="handleUnbind(item)"
        @view-details="openDialog(2, item.id, true)"
        :item-data="item">
      </list-item>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="getTerminalList"
        @current-change="getTerminalList"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <terminal-dialog ref="terminalDialog" @refresh="getTerminalList"></terminal-dialog>
    <bind-dialog ref="bindDialog" @refresh="getTerminalList"></bind-dialog>
    <upload
      ref="import" 
      :title="$t('terminal.batchImport.title')"
      :template-name="$t('terminal.batchImport.templateName')"
      :upload-url="importUploadUrl" :download="downloadImportTemplate">
    </upload>
    <upload
      ref="batchBind" 
      :title="$t('terminal.batchBind.title')"
      :template-name="$t('terminal.batchBind.templateName')"
      :upload-url="bindUploadUrl" :download="downloadBindTemplate">
    </upload>
  </div>
</template>

<script>
/* BatchBind */
import { getTerminalList, downloadBindTemplate, downloadImportTemplate, unbind } from '@/api/terminal'
import { ListItem, TerminalDialog, BindDialog } from './components'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { sortCompanyTree } from "@/utils/global";
import { getCompanyTree } from '@/api/company'
import Upload from '@/components/Upload'
import { Loading } from 'element-ui'

export default {
  name: '',
  components: {
    ListItem,
    TerminalDialog,
    BindDialog,
    Treeselect,
    Upload
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        merchantNo: '',
        merchantName: '',
        companyId: null,
        terminalNo: '',
        state: null,
        page: 1,
        pageSize: 10
      },
      cellStyle() {
        return {
          textAlign: 'center'
        }
      },
      headerStyle() {
        return {
          color: '#172B4D',
          fontSize: '16px',
          textAlign: 'center',
          padding: '20px 0'
        }
      },
      companyTreeData: [],
      terminalList: [],
      total: 0,
    }
  },
  computed: {
    bindUploadUrl() {
      return `${process.env.VUE_APP_BASE_URL}/terminal/binding/machine`;
    },
    importUploadUrl() {
      return `${process.env.VUE_APP_BASE_URL}/terminal/batch`;
    },
  },
  watch: {},
  created() {
    this.getCompanyTree()
    this.getTerminalList()
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
      });
    },
    getTerminalList() {
      const loading = Loading.service()
      getTerminalList(this.filter).then(res => {
        this.terminalList = res.data.rows
        this.total = res.data.totalRecord
        loading.close()
      })
    },
    openDialog(flag = 0, terminalId = -1, dialogVisible = true) {
      const terminalDialog = this.$refs.terminalDialog
      _.assign(terminalDialog, {
        flag,
        terminalId,
        dialogVisible
      })
    },
    openImportDialog() {
      this.$refs.import.dialogVisible = true
    },
    openBatchBindDialog() {
      this.$refs.batchBind.dialogVisible = true
    },
    openBindDialog(terminalId) {
      const bindDialog = this.$refs.bindDialog
      bindDialog.terminalId = terminalId
      bindDialog.dialogVisible = true
    },
    handleUnbind(row) {
      const { id: terminalId, sn, merchantName, terminalNo } = row
      const content = 
        `${this.$t('terminal.unbind.content1')}
        ${sn}${this.$t('terminal.unbind.content2')}
        ${merchantName}(${this.$t('terminal.unbind.content3')}${terminalNo})
        ${this.$t('terminal.unbind.content4')}?`
      this.$confirm(content, this.$t('terminal.unbind.title'), {
        confirmButtonText: this.$t('base.buttons.yes'),
        cancelButtonText: this.$t('base.buttons.no'),
        customClass: 'delete-confirm'
      }).then(() => {
        // 进行删除操作
        unbind(terminalId, sn).then(res => {
          this.$emit('refresh')
          this.$message.success(this.$t('base.tips.unbindSucces'))
        })
      }).catch(() => {
        console.log('取消解绑')
      })
    },
    downloadBindTemplate() {
      return downloadBindTemplate()
    },
    downloadImportTemplate() {
      return downloadImportTemplate()
    }
  }
}
</script>

<style lang="scss">
.terminal-list{
  .el-button{
    min-width: auto;
  }
}
</style>
