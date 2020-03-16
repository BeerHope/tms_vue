import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  },
  /* 系统管理 */
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user/list',
    name: 'system',
    meta: {
      title: 'system',
      icon: 'system'
    },
    children: [
      {
        path: 'menu/list',
        component: () => import('@/views/system/menu/list'),
        meta: { title: 'menu' }
      },
      {
        path: 'role/list',
        component: () => import('@/views/system/role/list'),
        meta: { title: 'role' },
      },
      {
        path: 'role/user-management',
        component: () => import('@/views/system/role/user-management-list'),
        meta: { title: 'roleUser' },
        hidden: true
      },
      {
        path: 'user/list',
        component: () => import('@/views/system/user/list'), // Parent router-view
        name: 'user',
        meta: { title: 'user' }
      }
    ]
  },
  /* 渠道商管理 */
  {
    path: '/channel',
    component: Layout,
    redirect: '/channel/list',
    name: 'channel',
    meta: { title: 'channel', icon: 'channel' },
    children: [
      {
        path: 'information/list',
        name: 'channelInfo',
        component: () => import('@/views/channel/list'),
        meta: { title: 'channelInfo' }
      },
    ]
  },
  /* 设备配置管理 */
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
  /* 商户终端管理 */
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/analysis/list',
    name: 'merchant',
    meta: { title: 'merchantTerminal', icon: 'terminal' },
    // meta: { title: 'merchant', icon: 'terminal' },
    children: [
      {
        path: 'information/list',
        name: 'information',
        component: () => import('@/views/merchant-info/list'),
        meta: { title: 'merchantInfo' }
      },
      {
        path: 'terminal/list',
        name: 'terminal',
        component: () => import('@/views/merchant-terminal/list'),
        meta: { title: 'merchantTerminal' }
      },
      {
        path: 'machine/list',
        name: 'machine',
        component: () => import('@/views/machine/list'),
        meta: { title: 'machine' }
      },
      {
        path: 'machine/details/:id',
        name: 'machineDetails',
        component: () => import('@/views/machine/details'),
        hidden: true,
        meta: { title: 'machineDetails' }
      },
      {
        path: 'machine/control/:id',
        name: 'machineControl',
        component: () => import('@/views/machine/control'),
        hidden: true,
        meta: { title: 'machineControl' }
      },
      /* 机具批量调拨 */
      {
        path: 'allocation/list',
        name: 'allocation',
        component: () => import('@/views/machine-allocation/list'),
        meta: { title: 'machineAllocation' }
      }
    ]
  },
  /* 文件管理 */
  {
    path: '/file',
    component: Layout,
    redirect: '/file/package/list',
    name: 'file',
    meta: { title: 'file', icon: 'terminal' },
    children: [
      /* 我的系统包模块 */
      {
        path: 'package/list',
        name: 'packageList',
        component: () => import('@/views/system-package/list'),
        meta: { title: 'systemPackage' }
      },
      {
        path: 'package/details',
        name: 'packageDetails',
        component: () => import('@/views/system-package/details'),
        hidden: true,
        meta: { title: 'packageDetails' }
      },
      {
        path: 'package/version/recycle',
        name: 'versionRecycle',
        component: () => import('@/views/system-package/versionRecycle'),
        hidden: true,
        meta: { title: 'versionRecycle' }
      },
      /* 我的应用模块 */
      {
        path: 'app/list',
        name: 'appList',
        component: () => import('@/views/application/list'),
        meta: { title: 'application' }
      },
      {
        path: 'app/details',
        name: 'appDetails',
        component: () => import('@/views/application/details'),
        hidden: true,
        meta: { title: 'appDetails' }
      },
      {
        path: 'app/recycle',
        name: 'appRecycle',
        component: () => import('@/views/application/recycle'),
        hidden: true,
        meta: { title: 'appRecycle' }
      },
      /* 文件仓库模块 */
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
      /* 新增共享——系统包详情 */
      {
        path: 'file-storage/new-share/details/system/:state',
        name: 'systemDetails',
        component: () => import('@/views/file-storage/systemDetails'),
        hidden: true,
        meta: { title: 'systemDetails' }
      },
      {
        /* 系统包-详情-来源于我的文件 */
        path: 'file-storage/my-file/details/system',
        name: 'systemDetailsFromFile',
        component: () => import('@/views/file-storage/systemDetailsFromFile'),
        hidden: true,
        meta: { title: 'systemDetailsFromFile' }
      },
      {
        /* 应用包-详情-来源于我的文件 */
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
