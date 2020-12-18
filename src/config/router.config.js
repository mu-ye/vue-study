import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

// https://pro.antdv.com/docs/remove-authority-management
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: BasicLayout,
    meta: { title: '首页' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'home' }
      },
      {
        path: '/account',
        name: 'account',
        redirect: '/account/center',
        component: RouteView,
        meta: { title: '个人档案', icon: 'user' },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人中心' }
          },
          {
            path: '/account/setting',
            name: 'setting',
            component: () => import('@/views/account/setting'),
            meta: { title: '个人设置' }
          }
        ]
      },
      {
        path: '/system',
        name: 'system',
        redirect: '/system/department',
        component: RouteView,
        meta: { title: '系统管理', icon: 'setting' },
        children: [
          {
            path: '/system/department',
            name: 'department',
            component: () => import('@/views/system/department/index'),
            meta: { title: '单位管理' }
          },
          {
            path: '/system/user',
            name: 'user',
            component: () => import('@/views/system/user/index'),
            meta: { title: '用户管理' }
          },
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/system/role/index'),
            meta: { title: '角色管理' }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 */
export const constantRouterMap = [
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/grade',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/grade')
  },
  {
    path: '/pdf',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/pdf')
  },
  {
    path: '/bigScreenShow',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/bigScreenShow/BigScreen')
  }
]
