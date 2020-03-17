export default {
  menu: {
    list: {
      add: 'Add submenu',
      tipsInfo: 'Click Left Menu to Operate(Add,Edit and Delete Submenu)',
    },
    edit: {
      modify: 'Modify',
      info: 'Add Submenu',
    },
    /* common form, used for editing or adding menu */
    form: {
      label: {
        parent: 'Parent',
        className: 'ClassName',
        showOrder: 'ShowOrder',
        name: 'Name',
        state: 'State',
        type: 'Type',
        url: 'URL',
        remark: 'Remark'
      },
      tips: {
        name: '支持中文、数字、英文字母、空格，且字符长度不能大于15',
        url: '支持英文字母、数字和部分符号（:-/.?#_）, 且长度不能大于100'
      }
    },
    states: [
      {
        value: 1,
        label: 'Enabled'
      },
      {
        value: 2,
        label: 'Disabled'
      }
    ],
    types: [
      {
        value: 1,
        label: 'Catalog'
      },
      {
        value: 2,
        label: 'Menu'
      },
      {
        value: 3,
        label: 'Function'
      }
    ]
  }
}
