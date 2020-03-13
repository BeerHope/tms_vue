import login from './en/login'
import menu from './en/menu'

export default {
  ...login,
  ...menu,
  /* 路由&菜单 */
  routes: {
    dashboard: 'Home',
    system: 'System Management',
    menuList: 'Menu Management',
    roleList: 'Role Management',
    userList: 'User Management',
    channel: 'Channel Management',
    channelInfo: 'Channel Information Management',
    equipment: 'Equipment Configuration Management',
    vendor: 'Vendor Management',
    model: 'Model Management',
    machineList: 'Machine List',
    merchantTerminal: 'Merchant Terminal Management',
    merchantInfo: 'Merchant Information Management',
    machine: 'Machine Management',
    machineDetails: 'Machine Details',
    machineControl: 'Machine Remote Control',
    machineAllocation: 'Machines batch allocation',
    file: 'Files Management',
    systemPackage: 'System Packages',
    application: 'Applications',
    appDetails: 'Application Details',
    fileStorage: 'Files Storage'
  },
  /* 公共功能点 */
  function: {
    add: 'Add',
    delete: 'Delete',
    edit: 'Edit',
    details: 'Details',
    search: 'Search',
    save: 'Save',
    update: 'Update',
    modify: 'Modify',
    cancel: 'Cancel',
    reset: 'Reset'
  },
  role: {
    userManage: {
      thead: {
        account: 'Account',
        name: 'Username',
        channel: 'Channel provider',
        operation: 'Operation',
      }
    }
  }
}
