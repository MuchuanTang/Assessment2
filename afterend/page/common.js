var app = require("express").Router();
let fs = require('fs')
let path = require("path");
const multiparty = require('multiparty');

app.post('/xhm/upload', function(req, res, next) {
	// console.log(req)
	// var data1 = parse1(req.file)
	// console.log(data1)
	let form = new multiparty.Form();
	form.uploadDir = "./images/xhm";
	// form.keepExtensions=true;   //是否保留后缀
	form.parse(req, function(err, fields, files) { //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
		console.log(err);
		if (err) {
			res.json({
				status: "1",
				msg: "上传失败！" + err
			});
		} else {
			res.json({
				status: "0",
				msg: "上传成功！",
				imgSrc: files.file[0].path
			});
		}
	})
});

function parse1(file) {
	let filePath = path.resolve(file); // 原始文件地址
	// 读取文件数据
	let data = fs.readFileSync(filePath);
	data = Buffer.from(data).toString('base64');
	return data;
}


app.post('/xhm/unUpload', function(req, res, next) {
	let param = req.body
	let url = "./images/xhm"
	// let path = 'http://101.200.179.180:8081/123/123.jpg'
	var files = [];
	//判断给定的路径是否存在
	if (fs.existsSync(url)) {
		//返回文件和子目录的数组
		files = fs.readdirSync(url);
		files.forEach(function(file, index) {
			if (file == param.fileName) {
				console.log(url, file)
				// var curPath = url + "/" + file;
				var curPath = path.join(url, file);
				console.log(curPath)
				//fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
				if (fs.statSync(curPath).isDirectory()) { // recurse
					deleteFolderRecursive(curPath);
					// 是文件delete file
				} else {
					fs.unlinkSync(curPath);
				}
				res.json({
					status: "0",
					msg: "删除成功！",
				});
			}
		});
		//清除文件夹
		// fs.rmdirSync(url);
	} else {
		console.log("给定的路径不存在，请给出正确的路径");
	}
});

module.exports = app;