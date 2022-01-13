var should = require('should');
// var jsdom = require('jsdom');

describe('canUseDOM', function () {
  it('should return false in nodejs environment', function (done) {
    var canUseDOM = require('./index');
    canUseDOM.should.be.false;
    done();
  });

  // it('should return true in browser', function (done) {
  //   jsdom.env('<div></div>', function (err, window) {
  //     global.document = jsdom.jsdom('');
  //     global.window = document.defaultView;
  //     var canUseDOM = require('./index');
  //     canUseDOM.should.be.true;
  //     done();
  //   });
  // });
});