import axios from '@/router/axios';
// 查询
export const orderListQuery = (params) => {
  return axios({
    url: '/api/order/orderListQuery',
    method: 'get',
    params: {
      ...params,
    },
  })
}
// 新增
export const orderAdd = (param) => {
  return axios({
    url: '/api/order/addOrder',
    method: 'post',
    data: param,
  })
}
// 编辑
export const orderEdit = (param) => {
  return axios({
    url: '/api/order/updataOrder',
    method: 'post',
    data: param,
  })
}
// 删除
export const orderDelete = (param) => {
  return axios({
    url: '/api/order/deleteOrder',
    method: 'get',
    params: {
      id: param
    },
  })
}
// 根据父id查询子菜单
export const getOrderByfarId = (param) => {
  // return axios({
  //   url: '/api/order/info/data/childrenList',
  //   method: 'get',
  //   params: {
  //     parentId: param
  //   },
  // })
}

//菜单图片删除
export const unUpload = (param) => {
  return axios({
    url: 'api/unUpload',
    method: 'post',
    data: param
  })
}