/*  订阅者watcher  */
class Watcher {
	constructor(vm, expOrFn, cb) {
		this.depIds = {};//hash存储订阅者id,避免重复
		this.vm = vm;//被订阅的数据一定来自当前Vue
		this.cb = cb; //数据更新的回调
		this.expOrFn = expOrFn; //被订阅的数据key值
		
		if(typeof expOrFn === 'function') {
			this.getter = expOrFn;
		}else{
			this.getter = this._parseGetter(expOrFn)
		}
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
	}
	run() {
		const val = this.get();
		if(val !== this.val){
			this.val = val;
			this.cb.call(this.vm, val);
		}
	}
	get() {
		// 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
		Dep.target = this;
		//调用对应监听者的get方法，在其中添加信息管理数据
		const val = this.getter.call(this.vm, this.vm)
		
		// 置空，用于下一个Watcher使用
		Dep.target = null;
		return val;
	}
	_parseGetter(exp){
		if (/[^\w.$]/.test(exp)) return;
		let exps = exp.split('.');
		return function(obj) {
			for(let i=0; i< exps.length; i++) {
				if(!obj) return;
				obj = obj[exps[i]]
			}
			return obj;
		}
	}
}
