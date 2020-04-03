/* 公共部分 */
export default {
  documentTitle: '终端管理系统',
  routes: {
    login: '登录',
    home: '首页',
    system: '系统管理',
    menu: '菜单管理',
    role: '角色管理',
    roleUser: '管理用户',
    user: '用户管理',
    details: '用户详情',
    company: '渠道商管理',
    companyInfo: '渠道商信息管理',
    equipment: '设备配置管理',
    vendor: '厂商管理',
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
    upload: {
      title: '批量录入',
      templateTips: '请先点击下载模板',
      templateName: '商户录入模板',
      uploadTips: '将文件拖到此处，或点击上传',
      fileCheckTips: '只能选择excel文件，仅支持xlsx后缀 ，且不超过5M',
      fileCheckType: '只能选择excel文件，仅支持xlsx后缀',
      fileCheckSize: '上传文件不能超过5M',
      cancel: '取消',
      import: '导入',
      /* 上传后的操作提示 */
      uploadRes: {
        title: '操作提示',
        totalMerchant: '清单文件中商户总数：',
        successAmount: '导入成功数量：',
        failureText: '是否需要导出失败清单?'
      },
      exceedTips: '只允许上传单个文件，若要修改文件，请先移除当前文件',
      fileNullTips: '请先上传文件'
    },
    noResult: {
      desc: '无搜索结果',
    },
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
      unbindSuccess: '解绑成功',
      bindSuccess: '绑定成功',
    },
    buttons: {
      confirm: '确定',
      cancel: '取消',
      close: '关闭',
      save: '保存',
      add: '新增',
      modify: '修改',
      import: '导入',
      bind: '绑定',
      unbind: '解绑',
      search: '搜索',
      push: '推送',
      delete: '删除',
      yes: '是',
      no: '否'
    },
    posTypes: [
      {
        label: '全部',
        value: null,
      },
      {
        label: '传统POS',
        value: 1,
      },
      {
        label: '智能POS',
        value: 2,
      },
      {
        label: '移动POS',
        value: 3,
      }
    ]
  }
}
