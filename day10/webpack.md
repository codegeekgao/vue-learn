## webpack.config.js 固定名称
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
此时在控制台再次输出webpack命令，发现在dist目录下生成bundle.js而且浏览器控制台正常输出
