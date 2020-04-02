import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* commonIndex */
import Index from '@/components/CommonIndex'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
/* todo：暂时将所用路由设为constantRoutes完成页面开发，后期根据模块权限进行设置动态路由 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  /* 首页 */
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'home', icon: 'home', affix: true }
    }]
  },
  /* 系统管理 */
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role/list',
    name: 'system',
    meta: { title: 'system', icon: 'system' },
    children: [
      {
        path: 'menu/list',
        name: 'menu',
        component: () => import('@/views/menu/list'),
        meta: { title: 'menu' }
      },
      {
        path: 'role',
        redirect: 'role/list',
        component: Index,
        name: 'role',
        meta: { title: 'role' },
        children: [
          {
            path: 'list',
            name: 'roleList',
            component: () => import('@/views/role/list'),
            meta: { title: 'role', activeMenu: '/system/role' },
            hidden: true
          },
          {
            path: '/system/role/:roleId/user',
            name: 'roleUser',
            component: () => import('@/views/role/roleUserList'),
            meta: { title: 'roleUser', activeMenu: '/system/role' },
            hidden: true
          }
        ]
      },
      {
        path: 'user',
        redirect: 'user/list',
        component: Index, // Parent router-view
        name: 'user',
        meta: { title: 'user' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/user/list'), // Parent router-view
            name: 'userList',
            meta: { title: 'user', activeMenu: '/system/user' },
            hidden: true
          },
          {
            path: '/system/user/:userId/details',
            component: () => import('@/views/user/details'), // Parent router-view
            name: 'userDetails',
            meta: { title: 'details', activeMenu: '/system/user' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 渠道商管理
  {
    path: '/company',
    component: Layout,
    redirect: '/company/list',
    name: 'company',
    meta: { title: 'company', icon: 'channel' },
    children: [
      {
        path: 'information/list',
        name: 'companyInfo',
        component: () => import('@/views/company/list'),
        meta: { title: 'companyInfo' }
      },
    ]
  },
  // 设备配置管理
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/vendor/list',
    name: 'equipment',
    meta: {
      title: 'equipment',
      icon: 'equipment'
    },
    children: [
      {
        path: 'vendor/list',
        name: 'vendor',
        component: () => import('@/views/vendor/list'),
        meta: { title: 'vendor' }
      },
      {
        path: 'model/list',
        name: 'model',
        component: () => import('@/views/model/list'),
        meta: { title: 'model' }
      }
    ]
  },
  // 商户终端管理
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/analysis/list',
    name: 'merchant',
    meta: { title: 'merchantTerminal', icon: 'terminal' },
    children: [
      {
        path: 'information/list',
        name: 'information',
        component: () => import('@/views/merchant/list'),
        meta: { title: 'merchantInfo' }
      },
      {
        path: 'terminal/list',
        name: 'terminal',
        component: () => import('@/views/terminal/list'),
        meta: { title: 'merchantTerminal' }
      },
      {
        path: 'machine',
        name: 'machine',
        redirect: 'machine/list',
        component: Index,
        meta: { title: 'machine' },
        children: [
          {
            path: 'list',
            name: 'machineList',
            component: () => import('@/views/machine/list'),
            meta: { title: 'machine', activeMenu: '/merchant/machine' },
            hidden: true
          },
          {
            path: 'details/:id',
            name: 'machineDetails',
            component: () => import('@/views/machine/details'),
            hidden: true,
            meta: { title: 'machineDetails', activeMenu: '/merchant/machine' }
          },
          {
            path: 'control/:id',
            name: 'machineControl',
            component: () => import('@/views/machine/control'),
            hidden: true,
            meta: { title: 'machineControl', activeMenu: '/merchant/machine' }
          },
        ]
      },
      // 机具批量调拨
      {
        path: 'allocation/list',
        name: 'allocation',
        component: () => import('@/views/machine-allocation/list'),
        meta: { title: 'machineAllocation' }
      }
    ]
  },
  // 文件管理
  
  {
    path: '/file',
    component: Layout,
    redirect: '/file/ota/list',
    name: 'file',
    meta: { title: 'file', icon: 'file' },
    children: [
      // 我的系统包模块
      {
        path: 'ota',
        redirect: 'ota/list',
        name: 'ota',
        component: Index,
        meta: { title: 'systemPackage' },
        children: [
          {
            path: 'list',
            name: 'ota',
            component: () => import('@/views/ota/list'),
            hidden: true,
            meta: { title: 'systemPackage', activeMenu: '/file/ota' }
          },
          {
            path: 'details',
            name: 'otaDetails',
            component: () => import('@/views/ota/details'),
            hidden: true,
            meta: { title: 'packageDetails', activeMenu: '/file/ota' }
          },
          {
            path: 'version/recycle',
            name: 'versionRecycle',
            component: () => import('@/views/ota/versionRecycle'),
            hidden: true,
            meta: { title: 'versionRecycle', activeMenu: '/file/ota' }
          },
        ]
      },
      // 我的应用模块
      {
        path: 'app',
        name: 'appList',
        redirect: 'app/list',
        component: Index,
        meta: { title: 'application' },
        children: [
          {
            path: 'list',
            name: 'appList',
            component: () => import('@/views/application/list'),
            hidden: true,
            meta: { title: 'application', activeMenu: '/file/app' }
          },
          {
            path: 'details',
            name: 'appDetails',
            component: () => import('@/views/application/details'),
            hidden: true,
            meta: { title: 'appDetails', activeMenu: '/file/app' }
          },
          {
            path: 'recycle',
            name: 'appRecycle',
            component: () => import('@/views/application/recycle'),
            hidden: true,
            meta: { title: 'appRecycle', activeMenu: '/file/app' }
          },
        ]
      },
      
      // 文件仓库模块
      {
        path: 'file-storage/list',
        name: 'fileStorage',
        component: () => import('@/views/file-storage/list'),
        meta: { title: 'fileStorage' }
      },
      // 新增共享——应用包详情
      {
        path: 'file-storage/new-share/details/app/:state',
        name: 'fileAppDetails',
        component: () => import('@/views/file-storage/appDetails'),
        hidden: true,
        meta: { title: 'fileAppDetails' }
      },
      //  新增共享——系统包详情
      {
        path: 'file-storage/new-share/details/system/:state',
        name: 'systemDetails',
        component: () => import('@/views/file-storage/systemDetails'),
        hidden: true,
        meta: { title: 'systemDetails' }
      },
      {
        // 系统包-详情-来源于我的文件
        path: 'file-storage/my-file/details/system',
        name: 'systemDetailsFromFile',
        component: () => import('@/views/file-storage/systemDetailsFromFile'),
        hidden: true,
        meta: { title: 'systemDetailsFromFile' }
      },
      {
        // 应用包-详情-来源于我的文件
        path: 'file-storage/my-file/details/app',
        name: 'appDetailsFromFile',
        component: () => import('@/views/file-storage/appDetailsFromFile'),
        hidden: true,
        meta: { title: 'appDetailsFromFile' }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: '/tms/',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
