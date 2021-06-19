let [a, b] = [1, 2]

function sum(a, b) {
    return a + b;
}

console.log(a + b === sum(a, b))

import Vue from 'vue'
// import App from './app'
import App from './app.vue'
const app = new Vue({
    el:'#app',
    template:'<App/>',
    components:{
        App
    }
})
