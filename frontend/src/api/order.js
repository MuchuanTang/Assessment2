import axios from '@/router/axios';
// orderListQuery
export const orderListQuery = (params) => {
  return axios({
    url: '/api/order/orderListQuery',
    method: 'get',
    params: {
      ...params,
    },
  })
}
// orderAdd
export const orderAdd = (param) => {
  return axios({
    url: '/api/order/addOrder',
    method: 'post',
    data: param,
  })
}
// orderEdit
export const orderEdit = (param) => {
  return axios({
    url: '/api/order/updataOrder',
    method: 'post',
    data: param,
  })
}
// orderDelete
export const orderDelete = (param) => {
  return axios({
    url: '/api/order/deleteOrder',
    method: 'get',
    params: {
      id: param
    },
  })
}