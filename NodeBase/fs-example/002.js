// fs流
const fs = require('fs')

//流读取方式

let fileReadStream = fs.createReadStream('01_http.js');
//读取次数
let count = 0;
let str = '';//保存数据
//开始读取
fileReadStream.on('data',(chunk) => {
	console.log(`${++count}接收到：${chunk.length}`);
	str += chunk;
})
//读取完成
fileReadStream.on('end', () => {
	console.log('结束'+count);
	// console.log(str)
	//将读取的文件流写入index.js
	writeFile()
})

//读取失败
fileReadStream.on('error', (err) => {
	console.log(err)
})

//流的写入
// let data = 'console.log("Hello World! 我要存入数据！")';
function writeFile(){
	let writeStream = fs.createWriteStream('index.js');
	writeStream.write(str,'utf8');
	writeStream.end();
	writeStream.on('finish',() => {
		console.log('写入完成')
	})
}