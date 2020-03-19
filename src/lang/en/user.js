export default {
  user: {
    list: {
      search: 'Search',
      add: 'Add',
      filter: {
        account: 'Account',
        name: 'Name',
        state: 'State'
      },
      companyName: 'Company name：',
      createTime: 'Create time：',
      resetPassword: 'Reset password',
      edit: 'Edit'
    },
    add: {
      form: {
        label: {
          account: 'Account',
          companyId: 'companyName',
          expireTime: 'Expired Time',
          name: 'Name',
          password: 'Password',
          roles: 'Roles',
          cellphone: 'Cellphone',
          email: 'Email',
          remark: 'Remark'
        },
        tips: {
          account: '登录账号',
          companyId: '归属渠道商',
          expireTime: '失效日期',
          name: '姓名',
          password: '密码',
          roles: '角色',
          cellphone: '电话',
          email: '邮箱',
          remark: '备注'
        }
      },
    },
    details: {
      userInfo: 'User Information',
      edit: 'Edit',
      authControl: 'Auth Control',
      form: {
        label: {
          account: 'Account',
          name: 'Name',
          cellphone: 'Cellphone',
          email: 'Email',
          remark: 'Remark',
          state: 'State',
          expireTime: 'expireTime',
          roles: 'Roles Auth'
        },
        placeholder: {
          expireTime: 'Expired time'
        },
      }
    },
    password: {
      title: 'Modify password',
      modify: 'Modify',
      label: {
        newPass: 'Input new password',
        newPassAgain: 'Input new password again'
      },
      tips: {
        modifySuccess: 'Password modified successfully'
      }
    }
  }
}
