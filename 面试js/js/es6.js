/**
 * 本篇内容：1。es5实现map,reduce,filter，Object.assign,instance等方法，
 *          2。es6新特性 生成器 generator，yield
 *
 * */

/**
 *
 *  TIP：for循环的continue是满足条件时跳过本次，执行++；
 *               break 直接结束循环
 *               return 应该是在函数内的，不在往下执行
 * es5实现数组的map方法
 * @param fn
 * @param context
 * @returns {Array}
 */
const selfMap = function(fn, context) {
    let arr = Array.prototype.slice.call(this)
    console.log(arr, 'arr',context)
    let mapArr = []
    for(let i = 0; i < arr.length; i++) {
        if(!arr.hasOwnProperty(i)) continue
        mapArr.push(fn.call(context, arr[i], i, this))
    }
    return mapArr
}
/**
 * reduce实现map方法
 * @param fn
 * @param context
 * @returns {T}
 */
const selfMap2 = function(fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((all, item, index) => {
        return [...all, fn.call(context, item, index, this)]
    },[])
}

Array.prototype.selfMap = selfMap
Array.prototype.selfMap2 = selfMap2

// let arr = [1,2,3,1,2,3]
//
// arr.selfMap(item => {
//     console.log(item)
//     return item*2
// })

/**
 * es5和reduce实现filter方法
 * @param fn
 * @param context
 * @returns {Array}
 */
Array.prototype.selfFilter = function(fn, context) {
    let arr = Array.prototype.slice.call(this)
    let newArr = []
    for(let i = 0; i < arr.length; i++) {
        if(!arr.hasOwnProperty(i))continue
        if(fn.apply(context,[arr[i],i, this])) {
            newArr.push(arr[i])
        }
    }
    return newArr
}

Array.prototype.selfFilter2 = function(fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((all, cur, index) => {
        return fn.call(context, cur, index) ? [...all, cur] : [...all]
    },[])
}

// 思考： some方法的实现， reduce方法的实现 , flat方法的实现（降维）

function inheirt(subType, superType) {
    subType.prototype = Object.create(superType.prototype, {
        constructor: {
            enumerable: false, //是否可枚举
            configurable: true, //是否可修改（false : 不可修改也不可删除）
            writable: true, // false: 不可采用数据运算符进行复制（修改）
            value: subType
        }
    })
    Object.setPrototypeOf(subType, superType)
}

let class3 = new inheirt();

//生成器 generator
// yield 和return的差别是：return相当于结束函数，yield则是函数暂时运行到这里
// 调用Generator只会得到一个遍历器对象变量 下面g是一个遍历器对象，即一个指向内部状态的指针对象，用于之后遍历yield定义的内部状态。
// 这就提供了两个特性 惰性求值， 自动遍历
// Generator.prototype.return()方法用于立即结束遍历，并返回给定的值。
// ================================================= example 1 =======================================================
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();

console.log(g);         // Generator {}
console.log(g.next());  // { value: 1, done: false }
console.log(g.return(5));  // { value: 5, done: true }
console.log(g.next()); //{ value: undefined, done: true }
// ================================================= example 2 =======================================================
//惰性求值  ==> 这一特性可用来做暂缓执行函
function* add(a, b) {
    yield a + b;
}
let addNum = add(3, 4)
addNum.next() //7
// ================================================= example 3 =======================================================
//自动遍历 ===》 可以通过for...of Array.form, [...]隐式调用next
/**
 * example
 * @returns {IterableIterator<number>}
 */
function* numbers () {
    yield 1;
    yield 2;
    return 3;
    yield 4;
}

//for...of
var gen1 = numbers();
for (let n of gen1) {
    console.log(n);    //1  2
}

//Array.from
console.log(Array.from(numbers()));  // [1, 2]

//扩展运算符(…)
console.log([...numbers()]);    // [1, 2]

//解构赋值
let [x, y] = numbers();
console.log(x);   //1
console.log(y);   //2
// ================================================= example 4 =======================================================
// yield*的用法
function* gen(){
    yield* ["a", "b", "c"];
}
console.log(gen().next());    // { value:"a", done:false }
// ================================================= example 5 =======================================================
//通过添加resume函数作为推进器，使得函数可以自动连续依次执行
function delay(time, callback){
    setTimeout(function(){
        callback("sleep "+time);
    },time);
}

function run(genFunc) {
    var g = genFunc(resume);
    function resume(value) {
        g.next(value);
    }
    g.next();
}
//注意这里调用的delay不能是同步的，必须要是异步的
run(function* delayedMsg(resume) {
    console.log(yield delay(1000, resume));
    console.log(yield delay(2000, resume));
});

// ================================================= example 6 =======================================================
// 多个ajax请求按顺序执行（async/await）
function run(generatorFunc) {
    let it = generatorFunc()
    let result = it.next()

    return new Promise((resolve, reject) => {
        const next = function(result) {
            if(result.done) {
                resolve(result.value)
            }
            result.value = Promise.resolve(result.value)
            result.value.then(res => {
                let result = it.next(res)
                next(result)
            }).catch(err => {
                reject(err)
            })
        }
        next(result)
    })
}

function* func() {
    let res = yield api(data)
    cosnole.log(res)
    let re2 = yield api(data2)
    cosnole.log(res2)
    console.log(res,res2)
}

run(func)



// ================================================= example 7 =======================================================

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null;
/**
 * Object.assgin() 对象的拷贝
 * 一级是深拷贝，如果是多级对象，一级以后为浅拷贝
 * @param target
 * @param resource
 * @returns {*}
 */
const selfAssign = function(target, ...resource) {
    if(target == null) throw new Error('Cannot convert undefined or null to object')
    return resource.reduce((all, item) => {
        isComplexDataType(all) || (all = new Object(acc))
        if(item == null) return all;
        [...Object.keys(item), ...Object.getOwnPropertySymbols(item)].forEach(vkey => {
            all[vkey] = item[vkey]
        })
        return all;
    }, target)
}


// ================================================= example 8 ================================================

//instance 是用于判断一个变量是否某个对象的实例
//所以它是通过遍历对象原型链上是否右侧对象的prototype来判断的 ，所以可以是继承关系
const selfInstance = function(left, right) {
    let proto = Object.getPrototypeOf(left);
    while (true) {
        if(proto == null) return false
        if(proto === right.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto)
    }
}
// ================================================= example 9 ================================================
/**
 * 单例模式
 * @param func
 * @returns {*}
 */
function proxy(func) {
    let instance;
    let handler = {
        //拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)
        construct(target, args) {
            if (!instance) {
                // 没有实例就创造一个实例
                instance = Reflect.construct(func,args)
            }
            // 无论如何都会返回一个实例(new关键字)
            return instance
        }
    }
    return new Proxy(func, handler)
}

function Person(name, age) {
    this.name = name
    this.age = age
}

const SingletonPerson = proxy(Person)

let person1 = new SingletonPerson('zhl', 22)

let person2 = new SingletonPerson('cyw', 22)

console.log(person1 === person2) // true














