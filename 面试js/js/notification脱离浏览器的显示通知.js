/* Notification 脱离浏览器的显示通知
*  兼容性： 目前Notification除了IE浏览器不支持外, 其他浏览器都已支持桌面通知，移动端浏览器基本都未支持。
* */


var options = {
	dir: 'auto', //文字方向
	body: '通知： 傻吊评论了你的盆友圈', //通知主体
	requireInteraction: true, //不自动关闭通知
	icon: "https://baidu.jpg"
}
notifyMe('这是标题', options)
function notifyMe(title, options) {
	if(!window.Notification){
		console.log('浏览器不支持该功能')
	}else {
		//检查是否同意接受过通知
		if(Notification.permission === 'granted') {
			var notification = new Notification(title, options);
		}else if(Notification.permission === 'default') {
			// 用户还未选择，可以询问用户是否同意发送通知
			Notification.requestPermission().then(permission => {
				if(permission === 'granted') {
					console.log('用户同意授权');
					var notification = new Notification(title, options);
				}else if(permission === 'default') {
					console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
				}else{
					// denied
					console.log('用户拒绝授权 不能显示通知');
				}
			})
		}
	}
}