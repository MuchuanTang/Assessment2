
var app = require("express").Router();
const DBPool = require('./connDB.js')

//productListQuery
app.get("/api/product/productListQuery", (req, res) => {
	let param = req.query
	let searchSql
	if (param.name) {
		searchSql = 'SELECT * from `productlist` WHERE name = ? order by id ASC'
	} else {
		searchSql = 'SELECT * from `productlist` order by id ASC'
	}
	DBPool.query(searchSql, [param.name], (results) => {
		let result = results.results
		res.send(result);
	})
});
//queryProductDetails
app.get("/api/product/queryProductDetails", (req, res) => {
	let searchSql = 'SELECT * FROM `productlist` WHERE name = ?'
	let param = req.query
	DBPool.query(searchSql, param.name, (results) => {
		let result = results.results
		res.send(result);
	})
});
//addProduct
app.post('/api/product/addProduct', (req, res) => {
	let param = req.body
	let addSql =
		'INSERT INTO `productlist`(`id`,`name`,`des`,`price`,`creatDate`,`supplier`,`lastNum`) VALUES(?,?,?,?,?,?,?)';
	let addSqlParams = [new Date().getTime(), param.name, param.des, param.price, param.creatDate,param.supplier, param.lastNum];
	DBPool.query(addSql, addSqlParams, (results) => {
		res.send("success");
	})
});
//updataProduct
app.post('/api/product/updataProduct', (req, res) => {
	let param = req.body
	DBPool.query('UPDATE productlist SET ? WHERE id = ?', [param, param.id], (results) => {
		let result = results.results
		res.send("success")
	})
});
//updataProductNum
app.post('/api/product/updataProductNum', (req, res) => {
	let param = req.body
	DBPool.query('UPDATE productlist SET lastNum = ? WHERE name = ?', [param.lastNum, param.name], (results) => {
		let result = results.results
		res.send("success")
	})
});
//deleteProduct
app.get('/api/product/deleteProduct', (req, res) => {
	let param = req.query
	DBPool.query('delete from productlist where id = ?', [param.id], (results) => {
		let result = results.results
		res.send("success")
	})
});


module.exports = app;