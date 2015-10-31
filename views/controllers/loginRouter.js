var express = require('express');
var router = express.Router();

var passport = require('passport');


router.get('/login', function (req, res) {
    req.flash('error', 'Sikertelen bejelentkezés!');
    res.render('users/login', {
        errorMessages: req.flash('error')
    });
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Hiányzó adatok'
}));

/*
router.get('/login', function(req,res){
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
    res.render('users/login', {
        validationErrors: validationErrors,
        data: data
    }); 
});

router.post('/login', function(req,res){
    
    // adatok ellenőrzése
    req.checkBody('neptun', 'Hibás Neptunkód').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('password', 'Hibás Jelszó').notEmpty().withMessage('Kötelező megadni!');        
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    
    if(validationErrors){
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/login');           
        
    }else{
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        
        
        
        
        req.flash('info', 'Sikeres bejelentkezés!');
        res.render('index', {
            messages: req.flash('info')
        });        
    }
});
*/
module.exports = router;