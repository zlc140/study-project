let arr = [
    [
      ['1-7', '2-6'],
      '3-6',
      [
        ['4-0', '5-4'],
        ['6-9'],
        '7-5',
      ],
    ]
  ]

  function isArray(arr) {
    if(typeof arr == 'object' && {}.toString.call(arr).match(/object\s+(\w*)/)[1].toLocaleLowerCase() == 'array'){
        return true
    }
    return false
  }

  // Q1: 完成数组 flat 函数
function flat(arr) {
    // code
   
    return arr
  }
  
  arr = flat(arr);
  console.log(arr);

//  法1 join() 只能是纯数组
console.log(arr.join(',').split(','))
console.log(arr.toString().split(','))

// 法2 递归

function flatR(arr) {
    let result = []; //利用闭包缓存结果
    function _flatR(arr){
        arr.forEach(ele => {
            if(Array.isArray(ele)){ // 递归条件
                _flatR(ele)
            }else{
                result.push(ele)
            }
        });
    }
    _flatR(arr)
    arr = result;
    return arr

}

// 法3 es6 flat flatMap()

console.log(arr.flat(3)) //3指的是深度

// 法4  迭代 - 广度优先搜索 借鉴《图解算法》中广度优先搜索算法
// 1 创建一个数组，保存结果
// 2 创建一个队列
// 3 初始化
// 4 使用 while 循环去遍历 list 里面的每一项
// 5 将第一项推出队列
//     如果是数组，将子项依次推入队列
//     如果是字符串，将子项推入结果
// 6当 list 长度为0时候，遍历完成

function flatE(arr) {
    const result = []; //存放非数组子元素
    const list = []; //存放数组子元素
    function _flatE(arr){
        arr.forEach(el => {
            if(Array.isArray(el)) list.push(el);
            else result.push(el)
        })
    }
    _flatE(arr) 
    while(list.length > 0){ //遍历数组结果
        const itme = list.shift()
        _flatE(item)
    }
    arr = result
    return arr;
}

// Q2: 数组计算 '1-7' => 1 * 7 = 7


function calc(arr){
    arr = arr.flat(3);
    return arr.map(el => {
        return +el.split('-')[0] * +el.split('-')[0]
    })

    // or

    return arr.map(el => eval(el.replace('-', '*')))
}