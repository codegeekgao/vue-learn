var express = require('express');
var router = express.Router();

// 引入mongoose
const mongoose = require('mongoose')
router.get("/mongoose", (req, res, next) => {
    // 第一个参数用来指定连接数据库的url地址，第二个是连接配置的Javascript对象
    mongoose.connect("mongodb://10.211.55.9/animal", {useNewUrlParser: true})
    mongoose.Promise = global.Promise
    // 使用model方法传入名称和结构用来创建数据集(类似与创建了一个Cat类并指定该类的属性)
    const Cat = mongoose.model('Cat',{name:String,age:Number})
    // 实例化对象
    const tom = new Cat({name:'michael',age:24})
    tom.save(error=> {
        if(error) {
            console.log('save failed')
        } else{
            console.log('save success！',tom)
        }
    })
    res.send('mongoose test!')
})


module.exports = router;

