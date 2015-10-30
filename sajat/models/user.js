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
        }
    }
}