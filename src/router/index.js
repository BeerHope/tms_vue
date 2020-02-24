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
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/terminal',
    component: Layout,
    redirect: '/terminal/list',
    name: 'Terminal',
    meta: { title: 'terminal', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/terminal/list'),
        meta: { title: 'terminalList', icon: 'table' }
      }
    ]
  },
  /* 商户管理 */
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/list',
    name: 'Merchant',
    meta: { title: 'merchant', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'merchantList',
        component: () => import('@/views/merchant/list'),
        meta: { title: 'merchantList', icon: 'table' }
      },
      {
        path: '/merchant-terminal/list',
        name: 'Tree',
        component: () => import('@/views/merchantTerminal/list'),
        meta: { title: 'merchantTerminalList', icon: 'tree' }
      }
    ]
  },
  /* 渠道商管理 */
  {
    path: '/channel',
    component: Layout,
    redirect: '/channel/list',
    name: 'channel',
    meta: { title: 'channel', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'channelList',
        component: () => import('@/views/merchant/list'),
        meta: { title: 'channelList', icon: 'table' }
      },
      {
        path: 'batch-import',
        name: 'batchImport',
        component: () => import('@/views/tree/index'),
        meta: { title: 'batchImportChannel', icon: 'tree' }
      }
    ]
  },
  /* 授权模块 */
  {
    path: '/auth',
    component: Layout,
    redirect: '/auth/user/list',
    name: 'auth',
    meta: {
      title: 'auth',
      icon: 'nested'
    },
    children: [
      {
        path: 'user/list',
        component: () => import('@/views/auth/user/list'), // Parent router-view
        name: 'user',
        meta: { title: 'userList' }
      },
      {
        path: 'role/list',
        component: () => import('@/views/auth/role/list'),
        meta: { title: 'roleList' },
      },
      {
        path: 'role/user-management',
        component: () => import('@/views/auth/role/user-management-list'),
        meta: { title: 'userManagement' },
        hidden: true
      },
      {
        path: 'menu/list',
        component: () => import('@/views/auth/menu/list'),
        meta: { title: 'menuList' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
