/* 公共部分 */
export default {
  routes: {
    dashboard: '终端管理系统',
    system: '系统管理',
    menu: '菜单管理',
    role: '角色管理',
    roleList: '角色列表',
    roleUser: '管理用户',
    user: '用户管理',
    details: '详情',
    company: '渠道商管理',
    companyInfo: '渠道商信息管理',
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
  base: {
    states: [
      {
        value: null,
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
    tips: {
      addSuccess: '新增成功',
      editSuccess: '修改成功',
      deleteSuccess: '删除成功',
      removeSuccess: '移除成功',
      saveSuccess: '保存成功',
      cancelRemove: '取消移除',
    },
    buttons: {
      confirm: '确定',
      cancel: '取消',
      save: '保存',
      add: '新增',
      modify: '修改',
      yes: '是',
      no: '否'
    }
  }
}
