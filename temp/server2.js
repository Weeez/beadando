//requires
var express = require('express');
var app = express();

//hbs
app.set('views', './views');
app.set('view engine', 'hbs');



//MiddleWares
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
})

// Start Server
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server is started.');
});