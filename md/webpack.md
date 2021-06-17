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
