<template>
  <div id="app">
    <router-link tag="button" to="/about">美女1</router-link>
    <router-link tag="button" to="/detail">美女2</router-link>
<!--    <router-link tag="button" to="/beauty1">美女3</router-link>-->
<!--    <router-link tag="button" to="/beauty2">美女4</router-link>-->
    <button @click="change1">美女3</button>
    <button @click="change2">美女4</button>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  methods: {
    change1 () {
      this.$router.push('/beauty1')
    },
    change2 () {
      this.$router.push('/beauty2')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
