let http = require('http')
let fs = require('fs')
let path = require('path')
let url = require('url')


http.createServer((req, res) => {
	let pathName = url.parse(req.url).pathname;
	
	if(pathName == '/') {
		pathName = "index.html"
	}
	//获取文件后缀名
	let extName = path.extname(pathName);
	console.log(pathName)
	//过滤/favicon.ico请求
	if(pathName != "/favicon.ico") {
		// fs.readFile("./08_webService/"+pathName, (err, data) => {
		let baseCom = pathName.indexOf('ajax') > -1 ? './get-post/' : './08_webService/'
		fs.readFile(baseCom+pathName, (err, data) => {
			if(err) {
				fs.readFile("./08_webService/404.html", (errNotFound,dataNotFound) => {
					if(errNotFound) return false;
					res.writeHead(200, {
						"Content-Type" : "text/html;charset='utf-8'"
					})
					res.write(dataNotFound)
					res.end();
				})
				return;
			}else {
				let ext = getExt(extName)
				console.log(ext)
				res.writeHead(200, {
					"Content-Type" : ext + ";charset='utf-8'"
				})
				res.write(data)
				res.end()
			}
		})
	}
}).listen(3000)

getExt = (extName) =>{
    //readFile-是异步读取的文件，readFileSync则可以让后面的语句等待读取完成
    let data = fs.readFileSync('./08_ext.json');
    let ext = JSON.parse(data.toString())
	return ext[extName];
}