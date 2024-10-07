
var app = require("express").Router();
const DBPool = require('./connDB.js')

//新增加订单
app.post('/api/order/addOrder', (req, res) => {
    let param = req.body
    var addSql =
        'INSERT INTO `orderlist`(`id`,`productName`,`productPrice`,`productNum`,`createTime`,`remark`,`buyNum`,`buyAmount`,`userName`,`phone`,`seller`) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    var addSqlParams = [new Date().getTime(), param.productName, param.productPrice, param.productNum, param.createTime, param.remark, param.buyNum, param.buyAmount, param.userName, param.phone, param.seller];
    DBPool.query(addSql, addSqlParams, (results) => {
        res.send('订单添加成功！');
    })
});
//修改订单状态
app.post('/api/order/updataOrder', (req, res) => {
    let param = req.body
    DBPool.query('UPDATE orderlist SET ? WHERE id = ?', [param, param.id], (results) => {
        res.send("修改数据成功！！");
    })
});
//删除产品数据
app.get('/api/order/deleteOrder', (req, res) => {
    let param = req.query
    DBPool.query('delete from orderlist where id = ?', [param.id], (results) => {
        let result = results.results
        res.send("数据删除成功！！")
    })
});
//查询订单列表
app.get("/api/order/orderListQuery", (req, res) => {
    let param = req.query
    let searchSql
    if (param.id) {
        searchSql = 'SELECT * from `orderlist` WHERE id = ? order by id ASC'
        DBPool.query(searchSql, [param.id], (results) => {
            let result = results.results
            res.send(result);
        })
    } else if (param.userName) {
        searchSql = 'SELECT * from `orderlist` WHERE userName = ? order by id ASC'
        DBPool.query(searchSql, [param.userName], (results) => {
            let result = results.results
            res.send(result);
        })
    } else if (param.seller) {
        searchSql = 'SELECT * from `orderlist` WHERE seller = ? or userName = ? order by id ASC'
        DBPool.query(searchSql, [param.seller,param.seller], (results) => {
            let result = results.results
            // res.send(result);
            // DBPool.query('SELECT * from `orderlist` WHERE userName = ? order by id ASC', [param.seller], (results1) => {
            //     let result1 = results1.results.concat(result)
                res.send(result);
            // })
        })
    } else {
        searchSql = 'SELECT * from `orderlist` order by id ASC'
        DBPool.query(searchSql, [], (results) => {
            let result = results.results
            res.send(result);
        })
    }
});
//查询活动列表
app.get("/api/order/saleListQuery", (req, res) => {
    let searchSql = 'SELECT * from `sales` order by id ASC'
    DBPool.query(searchSql, [], (results) => {
        let result = results.results
        res.send(result);
    })
});
//根据id查询订单详情
app.get("/api/order/orderDetailsById", (req, res) => {
    let param = req.query
    DBPool.query('SELECT * FROM `orderlist` WHERE id = ?', [param.id], (results) => {
        let result = results.results
        res.send(result);
    })
});

module.exports = app;