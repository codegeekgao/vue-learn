export default {
    template:`<div>
    <h1>{{msg}}</h1>
    <button @click="click">button</button>
</div>`,
    data() {
        return {
            msg:'msg'
        }
    },
    methods: {
        click() {
            alert(this.msg)
        }
    }
}
