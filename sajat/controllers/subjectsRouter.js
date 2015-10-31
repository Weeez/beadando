var express = require('express');
var router = express.Router();

//Model layer
var hasNewSubject = false;

    var test= function(){console.log("teszteeeeeeeeeeeeeeee");}
router.get('/subjects/list', function(req,res){

    var userHasRights = req.user.role === 'teacher';
    


    req.app.models.subject.find().then(function(subjectses){    
        //megjelenites

        if(hasNewSubject){

            hasNewSubject = false;
            req.flash('info', 'Tantárgy sikeresen felvéve!');
            res.render('subjects/list', {
                subjects: subjectses,
                userHasRight: userHasRights,
                messages: req.flash('info'),
            });
        }else{
            res.render('subjects/list', {
                subjects: subjectses ,
                userHasRight: userHasRights,
                almafa: "almafa"
            });                
        }
    });
});

router.post('/subjects/delete', function (req, res) {
    
    //req.app.models.subject.delete();
    
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
        
        /*
        
        <form action="http://google.com">
    <input type="submit" value="Go to Google">
</form>
        
        */
        req.app.models.subject.create({
            chbox: "<input type='radio' name='focused'>",
            subject_name: req.body.subject_name,
            subject_code: req.body.subject_code,
            subject_size: req.body.subject_size,
            subject_location: req.body.subject_location,
            subject_teacher: req.body.subject_teacher,
            //modification: "<button type='button' class='btn btn-warning'>Módositás</button><button type='button' class='btn btn-danger'  >Törlés</button>"
            modification: "<form action='/subjects/delete'><input type='submit' class='btn btn-warning' value='Módosítás'></form>"
        })
        .then(function (subject) {
            //siker
            res.redirect('/subjects/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err);
        });
    }    
});

module.exports = router;