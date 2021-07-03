## express入门
- express 安装
```javascript
npm install express --save
```
- express-generator安装
```javascript
node install express-generator -g
```
- 使用express 快速创建项目
```javascript
# 创建express-learn项目
express express -learn
```
- 安装依赖并启动
```javascript
npm install && npm start
```
启动后显示如下：
![](./public/images/express.png)

- 使用中间件连接mongodb
```javascript
npm install mongoose --save
```

- 在index.js中添加路由并使用mongoose连接数据库
```javascript
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
```
控制台输出如下：
![](./public/images/save.success.png)

- mongodb查询插入数据
进入mongodb的bin目录下执行mogo脚本
![](./public/images/mongodbSave.png)
可以在最后看到我们刚刚插入的数据
