var app = require("express").Router();
const DBPool = require('./connDB.js')


//登录
app.get("/api/user/login", (req, res) => {
	let param = req.query
	DBPool.query('SELECT * FROM `user_info` WHERE login_name = ?', [param.loginName], (results) => {
		let result = results.results[0]
		if (!result) {
			res.send({
				code: 500,
				msg: '用户名不存在！'
			});
		} else if (result.pass_word != param.passWord) {
			res.send({
				code: 500,
				msg: '密码输入有误！'
			});
		} else {
			res.send({
				code: 200,
				msg: '',
				result: result
			});
		}
	})
});
//注册
app.post('/api/user/register', (req, res) => {
	let param = req.body
	var addSql = 'INSERT INTO `user_info`(`create_time`,`login_name`,`pass_word`,`phone`,`role`,`user_id`) VALUES(?,?,?,?,?,?)';
	var addSqlParams = [param.create_time, param.login_name, param.pass_word, param.phone, '', new Date().getTime()];
	DBPool.query(addSql, addSqlParams, (results) => {
		res.send('注册成功');
	})
});
//查询用户列表
app.get("/api/user/userList", (req, res) => {
	DBPool.query('SELECT * from `user_info`', [], (results) => {
		let result = results.results
		res.send(result);
	})
});
// 修改用户权限
app.post('/api/user/userUpdate', (req, res) => {
	let param = req.body
	DBPool.query('UPDATE user_info SET role = ? WHERE user_id = ?', [param.role, param.user_id], (results) => {
		let result = results.results
		res.send("修改数据成功！！")
	})
});
//插入用户登陆日志
app.post('/api/user/addLoginRecord', (req, res) => {
	let param = req.body
	var addSql = 'INSERT INTO `login_record`(`loginDT`,`userName`,`ip`,`content`) VALUES(?,?,?,?)';
	var addSqlParams = [param.loginDT, param.userName, param.ip, param.content];
	DBPool.query(addSql, addSqlParams, (results) => {
		res.send('添加成功！');
	})
});
//查询用户登陆日志
app.get("/api/user/queryLoginRecord", (req, res) => {
	// let name = req.body.name
	let pageSize = req.query.pageSize // 页大小
	let currentPage = req.query.currentPage // 当前页
	let start = (currentPage - 1) * pageSize; // 起始位置
	DBPool.query(`SELECT * from login_record order by loginDT DESC LIMIT ${start},${pageSize}`, [], (results) => {
		let result = results.results
		DBPool.query(`SELECT COUNT(*) AS total from login_record`, [], (results1) => {
			let data = {
				pageSize: pageSize,
				currentPage: currentPage,
				total: results1.results[0].total,
			}
			res.send({
				data: data,
				items: result
			});
		})
	})
});

module.exports = app;