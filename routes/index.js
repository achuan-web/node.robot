// 引入所需要的第三方包
const superagent = require("superagent");
var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
//封装批量取节点
/**
 * @parms path 路径
 * @parms arr.selectors  传递的dom节点名 
 * @parms arr.attr_name  要取得属性名 
 * @parms callback  回调函数
 */
let get_data = (path, arr, callback) => {
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

  superagent.get(path).end((err, res_) => {
    if (err) return callback(err);;
    let result = get_list(res_, arr);
    return callback(null, result);
  });
}
module.exports = get_data;