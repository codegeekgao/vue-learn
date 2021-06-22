<template>
  <div>
    <h2>动态美女</h2>
    <img :src="url">
    {{name}}
  </div>
</template>

<script>
export default {
  name: 'active',
  data () {
    return {
      url: '/img/5.jpeg'
    }
  },
  computed: {
    name () {
      console.log(this.$route.params.name)
      return this.$route.params.name
    }
  }
}

</script>

<style scoped>

</style>
