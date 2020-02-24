export default {
  routes: {
    dashboard: '终端管理系统',
    terminal: '终端管理',
    terminalList: '终端列表',
    merchant: '商户管理',
    merchantList: '商户列表',
    merchantTerminalList: '商户终端列表',
    channel: '渠道商管理',
    channelList: '渠道商列表',
    batchImportChannel: '批量导入渠道商',
    config: '配置管理',
    configList: '配置列表',
    modelList: '机型列表',
    task: '任务管理',
    taskList: '任务列表',
    systemUpdate: '系统升级',
    systemPackageList: '系统包列表',
    app: '应用管理',
    appList: '应用列表',
    appReturnedList: '应用打回列表',
    appStore: '应用商店',
    appPromotion: '应用推广',
    slideshow: '轮播图',
    parameter: '参数管理',
    parameterList: '参数列表',
    appParameter: '应用参数',
    ads: '广告管理',
    terminalAdsList: '终端广告列表',
    appAdsList: '应用广告列表',
    log: '日志管理',
    updateLog: '升级日志',
    operateLog: '操作日志',
    terminalVisitLog: '终端访问日志',
    terminalRunLog: '终端运行日志',
    system: '系统管理',
    userList: '用户列表',
    roleList: '角色列表',
    menuList: '菜单列表',
    key: '密钥管理',
    keyImportRecordList: '密钥导入记录列表',
    TMkList: '终端密钥列表',
    mPos: 'MPos管理',
    machineList: '机型列表',
    merchantTerminal: '商户终端管理',
    equipment: '设备配置管理',
    equipmentList: '设备配置列表'
  },
  login: {
    title: 'XTMS管理系统',
    subtitle: 'XTMS Management System',
    username: '用户名',
    password: '密码',
    submit: '登录',
    tips: {
      username: '请输入正确的用户名',
      password: '输入密码不能少于8位'
    },
    switchLang: '语言选择',
    langs: {
      zh: '中文',
      en: '英文'
    }
  },
  /* 公共功能点 */
  function: {
    add: '新增',
    delete: '删除',
    edit: '编辑',
    details: '详情',
    search: '搜索',
    save: '保存',
    update: '更新',
    modify: '修改',
    cancel: '取消',
    reset: '重置'
  },
  /* 字典 */
  dictionary: {
    states: [
      {
        value: 0,
        label: '启用'
      },
      {
        value: 1,
        label: '禁用'
      }
    ]
  },
  menu: {
    updateCategory: '更新目录',
    addSubMenu: '添加子菜单',
    configInfo: '信息',
    tipsInfo: ' 点击左侧菜单对其操作(添加子菜单、编辑、删除)',
    menuTree: {
      rootMenu: '根节点',
      terminalManagement: '终端管理',
      terminalList: '终端列表',
      addTerminal: '新增终端',
      editTerminal: '编辑终端',
      deleteTerminal: '删除终端',
      importTerminal: '导入终端',
      terminalDetails: '终端详情'
    },
    form: {
      label: {
        parent: '父级名称',
        name: '菜单名称',
        state: '状 态',
        type: '菜单类型',
        url: '链接地址'
      },
      tips: {
        name: '支持中文、数字、英文字母、空格，且字符长度不能大于15',
        url: '支持英文字母、数字和部分符号（:-/.?#_）, 且长度不能大于100'
      }
    },
    states: [
      {
        value: 0,
        label: '启用'
      },
      {
        value: 1,
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
  },
  role: {
    userManagement: {
      thead: {
        account: '账号',
        name: '姓名',
        channel: '所属渠道商',
        operation: '操作',
      }
    }
  }
}
