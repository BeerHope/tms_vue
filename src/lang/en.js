export default {
  /* 路由&菜单 */
  routes: {
    dashboard: 'Home',
    system: 'System Management',
    menuList: 'Menu Management',
    roleList: 'Role Management',
    userList: 'User Management',
    channel: 'Channel Management',
    channelInfo: 'Channel Information Management',
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
    file: '文件管理',
    systemPackage: '我的系统包',
    application: '我的应用',
    fileStorage: '文件仓库'
  },
  /* 登录 */
  login: {
    title: 'XTMS',
    subtitle: 'XTMS Management System',
    username: 'Username',
    password: 'Password',
    submit: 'Login',
    tips: {
      username: 'Please enter the correct user name',
      password: 'The password can not be less than 8 digits'
    },
    switchLang: 'Language',
    langs: {
      zh: '中文',
      en: 'English'
    }
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
  /* 用户权限 -> 菜单列表 */
  menu: {
    updateCategory: 'Update Category',
    addSubMenu: 'Add submenu',
    configInfo: 'Information',
    tipsInfo: 'Click Left Menu to Operate(Add,Edit and Delete Submenu)',
    menuTree: {
      root: 'Root Menu',
      terminalManagement: 'Terminal Management',
      terminalList: 'Terminal List',
      addTerminal: 'Add New Terminal',
      editTerminal: 'Edit Terminal',
      deleteTerminal: 'Delete Terminal',
      importTerminal: 'Import Terminal',
      terminalDetails: 'Terminal Details'
    },
    form: {
      label: {
        parent: 'Parent Name',
        name: 'Menu Name',
        state: 'State',
        type: 'Type',
        url: 'URL'
      },
      tips: {
        name: 'Support Chinese, Numbers, English letters, Spaces, and character length not more than 15',
        url: 'Support English letters, Numbers and partial symbols including :-/.?#_, and the length shall not be greater than 100'
      }
    },
    states: [
      {
        value: 0,
        label: 'Enabled'
      },
      {
        value: 1,
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
  },
  role: {
    userManage: {
      thead: {
        account: 'Account',
        name: 'Username',
        channel: 'Channel provider',
        operation: 'Operation',
      }
    }
  }
}
