const express = require('express')
const app = express()
const cors = require('cors')

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.use(express.json())
app.use(cors())

let product = require('./page/product.js');
app.use(product);
let order = require('./page/order.js');
app.use(order);

module.exports = app
const port = 9012
app.listen(port, () => {
	console.log(`app is running at http://localhost:${port}`)
})