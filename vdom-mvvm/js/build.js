
function getType(value) {
	return {}.toString.call(value).slice(8,-1).toLocaleLowerCase().replace(/html(body)?/,'');
};

function vnode(tag,attrs, ...children) {
	if(arguments.length < 3){
		children = undefined;
	}
	return {tag: tag, attrs: attrs, children: children}
}

let nodesData = {
	tag: 'div',
	attrs: {
		'class': 'box'
	},
	children: [
		{
			tag: 'div',
			children: [ {
				tag: 'span',
				attrs: { },
				children: [
					'text'
				]
			}]
		},
		{
			tag: 'input',
			attrs: {
				type: 'text',
				placeholder: '我的第一个input'
			},
			children:[]
		}
	]
}
let nodesData2 = {
	tag: 'div',
	attrs: {
		'class': 'box2'
	},
	children: [
		{
			tag: 'div',
			children: [ {
				tag: 'span',
				attrs: { },
				children: [
					'TEXT'
				]
			}]
		},
		{
			tag: 'input',
			attrs: {
				type: 'text',
				placeholder: '我的第一个input'
			},
			children:[]
		}
	]
}

//JSON数据转化为虚拟dom;
function vNode(nodes) {
	if(typeof nodes == 'object'){
		this.tag = nodes.tag;
		this.children = nodes.children;
		this.attrs = nodes.attrs? Object.assign({},nodes.attrs) : {}
	}else if(typeof nodes == 'string') {
		this.tag = null;
		this.text = nodes;
		this.attrs = null;
	}
}
vNode.prototype.render = function() {
	if(!this.tag) {
		return document.createTextNode(this.text)
	}
	let el = document.createElement(this.tag);
	if(this.attrs && getType(this.attrs) == 'object') {
		for(let prop in this.attrs) {
			el.setAttribute(prop, this.attrs[prop]);
		}
	}
	this.children && this.children.map((vChild) => {
		el.appendChild(new vNode(vChild).render())
	})
	return el;
}
let node = new vNode(nodesData).render()
//将虚拟dom插入到真实的父节点；
let parentBox = document.querySelector('#app');
parentBox.appendChild(node);


let btn = document.getElementById('btn');
//btn点击修改数据，触发dom更新
btn.addEventListener('click', function (){
	let oldNode = new vNode(nodesData);
	let newNode = new vNode(nodesData2);
	console.log(newNode,oldNode)
	patchElement(parentBox,newNode,oldNode);
})

/**
 * 局部更新dom结构(简易版的diff用法)
 * @param parentBox
 * @param newNode
 * @param oldNode
 * @param index
 */
function patchElement(parentBox, newNode, oldNode, index = 0) {
	if(!oldNode){
		parentBox.appendChild(new vNode(newNode).render());
	}else if(!newNode) {
		parentBox.childNodes[index] && parentBox.removeChild(parentBox.childNodes[index]);
	}else if(changed(newNode,oldNode)){
		parentBox.replaceChild(new vNode(newNode).render(),parentBox.childNodes[index]);
	}else if(newNode.tag === oldNode.tag){
		//更新属性
		console.log(newNode.attrs,oldNode.attrs)
		updateAttrs(parentBox,newNode.attrs,oldNode.attrs,index);
	}
	//递归更新子节点
	let maxLength = getMax(newNode.children,oldNode.children);
	if(maxLength > 0){
		for(let i =0; i < maxLength; i++) {
			patchElement(
				parentBox.childNodes[index],
				newNode.children[i],
				oldNode.children[i],
				i
			)
		}
	}
	
	
}

function changed(obj1, obj2){
	return  typeof obj1 !== typeof obj2 ||
			(typeof obj1 === 'string' && obj1 !== obj2) ||
		    obj1.tag !== obj2.tag
		
}
function getMax(list1,list2){
	 let o = list1 ? list1.length : 0;
	 let n = list2 ? list2.length : 0;
	 return Math.max(o, n);
}

/**
 *更新属性
 * @param parentBox
 * @param newAttr
 * @param oldAttr
 * @param index
 */
function updateAttrs(parentBox, newAttr={}, oldAttr={}, index = 0){
	let attrs = Object.assign({}, oldAttr, newAttr);
	Object.keys(attrs).forEach(v => {
		if(!oldAttr[v] && newAttr[v]){//add
			addAttrs(parentBox.childNodes[index],v,newAttr[v])
		}else if(oldAttr[v] && !newAttr[v]){
			removeAttrs(parentBox.childNodes[index],v)
		}else if(oldAttr[v] && newAttr[v] && oldAttr[v] !== newAttr[v]){
			console.log(0)
			addAttrs(parentBox.childNodes[index],v,newAttr[v])
		}
	})
}

/**
 * 添加属性
 * @param $target
 * @param key
 * @param value
 */
function addAttrs($target,key,value){
	$target.setAttribute(key,value);
}

/**
 * 删除属性
 * @param $target
 * @param key
 */
function removeAttrs($target,key){
	$target.removeAttribute(key);
}