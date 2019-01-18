/*数据库的增删查改*/
let mysql = require('mysql');
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'node'
})

connection.connect();
console.log('链接成功')
connection.query('select * FROM user', function (error, results, fields) {
	if(error)throw error;
	console.log(results)
})
//新增
let addSql = 'INSERT INTO user(name,age,mobile,password) VALUES(?,?,?,?)';
//删除
let delSql = 'DELETE FROM user where id = 2';
//编辑
let editSql = 'UPDATE user SET name= ? ,age= ? , password = ? WHERE Id = ?';
let editParams = ['嘎嘎2', 18, '123456', 2]
let params = ['嘎嘎', 18, '18989563256', '123456']
connection.query(editSql, editParams, function (err, res) {
	if(err) {
		console.log('失败')
		console.log(err)
		return;
	}else {
		console.log('成功')
		console.log(res)
	}
})

connection.end()