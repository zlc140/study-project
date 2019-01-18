function Animal (name) {
	this.name = name || 'animal';
	this.sleep = function () {
		console.log(this.name + '正在睡觉觉！')
	}
}
Animal.prototype.eat = function (food) {
	console.log(this.name + '正在吃' +food);
}

//原型链继承
// 特点：基于原型链，既是父类的实例，也是子类的实例
// 缺点：无法实现多继承
/*
	function Cat() { }
	Cat.prototype = new Animal();
	Cat.prototype.name = 'cat';
	
	var cat = new Cat()
*/
//构造继承
// 特点：可以实现多继承
// 缺点：只能继承父类实例的属性和方法，不能继承原型上的属性和方法。
/*
function Cat(name) {
	Animal.call(this,arguments);
}
*/
// 组合继承

function Cat(name) {
	Cat.call(this)
	this.name = name || 'tom'
}
Cat.prototype = new Animal()
cat.prototype.constructor = Cat;

