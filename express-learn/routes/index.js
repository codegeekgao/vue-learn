const express = require('express')
// 创建router
// var express = require('express');
let router = express.Router();

const mongoose = require('mongoose')
// 使用router创建一个路由
router.get("/", (req, res, next) => {
  res.render("index", {title: 'myExpress'})
})

router.get("/mongooseTest", (req, res, next) => {
  // 第一个参数用来指定连接数据库的url地址，第二个是连接配置的Javascript对象
  mongoose.connect("mongodb://10.211.55.9/animal", {useNewUrlParser: true})
  mongoose.Promise = global.Promise
  // 使用model方法传入名称和结构用来创建数据集(类似与创建了一个Cat类并指定该类的属性)
  const Cat = mongoose.model('Cat',{name:String,age:Number})
  // 实例化对象
  const tom = new Cat({name:'Tom',age:8})
  tom.save(error=> {
    if(error) {
      console.log('save failed')
    } else{
      console.log('save success！')
    }
  })
  res.send('mongoose test!')
})
module.exports = router
