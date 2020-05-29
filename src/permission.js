import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

// mock 后端返回的权限菜单，后期去掉
import { backendRoutes } from 'mock/routes'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.account
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info and auth
          const { menuTreeVO } = await store.dispatch('user/getInfo')
          console.log(menuTreeVO, 'menuTreeVO!!!')
          // generate accessed routes, backendRoutes just temperately
          const accessedRoutes = await store.dispatch('permission/generateRoutes', backendRoutes)
          // dynamically add accessible routes
          // console.log(accessedRoutes, 'accessedRoutes!!!!')
          router.addRoutes(accessedRoutes)
          // router.options.routes.push(...accessedRoutes)
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(`${error}` || 'Has Error')
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
