import router from './router'
import store from './store'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

NProgress.configure({ showSpinner: false })

const allowRoutePathList = ['/user/login', '/grade', '/pdf']
const loginRoutePath = '/user/login'
const IndexRoutePath = '/'

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta?.title && setDocumentTitle(`${to.meta.title} - ${domTitle}`)
  if (localStorage.getItem('access-token')) {
    if (to.path === loginRoutePath) {
      next({ path: IndexRoutePath })
      NProgress.done()
    } else {
      if (store.getters.addRouters.length === 0) {
        store
          .dispatch('GenerateRoutes')
          .then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求菜单失败'
            })
            next({ path: loginRoutePath, query: { redirect: to.fullPath } })
          })
      } else {
        next()
      }
    }
  } else {
    if (allowRoutePathList.includes(to.path)) {
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
