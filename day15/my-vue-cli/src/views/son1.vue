<template>
  <div>
    <ul>
      <li>message1</li>
      <li>message2</li>
      <li>message3</li>
      <li>message4</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'son1',
  created () {
    console.log('son1.... created')
  },
  destroyed () {
    console.log('son1.... destroyed')
  }
}
</script>

<style scoped>

</style>
