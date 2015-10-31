var bcrypt = require('bcryptjs');

module.exports = {
    identity: 'user',
    connection: 'default',
    attributes: {
        neptun: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        role: {
            type: 'string',
            enum: ['student', 'teacher'],
            required: true,
            defaultsTo: 'student'
        },
                
        validPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        },
        
        isTeacher: false
 
    },
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) {
                return next(err);
            }
            values.password = hash;
            next();
        });
    }    
}