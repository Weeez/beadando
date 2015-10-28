//requires
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('connect-flash');

//dependencies
var app = express();
//var http = require('http');

//routers
var indexRouter = require('./controllers/indexRouter.js');
var regRouter = require('./controllers/regRouter.js');
var subjectsRouter = require('./controllers/subjectsRouter.js');
var loginRouter = require('./controllers/loginRouter.js');
var aboutRouter = require('./controllers/aboutRouter.js');

//hbs
app.set('views', './views');
app.set('view engine', 'hbs');


//MiddleWares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session({
    cookie: { maxAge: 600000 },
    secret: 'titkos szoveg',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

//endpoints
app.use(function(req,res,next){
  res.locals.loggedIn = false;
  res.locals.user = "Test";
  next();
});


app.get('/registration', regRouter);
app.post('/registration', regRouter);
app.get('/login', loginRouter);
app.post('/login', loginRouter);
app.get('/subjects/new',subjectsRouter);
app.post('/subjects/new',subjectsRouter);
app.get('/subjects/list',subjectsRouter);
//app.post('/subjects/list',subjectsRouter);
app.get('/about',aboutRouter);
app.get('/', indexRouter);


//error handlers
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Szerveroldali hiba!');
});


var port = process.env.PORT || 3000;
//http.createServer(app).listen(port);
app.listen(port);