const express = require('express')
// 创建router
// var express = require('express');
let router = express.Router();
// 使用router创建一个路由
router.get("/", (req, res, next) => {
  res.render("index", {title: 'myExpress'})
})
module.exports = router
