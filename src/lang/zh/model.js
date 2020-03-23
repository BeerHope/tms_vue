export default {
  model: {
    list: {
      search: '搜索',
      add: '新增',
      edit: '编辑',
      filter: {
        type: '类型',
        name: '机型名称',
        vendorName: '厂商名称',
      },
      table: {
        picUrl: '图片',
        name: '机型名称',
        type: '类型',
        resolution: '分辨率',
        vendorName: '厂商名称',
        remark: '机型描述'
      }
    },
    add: {
      title: '新增机型',
    },
    edit: {
      title: '编辑机型'
    },
    form: {
      label: {
        type: '类型',
        name: '机型名称',
        vendorId: '厂商',
        resolution: '分辨率',
        resolutionX: '宽',
        resolutionY: '高',
        picUrl: '机型图片',
        remark: '机型描述'
      },
      placeholder: {
        resolutionX: '宽',
        resolutionY: '高'
      },
      tips: {
        types: '请选择类型',
        name: '请输入机型名称',
        vendorId: '请选择厂商',
        resolutionX: '请输入宽度',
        resolutionY: '请输入高度',
        picUrl: '请上传图片'
      }
    }
  }
}
