import Vue from 'vue'
import VueRouter from 'vue-router'
import PageRouterInit from './page/index'
import {menu} from '@/common/contant'
Vue.use(VueRouter)

export const menuList = [...menu]
export const newComponentFun = function (item) {
  return {
    path: item.url,
    name: item.title,
    component: () => import('@/views' + item.url),
    meta: {
      keepAlive: item.keepAlive,
    }
  }
}
export const PageRouter = []
if (menuList && menuList.length > 0) {
  menuList.map((item) => {
    PageRouter.push(newComponentFun(item))
    if (item.children) {
      item.children.map((item1) => {
        PageRouter.push(newComponentFun(item1))
        if (item1.children) {
          item1.children.map((item2) => {
            PageRouter.push(newComponentFun(item2))

          })
        }
      })
    }
  })
}
console.log(PageRouter);

export const Router = new VueRouter({
  routes: [...PageRouterInit]
})



Router.beforeEach((to, from, next) => {
  next()
})

Router.beforeResolve((to, from, next) => {
  next()

})

Router.afterEach((to, from) => {
})


export default Router
