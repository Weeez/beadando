//requires
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('connect-flash');

var Waterline = require('waterline');
var config = require('./config/config');

var subjectCollection = require('./models/subject');
var userCollection = require('./models/user');

//routers
var indexRouter = require('./controllers/indexRouter.js');
var regRouter = require('./controllers/regRouter.js');
var subjectsRouter = require('./controllers/subjectsRouter.js');
var loginRouter = require('./controllers/loginRouter.js');
var aboutRouter = require('./controllers/aboutRouter.js');
var logoutRouter = require('./controllers/logoutRouter.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//dependencies
var app = express();

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});




// Local Strategy for sign-up
passport.use('local-registration', new LocalStrategy({
        usernameField: 'neptun',
        passwordField: 'password',
        passReqToCallback: true,
    },   
    function(req, neptun, password, done) {
        req.app.models.user.findOne({ neptun: neptun }, function(err, user) {
            if (err) {
                return done(err); 
                
            }
            if (user) {
                return done(null, false, { message: 'Létező neptun.' });
            }
            req.app.models.user.create(req.body)
            .then(function (user) {
                //return done(null, user);

                return done(null, user);
            })
            .catch(function (err) {
                return done(null, false, { message: err.details });
            })
        });
    }
));



// Strategy
passport.use('local', new LocalStrategy({
        usernameField: 'neptun',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function(req, neptun, password, done) {
        req.app.models.user.findOne({ neptun: neptun }, function(err, user) {
            console.log(user);
            if (err) {
                console.log("hiba");
                return done(err); 
            }
            if (!user || !user.validPassword(password)){
                console.log("helytelen adatok");
                return done(null, false, { message: 'Helytelen adatok.' });
            }else{
                console.log("sikeres login");
                if(user.role === "teacher"){
                    user.isTeacher = true;
                }
                return done(null, user);
            }
        });
    }
));



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
//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//endpoints
/*
app.use(function(req,res,next){
  res.locals.loggedIn = false;
  res.locals.user = "Test";
  next();
});*/


// Middleware segédfüggvény
function setLocalsForLayout() {
    return function (req, res, next) {
        res.locals.loggedIn = req.isAuthenticated();
        res.locals.user = req.user;
        next();
    }
}
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}
function andRestrictTo(role) {
    return function(req, res, next) {
        if (req.user.role == role) {
            next();
        } else {
            next(new Error('Unauthorized'));
        }
    }
}

app.use(setLocalsForLayout());

app.get('/registration', regRouter);
app.post('/registration', regRouter);
//app.use('/registration', regRouter);
app.get('/login', loginRouter);
app.post('/login', loginRouter);
app.get('/subjects/new',ensureAuthenticated, andRestrictTo('teacher'),subjectsRouter);
app.post('/subjects/new',ensureAuthenticated, andRestrictTo('teacher'),subjectsRouter);
app.get('/subjects/list',ensureAuthenticated,subjectsRouter);
//app.post('/subjects/list',subjectsRouter);
app.get('/subjects/delete/:id',ensureAuthenticated,subjectsRouter);
app.get('/about',aboutRouter);
app.get('/', indexRouter);
app.get('/logout', logoutRouter);



//error handlers
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Szerveroldali hiba!');
});

// ORM instance
var orm = new Waterline();

orm.loadCollection(Waterline.Collection.extend(subjectCollection));
orm.loadCollection(Waterline.Collection.extend(userCollection));

// start ORM 
orm.initialize(config, function(err, models) {
    if(err) throw err;
    
    app.models = models.collections;
    app.connections = models.connections;
    
    // Start Server
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.log('Server is started.');
    });
    
    console.log("ORM is started.");
});