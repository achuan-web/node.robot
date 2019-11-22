// 引入所需要的第三方包
const superagent = require("superagent");
const fs = require("fs");
var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
//封装批量取节点
/***
 * @parms res 爬取的文本
 * @parms arr.selectors  传递的dom节点名 
 * @parms arr.attr_name  要取得属性名 
 */
get_data = (str, path, arr, callback) => {
    //处理函数
    get_list = (res, arr) => {
        let array = []; //所有数据数组之和
        let $ = cheerio.load(res.text);
        arr.forEach((e_1, i_1) => {
            let data = []; //单个数组
            $(e_1.selectors).each((i_2, e_2) => {
                let obj = {}; //单个对象
                arr[i_1]["attr_name"].forEach((e_3, i_3) => {
                    obj[e_1.attr_name[i_3]] = $(e_2).attr(e_1.attr_name[i_3]);
                });
                data.push(obj);
            });
            array[i_1] = data;
        });
        return array;
    };

    router.get(str, (req, res, next) => {
        superagent.get(path).end((err, res_) => {
            if (err) return res.send(err);
            // selectors为所需要筛选的名称
            // attr_name为属性名与属性值
            // let arr = [{
            //         selectors: ".manga-box ul li .manga-img img",
            //         attr_name: ["src", "alt"]
            //     },
            //     {
            //         selectors: ".manga-box ul li .manga-img",
            //         attr_name: ["href"]
            //     }
            // ];
            let fs = require('../fs');
            let result = get_list(res_, arr);
            res.send(result);
            return callback(result);
        });
    });
}
module.exports = get_data;