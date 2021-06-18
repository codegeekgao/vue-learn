let [a, b, c] = [1, 2, 3]

function sum(a, b) {
    return a + b
}
console.log(sum(1,3))
import APP from "./app";
import Vue from 'vue'
const app = new Vue({
    el:'#app',
    template:'<APP/>',
    components: {
        APP
    }
})
