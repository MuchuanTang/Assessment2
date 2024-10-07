import axios from '@/router/axios';
// 查询
export const productListQuery = (params) => {
  return axios({
    url: '/api/product/productListQuery',
    method: 'get',
    params: {
      ...params,
    },
  })
}
// 查询
export const saleListQuery = () => {
  return axios({
    url: '/api/order/saleListQuery',
    method: 'get',
    params: {},
  })
}
// 新增
export const productAdd = (param) => {
  return axios({
    url: '/api/product/addProduct',
    method: 'post',
    data: param,
  })
}
// 编辑
export const productEdit = (param) => {
  return axios({
    url: '/api/product/updataProduct',
    method: 'post',
    data: param,
  })
}
// 编辑
export const productEdit1 = (param) => {
  return axios({
    url: '/api/product/updataProductNum',
    method: 'post',
    data: param,
  })
}
// 删除
export const productDelete = (param) => {
  return axios({
    url: '/api/product/deleteProduct',
    method: 'get',
    params: {
      id: param
    },
  })
}
// 根据id查询详情
export const queryProductDetails = (name) => {
  return axios({
    url: '/api/product/queryProductDetails',
    method: 'get',
    params: {
      name: name
    },
  })
}

//菜单图片删除
export const unUpload = (param) => {
  return axios({
    url: 'api/unUpload',
    method: 'post',
    data: param
  })
}