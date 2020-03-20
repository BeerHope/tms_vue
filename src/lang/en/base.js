/* 公共部分 */
export default {
  /* 路由&菜单 */
  routes: {
    dashboard: 'Home',
    system: 'System Management',
    menu: 'Menu Management',
    role: 'Role Management',
    roleList: 'Role List',
    roleUser: 'User Management',
    user: 'User Management',
    details: 'Details',
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
    /* 状态 */
    states: [
      {
        value: '',
        label: '全部'
      },
      {
        value: 1,
        label: '启用'
      },
      {
        value: 2,
        label: '禁用'
      },
    ],
    buttons: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      add: 'Add',
      modify: 'Modify',
      yes: 'Yes',
      no: 'No'
    },
    tips: {
      addSuccess: 'Add Successfully',
      editSuccess: 'Modify Successfully',
      deleteSuccess: 'Delete successfully',
      removeSuccess: 'Remove successfully',
      saveSuccess: 'Save successfully',
      cancelRemove: 'Cancel to remove',
    }
  }
}
