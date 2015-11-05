var Browser = require("zombie");
var expect = require("expect");
var url = 'https://beadando-weeez.c9.io:' + process.env.PORT + '/';
var browser = new Browser();

describe('index page', function(){
    it('load the index page', function(done){
        browser.visit(url, function(){
        
            expect(browser.text('title')).toEqual('Tárgyfelvétel');
            expect(browser.success).toEqual(true);
            expect(browser.query('a[href="/login"]')).toExist();
            expect(browser.query('a[href="/registration"]')).toExist();
            expect(browser.query('a[href="/"]')).toExist();
            expect(browser.query('a[href="/about"]')).toExist();
            expect(browser.query('a[href="/logout"]')).toNotExist();
            expect(browser.query('a[href="/subjects/list"]')).toNotExist();
            expect(browser.query('a[href="/subjects/new"]')).toNotExist();

            
        });
        done();
    });
    
});

