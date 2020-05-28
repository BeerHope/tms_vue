export default {
  menu: {
    list: {
      add: '新增子菜单',
      tipsInfo: ' 点击左侧菜单对其操作(添加子菜单、编辑、删除)',
    },
    edit: {
      modify: '修 改',
      info: '新增子菜单',
      tips: {
        0: '修改成功',
        1: '没有修改， 无需提交',
      }
    },
    add: {
      tips: {
        0: '新增成功'
      }
    },
    /* 用于新增或编辑的公共表单 */
    form: {
      label: {
        parent: '父级',
        className: '菜单标识',
        showOrder: '优先级',
        name: '名称',
        state: '状态',
        type: '类型',
        url: 'URL',
        remark: '备注'
      },
      tips: {
        name: '支持中文、数字、英文字母、空格',
        url: '支持英文字母、数字和部分符号（:-/.?#_）'
      }
    },
    states: [
      {
        value: 1,
        label: '启用'
      },
      {
        value: 2,
        label: '禁用'
      }
    ],
    types: [
      {
        value: 1,
        label: '目录'
      },
      {
        value: 2,
        label: '菜单'
      },
      {
        value: 3,
        label: '功能'
      }
    ]
  }
}
