export default {
    template:`<div>
    <h1>{{msg}}</h1>
    <button @click="click">按钮</button>
    </div>`,
    data() {
        return { msg:'hello webpack'}
    },
    methods: {
        click() {
            alert("it's a message")
        }
    }
}
