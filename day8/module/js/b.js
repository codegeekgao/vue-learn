export let flag = false

export function sum(a, b) {
    return a + b
}

let name = '张三'
let age = 3
let salary = 23000

export let person = {
    name,
    age,
    salary
}

// export default function () {
//     return 'default function'
// }

 let flag1 = false
 function sum1(a, b) {
    return a + b
}

let name1 = '张三'
let age1 = 3
let salary1 = 23000

 let person1 = {
    name1,
    age1,
    salary1
}

export {flag1,sum1,person1}
// export default 默认只能有一个
export default {flag,sum,person}


