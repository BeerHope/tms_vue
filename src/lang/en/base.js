/* 公共部分 */
export default {
  /* 路由&菜单 */
  routes: {
    home: 'Home',
    system: 'System Management',
    menu: 'Menu Management',
    role: 'Role Management',
    roleList: 'Role List',
    roleUser: 'User Management',
    user: 'User Management',
    details: 'User Details',
    company: 'Channel Management',
    companyInfo: 'Channel Information Management',
    equipment: 'Equipment Configuration Management',
    vendor: 'Vendor Management',
    model: 'Model Management',
    machineList: 'Machine List',
    merchantTerminal: 'Merchant Terminal Management',
    merchantInfo: 'Merchant Information Management',
    machine: 'Machine Management',
    machineDetails: 'Machine Details',
    machineControl: 'Machine Remote Control',
    machineAllocation: 'Machines batch allocation',
    file: 'Files Management',
    systemPackage: 'System Packages',
    application: 'Applications',
    appDetails: 'Application Details',
    fileStorage: 'Files Storage'
  },
  /* 公共功能点 */
  function: {
    add: 'Add',
    delete: 'Delete',
    edit: 'Edit',
    details: 'Details',
    search: 'Search',
    save: 'Save',
    update: 'Update',
    modify: 'Modify',
    cancel: 'Cancel',
    reset: 'Reset'
  },
  base: {
    upload: {
      title: 'Batch Import',
      templateTips: 'Please click to download the template first${模板名称}',
      templateName: 'merchant-template',
      uploadTips: 'Drag the file here, or click upload',
      fileCheckTips: 'You can only choose excel files, only support XLSX suffix, and no more than 5M',
      cancel: 'Cancel',
      import: 'Import',
      /* 上传后的操作提示 */
      uploadRes: {
        title: 'Operation tips',
        totalMerchant: 'The total number of merchants in the manifest file：',
        successAmount: 'The number of successful imports:',
        failureText: 'Whether you need to export the failure list?'
      },
      exceedTips: 'Only a single file is allowed to be uploaded. If you want to replace the file,please remove the current file first',
      fileNullTips: 'Please upload a file first'
    },
    noResult: {
      desc: 'No Search Result',
    },
    /* 状态 */
    states: [
      {
        value: '',
        label: 'All'
      },
      {
        value: 1,
        label: 'Enabled'
      },
      {
        value: 2,
        label: 'Disabled'
      },
    ],
    buttons: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      close: 'Close',
      add: 'Add',
      modify: 'Modify',
      import: 'Import',
      bind: 'Bind',
      unbind: 'Unbind',
      search: 'Search',
      push: 'Push',
      delete: 'Delete',
      yes: 'Yes',
      no: 'No'
    },
    tips: {
      addSuccess: 'Add successfully',
      editSuccess: 'Modify successfully',
      deleteSuccess: 'Delete successfully',
      removeSuccess: 'Remove successfully',
      saveSuccess: 'Save successfully',
      cancelRemove: 'Cancel to remove',
      unbindSuccess: 'Unbind successfully',
      bindSuccess: 'Bind successfully'
    },
    posTypes: [
      {
        label: 'All',
        value: null,
      },
      {
        label: 'Traditional pos',
        value: 1,
      },
      {
        label: 'Smart pos',
        value: 2,
      },
      {
        label: 'Mobile pos',
        value: 3,
      }
    ]
  }
}
