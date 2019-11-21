// 引入所需要的第三方包
const superagent = require("superagent");
var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");

let getHotNews = res => {
  let hotNews = [];
  let $ = cheerio.load(res.text);

  // 找到目标数据所在的页面元素，获取数据
  $("div#pane-news ul li a").each((idx, ele) => {
    let news = {
      title: $(ele).text(), // 获取新闻标题
      href: $(ele).attr("href") // 获取新闻网页链接
    };
    hotNews.push(news); // 存入最终结果数组
  });
  return hotNews;
};

router.get("/",(req, res, next) => {
  let result = {//暂未使用
    code:1,
    data:[],
    msg:'ok'
  }
  superagent.get("http://news.baidu.com/").end( (err, res_) => {
      if (err) return res.send(err)
      res.send(getHotNews(res_))
    });
});
module.exports = router;