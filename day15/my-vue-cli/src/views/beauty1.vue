<template>
  <div>
    <h2>原生点击1</h2>
    <img :src="url">
  </div>
</template>

<script>
export default {
  name: 'beauty1',
  data () {
    return {
      url: '/img/3.jpeg'
    }
  },
  mounted () {
    console.log(this.$route.query)
  }
}
</script>

<style scoped>

</style>
