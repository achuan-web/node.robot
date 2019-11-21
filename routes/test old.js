// 未封装写法
const superagent = require("superagent");
const fs = require("fs");
var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
//处理爬取得结果
getList = res => {
    data = [];
    let $ = cheerio.load(res.text);
    $(".manga-box ul li a").each((i, e) => {
        let obj = {
            href: $(e).attr("href"), // 链接
            title: $(e).attr("title") // 标题
        };
        data.push(obj);

    });
    return data;
};
router.get("/", (req, res, next) => {
    superagent.get("http://www.buka.cn/").end((err, res_) => {
        if (err) return res.send(err)
        res.send(getList(res));//返回处理得结果
    });
});
module.exports = router;