<template>
<div>
  <h2>这是白丝美女</h2>
  <img :src="url">
</div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      url: '/img/1.jpeg'
    }
  },
  created () {
    console.log('detail.... created')
  },
  destroyed () {
    console.log('detail.... destroyed')
  }
}
</script>

<style scoped>

</style>
