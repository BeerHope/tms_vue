<template>
  <div class="common-list model-list">
    <div class="filter-box p-t-6 p-b-6">
      <el-select class="filter-item" v-model="filter.type" clearable placeholder="类型">
        <el-option v-for="item in types" :key="item.value" :value="item.value" :label="item.label"></el-option>
      </el-select>
      <el-input class="filter-item" v-model="filter.model" clearable placeholder="机型名称"></el-input>
      <el-input class="filter-item" v-model="filter.vendor" clearable placeholder="产商名称"></el-input>
      <el-button type="primary">
        <svg-icon icon-class="search"></svg-icon>
        搜索
      </el-button>
      <el-button type="primary" class="green-btn" @click="openDialog()">
        <svg-icon icon-class="add"></svg-icon>
        新增
      </el-button>
    </div>
    <div class="model-table m-t-30">
      <el-table
        :header-cell-style="headerStyle"
        :cell-style="cellStyle"
        :data="modelList"
        style="width: 100%">
        <el-table-column width="160" label="图片" align="center">
          <template slot-scope="scope" width="200">
            <img width="50%" :src="scope.row.type | getPosImg" alt="pos image">
            <!-- <el-button
              size="mini"
              @click="handleEdit(scope.row)">图片</el-button> -->
          </template>
        </el-table-column>
        <el-table-column width="120" label="机型名称" prop="model" align="center"></el-table-column>
        <el-table-column width="120" label="类型" prop="type" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.type | getPosType }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="分辨率" prop="resolution" align="center"></el-table-column>
        <el-table-column width="160" label="厂商名称" prop="vendor" align="center"></el-table-column>
        <el-table-column label="机型描述" prop="desc" align="center"></el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import tposImg from '@/assets/images/tpos.png'
import sposImg from '@/assets/images/spos.png'
import mposImg from '@/assets/images/mpos.png'

export default {
  name: 'ModelList',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      filter: {
        type: '',
        model: '',
        verdor: ''
      },
      types: [
        {
          value: 1,
          label: 'TPos'
        },
        {
          value: 2,
          label: 'SPos'
        },
        {
          value: 3,
          label: 'MPos'
        }
      ],
      cellStyle() {
        return {
          padding: '20px 0'
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
      /* type表示机器类型：智能、传统 */
      /* 暂时以1，2，3分别代表：传统pos，智能pos，移动pos */
      modelList: [
        {
          type: 1,
          model: 'G2',
          resolution: '1280 * 720',
          vendor: 'NEXGO',
          desc: '4核高性能+金融及安全,支持磁条卡、IC卡，非接NFC等多种支付方式,内置专业扫码模块，轻松实现微信，支付宝等二维码支付'
        },
        {
          type: 2,
          model: 'N5',
          resolution: '1280 * 720',
          vendor: 'NEXGO',
          desc: '4核高性能+金融及安全,支持磁条卡、IC卡，非接NFC等多种支付方式,内置专业扫码模块，轻松实现微信，支付宝等二维码支付'
        },
        {
          type: 3,
          model: 'KD58',
          resolution: '1280 * 720',
          vendor: 'NEXGO',
          desc: '4核高性能+金融及安全,支持磁条卡、IC卡，非接NFC等多种支付方式,内置专业扫码模块，轻松实现微信，支付宝等二维码支付'
        }
      ],
      currentPage: 1,
    }
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
    getPosType(posType) {
      const posTypes = {
        1: '传统pos',
        2: '智能pos',
        3: '移动pos'
      }
      return posTypes[posType]
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
    handleEdit(row) {
      console.log(row, 'row!!!!')
    },
    handleSizeChange() {
      console.log('handleSizeChange!!!!')
    },
    handleCurrentChange() {
      cosnole.log('handleCurrentChange')
    },

  }
}
</script>

<style lang='scss' scoped>
.model-table{

}
</style>
