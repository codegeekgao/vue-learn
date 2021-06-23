<template>
  <div>
    <h2>原生点击2</h2>
    <img :src="url">
  </div>
</template>

<script>
export default {
  name: 'Beauty2',
  data () {
    return {
      url: '/img/4.jpeg'
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style scoped>

</style>
