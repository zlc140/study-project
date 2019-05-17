//
// 高级函数的定义；
//
// 高阶函数英文叫 Higher-order function，它的定义很简单，就是至少满足下列一个条件的函数：
//
// 接受一个或多个函数作为输入
// 输出一个函数
// 也就是说高阶函数是对其他函数进行操作的函数，可以将它们作为参数传递，或者是返回它们。
// 简单来说，高阶函数是一个接收函数作为参数传递或者将函数作为返回值输出的函数。

// Array.prototype.map , Array.prototype.filter, Array.prototype.reduce
function twoItem(arr1) {
    //正常js
    const arr2 = [];
    for (let i = 0; i < arr1.length; i++) {
        arr2.push( arr1[i] * 2);
    }
    return arr2;

//    map
    return arr1.map(item => item * 2);

}
const arr = [1, 2, 3, 4];
console.log( twoItem(arr) );

//isType
let isType = type => obj => {
    return Object.prototype.toString.call( obj ) === '[object ' + type + ']';
}

isType('String')('123');        // true
isType('Array')([1, 2, 3]);    // true
isType('Number')(123);

//无限累加
// 我们知道打印函数时会自动调用 toString()方法，函数 add(a) 返回一个闭包 sum(b)，
// 函数 sum() 中累加计算 a = a + b，只需要重写sum.toString()方法返回变量 a 就可以了。
function add(a) {
    function sum(b) { // 使用闭包
        a = a + b; // 累加
        return sum;
    }
    sum.toString = function() { // 重写toString()方法
        return a;
    }
    return sum; // 返回一个函数
}

add(1); // 1
add(1)(2);  // 3
add(1)(2)(3)； // 6
add(1)(2)(3)(4)； // 10

//去扁平化，去重， 排序
var arrs = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// [...new Set(arr.join(',').split(','))].sort(sortArr)

function oneArr(arr) {
    let oneA = arr.join(',').split(',')
    return function() {
        return [...new Set(oneA)]
    }
}

function sortArr(a,b) {
    return a - b;
}

oneArr(arrs)().sort(sorArr)
