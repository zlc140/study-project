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

