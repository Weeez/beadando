var express = require('express');
var router = express.Router();

//Model layer
var hasNewSubject = false;

    var test= function(){console.log("teszteeeeeeeeeeeeeeee");}
router.get('/list', function(req,res){

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

router.get('/delete/:id', function (req, res) {
    
    var id = req.params.id;
    req.app.models.subject.destroy({id: id}).then(function(){
                res.redirect('/subjects/list');
            });

});

router.get('/update/:id', function(req,res){
    var id = req.params.id;
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
	req.app.models.subject.findOne({id: id}).then(function (subject){
		res.render('subjects/update',{
				subject: subject,
				validationErrors: validationErrors,
				data: data
		});

	});
    
});


router.post('/update/:id', function (req, res) {
        var id = req.params.id;
        
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
            res.redirect('/subjects/update/'+id);   
        }
        else {
            // adatok elmentése (ld. később) és a hibalista megjelenítése
                  
    		
            req.app.models.subject.update({id: req.params.id}, {
                subject_name: req.body.subject_name,
                subject_code: req.body.subject_code,
                subject_size: req.body.subject_size,
                subject_location: req.body.subject_location,
                subject_teacher: req.body.subject_teacher
            })
                .exec(function (err,subject) {
                    if(err){console.log(err);}
                    res.redirect('/subjects/list');
                });
        }
});

router.get('/new', function(req,res){
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
        res.render('subjects/new', {
            validationErrors: validationErrors,
            data: data
        }); 
});

router.post('/new', function (req, res) {
    
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
        
        req.app.models.subject.create({
            chbox: "<input type='radio' name='focused'>",
            subject_name: req.body.subject_name,
            subject_code: req.body.subject_code,
            subject_size: req.body.subject_size,
            subject_location: req.body.subject_location,
            subject_teacher: req.body.subject_teacher,
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