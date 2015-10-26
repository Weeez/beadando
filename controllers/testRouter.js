//Definiálás
var express = require('express');
var router = express.Router();

// middleware csak ehhez a routerhez
router.use(function (req, res, next) {
    console.log("hmm...such awesomes");
    next(); 
    
});

// végpontok a routerhez
router.get('/testRouter', function(req, res) {
    console.log("A testrouter végponthoz...");
});

module.exports = router;