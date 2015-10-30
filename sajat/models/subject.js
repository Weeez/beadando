module.exports = {
    identity: 'subject',
    connection: 'default',
    attributes: {
        chbox: {
            type: 'string',
            required: false
        },
        subject_name: {
            type: 'string',
            required: true
        },
        subject_code: {
            type: 'string',
            required: true
        },
        subject_size: {
            type: 'int',
            required: true
        },
        subject_location: {
            type: 'string',
            required: true
        },
        subject_teacher: {
            type: 'string',
            required: true
        },
        modification: {
            type: 'string',
            required: true
        }
    }
}