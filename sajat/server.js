//requires
var http = require('http');
var express = require('express');
var testRouter = require('./controllers/testRouter.js');
var indexRouter = require('./controllers/indexRouter.js');


//dependencies
var app = express();
var port = process.env.PORT || 3000;


//hbs
app.set('views', './views');
app.set('view engine', 'hbs');


//endpoint handlers (MiddleWare)
app.use(express.static('public'));

//minden utvonalra lefut
app.use(function(req,res,next){
    console.log('inic');
    next();
});

//routers
app.use('/testRouter', testRouter);
app.use('/', indexRouter);



//error handlers
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Szerveroldali hiba!');
});

http.createServer(app).listen(port);