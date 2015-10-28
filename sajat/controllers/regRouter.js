var express = require('express');
var router = express.Router();

var registers = [];


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
    req.checkBody('pwd', 'Hibás Jelszó').notEmpty().withMessage('Kötelező megadni!');    
    
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
            pwd: req.body.pwd
        });

        req.flash('info', 'Sikeres regisztráció!');
        res.render('index', {
            messages: req.flash('info')
        });        
    }

});


module.exports = router;