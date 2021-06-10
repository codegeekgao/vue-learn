var employeeName = '张三'
var age = 24
var salary = 16000

var p = class person {
    employeeName
    age
    salary
}
var flag = false

import b from './b.js'
// 打印返回的默认值
console.log("===" + b)

import {sum,flag1} from './b.js'

console.log("++" + sum(1, 2),flag1)

import bb from './b.js'
console.log('default'+bb.sum(2,3))
