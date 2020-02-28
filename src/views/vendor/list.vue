<template>
  <div class="vendor-list common-list">
    <div class="filter-box p-t-6 p-b-6">
      <el-input class="filter-item" v-model="filter.name" clearable placeholder="产商名称"></el-input>
      <el-button type="primary">
        <svg-icon icon-class="search"></svg-icon>
        搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog()">
        <svg-icon icon-class="add"></svg-icon>
        新增
      </el-button>
    </div>
    <div class="common-table">
      <list-item v-for="item in vendorList" :key="item.code" :data="item" @handle-edit="openDialog(1, 32, true)"></list-item>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <vendor-dialog ref="vendorDialog"></vendor-dialog>
  </div>
</template>

<script>
import ListItem from './components/ListItem'
import VendorDialog from './components/VendorDialog'

export default {
  name: '',
  components: {
    ListItem,
    VendorDialog
  },
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        name: ''
      },
      vendorList: [
        {
          id: '4324324',
          name: '厂商111',
          code: '3234234324'
        },
        {
          id: '423423432',
          name: '厂商222',
          code: '42342341212'
        },
        {
          id: '43243243244',
          name: '厂商111',
          code: '323423432443434'
        },
        {
          id: '423423432',
          name: '厂商222',
          code: '42342341243243412'
        },
        {
          id: '43243243111114',
          name: '厂商111',
          code: '32342343243211114'
        },
        {
          id: '423423432111',
          name: '厂商222',
          code: '1231232348543580'
        }
      ],
      currentPage: 1
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
    openDialog(flag = 0, vendorId = -1, dialogVisible = true) {
      const vendorDialog = this.$refs.vendorDialog
      _.assign(vendorDialog, {
        flag,
        vendorId,
        dialogVisible
      })
      console.log('open dialog!!!!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!!!')
    },
    handleSizeChange() {
      console.log('handleSizeChange')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
