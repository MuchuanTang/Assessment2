// 基础路由
export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/home'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/productManage/productinfo',
    name: 'productManage',
    component: () => import('@/views/productManage/productinfo'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/order/orderForSeller',
    name: 'orderManage',
    component: () => import('@/views/order/orderForSeller'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
]
