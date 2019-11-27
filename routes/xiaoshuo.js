let http = require('./http.js')
var express = require("express");
var router = express.Router();
let arr_search = [
    {
        selectors: ".tcaricature_block ul li a img",
        attr_name: ["src", "alt"]
    },
    {
        selectors: ".tcaricature_block ul li a",
        attr_name: ["href","title"]
    }
    ]
let arr = [
    {
        selectors: " ul li a img",
        attr_name: ["src", "alt"]
    },
    {
        selectors: " ul li a",
        attr_name: ["href","title"]
    }
    ]
router.get('/', (req, res, next) => {
        http('https://manhua.dmzj.com/', arr, (err, result) => {
    
            err ? res.send(err) : res.send(result)
            // let fs = require('../public/javascripts/fs.js')
            // fs.down_img(result)
        })
})
router.get('/search', (req, res, next) => {
    let { s } = req.query
    console.log('s',s)
    http('https://manhua.dmzj.com/tags/search.shtml?s='+s, arr_search,true, (err, result) => {
        
        err ? res.send(err) : res.send(result)
        // let fs = require('../public/javascripts/fs.js')
        // fs.down_img(result)
    })
})
router.get('/detail/', (req, res, next) => {
    let { url } = req.query
    http('https://manhua.dmzj.com/'+url+'/', arr_detail,true, (err, result) => {

        err ? res.send(err) : res.send(result)
        // let fs = require('../public/javascripts/fs.js')
        // fs.down_img(result)
    })
})
// router.get('/url/', (req, res, next) => {
//     let { url } = req.query
//     http(`http://www.buka.cn/${url}`, [{ selectors: 'img', attr_name: ["src", "alt"] }], (err, result) => {
//         err ? res.send(err) : res.send(result)
//     })
// })
module.exports = router