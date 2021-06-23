<template>
  <div id="app">
    <router-link tag="button" to="/about">美女1</router-link>
    <router-link tag="button" to="/detail">美女2</router-link>
<!--    <router-link tag="button" to="/beauty1">美女3</router-link>-->
<!--    <router-link tag="button" to="/beauty2">美女4</router-link>-->
    <button @click="change1">美女3</button>
    <button @click="change2">美女4</button>
    <router-link tag="button" :to="url">动态</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data () {
    return {
      url: '/active' + '/anme',
      name: 'zhangsan',
      age: 23
    }
  },
  methods: {
    change1 () {
      // query 提交设置path即可
      this.$router.replace({
        path: '/beauty1',
        query: { name: '张三', age: 23 }
      })
    },
    change2 () {
      // params提交必须有name属性
      this.$router.push({
        name: 'Beauty2',
        params: { name: this.name, age: this.age }
      })
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
