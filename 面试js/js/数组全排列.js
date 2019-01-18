/*
*获取一个数组的所有排列组合
* 注意：循环套递归的执行顺序是： 进入循环-递归-归队的循环执行完-回到之前的循环继续执行
*/

const swap = (arr, i, j) => {
	let tmp = arr[i]
	arr[i] = arr[j]
	arr[j] = tmp
}

const permutation = arr => {
    let result = [];
	const _permutation = (arr, start, type) => {
		if(start === arr.length){
			result.push(arr)
			return
		}
		console.log(start, type)
		for(let i = start; i < arr.length; ++i){
			// 全排列：去重操作
			if(arr.slice(start, i).indexOf(arr[i]) !== -1){
				continue
			}
			swap(arr, i, start) // 和开始元素进行交换
			_permutation(arr, start + 1,'b')
			swap(arr, i, start) // 恢复数组
		}
		return
	}
	_permutation(arr, 0,'a')
	return result
}


console.log(permutation([1, 2, 3]))


