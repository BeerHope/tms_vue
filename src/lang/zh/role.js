export default {
  role: {
    list: {
      filter: {
        name: '角色名称',
        state: '状态'
      },
      add: '新增',
      search: '搜索',
      edit: '编辑',
      manageUser: '管理用户',
      addUser: '新增用户',
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
    },
    add: {
      dialogTitle: '新增角色',
      cancel: '取 消',
      add: '新 增'
    },
    edit: {
      dialogTitle: '编辑角色',
      cancel: '取 消',
      save: '保存'
    },
    manageUser: {
      title: '管理用户',
      thead: {
        account: '账号',
        name: '姓名',
        companyName: '渠道商',
        operation: '操作'
      },
      remove: '剔除',
      removeContent: '此操作将剔除该角色下的用户，是否继续?'
    },
    form: {
      label: {
        name: '角色名称',
        state: '状态',
        remark: '说明',
        menus: '菜单授权'
      },
      tips: {
        name: '请输入角色名称',
        state: '请选择状态',
        menus: '请勾选菜单权限'
      }
    }
  }
}
