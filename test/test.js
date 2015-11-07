var zombie = require('zombie');
var browser = new zombie();
var assert = require('assert');
var expect = require("expect");

describe('Index', function() {
  it('should be alive', function(done) {
    this.timeout(8000);
    browser.visit('https://beadando-weeez.c9.io')
      .then(function() {
        //browser.dump();

        assert.equal(browser.location.pathname, '/', 'It is not the SO home page.');
        assert.ok(browser.success, 'It did not load successfully.');
      })
      .then(done, done);
  });
  
it('loggin', function(done) {
    this.timeout(8000);
    browser.visit('https://beadando-weeez.c9.io/login')
      .then(function() {

        assert.equal(browser.location.pathname, '/login', 'It is not the SO home page.');
        assert.ok(browser.success, 'It did not load successfully.');

        browser.fill('neptun','TANAR').fill('password','titok').pressButton('#Submit', function(){
          browser.assert.redirected();
        });

              
      })
      .then(done, done);
  });  
  
it('registration', function(done) {
    this.timeout(8000);
    browser.visit('https://beadando-weeez.c9.io/registration')
      .then(function() {

        assert.equal(browser.location.pathname, '/registration', 'It is not the SO home page.');
        assert.ok(browser.success, 'It did not load successfully.');
        browser.fill('neptun','TesztUser').fill('password','teszt').pressButton('#Submit', function(){
          browser.assert.redirected();
        });
      })
      .then(done, done);
  });    
});
