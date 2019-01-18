var url = require('url');
var http = require('http');
var tools2 = require('03_tool-multiply')
var tools3 = require('zlc-module')

http.createServer(function(req,res) {
	var sendData;
	if(req.url != '/favicon.ico') {
		/*node 路由模块*/
		var result = url.parse(req.url, true)
		sendData = result.query
		// console.log(url)
		// console.log(result)
		// console.log((result.query?result.query.userName:'none'))
		// console.log(url.resolve('http://localhost:3000/gaga','zlc/'))
		/* nodejs的模块化 */
		// console.log(tools1.add(1,2,3))
		// console.log(tools2.multiply(1,2,3))
		// console.log(tools3.add(1,2,3))
		// console.log(tools3.multiply(1,2,3))
		
		res.writeHead(200, {
			"Content-type": "text/html;charset=UTF-8"
		})
		
		res.write(`<h1>${sendData.userName || '123'}</h1>`);
		
		res.end();
	}
}).listen(3003)


