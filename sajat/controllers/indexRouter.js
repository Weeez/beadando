var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    // Olvasás
    req.session.parameter
    // Írás
    req.session.parameter = 2;
    res.render('index');
});

module.exports = router;