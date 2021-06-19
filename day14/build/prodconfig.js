const uglifyWebpackPlugin= require('uglifyjs-webpack-plugin')
const webpackMerge = require('webpack-merge')
const  baseConfig = require('./baseconfig')
module.exports = webpackMerge(baseConfig,{
    plugins:[
        new uglifyWebpackPlugin()
    ],
})
