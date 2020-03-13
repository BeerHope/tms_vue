
import login from './zh/login'
import menu from './zh/menu'

export default {
  ...login,
  ...menu,
  routes: {
    dashboard: '终端管理系统',
    system: '系统管理',
    menu: '菜单管理',
    role: '角色管理',
    user: '用户管理',
    channel: '渠道商管理',
    channelInfo: '渠道商信息管理',
    equipment: '设备配置管理',
    vendor: '产商管理',
    model: '机型管理',
    merchantList: '商户列表',
    merchantTerminal: '商户终端管理',
    merchantInfo: '商户信息管理',
    machine: '机具管理',
    machineDetails: '机具详情',
    machineControl: '机具远程控制',
    machineAllocation: '机具批量调拨',
    file: '文件管理',
    systemPackage: '我的系统包',
    application: '我的应用',
    appDetails: '应用详情',
    fileStorage: '文件仓库'
  },
  /* 公共功能点 */
  function: {
    add: '新 增',
    delete: '删除',
    edit: '编辑',
    details: '详情',
    search: '搜索',
    save: '保 存',
    update: '更 新',
    modify: '修 改',
    cancel: '取 消',
    reset: '重 置'
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
  // menu: {
  //   updateCategory: '更新目录',
  //   addSubMenu: '添加子菜单',
  //   configInfo: '信息',
  //   tipsInfo: ' 点击左侧菜单对其操作(添加子菜单、编辑、删除)',
  //   menuTree: {
  //     root: '根节点',
  //     terminalManagement: '终端管理',
  //     terminalList: '终端列表',
  //     addTerminal: '新增终端',
  //     editTerminal: '编辑终端',
  //     deleteTerminal: '删除终端',
  //     importTerminal: '导入终端',
  //     terminalDetails: '终端详情'
  //   },
  //   form: {
  //     label: {
  //       parent: '父级',
  //       name: '名称',
  //       state: '状态',
  //       type: '类型',
  //       url: 'URL'
  //     },
  //     tips: {
  //       name: '支持中文、数字、英文字母、空格，且字符长度不能大于15',
  //       url: '支持英文字母、数字和部分符号（:-/.?#_）, 且长度不能大于100'
  //     }
  //   },
  //   states: [
  //     {
  //       value: 0,
  //       label: '启用'
  //     },
  //     {
  //       value: 1,
  //       label: '禁用'
  //     }
  //   ],
  //   types: [
  //     {
  //       value: 1,
  //       label: '目录'
  //     },
  //     {
  //       value: 2,
  //       label: '菜单'
  //     },
  //     {
  //       value: 3,
  //       label: '功能'
  //     }
  //   ]
  // },
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
