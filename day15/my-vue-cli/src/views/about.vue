<template>
  <div>
    <h2>这是黑丝美女</h2>
    <img :src="url">
    <br/>
    <router-link tag="button" to="/about/son1">按钮1</router-link>
    <router-link tag="button" to="/about/son2">按钮2</router-link>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      url: '/img/2.jpeg'
    }
  }
}
</script>

<style scoped>

</style>
