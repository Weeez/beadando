var Handlebars = require("Handlebars");

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

var t = Handlebars.compile($('#t').html());
$('body').append(t({
    errors: [
        'Where is pancakes house?',
        'some message',
        'One cent stamp'
    ]
}));    