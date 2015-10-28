//requires
var express = require('express');

//dependencies
var app = express();
//var http = require('http');

//routers
var testRouter = require('./controllers/testRouter.js');
var indexRouter = require('./controllers/indexRouter.js');
var regRouter = require('./controllers/regRouter.js');


//hbs
app.set('views', './views');
app.set('view engine', 'hbs');


//endpoint handlers (MiddleWare)
app.use(express.static('public'));

//minden utvonalra lefut
/*
app.use(function(req,res){
    console.log('inic');
        res.render('index');
});*/

//endpoints
app.use(function(req,res,next){
  res.locals.loggedIn = false;
  res.locals.user = "Test";
  next();
});
app.use('/testRouter', testRouter);
app.use('/', indexRouter);
app.get('/registration', regRouter);




//error handlers
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Szerveroldali hiba!');
});


var port = process.env.PORT || 3000;
//http.createServer(app).listen(port);
app.listen(port);