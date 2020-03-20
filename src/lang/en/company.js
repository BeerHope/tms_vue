export default {
  company: {
    list: {
      search: 'Search',
      add: 'Add company',
      edit: 'Edit',
      freeze: 'Freeze',
      activate: 'Activate',
      viewLevel: 'View level',
      customerCode: 'Customer Code',
      createdTime: 'Created Time：',
      filter: {
        company: 'company',
        level: 'level',
        state: 'State'
      },
      tips: {
        freezeTitle: 'Freeze',
        freezeContent: 'Please confirm whether to freeze',
        freezeSuccess: 'Frozen successfully',
        activateTitle: 'Activate',
        activateContent: 'Please confirm whether to activate',
        activateSuccess: 'Activated successfully'
      }
    },
    add: {
      title: 'Add Company',
    },
    edit: {
      title: 'Edit Company',
    },
    level: {
      title: 'View Level',
      close: 'Close',
      level1: 'First level company',
      level2: 'Second level company',
      level3: 'Third level company',
      level4: 'Fourth level company',
      level5: 'Fifth level company',
      level6: 'Sixth level company'
    },
    /* 公共部分 */
    form: {
      label: {
        parentId: 'Parent',
        customerCode: 'Customer Code',
        name: 'Name',
        shortName: 'Short Name',
        timezone: 'Timezone',
        address: 'Address',
        area: 'Area',
        remark: 'Remark'
      },
      tips: {
        company: 'Please Input a company name',
        shortName: 'Please Input a shortName of company ',
        timezoneId: 'Please select timezone'
      }
    },
    states: [
      {
        value: null,
        label: 'All'
      },
      {
        value: 1,
        label: 'Activated'
      },
      {
        value: 2,
        label: 'Frozen'
      }
    ],
    levels: [
      {
        label: 'All',
        value: null,
      },
      {
        label: 'Direct subordinates',
        value: 1,
      },
      {
        label: 'Indirect subordinates',
        value: 2
      }
    ],
  }
}
