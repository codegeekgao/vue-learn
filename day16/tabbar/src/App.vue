<template>
  <div id="app">
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  created() {
    // eslint-disable-next-line no-unused-vars
    // let promise = new Promise((resolve,reject)=> {
    //   // 进行异步请求，例如向后台请求数据
    //    let success = false
    //   if(success) {
    //     console.log('我是请求成功后的逻辑')
    //     resolve('请求成功')
    //   } else {
    //     console.log('我是请求失败后的逻辑')
    //     reject('请求失败')
    //   }
    // }).then(res=> console.log(res)).catch(err=> console.log(err))
    new Promise((resolve, reject) => {
      let a = 0;
      setTimeout(() => {
        resolve(a+1)
        resolve(a+2)
        reject(a+3)
      }, 1000)
    }).then((res1) => {
      console.log('res1', res1)
     return  Promise.resolve(res1)
    },(res2)=>{
      console.log('res2',res2)
    }).then((res3) => {
      console.log('res3', res3)
    }).catch(err=> console.log(err)).catch(err1=> console.log(err1))
  }
}
</script>

<style>

</style>
