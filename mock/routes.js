/* 前端写死数据用于模仿后端返回的菜单权限 */
export const backendRoutes = [
  {
    className: '/system',
    type: 1,
    name: '系统管理',
    checked: true,
    child: [
      {
        className: 'menu',
        name: '菜单管理',
        type: 2,
        checked: true,
        child: [
          {
            className: 'list',
            name: '菜单列表',
            type: 3,
            checked: true,
            child: []
          },
          {
            className: 'system.menu.add',
            name: '新增菜单',
            type: 3,
            checked: true,
            child: []
          }
        ]
      },
      {
        className: 'role',
        type: 2,
        name: '角色管理',
        checked: true,
        child: [
          {
            className: 'list',
            name: '角色列表',
            type: 3,
            checked: true,
            child: []
          },
          {
            className: 'role.add',
            name: '新增角色',
            type: 3,
            checked: true,
            child: []
          }
        ]
      },
      {
        className: 'user',
        type: 2,
        name: '用户管理',
        checked: true,
        child: [
          {
            className: 'list',
            name: '用户列表',
            checked: true,
            type: 3,
            child: []
          },
          {
            className: 'user.edit',
            name: '编辑用户',
            checked: true,
            type: 3,
            child: []
          }
        ]
      }
    ]
  },
  {
    className: '/company',
    name: '渠道商',
    type: 1,
    checked: true,
    child: [
      {
        className: 'information',
        name: '渠道商信息管理',
        type: 2,
        checked: true,
        child: [
          {
            className: 'list',
            name: '渠道商信息列表',
            type: 3,
            checked: true,
            child: []
          }
        ]
      },
    ]
  }
]
