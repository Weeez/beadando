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
        //browser.dump();

        assert.equal(browser.location.pathname, '/login', 'It is not the SO home page.');
        assert.ok(browser.success, 'It did not load successfully.');
        assert.ok(browser.fill("neptun",'QO728I'));
        assert.ok(browser.fill("password",'almafa'));
        assert.ok(browser.pressButton('Submit'));
        //console.log(browser.pressButton('Submit'));
        assert.equal(browser.location.pathname, '/', 'It is not the SO home page.');
      })
      .then(done, done);
  });  
});
