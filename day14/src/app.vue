<template>
  <div>
    <h1 class="msg">{{msg}}</h1>
    <button @click="click">button</button>
    <components></components>
  </div>

</template>

<script>
import components from './mycomponents.vue'
export default {
  name: "app",
  data() {
    return {
      msg:'msg'
    }
  },
  components: {
    components
  },
  methods: {
    click() {
      alert(this.msg)
    }
  }
}
</script>

<style scoped>
  .msg {
    color: blue;
  }
</style>
