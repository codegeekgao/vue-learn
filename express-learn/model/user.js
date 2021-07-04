let mongoose = require('../common/db')
let user = new mongoose.Schema({
    username: String,
    password: String,
    userMail: String,
    userPhone: String,
    userAdmin: Boolean,
    userPower: Number,
    userStop: Boolean
})
// 查询所有用户
user.statics.findAll = function (callback) {
    this.find({}, callback)
}
// 根据用户名查询
user.statics.findByUserName= function (username,callback)  {
    this.find({username: username}, callback)
}

//用户登录
user.statics.login= function(username,password,callback)  {
    this.find({username: username, password: password, userStop: false}, callback)
}

user.statics.findUserPassword=function(username,phone,mail,callback)  {
    this.find({username: username, userPhone: phone, userMail: mail}, callback)
}
let userModel = mongoose.model('user', user)
module.exports = userModel
