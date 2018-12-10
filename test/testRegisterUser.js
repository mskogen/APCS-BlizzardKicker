const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('blizzardkicker.com', 3000);

describe('User visits signup page', function() {

  const browser = new Browser();

  before(function() {
    return browser.visit('/register');
  });

  describe('submits form', function() {

    before(function() {
      browser
        .fill('email',    'Test.Email@Test.com')
        .fill('password', 'Test@1234');
      return browser.pressButton('');
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('title', 'Welcome To Brains Depot');
    });
  });

});