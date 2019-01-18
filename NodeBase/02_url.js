var url = require('url');
var http = require('http');

http.createServer(function(req,res) {
	var sendData;
	if(req.url != '/favicon.ico') {
		/*node 路由模块*/
		var result = url.parse(req.url, true)
		sendData = result.query
		console.log(url)
		console.log(result)
		console.log((result.query?result.query.userName:'none'))
		console.log(url.resolve('http://localhost:3000/gaga','zlc/'))
	 
		res.writeHead(200, {
			"Content-type": "text/html;charset=UTF-8"
		})
		
		res.write(`<h1>${sendData.userName || '123'}</h1>`);
		
		res.end();
	}
}).listen(3000)


