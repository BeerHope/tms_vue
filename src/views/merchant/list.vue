<template>
  <div class="merchant-list common-list">
    <div class="filter-box p-t-6 p-b-6">
      <el-input 
        class="filter-item"
        v-model="filter.merchantNo"
        :placeholder="$t('merchant.list.filter.merchantNo')"
        clearable>
      </el-input>
      <el-input 
        class="filter-item" 
        v-model="filter.merchantName"
        :placeholder="$t('merchant.list.filter.merchantName')"
        clearable>
      </el-input>
      <treeselect
        class="filter-item"
        v-model="filter.companyId"
        :options="companyTreeData"
        :placeholder="$t('merchant.list.filter.company')"
        :default-expand-level="Infinity"
      ></treeselect>
      <el-button type="primary" @click="getMerchantList">
        <svg-icon icon-class="search"></svg-icon>
        {{ $t('merchant.list.search') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog(0, -1, true)">
        <svg-icon icon-class="type-in"></svg-icon>
        {{ $t('merchant.list.typeIn') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openImportDialog">
        <svg-icon icon-class="batch-edit"></svg-icon>
        {{ $t('merchant.list.batch') }}
      </el-button>
    </div>
    <div class="m-t-20 list-wrapper">
      <list-item
        v-for="item in merchantList"
        :key="item.id"
        @open-edit-dialog="openDialog(1, item.id, true)"
        @view-details="openDialog(2, item.id, true)"
        :item-data="item"
      ></list-item>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="getMerchantList"
        @current-change="getMerchantList"
        :current-page="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <merchant-dialog ref="merchantDialog" @refresh="getMerchantList"></merchant-dialog>
    <import-dialog ref="importDialog"></import-dialog>
  </div>
</template>

<script>
import ListItem from "./components/ListItem";
import ImportDialog from "./components/BatchUpload";
import MerchantDialog from "./components/MerchantDialog";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getMerchantList } from "@/api/merchant";
import { getCompanyTree } from "@/api/company";
import { sortCompanyTree } from "@/utils/global";
import { Loading } from 'element-ui';

export default {
  name: "",
  components: {
    ListItem,
    ImportDialog,
    MerchantDialog,
    Treeselect
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        merchantNo: "",
        merchantName: "",
        companyId: null,
        page: 1,
        pageSize: 10
      },
      cellStyle() {
        return {
          textAlign: "center"
        };
      },
      headerStyle() {
        return {
          color: "#172B4D",
          fontSize: "16px",
          textAlign: "center",
          padding: "20px 0"
        };
      },
      companyTreeData: [],
      merchantList: [],
      total: 0
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getCompanyTree();
    this.getMerchantList();
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
    getMerchantList() {
      const loading = Loading.service()
      getMerchantList(this.filter).then(res => {
        this.merchantList = res.data.rows;
        this.total = res.data.totalRecord;
        loading.close()
      });
    },
    openDialog(flag = 0, merchantId = -1, dialogVisible = true) {
      const merchantDialog = this.$refs.merchantDialog;
      _.assign(merchantDialog, {
        flag,
        merchantId,
        dialogVisible
      });
      console.log("添加渠道商！！！");
    },
    openImportDialog() {
      this.$refs.importDialog.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss">
.merchant-list {
  .el-button {
    min-width: auto;
  }
}
</style>
