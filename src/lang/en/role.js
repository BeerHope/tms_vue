export default {
  role: {
    list: {
      filter: {
        name: 'role name',
        state: 'state'
      },
      add: 'Add',
      search: 'Search',
      edit: 'Edit',
      manageUser: 'Manage User',
      addUser: 'Add User',
      states: [
        {
          value: '',
          label: 'All'
        },
        {
          value: 1,
          label: 'On'
        },
        {
          value: 2,
          label: 'Off'
        },
      ],
    },
    add: {
      dialogTitle: 'Add Role',
      cancel: 'Cancel',
      add: 'Add'
    },
    edit: {
      dialogTitle: 'Edit Role',
      cancel: 'Cancel',
      save: 'Save'
    },
    manageUser: {
      title: 'Manage User',
      thead: {
        account: 'Account',
        name: 'Name',
        companyName: 'Company Name',
        operation: 'Operation'
      },
      remove: 'remove',
      removeContent: 'This action will remove the user from the role. Do you want to continue?'
    },
    form: {
      label: {
        name: 'Role Name',
        state: 'State',
        remark: 'Remark',
        menus: 'Menu Authorization'
      },
      tips: {
        name: 'Please enter role name',
        state: 'please select state',
        menus: 'Please check the menu permission'
      }
    }
  }
}
