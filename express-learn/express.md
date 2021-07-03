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
可以在最后看到我们刚刚插入的数据tom

- 使用supervisor监控代码修改
如果在开发中进行修改代码，频繁的启动和终止程序是一个非常麻烦的事情。这里借助中间件supervisor启动程序并实现热部署
```javascript
npm install supervisor -g
```
终止刚刚的npm start 服务使用supervisor启动express项目
```javascript
supervisor bin/www
```
![](./public/images/supervisor.png)

- express路由机制
express项目入口的文件是app.js，在此文件中定义了express对象,然后导入index.js与user.js
```javascript
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
app.use('/', indexRouter);
// user.js访问的API均为http://localhost:3000/users开头
app.use('/users', usersRouter);
```