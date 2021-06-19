// 寻找当前JS文件的路径
const path = require('path')
const webpack =require('webpack')
const htmlWebpackPlugin= require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output:{
        path: path.resolve(__dirname,'../dist'),
        filename:'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        alias:{
            'vue$':'vue/dist/vue.esm.js'
        }
    },
    plugins:[
        new webpack.BannerPlugin('所有权归codegeekgao'),
        new htmlWebpackPlugin({
            template:'index.html'
        }),
    ]
}
