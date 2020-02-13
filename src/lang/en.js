export default {
  /* 路由&菜单 */
  routes: {
    dashboard: 'Home',
    terminal: 'Terminal Management',
    terminalList: 'Terminal List',
    merchant: 'Merchant Management',
    merchantList: 'Merchant List',
    merchantTerminalList: 'Merchant Terminal List',
    channel: 'Channel Management',
    channelList: 'Channel List',
    batchImportChannel: 'Batch Import Channel',
    config: 'Config Management',
    configList: 'Config List',
    modelList: 'Model List',
    task: 'Task Management',
    taskList: 'Task List',
    systemUpdate: 'System Update',
    systemPackageList: 'System Package List',
    app: 'App Management',
    appList: 'App List',
    appReturned: 'App Returned',
    appStore: 'App Store',
    appPromotion: 'App Promotion',
    slideshow: 'Slideshow',
    parameter: 'Parameter Management',
    parameterList: 'Parameter List',
    appParameter: 'App Parameter',
    ads: 'Ads Management',
    terminalAdsList: 'Terminal Ads List',
    appAdsList: 'App Ads List',
    log: 'Log Management',
    updateLog: 'Update Log',
    operateLog: 'Operate Log',
    terminalVisitLog: 'Terminal Visit Log',
    auth: 'User Authority',
    userList: 'User List',
    roleList: 'Role List',
    menuList: 'Menu List',
    key: 'Key Management',
    keyImportRecordList: 'Key Import Record List',
    TMkList: 'TMK List',
    mPos: 'MPos Management',
    machineList: 'Machine List'
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
      zh: 'Chinese',
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
  menuList: {
    updateCategory: 'Update Category',
    addSubMenu: 'Add submenu',
    configInfo: 'Information',
    tipsInfo: 'Click Left Menu to Operate(Add,Edit and Delete Submenu)',
    menuTree: {
      rootMenu: 'Root Menu',
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
  }
}
