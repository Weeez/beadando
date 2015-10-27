//Definiálás
var express = require('express');
var router = express.Router();

// middleware csak ehhez a routerhez
router.use(function (req, res) {
    res.render('index');
});

module.exports = router;