let mysql = require('mysql')
//mysql链接信息
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'node'
})
//开始链接
connection.connect();

//引入http模块，提供web服务基础
const http = require('http');

const url = require('url');
// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
const qs = require('querystring')
/**
 * req: 请求数据
 * res: 响应信息
 */
http.createServer((req,res) => {
	// 设置 cors 跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	// 设置 header 类型
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	// 跨域允许的请求方式
	res.setHeader('Content-Type', 'application/json');

	let pathName = req.url;

	if(req.method == 'POST') {
		let pathName = req.url;
		console.log('【post】接口为：'+ pathName);
		//接受请求数据
		let reqData = '';
		//数据接入中)
		req.addListener('data', function(chunk) {
			reqData += chunk;
		})
		// 数据接受成功
		req.addListener('end', function(){
			let result = qs.parse(reqData);
			console.log("\n参数为："+ JSON.stringify(result))
			// 注册
			if(pathName == '/register'){

				let { username, password, mobile, age} = result;
				let time = getNowFormatDate();//注册时间
				if(!username) {
					res.end('注册失败，用户名为空')
				}else if(!password) {
					res.end('注册失败，密码为空')
				}else if(!mobile) {
					res.end('注册失败，手机号为空')
				}else if(!age) {
					res.end('注册失败，年龄为空')
				}
			//	查询用户表两次，一次查重，一次新增
				new Promise((resolve, reject) => {
					let readSql = "SELECT * FROM user";
					connection.query(readSql, (errReg, resReg) =>{
						if(errReg) {
							throw errReg;
						}else {
							let newRes = JSON.parse(JSON.stringify(resReg))
							//判断注册信息是否重复
							let repeatName = false,repeatMobile = false;
							for(let item in newRes) {
								if(newRes[item].name == username) {
									repeatName = true;
								}else if(newRes[item].mobile == mobile) {
									repeatMobile = true;
								}
							}

							if(repeatName || repeatMobile) {
								let text = '';
								if(repeatName) text += '姓名';
								if(repeatMobile) text += repeatName?',手机号': '手机号';
								res.end("注册失败，" + text + '重复');
								return;
							}else {
								resolve();
							}

						}
					})
				}).then( () => {//查重通过
					let addSql = "INSERT INTO user(name,password,mobile,age,createTime) VALUES(?, ?, ?, ?, ?)";
					let addParams = [result.username, result.password, result.mobile ,result.age, time]
					console.log('【新增】',addParams)
					connection.query(addSql,addParams, (errAdd,resAdd) => {
						if(errAdd) {
							console.log(JSON.stringify(errAdd))
							res.end('\n新增错误')
							return;
						}else {
							res.write(JSON.stringify({
								code: '01',
								message: '注册成功！'
							}))
							res.end();
						}
					})
				})

			}else if(pathName == '/login') {
				let { username, password } = result;
				if(!username) {
					res.end('登录失败，用户名为空')
				}else if(!password) {
					res.end('登录失败，密码为空')
				}
				console.log(username,result)
				let getSql = "SELECT * FROM user WHERE name = '"+username+"'";
				console.log(getSql)
				connection.query(getSql, (errlogin , reslogin) => {
					console.log(0)
					if(errlogin) {
						throw errlogin;
					}else {
						if(reslogin == undefined || reslogin.length == 0){
							res.end('\n用户不存在')
							return;
						}else {
							let newRes = JSON.parse(JSON.stringify(reslogin))
							console.log(1)
							console.log(newRes[0].password == password)
							if(newRes[0].password == password) {
								let str = JSON.stringify({
									code: '01',
									message: '登录成功',
									data: {
										id: newRes[0].id,
										username: newRes[0].name
									}
								})
								console.log(str)
								res.write(str)
								console.log('end')
								res.end()
							}else {
								res.write(JSON.stringify({
									code: '00',
									message: '登录失败，密码错误！'
								}))
								res.end();
							}
						}
					}
				})

			}

		})

	}else if(req.method == 'GET') {
		let pathName = url.parse(req.url).pathname;
		console.log('【get】接口为：'+ pathName);
		if(pathName == '/getMessage') {
			let params = url.parse(req.url, true).query;
			let readSql = "SELECT * FROM message";

			connection.query(readSql, (err , resData) => {
				if(err) {
					throw err;
				}else {
					let newRes = JSON.parse(JSON.stringify(resData))
					res.write(JSON.stringify({
						code:'01',
						message: '查询成功！',
						data: newRes
					}))
					res.end()
				}
			})
		}
	}


}).listen(3000)

// 获取当前时间
function getNowFormatDate() {
	var date = new Date();
	var year = date.getFullYear(); // 年
	var month = date.getMonth() + 1; // 月
	var strDate = date.getDate(); // 日
	var hour = date.getHours(); // 时
	var minute = date.getMinutes(); // 分
	var second = date.getMinutes(); // 秒
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	// 返回 yyyy-mm-dd hh:mm:ss 形式
	var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
	return currentdate;
}
