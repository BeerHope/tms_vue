<template>
  <div class="common-list model-list">
    <div class="filter-box p-t-6 p-b-6">
      <el-select class="filter-item" v-model="filter.type" clearable :placeholder="$t('model.list.filter.type')">
        <el-option
          v-for="item in $t('base.posTypes')" :key="item.value" 
          :value="item.value" :label="item.label">
        </el-option>
      </el-select>
      <el-input class="filter-item" v-model="filter.model" clearable :placeholder="$t('model.list.filter.name')"></el-input>
      <el-select
        class="filter-item" clearable
        v-model="filter.vendorId"
        :placeholder="$t('model.list.filter.vendorName')">
        <el-option
          v-for="item in vendorList" :key="item.id"
          :value="item.id" :label="item.name">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getModelList">
        <svg-icon icon-class="search"></svg-icon>
        {{ $t('model.list.search') }}
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog()">
        <svg-icon icon-class="add"></svg-icon>
        {{ $t('model.list.add') }}
      </el-button>
    </div>
    <div class="m-t-30 list-wrapper">
      <el-table
        :header-cell-style="headerStyle"
        :cell-style="cellStyle"
        :data="modelList"
        style="width: 100%">
        <el-table-column width="160" :label="$t('model.list.table.picUrl')" align="center">
          <template slot-scope="scope">
            <el-image v-if="!scope.row.picUrl" width="50%" :src="scope.row.type | getPosImg" alt="pos image" lazy></el-image>
            <el-image v-else width="50%" :src="scope.row.picUrl" alt="pos image" lazy></el-image>
          </template>
        </el-table-column>
        <el-table-column width="160" :label="$t('model.list.table.name')" prop="name" align="center"></el-table-column>
        <el-table-column width="160" :label="$t('model.list.table.type')" prop="type" align="center">
          <template slot-scope="scope">
            <span>{{ mapPosType(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column width="160" :label="$t('model.list.table.resolution')" prop="resolution" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.resolutionX }} * {{ scope.row.resolutionY }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('model.list.table.vendorName')" prop="vendorName" align="center"></el-table-column>
        <el-table-column :label="$t('model.list.table.remark')" prop="remark"></el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openDialog(1, scope.row.id, true)">{{ $t('model.list.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="common-pagination m-t-20"
        @size-change="getModelList"
        @current-change="getModelList"
        :current-page.sync="filter.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <model-dialog @refresh="getModelList" :vendor-list="vendorList" ref="modelDialog"></model-dialog>
  </div>
</template>

<script>
import tposImg from '@/assets/images/tpos.png'
import sposImg from '@/assets/images/spos.png'
import mposImg from '@/assets/images/mpos.png'
import ModelDialog from './components/ModelDialog'
import { getModelList } from '@/api/model'
import { getAllvendors } from '@/api/vendor'
import { Loading } from 'element-ui'

export default {
  name: 'ModelList',
  components: {
    ModelDialog
  },
  filters: {
    getPosImg(posType) {
      const posImgs = {
        1: tposImg,
        2: sposImg,
        3: mposImg
      }
      return posImgs[posType]
    },
  },
  props: {},
  directive: {},
  data() {
    return {
      loading: false,
      filter: {
        type: '',
        model: '',
        vendorId: '',
        page: 1,
        pageSize: 10
      },
      cellStyle() {
        return {
          padding: '20px 0',
          fontSize: '14px',
        }
      },
      headerStyle() {
        return {
          color: '#172B4D',
          fontSize: '16px',
          padding: '20px 0'
        }
      },
      modelList: [],
      vendorList: [],
      total: 0,
    }
  },
  computed: {
   
  },
  watch: {},
  created() {
    this.getVendorList()
    this.getModelList()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    openDialog(flag = 0, modelId = -1, dialogVisible = true) {
      console.log('打开新增弹窗！！！！')
      const modelDialog = this.$refs.modelDialog
      _.assign(modelDialog, {
        flag,
        modelId,
        dialogVisible
      })
    },
    getVendorList() {
      getAllvendors().then(res => {
        this.vendorList = res.data
      })
    },
    getModelList() {
      const loading = Loading.service()
      getModelList(this.filter).then(res => {
        this.modelList = res.data.rows
        this.total = res.data.totalRecord
        loading.close()
      })
    },
    mapPosType(posType) {
      const posTypes = this.$t('base.posTypes')
      return _.find(posTypes, { value: _.toNumber(posType) }).label || ''
    }
  }
}
</script>

<style lang='scss'>
</style>
