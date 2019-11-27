let http = require('./http.js')
var express = require("express");
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index',{name:'achuan'});
})
router.get('/url/', (req, res, next) => {
    let { url, selectors,attr_name} = req.query
    http(`${url}`, [{ selectors: 'a img', attr_name: ["src", "alt"] }], (err, result) => {
        // err ? res.send(err) : res.send(result)
        res.render('index',{data:''})
    })
})
module.exports = router