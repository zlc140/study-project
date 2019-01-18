var tool = {
	add: (...numbers) => {
		let sum = 0;
		for(let num in numbers) {
			sum += numbers[num]
		}
		return sum;
	}
}
/**
 * 2. 暴露模块
 * exports.str = str;
 * module.exports = str;
 * 区别：
 * module.exports 是真正的接口
 * exports 是一个辅助工具
 * 如果 module.exports 为空，那么所有的 exports 收集到的属性和方法，都赋值给了 module.exports
 * 如果 module.exports 具有任何属性和方法，则 exports 会被忽略
 */
 
exports.tool = tool;
module.exports = tool;