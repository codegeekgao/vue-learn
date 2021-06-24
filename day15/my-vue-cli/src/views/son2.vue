<template>
  <div>
    <ul>
      <li>1message1</li>
      <li>2message2</li>
      <li>3message3</li>
      <li>4message4</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'son2',
  created () {
    console.log('son2.... created')
  },
  destroyed () {
    console.log('son2.... destroyed')
  }
}
</script>

<style scoped>

</style>
