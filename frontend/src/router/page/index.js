// 基础路由
export default [
  {
    path: '/',
    name: '主页',
    component: () => import('@/views/home/home'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/productManage/productinfo',
    name: '产品管理',
    component: () => import('@/views/productManage/productinfo'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/order/orderForSeller',
    name: '订单管理',
    component: () => import('@/views/order/orderForSeller'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
]
