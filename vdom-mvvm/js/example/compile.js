function Compile(el, vm) {
	this.$vm = vm;
	this.$el = this.isElementNode(el) ? el :document.querySelector(el);
	if(this.$el) {
		this.$fragment = this.node2Fragment(this.$el);
		this.init();
		this.$el.appendChild(this.$fragment);
	}
}
Compile.prototype = {
	node2Fragment: function (el) {
		let fragment = document.createDocumentFragment(),child;
		// 将原生节点拷贝到fragment
		let i =1;
		//如果插入的子节点是DOM树中已存在的节点的话，这个节点会被移动到要插入的位置而不会复制，
		//所以这个的while循环相当于把el下的子节点全部移动到了fragment下
		while (child = el.firstChild) {
			fragment.appendChild(child)
		}

		return fragment;
	},
	init: function(){
		this.compileElement(this.$fragment);
	},
	compileElement: function(el){
		let childNodes = el.childNodes,me = this;
		[].slice.call(childNodes).forEach(function(node,index) {
			let text = node.textContent;
			let reg = /\{\{(.*)\}\}/;

			if(me.isElementNode(node)) {
				me.compile(node);
			}else if(me.isTextNode(node) && reg.test(text)){
				console.log(text,RegExp.$1)
				me.compileText(node, RegExp.$1)
			}
			if(node.childNodes && node.childNodes.length) {
				me.compileElement(node)
			}
		})

	},
	compile: function (node) {
		let nodeAttrs = node.attributes,me=this;
		[...nodeAttrs].forEach(attr => {
			let attrName = attr.name;
			if(me.isDirective(attrName)) {
				let exp = attr.value;
				let dir = attrName.substr(2);
				//事件指令
				if(me.isEventDirective(dir)) {
					compileUtil.eventHandler(node, me.$vm, exp, dir);
				}else {//普通指令
					compileUtil[dir] && compileUtil[dir](node, me.$vm, exp)
				}
				node.removeAttribute(attrName);
			}
		})
	},
	compileText: function (node, exp) {
		compileUtil.text(node, this.$vm, exp);
	},
	isDirective: function (attr) {
		return attr.indexOf('v-') === 0;
	},
	isEventDirective:function (dir) {
		return dir.indexOf('on:') === 0;
	},
	isElementNode: function(el) {
		return el.nodeType == 1;
	},
	isTextNode: function (node) {
		return node.nodeType == 3;
	}
}
const compileUtil = {
	text: function(node, vm, exp) {
		this.bind(node, vm, exp, 'text');
	},

	html: function(node, vm, exp) {
		this.bind(node, vm, exp, 'html');
	},

	model: function(node, vm, exp) {
		this.bind(node, vm, exp, 'model');

		var me = this,
			val = this._getVMVal(vm, exp);
		node.addEventListener('input', function(e) {
			var newValue = e.target.value;
			if (val === newValue) {
				return;
			}

			me._setVMVal(vm, exp, newValue);
			val = newValue;
		});
	},

	class: function(node, vm, exp) {
		this.bind(node, vm, exp, 'class');
	},

	bind: function(node, vm, exp, dir) {
		var updaterFn = updater[dir + 'Updater'];
		updaterFn && updaterFn(node, this._getVMVal(vm, exp));

		let dd = new Watcher(vm, exp, function(value, oldValue) {
			updaterFn && updaterFn(node, value, oldValue);
		});
		console.log(dd)
	},

	// 事件处理
	eventHandler: function(node, vm, exp, dir) {
		var eventType = dir.split(':')[1],
			fn = vm.$options.methods && vm.$options.methods[exp];

		if (eventType && fn) {
			node.addEventListener(eventType, fn.bind(vm), false);
		}
	},

	_getVMVal: function(vm, exp) {
		var val = vm;
		exp = exp.split('.');

		exp.forEach(function(k) {
			val = val[k];
		});

		return val;
	},

	_setVMVal: function(vm, exp, value) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function(k, i) {
			// 非最后一个key，更新val的值
			if (i < exp.length - 1) {
				val = val[k];
			} else {
				val[k] = value;
			}
		});
	}
}

const updater = {
	textUpdater: function (node, value) {
		node.textContent = typeof value == 'undefined' ? '' : value
	},
	htmlUpdater: function (node, value) {
		node.innerHTML = typeof value == 'undefined' ? '' : value
	},
	classUpdater: function (node, value, oldValue) {
		var className = node.className;
		className = className.replace(oldValue, '').replace(/s$/, '')
		var space = className && String(value) ? ' ' : '';
		node.className = className + space + value;
	},
	modelUpdater: function (node, value, oldValue) {
		console.log(value,'input')
		node.value = typeof value == 'undefined' ? '' : value;
	}
}
