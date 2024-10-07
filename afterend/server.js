const express = require('express')
const app = express()
const cors = require('cors')

//2.设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

//解决接受到前端req数据为{}的问题
app.use(express.json())
app.use(cors())

let product = require('./page/product.js');//菜单信息
app.use(product);
let order = require('./page/order.js');//订单信息
app.use(order);
let common = require('./page/common.js');//公共模块
app.use(common);
let user = require('./page/user.js');//用户模块
app.use(user);

module.exports = app
const port = 9012
//3.1 监听端口
app.listen(port, () => {
	console.log(`app is running at http://localhost:${port}`)
})