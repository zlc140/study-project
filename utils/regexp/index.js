"use strict";


const MONEY = /\B(?=(\d{3})+\b)/g
/**
 * 规则： 包含数字，大小写字符其中两种的6到12位字符串
 * (?= ) | (?! )匹配位置
 * @type {RegExp}
 */
const PASSWORD = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[A-Z])(?=.*[a-z]))^[0-9a-zA-Z]{6,12}$/
const PASSWORD2 = /(?!^[0-9]{6,12}$)|(?!^[a-z]{6,12}$)|(?!^[A-Z]{6,12}$)^[0-9a-zA-Z]{6,12}$/



/**
 * 货币格式化（默认保留不对小数位修正）
 * @param val
 * @param type （￥/$）
 * @param fix (保留的小数位数)
 */

function moneyFormat(num, type, fix) {
	var addType = type ? type+' ' : '';
	num = typeof fix === 'number' ? num.toFixed(fix) : num;
	return num.replace(MONEY, ',').replace(/^/, addType);
}