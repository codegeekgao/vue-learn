<template>
  <div id="app">
<!--    <xmind/>-->
  </div>
</template>

<script>
// import xmind from '@/components/xmind'
export default {
  name: 'App',
  components: {
    // xmind
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
    // new Promise((resolve, reject) => {
    //   let a = 0;
    //   setTimeout(() => {
    //     resolve(a+1)
    //     resolve(a+2)
    //     reject(a+3)
    //   }, 1000)
    // }).then((res1) => {
    //   console.log('res1', res1)
    //  return  Promise.resolve(res1)
    // },(res2)=>{
    //   console.log('res2',res2)
    // }).then((res3) => {
    //   console.log('res3', res3)
    // }).catch(err=> console.log(err)).catch(err1=> console.log(err1))
    // new Promise((resolve,reject)=> {
    //   // 错误代码
    //   resolve(true)
    //   reject()
    // }).then(res=> console.log(res))
    let promise1 = new Promise((resolve,reject)=> {
      let flag = true
      if(flag) {
        resolve('promise1执行成功')
      } else {
        reject('promise1执行失败')
      }
    }).then( res => {
      console.log(res)
      return Promise.resolve(res)
    }).catch( err => {
      console.log(err)
      return Promise.reject(err)
    })

    let promise2 = new Promise((resolve,reject)=> {
      let flag =false
      if(flag) {
        resolve('promise2执行成功')
      } else {
        reject('promise2执行失败')
      }
    }).then( res => {
      console.log(res)
      return Promise.resolve(res)
    }).catch( err => {
      console.log(err)
      return Promise.reject(err)
    })

   Promise
        .race([promise1, promise2])
        .then(function(results){
          console.log('全体执行成功，结果：'+results);
        }).catch(err => {
      console.log('全体执行失败，结果：'+err);
    });

  }

}
</script>

<style>

</style>
