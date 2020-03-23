<template>
  <div class="vendor-list common-list" v-loading="loading">
    <div class="filter-box p-t-6 p-b-6">
      <el-input class="filter-item" v-model="filter.name" clearable :placeholder="$t('vendor.list.filter.name')"></el-input>
      <el-button type="primary" @click="getVendorList">
        <svg-icon icon-class="search"></svg-icon>
        {{ $t('vendor.list.search') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog()">
        <svg-icon icon-class="add"></svg-icon>
        {{ $t('vendor.list.add') }}
      </el-button>
    </div>
    <div class="common-table">
      <list-item v-for="item in vendorList" :key="item.code" :data="item" @handle-edit="openDialog(1, item.id, true)"></list-item>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="getVendorList"
        @current-change="getVendorList"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <vendor-dialog @refresh="getVendorList" ref="vendorDialog"></vendor-dialog>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import VendorDialog from './components/VendorDialog'
import { getVendorList } from '@/api/vendor'

export default {
  name: 'VendorList',
  components: {
    ListItem,
    VendorDialog
  },
  props: {},
  directive: {},
  data() {
    return {
      loading: false,
      filter: {
        name: '',
        page: 1,
        pageSize: 10,
      },
      vendorList: [],
      total: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getVendorList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getVendorList() {
      this.loading = true
      getVendorList(this.filter).then(res => {
        this.vendorList = res.data.rows
        this.total = res.data.totalRecord
        this.loading = false
      })
    },
    openDialog(flag = 0, vendorId = -1, dialogVisible = true) {
      const vendorDialog = this.$refs.vendorDialog
      _.assign(vendorDialog, {
        flag,
        vendorId,
        dialogVisible
      })
    },
  }
}
</script>

<style lang='scss' scoped>

</style>
