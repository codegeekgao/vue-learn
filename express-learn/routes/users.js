var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
const user =require('../model/user')
router.post('/register',(req,res,next)=>{
  // 判断姓名、密码、邮箱、手机不能为空
  if(!req.body.username) {
    res.json({status:0,message:'用户名不能为空'})
  }
  if(!req.body.password) {
    res.json({status:0,message:'密码不能为空'})
  }
  if(!req.body.userMail){
    res.json({status:0,message:'邮箱不能为空'})
  }
  if(!req.body.userPhone){
    res.json({status:0,message:'电话不能为空'})
  }
  user.findByUserName(req.body.username,(error,userSave)=> {
      if(userSave.length!==0) {
          res.json({status:0,message:'用户名已存在'})
      } else {
          const registerUser = new user({
              username:req.body.username,
              password:req.body.password,
              userMail:req.body.userMail,
              userPhone:req.body.userPhone,
              userAdmin:false,
              userPower:false,
              userStop:false,
          })
        registerUser.save(()=> {
            res.json({status:0,message:'注册成功'})
        })
      }
  })
} )
module.exports = router;
