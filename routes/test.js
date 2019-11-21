// 引入所需要的第三方包
const superagent = require("superagent");
const fs = require("fs");
let list = []; // 热点新闻
var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");

getList = res => {
    data = [];
    let $ = cheerio.load(res.text);
    $(".manga-box ul li a").each((i, e) => {
        let obj = {
            //   title: $(`${e} img`).attr("src"), // 获取新闻标题
            //   title1: $(e).text(), // 获取新闻标题
            href: $(e).attr("href"), // 获取新闻网页链接
            title2: $(e).attr("title") // 获取新闻网页链接
        };
        data.push(obj);

    });
    return data;
};
router.get("/", (req, res, next) => {
    superagent.get("http://www.buka.cn/").end((err, res_) => {
        if (err) return res.send(err)
        res.send(getList(res));
    });
});
module.exports = router;