var fs = require('fs')
/*
fs.stat 检测是文件还是目录
fs.mkdir 创建目录
fs.writeFile 创建写入文件
fs.appendFile 追加文件
fs.readFile 读取文件
fs.readdir 读取目录
fs.rename 重命名
fs.rmdir 删除目录
fs.unlink 删除文件
 */

//stats 对象提供的文件属性
fs.stat('index.js', (error,stats) => {
	if(error) {
		console.log(error);
		return false;
	}else {
		console.log(stats);
		console.log(`是文件 ？：${stats.isFile()}`)
		console.log(`是目录 ？：${stats.isDirectory()}`)
		return false;
	}
})
/*1创建目录*/
// fs.mkdir('css', (err) => {
// 	if(err) {
// 		console.log(err);
// 		return false;
// 	}else {
// 		console.log('目录创建成功！')
// 	}
// })
/*2删除目录*/
// fs.rmdir('css', (err) => {
// 	if(err) {
// 		console.log(err);
// 		return false;
// 	}else {
// 		console.log('目录删除成功！')
// 	}
// })
/*3创建写入文件 是清空原文件中的所有数据，然后添加 Hello jsliang 这句话。即：存在即覆盖，不存在即创建*/
/**
 * filename (String) 文件名称
 * data (String | Buffer) 将要写入的内容，可以是字符串或者 buffer 数据。
 * · encoding (String) 可选。默认 'utf-8'，当 data 是 buffer 时，该值应该为 ignored。
 * · mode (Number) 文件读写权限，默认 438。
 * · flag (String) 默认值 'w'。
 * callback { Function } 回调，传递一个异常参数 err。
 */
 
// fs.writeFile('index.js','Hello Zlc','utf8' (err) => {
// 	if(err) {
// 		console.log(err);
// 		return false;
// 	}else {
// 		console.log('写入成功！')
// 	}
// })
/*4追加内容*/
// fs.appendFile('index.js','这段文本是要追加的内容', (err) => {
// 	if(err) {
// 		console.log(err);
// 		return false;
// 	}else {
// 		console.log('追加成功！')
// 	}
// })

/* 5. fs.readFile */
// fs.readFile('index.js', (err, data) => {
// 	if(err) {
// 		console.log(err);
// 		return false;
// 	} else {
// 		console.log("读取文件成功！");
// 		console.log(data);
// 		// Console：
// 		// 读取文件成功！
// 		// <Buffer 48 65 6c 6c 6f 20 6a 73 6c 69 61 6e 67 e8 bf 99 e6 ae b5 e6 96 87 e6 9c ac e6 98 af e8 a6 81 e8 bf bd e5 8a a0 e7 9a 84 e5 86 85 e5 ae b9>
// 	}
// })

/* 6. fs.readdir 读取目录 */
// fs.readdir('node_modules', (err, data) => {
// 	if(err) {
// 		console.log(err);
// 		return false;
// 	} else {
// 		console.log("读取目录成功！");
// 		console.log(data);
// 		// Console：
// 		// 读取目录成功！
// 		// [ '03_tool-multiply.js', 'jsliang-module' ]
// 	}
// })

/* 7. fs.rename 重命名 */
// fs.rename('index.js', 'jsliang.js', (err) => {
// 	if(err) {
// 		console.log(err);
// 		return false;
// 	} else {
// 		console.log("重命名成功！");
// 	}
// })
