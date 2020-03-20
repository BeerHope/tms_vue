export default {
  user: {
    list: {
      search: '搜索',
      add: '新增',
      filter: {
        account: '登录账号',
        name: '姓名',
        state: '状态'
      },
      companyName: '所属渠道商：',
      createTime: '创建时间：',
      resetPassword: '重置密码',
      edit: '编辑'
    },
    add: {
      title: '新增用户',
      form: {
        label: {
          account: '登录账号',
          companyId: '归属渠道商',
          expireTime: '失效日期',
          name: '姓名',
          password: '密码',
          roles: '角色',
          cellphone: '电话',
          email: '邮箱',
          remark: '备注'
        },
        placeholder: {
          account: '支持输入大小写英文字母、@、. 、数字;长度1~50个字符',
          name: '支持长度：英文1~16位或中文2~8位',
          cellphone: 'eg: (86-755)888888888',
          expireTime: '请选择失效日期',
        },
        tips: {
          companyId: '请选择渠道商',
          expireTime: '请选择失效日期',
          roles: '请选择角色',
          account: '登录账号不符合要求，请重新输入',
          name: '姓名不符合要求，请重新输入',
          password: '支持6~18位字符, 必须包含大小写字母、数字',
          cellphone: '联系电话格式不符合, 请重新输入',
          email: '邮箱格式不符合，请重新输入',
        }
      }
    },
    details: {
      userInfo: '用户信息',
      edit: '编辑',
      authControl: '权限控制',
      form: {
        label: {
          account: '登录账号',
          name: '姓名',
          cellphone: '电话',
          email: '邮箱',
          remark: '备注',
          state: '状态',
          expireTime: '失效日期',
          roles: '角色控权限'
        },
        placeholder: {
          expireTime: 'Expired Time'
        },
        tips: {
        }
      }
    },
    password: {
      title: '修改密码',
      modify: '修改',
      label: {
        originPassword: '输入旧密码',
        password: '输入新密码'
      },
      tips: {
        modifySuccess: '密码修改成功'
      }
    }
  }
}
