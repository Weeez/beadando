var express = require('express');
var router = express.Router();

router.get('/new', function(req,res){
  res.render('subjects/new');
});

router.post('/new', function (req, res) {
    // adatok ellenőrzése
    req.checkBody('subject_name', 'Hibás Tárgynév').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('subject_code', 'Hibás Tárgy kódnév').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('subject_size', 'Hibás helyek száma').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('subject_location', 'Hibás helyszínnév').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('subject_teacher', 'Hibás tanárnév').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
    }
    else {
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        console.log(req.body);
    }    
    //console.log(req.body);
});

module.exports = router;