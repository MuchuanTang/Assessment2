export const menu = [
  {
    icon: 'el-icon-suitcase',
    title: '产品管理',
    url: '/productManage',
    keepAlive: true,
    children: [
      {
        icon: 'el-icon-tickets',
        title: '产品信息',
        url: '/productManage/productinfo',
        keepAlive: true,
      },
    ],
  },
  {
    icon: 'el-icon-suitcase',
    title: '订单管理',
    url: '/order',
    keepAlive: true,
    children: [
      {
        icon: 'el-icon-tickets',
        title: '全部订单',
        url: '/order/orderForSeller',
        keepAlive: true,
      },
    ],
  },
]
export const supplierList = [
  {
    id: '1',
    name: '供应商一',
  },
  {
    id: '2',
    name: '供应商二',
  },
  {
    id: '3',
    name: '供应商三',
  },
  {
    id: '4',
    name: '供应商四',
  },
]
