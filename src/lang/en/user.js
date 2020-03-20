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
      title: 'Add user',
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
        placeholder: {
          account: 'Support for upper and lower case English letters, @,., and Numbers, and length of 1~50 characters',
          name: 'Support length: 1-16 bits in English or 2-8 bits in Chinese',
          cellphone: 'eg: (86-755)888888888',
          expireTime: 'Please select expireTime',
        },
        tips: {
          companyId: 'Please select the company',
          expireTime: 'Please select expireTime',
          roles: 'Please select role',
          account: 'Account does not meet the requirements, please enter again',
          name: 'The name does not meet the requirement, please enter again',
          password: 'Support 6-18 - bit characters, must contain uppercase, lowercase letters, Numbers',
          cellphone: 'Cellphone does not match, please enter again',
          email: 'The email format does not match, please enter again',
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
