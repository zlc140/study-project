function now() {
	return +new Date()
}
/**
 * 函数防抖 函数只在最后调用，例如resize,在松口后才调用，scroll在滚动停止才调用
 * 应用：onresize, input监听
 * 特点： 调用之后的一段时间函数不再调用
 * @param func 回调
 * @param time 间隔时间
 * @param immediate 是否立即执行（true:首次立即执行，之后time之内不在执行； false:高频出发，延迟到最后一次的time后执行一次   ）
 * @returns {function(*=)}
 */
function debounce(func, time = 200, immediate = true){
	let timer, context, args;
	
	//延迟执行函数
	const later = () => setTimeout(() => {
		timer = null;
		if(!immediate) {
			func.apply(context, args)
			context = args = null;
		}
	}, time)
	
	return function(...params) {
		 if(!timer){
			context = this
			args = params
		 	timer = later()
			 if(immediate) {
		 		func.apply(this, params)
			 }else {
		 		context = this
				args = params
			 }
		 }else {
		 	 clearTimeout(timer)
			 timer = later()
		 }
	
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
	let timer;
	let timeout = null;
	return function() {
		let args = arguments,//闭包传参
			_me = this;//获取上下文
		let runCallBack = function() {
			timer = +new Date();
			timeout = false;
			func.apply(_me,args);
		}
		if(timeout)return;
		if(+new Date() - timer < delay && !timeout){
			console.log('a')
			timeout = setTimeout(runCallBack, delay)
			return;
		}
		runCallBack()
	}
}