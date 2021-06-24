<template>
  <div>
    <h2>这是黑丝美女</h2>
    <img :src="url">
    <br/>
    <router-link tag="button" to="/about/son1">主页</router-link>
    <router-link tag="button" to="/about/son2">消息</router-link>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>

</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      url: '/img/2.jpeg'
    }
  },
  beforeRouteLeave: (to, from, next) => {
    next()
  }
}
</script>

<style scoped>

</style>
