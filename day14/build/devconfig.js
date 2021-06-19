const webpackMerge = require('webpack-merge')
const  baseConfig = require('./baseconfig')
module.exports = webpackMerge(baseConfig,{
    devServer: {
        port: 8111,
        open: true,
        contentBase:'./dist'
    }
})
