// ============================ 1. JS 中的new操作符的原理解析 =======================================
/**
 * es6 Reflect.construct(Person,'zl') 功能类似new
 * 这里只能支持构造函数
 *过程是：
 1.创建一个类实例，创建空对象{}, 设置Object.__proto__ == Person.prototype
 2.初始化实例：构造函数Person被传入参数并被调用，将this指向设定为实例obj
 3.返回实例obj
 * @param name
 * @constructor
 */
var Person = function(name){
    this.name = name;
}
Person.prototype.say = function() {
    console.log('hello,' + this.name)
}

var p1 = new Person('JAX')
p1.say()


function objectFactory() {
    let obj = new Object();
    let Constructor = [].shift.apply(arguments);
    obj.__proto__ = Constructor.prototype;//第一步
    return function () {
        var ret = Constructor.apply(obj, arguments);//第二步
        return ret == 'object' ?ret : obj //第三步
    }
}
var p2 = objectFactory(Person)('JSX')

const selfNew = function(fn, ...rest) {
    let instance = Object.create(fn.prototype)
    let res = fn.apply(instance, rest)
    return isComplexDataType(res) ? res : instanve
}

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null


var p3 = selfNew(Person, 'rose')
var p4 = selfNew(Object, {'name': 123})
