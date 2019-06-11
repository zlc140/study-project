// call, apply, bind
//
// 相同点：都立足于改变函数的this指向

// 不同点：
// call和applly会立即执行函数，bind只是绑定了函数，并不会立即执行函数
// call、apply因为要立即执行函数，所以第二个参数或之后的参数都是当前的真实参数，bind是“预设参数”(这里可以参考文章《趣谈js的bind牌胶水》中关于bind预设参数的阐述)


// call和apply方法都是为了改变函数的this值而生
// 第一个参数都是指明宿主对象，不传或为null，undefined则this指向window
// call的参数是一个一个传过去的，apply是传一个数组
var obj = {
    age: 22
}

function say(name) {
    console.log('我是：' + name + '|今年：' + this.age);
}

say.call(obj, 'jack'); // 我是：jack|今年：22
say.apply(obj, ['mike']); // 我是：mike|今年：22

// https://juejin.im/post/5b028b5d6fb9a07acb3d2c99

// js实现call方法 添加到原型上的方法如果方法内有使用this，则不能使用箭头函数
Function.prototype.selfCall = function(context, ...args) {
    let func = this;
    console.log(this)
    context || (context = window);
    if(typeof func !== 'function') throw new TypeError('this is not function')
    let caller = Symbol('caller')
    context[caller] = func
    let res = context[caller](...args)
    delete context[caller]
    return res
}
