import axios from 'axios'
axios.defaults.timeout = 10000;
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});
axios.interceptors.response.use(res => {
  return res.data;
}, error => {
  return Promise.reject(new Error(error));
})

export default axios;
