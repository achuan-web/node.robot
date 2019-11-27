let http = require('./http.js')
var express = require("express");
var router = express.Router();

router.get('/', (req, res, next) => {
    // res.render('index',{name:'achuan'});
    res.render('index')
    // res.send('index');
})

module.exports = router