import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'
import { getMenu } from '@/api/user'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView
}

/**
 * 动态生成菜单
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    getMenu()
      .then(data => {
        console.log('getMenu', data)
        const routers = arrayToTree(data)
        console.log('routers', routers)
        resolve(routers)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 数组转树
 */
const arrayToTree = sourceMenu => {
  const menuMap = new Map()
  sourceMenu.forEach(item =>
    menuMap.set(item.id, {
      ...item,
      component: constantRouterComponents[item.component] || (() => import(`@/views/${item.component}`))
    })
  )
  const targetMenu = []
  menuMap.forEach(value => {
    const { parentId } = value
    if (parentId === 0) {
      targetMenu.push(value)
    } else {
      const parent = menuMap.get(parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(value)
      }
    }
  })
  targetMenu.push({
    path: '*',
    redirect: '/404',
    hidden: true
  })
  console.log('targetMenu', targetMenu)
  return targetMenu
}
