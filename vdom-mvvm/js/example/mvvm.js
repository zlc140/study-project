
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
		
		this._initComputed();
		
		observe(data)
		
		this.$compile = new Compile(options.el || document.body,this)
		
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
	_initComputed() {
		let me = this;
		let computed = this.$options.computed;
		if(typeof computed == 'object') {
			Object.keys(computed).forEach(key => {
				Object.defineProperty(me, key, {
					get: typeof computed[key] === 'function'
						? computed[key]
						: computed[key].get,
					set: function(){}
				})
			})
		}
	}
	
}