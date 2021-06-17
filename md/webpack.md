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
