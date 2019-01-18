/**
* new Vue实例 -》 监听者（数据添加到监听队列） -》 订阅者（绑定的数据放到订阅盒子） -》 订阅发布者（对绑定的数据进行回应）
 * 绑定的数据触发监听者的set更新data，调用发布中心对应的回调 ，更新view
* Author zlc140@163.com
* Describe javascript
* @data 2019/1/3
**/

/* 订阅发布中心 - 消息管理中心 */
let uid = 0;
class Dep {
	constructor(key) {
		this.key = key;
		//区分新watcher和改变属性值后产生的watcher
		this.id = uid++;
		// 存储订阅者数组
		this.subs = [];
	}
	depend() {
		// 触发target上的watcher中的addDep方法，参数为dep本身
		Dep.target.addDep(this)
	}
	//添加订阅者
	addSub(sub) {
		this.subs.push(sub)
	}
	notify() {
		// 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
		this.subs.forEach(sub => {
			sub.update()
		})
	}
}
// 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
Dep.target = null;

/*监听者Observer,监听对象属性变化*/
class Observer {
	constructor(value) {
		this.value = value;
		this.walk(value);
	}
	//遍历属性值添加监听
	walk(value) {
		Object.keys(value).forEach(key => {this.convert(key,value[key])})
	}
	// 监听
	convert(key, val) {
		defineReactive(this.value, key, val)
	}
}
function defineReactive(obj, key, val) {
	const dep = new Dep(key);//消息订阅
	console.log(dep)
	let childOb = observe(val);
	Object.defineProperty(obj, key, {
		enumerable: true,//可枚举
		configurable: true,//可删除
		get: () => {
			if(Dep.target) {
				console.log(Dep.target,'get')
				dep.depend();
			}
			return val;
		},
		set: (newVal) => {
			if(val === newVal) return;
			val = newVal;
			// 对新值进行监听
			childOb = observe(newVal);
			// 通知所有订阅者，数值被改变了
			dep.notify();
		}
	})
}
function observe(value) {
	// 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
	if(!value || typeof value !== 'object') {
		return;
	}
	//递归调用深入监听
	return new Observer(value)
}

/*  订阅者watcher  */
class Watcher {
	constructor(vm, expOrFn, cb) {
		this.depIds = {};//hash存储订阅者id,避免重复
		this.vm = vm;//被订阅的数据一定来自当前Vue
		this.cb = cb; //数据更新的回调
		this.expOrFn = expOrFn; //被订阅的数据key值
		this.val = this.get(); //维护更新前的数据
	}
	// 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
	update() {
		this.run();
	}
	addDep(dep) {
		// 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
		// 此判断是避免同id的Watcher被多次储存
		if(!this.depIds.hasOwnProperty(dep.id)) {
			dep.addSub(this);
			this.depIds[dep.id] = dep;
		}
		console.log(this.depIds)
	}
	run() {
		const val = this.get();
		console.log(val)
		if(val !== this.val){
			this.val = val;
			this.cb.call(this.vm, val);
		}
	}
	get() {
		// 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
		Dep.target = this;
		//调用对应监听者的get方法，在其中添加信息管理数据
		const val = this.vm._data[this.expOrFn];
		// 置空，用于下一个Watcher使用
		Dep.target = null;
		return val;
	}
}

class Vue {
	constructor(options = {}) {
		// 简化了$options的处理
		this.$options = options;
		// 简化了对data的处理
		let data = (this._data = this.$options.data);
		// 将所有data最外层属性代理到Vue实例上
		Object.keys(data).forEach(key => {
			this._proxy(key)
		})
		
		observe(data)
	}
	$watch(expOrFn, cb) {
		new Watcher(this, expOrFn, cb)
	}
	_proxy(key) {
		
		Object.defineProperty(this, key, {
			configurable: true,
			enumerable: true,
			get: () => this._data[key],
			set: val => {
				this._data[key] = val;
			}
		})
	}
	
}