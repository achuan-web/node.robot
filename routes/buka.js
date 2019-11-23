let http = require('./index.js')
var express = require("express");
var router = express.Router();
let arr = [{
        selectors: ".manga-box ul li .manga-img img",
        attr_name: ["src", "alt"]
    },
    {
        selectors: ".manga-box ul li .manga-img",
        attr_name: ["href"]
    }
]
router.get('/', (req, res, next) => {
    http('http://www.buka.cn/', arr, (err, result) => {
        result = result[0].map((e, i) => {
            return Object.assign({}, e, result[1][i])
        })
        err ? res.send(err) : res.send(result)
        let fs = require('../public/javascripts/fs.js')
        fs.down_img(result)
    })
})
router.get('/', (req, res, next) => {
    let urlStr = url.parse(req.url);
    let {url} = querystring.parse(urlStr.query);
    http(`http://www.buka.cn/${url}`, arr, (err, result) => {
        result = result[0].map((e, i) => {
            return Object.assign({}, e, result[1][i])
        })
        err ? res.send(err) : res.send(result)
        let fs = require('../public/javascripts/fs.js')
        fs.down_img(result)
    })
})
module.exports = router