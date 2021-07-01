## webpack.config.js 的使用
```node.js
npm init
```
执行命令完成后便可以在当前目录下生成package.json文件
```json5
{
  "name": "learnwebpack",
  "version": "1.0.0",
  "description": "无",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

然后继续编辑webpack.config.js文件
```javascript
const path = require('path')
module.exports = {
    // 指定出口（要被打包的文件）
    entry: './src/main.js',
    output:{
        // 获取输出目录的决定路径，使用npm的path依赖
        path: path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    }
}
```
此时在控制台再次输出webpack命令，发现在dist目录下生成bundle.js而且浏览器控制台正常输出.

## webpack 如何使用CSS
> 使用webpack处理我们之前写的代码，而且webpack会自动处理依赖的问题。开发中还需要将相关es6的语法转es5，
>typescript语法转es5，scss、less 转化为css。webpack本身不支持，这个时候使用webpack扩展相应的loader即可

- 安装css loader yu style Loader
```javascript
npm install --save-dev css-loader@2.0.2
npm install --save-dev style-loader@0.23.1
```
然后在webpack.config.js module下在添加如下模块：
```js
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
```
- 安装less 、less-loader
```js
 npm install less@3.9.0 --save-dev
npm install less-loader@4.1.0 --save-dev
```
然后在webpack.config.js module下添加如下模块：
```js
    {
                test: /\.less$/i,
                loader: [
                    // compiles Less to CSS
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
```

- 安装url-loader
```js
 npm install url-loader@1.1.2 --save-dev
``
然后在webpack.config.js module下添加如下模块：
```js
       {
                test: /\.(png|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 81920,
                        },
                    },
                ],
            },
```
**注意上面有个参数limit限制图片的大小，超过此限制值则会报错如下并尝试使用：file-loader去加载资源**，否则则使用url-loader加载图片并使用base64编码
```js
ERROR in ./picture/2.jpeg
  Module build failed: Error: Cannot find module 'file-loader'
  Require stack:
```
所以我们这里安装好file-loader即可，而webpack.config.js module无须进行配置
```js
npm install file-loader@3.0.1 --save-dev
```
- es6转es5
```javascript
npm install babel-loader@7 babel-core babel-preset-es2015 --save -dev
```
配置文件中 添加如下配置：
```javascript
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
```
- 安装vue
```javascript
npm install vue@2.5.21 --save

```
main.js中引入vue实例
```javascript
import Vue from 'vue'
const message='haha'
let app =new Vue({
    el:'#app',
    data:{
        message
    }
})
```
index.html 添加如下内容；
```html
<div id="app">
    {{message}}
</div>
<script src="dist/bundle.js"></script>
```
会报错--runtime-only 改成runtime-compiler,在vue.config.js引入以下内容：
```javascript
    resolve: {
        alias:{
            'vue$':'vue/dist/vue.esm.js'
        }
    }
```
- 解析Vue文件
首先安装vue-loader和vue-template-compiler
```javascript
npm install vue@2.5.21 --save
npm install vue-loader@13.7.3 vue-template-compiler@2.5.21 --save-dev
```
然后在webpack.config.js配置如下：
```javascript
```javascript
    {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

```
新建vue文件：
```vue
<template>
  <div>
    <h1 class="msg">{{msg}}</h1>
    <button @click="click">button</button>
    <components></components>
  </div>

</template>

<script>
import components from './mycomponents.vue'
export default {
  name: "app",
  data() {
    return {
      msg:'msg'
    }
  },
  components: {
    components
  },
  methods: {
    click() {
      alert(this.msg)
    }
  }
}
</script>

<style scoped>
  .msg {
    color: blue;
  }
</style>

```
然后在main.js导入此文件：
```javascript
import Vue from 'vue'
// import App from './app'
import App from './app.vue'
const app = new Vue({
    el:'#app',
    template:'<App/>',
    components:{
        App
    }
})
```
在html中这么使用它：
```html
<body>
<div id="app">

</div>
</body>
<script src="dist/bundle.js"></script>
```
- 安装BannerPlugin
webpack中已经集成此插件，只需在配置文件中导入即可
```javascript
const webpack =require('webpack')
    plugins:[
        new webpack.BannerPlugin('所有权归codegeekgao'),
    ]
```
- 安装html-webpack-plugin
```
npm install html-webpack-plugin@3.2.0
```
此插件会生产在dist目录下生成html并以src下index.html为模版
```javascript
const htmlWebpackPlugin= require('html-webpack-plugin')
    plugins:[
        new htmlWebpackPlugin({
            template:'index.html'
        })
    ]
```
- 安装uglifyjs-webpack-plugin
此插件会压缩webpack打包后的js
```javascript
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```
添加配置：
```javascript
 const uglifyWebpackPlugin= require('uglifyjs-webpack-plugin')
  plugins:[
     
       new uglifyWebpackPlugin()
    ]
```

- 添加webpack-dev-server
```javascript
npm install webpack-dev-server@2.9.1 --save-dev
```
配置文件中添加：
```javascript
    devServer: {
        port: 8111,
        open: true,
        contentBase:'./dist'
    }
```
可以在package.json添加如下一行：
```javascript
  "scripts": {
    "dev": "webpack-dev-server"
  }
```
然后控制台输入命令：`npm run dev`然后就会自动打开浏览器，如果更新了文件会自动热部署加载此文件

- webpack-merge 配置文件分离插件
```javascript
npm install webpack-merge@4.1.5 --save-dev
```
以开发环境配置可以使用此插件添加配置：
```javascript
const webpackMerge = require('webpack-merge')
const  baseConfig = require('./baseconfig')
module.exports = webpackMerge(baseConfig,{
    devServer: {
        port: 8111,
        open: true,
        contentBase:'./dist'
    }
})
```
这样就可以把baseconfig配置的内容与当前的配置的内容进行了融合。

- vue runtime-only 与runtime-compiler的区别
1. runtime-compiler 生命周期从template加载成ast(abstract syntax tree)然后转成render函数进而在转成virtual dom然后在渲染形成真实Dom
2. runtime-only 直接从render函数开始到virtual dom 然后才是真实dom
3. runtime-only由于少了从template到ast的规程，所以效率更高。
在runtime-compiler下main.js一般这样定义：
```javascript
import Vue from 'vue'
// import App from './app'
import App from './app.vue'
const app = new Vue({
    el:'#app',
    template:'<App/>',
    components:{
        App
    }
})
```
而在runtime-only只需这样定义：
```javascript
import Vue from 'vue'
// import App from './app'
import App from './app.vue'
const app = new Vue({
    el:'#app',
// 定义render函数就无须template属性了，因为render函数默认就解析了template
   render: h => h(App)
)
```
上面render箭头函数相当于以下定义
```javascript
       render : function app(createElememt) {
        // createElement('标签名','类选择器','数据')
         return createElememt(app)
       }
```

- 使用vue-cli创建项目
```javascript
 // 安装vue-cli
npm install @vue/cli -g
/ 创建项目
vue create my-vue-cli
```
-  vue-cli2 与vue-cli3区别
1. vue-cli2 基于webpack3 创建而vue-cli3是基于webpack4
2. vue-cli3移除了build目录以及config目录(约定大于配置)
3. vue-cli3讲static文件转换成public目录，且index.html也在此目录中
4. 新增vue ui 图形化界面来为vue项目进行配置
- 使用vue ui修改配置
在终端上输入vue ui可以进行图像化界面的配置

- 箭头函数中this引用
```javascript
    const obj = {
        fun() {
            setTimeout(function () {
                // 打印window对象
                console.log("--------",this)
            },100)
            // 打印当前对象（广州银行项目踩过坑）
            setTimeout(()=> {
                console.log('--------',this)
            },200)
        }
    }
    obj.fun()
```
箭头函数中的this会默认向上查找上一层作用域的this对象(广州项目遇到过坑)

- 前端渲染与后端渲染
### 后端路由
> 后端路由，客户端发起不同url，服务器通过url匹配找到相应的控制器，控制器经过相应数据处理后生成一个渲染后的html给客户端(后端维护url也页面关系)，
>直接通过后台路由渲染好的html数据不需要单独加载css和js有利于SEO优化
### 前后分离阶段
> 前端通过ajax请求后台数据，并通过js+css+html渲染数据。好处就是前后端分离（后端专注与数据，前端负责页面交互与渲染），并且这种模式不仅适用于前端，也适用于IOS与安卓
### 前端路由
> 用户点击按钮，按钮点击触发后会跳转不同页面(每个页面有唯一的url与之对应)，这种前端url映射关系被称为前端路由（前端路由核心，url改变页面不会进行刷新）

- url的hash模式与history模式
### hash模式
hash模式只需要在location.hash=xxx的设置就可以实现url切换页面不会进行刷新的效果。
### history模式
```javascript
// 当前页面的url变成name
history.pushState({},'','name')
history.pushState({},'','ai')
// 回退 history.go(-1)
histoy.back()
// 向前 history.go(1)
history.forward()

```
- 安装Vue-router
```javascript
npm install vue-router@3.5.2 --save
```
然后创建vueRouter对象
```javascript
// import vue-router

import VueRouter from 'vue-router'
import Vue from 'vue'
 // use plugin
Vue.use(VueRouter)

const routes = {}
// create VueRouter object
const router = new VueRouter( {
  routes
})
export default router
```
在main.js进行挂载
```javascript
import Vue from 'vue'
import App from './App.vue'
import router from "@/router";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
```
- 定义routes
```javascript
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/about',
    component: (resolve) => require(['@/views/about'], resolve),
    children: [
      {
        path: '',
        redirect: 'son2'
      },
      {
        path: 'son1',
        component: () => import('@/views/son1')
      },
      {
        path: 'son2',
        component: () => import('@/views/son2')
      }
    ]
  },
  {
    path: '/detail',
    component: resolve => require(['@/views/detail'], resolve)
  },
  {
    path: '/beauty1',
    component: (resolve) => require(['@/views/beauty1'], resolve)
  },
  {
    path: '/beauty2',
    name: 'Beauty2',
    component: () => import('@/views/beauty2')
  },
  {
    path: '/active/:name',
    component: resolve => require(['@/views/active'], resolve)
  }
]
```
其中path代表组件url路径，component引入那个路径下的组件，引入组件有两种写法：
``() => import('@/views/son1')``以及`resolve => require(['@/views/active'], resolve)`
页面可使用`router-link``以及`router-view`,下面是一个使用：
```vue
<template>
  <div id="app">
    <router-link tag="button" to="/about">美女1</router-link>
    <router-link tag="button" to="/detail">美女2</router-link>
    <router-view></router-view>
  </div>
</template>
```
to 需匹配跳转组件的path，`<router-view></router-view>``是一个占位符特地能切换匹配到的路由组件
- 路由传递参数
```javascript
      // query 提交设置path即可(页面刷新query数据依然还在)
      this.$router.replace({
        path: '/beauty1',
        query: { name: '张三', age: 23 }
      })
// 取值
this.$route.query


    // params提交必须有name属性（页面刷新params就为undefined）
      this.$router.push({
        name: 'Beauty2',
        params: { name: this.name, age: this.age }
      })
// 取值
this.$route.params
```
