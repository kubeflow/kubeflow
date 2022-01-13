var transform = require('../');
var assert = require('assert');
var fs = require('fs');
var concat = require('concat-stream');

describe('browserify-optional', function() {
  it('should not transform a file without try..catch requires', function(done) {
    var f = __dirname + '/fixtures/1.js';
    fs.createReadStream(f)
      .pipe(transform(f))
      .pipe(concat(function(data) {
        assert.equal(data, fs.readFileSync(f, 'utf8').trim());
        done();
      }));
  });
  
  it('should transform a missing require in a try..catch', function(done) {
    var f = __dirname + '/fixtures/2.js';
    fs.createReadStream(f)
      .pipe(transform(f))
      .pipe(concat(function(data) {
        assert(/var a = 2, x = function \(\)/.test(data));
        assert(/Cannot find module \\'y\\'/.test(data));
        done();
      }));
  });
  
  it('should not transform requires in try..catch that are not missing', function(done) {
    var f = __dirname + '/fixtures/3.js';
    fs.createReadStream(f)
      .pipe(transform(f))
      .pipe(concat(function(data) {
        assert.equal(data.replace(/\s+/g, ''), fs.readFileSync(f, 'utf8').replace(/\s+/g, ''));
        done();
      }));
  });
});
