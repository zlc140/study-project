let http = require('http');
let url = require('url');
let path = require('path')
let fs = require('fs');
let getExt = require('getExt')
//虚拟sql读取出的数据；
let items = [{'name': 'nodejs'}];

http.createServer((req, res) => {
	let pathName = url.parse(req.url).pathname;
	if(pathName == '/') {
		pathName = "/ajax.html"
	}
	let extName = path.extname(pathName)
	console.log(pathName)
	if(pathName == '/ajax.html'){
		fs.readFile("get-post/ajax.html", (errNotFound,dataNotFound) => {
			if(errNotFound) {
				console.log(errNotFound);
				return false;
			}
			let ext = getExt(extName)
			console.log(1)
			res.writeHead(200, {
				"Content-Type" : ext + ";charset='utf-8'"
			})
			console.log(dataNotFound)
			res.write(dataNotFound)
			res.end();
		})
	}else {
		/*设置跨域域名（*代表任意）*/
		res.setHeader("Access-Control-Allow-Origin","*")
		/*设置header类型*/
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		/*跨域允许的请求方法*/
		res.setHeader('Content-Type', 'application/json')

		switch (req.method) {
			case 'OPTIONS':
				res.statusCode = 200;
				res.end();
				break;
			case 'GET':
				let data = JSON.stringify(items);
				res.write(data);
				res.end();
				break;
			case 'POST':
				let item = '';
				req.on('data', function (chunk) {
					item += chunk
				})
				req.on('end',function () {
					item = JSON.parse(item);
					items.push(item)
					let data = JSON.stringify(items)
					res.write(data);
					res.end()
				})
				break;
		}
	}
}).listen(3219)