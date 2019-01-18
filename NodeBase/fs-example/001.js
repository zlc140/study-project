var fs = require('fs')

fs.stat('upload', (err,stats) => {
	if(err) {
		fs.mkdir('upload' , (err) => {
			if(err) throw err;
			console.log('目录创建成功')
		})
	}else {
		console.log(stats.isDirectory());
	}
})

fs.readdir('node_modules', (err, files) => {
	if(err) throw err;
	console.log(files)
	let filesArr = [];
	(function getFile(i){
		if(i == files.length) {
			console.log(filesArr)
			return false
		}
		
		fs.stat('node_modules/'+files[i],(err,stats) => {
			if(stats.isDirectory()){
				filesArr.push(files[i])
			}
			
			getFile(i+1)
		})
		
	})(0)
})