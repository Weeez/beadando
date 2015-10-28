var express = require('express');
var router = express.Router();

router.get('/list', function(req,res){
  res.render('subjects/list', {
        subjects: [
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
        ]
    });  
});

module.exports = router;