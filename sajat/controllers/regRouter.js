var express = require('express');
var router = express.Router();
var passport = require('passport');
//var registers = [];

router.get('/registration', function (req, res) {
    req.flash('error', 'Sikertelen regisztráció!');
    res.render('users/registration', {
        errorMessages: req.flash('error')
    });
});
router.post('/registration', passport.authenticate('local-registration', {
    successRedirect:    '/subjects/list',
    failureRedirect:    '/registration',
    failureFlash:       true,
    badRequestMessage:  'Hiányzó adatok'
}));






/*

router.get('/registration', function(req,res){
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
        res.render('users/registration', {
            validationErrors: validationErrors,
            data: data
        }); 
});

router.post('/registration', function(req,res){
    
    // adatok ellenőrzése
    req.checkBody('neptun', 'Hibás Neptunkód').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('password', 'Hibás Jelszó').notEmpty().withMessage('Kötelező megadni!');    
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    
    if(validationErrors){
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/registration');           
        
    }else{
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        registers.push({
            neptun: req.body.neptun,
            password: req.body.password
        });


        req.app.models.user.create({
            neptun: req.body.neptun,
            password: req.body.password
        })
        .then(function (subject) {
            //siker
            req.flash('info', 'Sikeres regisztráció!');
            res.render('index', {
                messages: req.flash('info')
            });
        })
        .catch(function (err) {
            //hiba
            console.log(err);
        });
        
       

    }

});
*/
module.exports = router;