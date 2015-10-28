var express = require('express');
var router = express.Router();

//Model layer
var hasNewSubject = false;

var subjects = [
            {
                chbox: 'XXX',
                subject_name: 'Análízis 69',
                subject_code: 'leviosaaa',
                subject_size: '2',
                subject_location: 'szereposztó dívány',
                subject_teacher: 'Sprint Elek'
            },
            {
                chbox: 'X',
                subject_name: 'Tantárgyacska',
                subject_code: 'Tgyk1',
                subject_size: '20',
                subject_location: 'Déli',
                subject_teacher: 'Teszt Elek'
            },
            {
                chbox: 'X',
                subject_name: 'Almafa ültetés',
                subject_code: 'Afk',
                subject_size: '10',
                subject_location: 'Északi',
                subject_teacher: 'Rum Aroma'
            },
        ];

router.get('/subjects/list', function(req,res){
    if(hasNewSubject){
        hasNewSubject = false;
        req.flash('info', 'Tantárgy sikeresen felvéve!');
        res.render('subjects/list', {
            subjects: subjects,
            messages: req.flash('info'),
        });
    }else{
        res.render('subjects/list', {
            subjects: subjects,
        });         
    }
});

router.get('/subjects/new', function(req,res){
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
        res.render('subjects/new', {
            validationErrors: validationErrors,
            data: data
        }); 
});

router.post('/subjects/new', function (req, res) {
    
    hasNewSubject = true;
    
    // adatok ellenőrzése
    req.checkBody('subject_name', 'Hibás Tárgynév').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('subject_code', 'Hibás Tárgy kódnév').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('subject_size', 'Hibás helyek száma').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('subject_size','A megadott érték nem szám').isInt();
    req.checkBody('subject_location', 'Hibás helyszínnév').notEmpty().withMessage('Kötelező megadni!');
    req.checkBody('subject_teacher', 'Hibás tanárnév').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/subjects/new');   
    }
    else {
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        subjects.push({
            chbox : 'x',
            subject_name: req.body.subject_name,
            subject_code: req.body.subject_code,
            subject_size: req.body.subject_size,
            subject_location: req.body.subject_location,
            subject_teacher: req.body.subject_teacher,
        });
        /*res.render('subjects/list', {
            subjects: subjects
        });
        */
        res.redirect('/subjects/list');
    }    
});

module.exports = router;