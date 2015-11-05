var Browser = require("zombie");
var expect = require("expect");
var assert = require("assert");
var url = 'https://beadando-weeez.c9.io:' + process.env.PORT + '/login';
var browser = new Browser();

describe('login ', function(){

   it('loginning', function(done){
        browser.visit(url).then( function(){
            console.log("kurva");
            
            
            expect(browser.text('title')).toEqual('Tárgyfelvétel');
            browser.fill("neptun",'')
            .fill('password','')
            .pressButton("Submit");
            

            /*expect(browser.success).toEqual(true);
            expect(browser.query('a[href="/login"]')).toExist();
            expect(browser.query('a[href="/registration"]')).toExist();
            expect(browser.query('a[href="/"]')).toExist();
            expect(browser.query('a[href="/about"]')).toExist();
            expect(browser.query('a[href="/logout"]')).toNotExist();
            expect(browser.query('a[href="/subjects/list"]')).toNotExist();
            expect(browser.query('a[href="/subjects/new"]')).toNotExist();          */  
        });
        done();
    });
}); 