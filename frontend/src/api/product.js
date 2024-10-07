import axios from '@/router/axios';
// productListQuery
export const productListQuery = (params) => {
  return axios({
    url: '/api/product/productListQuery',
    method: 'get',
    params: {
      ...params,
    },
  })
}
// saleListQuery
export const saleListQuery = () => {
  return axios({
    url: '/api/order/saleListQuery',
    method: 'get',
    params: {},
  })
}
// productAdd
export const productAdd = (param) => {
  return axios({
    url: '/api/product/addProduct',
    method: 'post',
    data: param,
  })
}
// productEdit
export const productEdit = (param) => {
  return axios({
    url: '/api/product/updataProduct',
    method: 'post',
    data: param,
  })
}
// productEdit1
export const productEdit1 = (param) => {
  return axios({
    url: '/api/product/updataProductNum',
    method: 'post',
    data: param,
  })
}
// productDelete
export const productDelete = (param) => {
  return axios({
    url: '/api/product/deleteProduct',
    method: 'get',
    params: {
      id: param
    },
  })
}
// queryProductDetails
export const queryProductDetails = (name) => {
  return axios({
    url: '/api/product/queryProductDetails',
    method: 'get',
    params: {
      name: name
    },
  })
}