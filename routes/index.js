var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /*res.render为渲染函数
  第一个参数是选中为模板的.ejs文件
  第二个参数是渲染到模板文件的JSON数据*/
  res.render('index', { name: 'Express' });
});

module.exports = router;
