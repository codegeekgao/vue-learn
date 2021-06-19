const path = require('path')
const webpack =require('webpack')
const htmlWebpackPlugin= require('html-webpack-plugin')
 const uglifyWebpackPlugin= require('uglifyjs-webpack-plugin')
const port = 8111
module.exports = {
    entry: './src/main.js',
    output:{
        path: path.resolve(__dirname,'dist'),
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
       new uglifyWebpackPlugin()
    ],
    devServer: {
        port: port,
        open: true,
        contentBase:'./dist'
    }
}
