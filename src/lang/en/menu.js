export default {
  menu: {
    list: {
      add: 'Add submenu',
      tipsInfo: 'Click Left Menu to Operate(Add,Edit and Delete Submenu)',
    },
    edit: {
      modify: 'Modify',
      info: 'Add Submenu',
      tips: {
        0: 'Modified successfully',
        1: 'No changes, no commit required',
      }
    },
    add: {
      tips: {
        0: 'Added successfully'
      }
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
        name: 'Support for Chinese, Numbers, English letters, Spaces',
        url: 'Support for English letters, Numbers and partial symbols(:-/.?#_)'
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
