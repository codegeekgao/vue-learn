let [a, b, c] = [1, 2, 3]
console.log(a,b,c)

import Vue from 'vue'
const message='haha'
let app =new Vue({
    el:'#app',
    template:`<div>
    <h1>{{message}}</h1>
    </div>`,
    data:{
        message
    }
})
