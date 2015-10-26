//requires
var http = require('http');
var express = require('express');
var testRouter = require('./controllers/testRouter.js');

var app = express();
var port = process.env.PORT || 3000;



//hbs
app.set('views', './views');
app.set('view engine', 'hbs');


//Globális
//app.set('view options', { layout: 'layout' });


//endpoint handlers

app.use(function(req,res,next){
    console.log("middleware test");
    //Per view
    //res.render('views', { title: 'my other page', layout: 'layout' });
    next();
});

/*
app.get('/', function(req, res) {
    //res.render('index');
    console.log("middleware test");
    //res.render('index', { title: 'my other page', layout: 'layout' });
});*/

//routers
app.use('/testRouter', testRouter);

//static middlewares
//app.use(express.static('public'));

//error handlers
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Szerveroldali hiba!');
});

http.createServer(app).listen(port);