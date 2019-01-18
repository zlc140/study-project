// 非阻塞i/o事件驱动
let fs = require('fs');
/**
 * 通过回调获取异步数据
getExt = (callback) => {
	fs.readFile('08_ext.json', (err, data) => {
		//回调
		callback(data)
	})
}
getExt( (result) => {
	console.log(data)
})
*/
/**
 * Node 事件循环：
 * 1. Node 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
 * 2. Node 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
 * 3. Node 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件。
 */
 

let events = require('events')
//实例化事件对象
let EventEmitter = new events.EventEmitter();

getExt = () => {
	fs.readFile('08_ext.json', (err, data) => {
		//将data广播出去
		EventEmitter.emit('data',data.toString())
	})
}

getExt();

//监听data,获取getExt执行结果
EventEmitter.on('data', (ext) => {
	console.log(ext)
})