/**
 * 函数防抖 函数只在最后调用，例如resize,在松口后才调用，scroll在滚动停止才调用
 * 应用：onresize, input监听
 * 特点： 调用之后的一段时间函数不再调用
 * @param func 回调
 * @param time 间隔时间
 * @returns {function(*=)}
 */
function debounce(func, time){
	let timer;
	return (e) => {
		let args = arguments,//闭包传参
		_me = e;//获取上下文
		console.log(e)
		timer && clearTimeout(timer)
		timer = setTimeout(function() {
			func.call(_me,_me)
		},time)
	}
}

/**
 * 函数节流 方法会在触发之后的delay秒执行，期间触发不会执行，只有下个周期触发才继续执行
 * 应用： 点击误触，
 * 特点： 一定时间内函数只调用一次
 * @param func
 * @param delay
 * @returns {function(*=)}
 */
function throttle(func, delay) {
	let timer = +new Date();
	let timeout = null;
	return () => {
		let args = arguments,//闭包传参
			_me = this;//获取上下文
		let runCallBack = function() {
			timer = +new Date();
			timeout = false;
			func.apply(_me,args);
		}
		
		if(+new Date() - timer < delay){
			timeout = setTimeout(runCallBack, delay)
			return;
		}
		runCallBack()
	}
}