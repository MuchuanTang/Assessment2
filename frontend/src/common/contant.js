export const menu = [
  {
    icon: 'el-icon-suitcase',
    title: 'productManage',
    url: '/productManage',
    keepAlive: true,
    children: [
      {
        icon: 'el-icon-tickets',
        title: 'productinfo',
        url: '/productManage/productinfo',
        keepAlive: true,
      },
    ],
  },
  {
    icon: 'el-icon-suitcase',
    title: 'orderManage',
    url: '/order',
    keepAlive: true,
    children: [
      {
        icon: 'el-icon-tickets',
        title: 'allOrder',
        url: '/order/orderForSeller',
        keepAlive: true,
      },
    ],
  },
]
export const supplierList = [
  {
    id: '1',
    name: 'supplier one',
  },
  {
    id: '2',
    name: 'supplier two',
  },
  {
    id: '3',
    name: 'supplier three',
  },
  {
    id: '4',
    name: 'supplier four',
  },
]
