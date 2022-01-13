var arity0 = require('./0'),
  arity1 = require('./1'),
  arity2 = require('./2'),
  arity3 = require('./3'),
  arity4 = require('./4'),
  arity5 = require('./5'),
  arityN = require('./N'),
  spy = require('sinon').spy(),
  expect = require('expect.js');

function createArray(l) {
  var arr = [];
  for (var i = 0; i < l; i++) {
    arr.push(i);
  }
  return arr;
}

function hasArity(wrapped, fn, l) {
  var arr = createArray(l);
  expect(wrapped).to.be.a('function');
  expect(wrapped.length).to.be.eql(l);
  wrapped.call(null, arr);
  expect(fn.calledWith.call(fn, arr)).to.be.ok();
}

describe('arity-function', () => {
  describe('#arity0', () => {
    it('should return a function with length 0', () => {
      var spy0 = arity0(spy);
      hasArity(spy0, spy, 0);
    });
  });

  describe('#arity1', () => {
    it('should return a function with length 1', () => {
      var spy1 = arity1(spy);
      hasArity(spy1, spy, 1);
    });
  });

  describe('#arity2', () => {
    it('should return a function with length 2', () => {
      var spy2 = arity2(spy);
      hasArity(spy2, spy, 2);
    });
  });

  describe('#arity3', () => {
    it('should return a function with length 3', () => {
      var spy3 = arity3(spy);
      hasArity(spy3, spy, 3);
    });
  });

  describe('#arity4', () => {
    it('should return a function with length 4', () => {
      var spy4 = arity4(spy);
      hasArity(spy4, spy, 4);
    });
  });

  describe('#arity5', () => {
    it('should return a function with length 5', () => {
      var spy5 = arity5(spy);
      hasArity(spy5, spy, 5);
    });
  });

  describe('#arityN', () => {
    it('should return a function with length N', () => {
      var spy0 = arityN(spy, 0);
      hasArity(spy0, spy, 0);

      var spy1 = arityN(spy, 1);
      hasArity(spy1, spy, 1);

      var spy2 = arityN(spy, 2);
      hasArity(spy2, spy, 2);

      var spy3 = arityN(spy, 3);
      hasArity(spy3, spy, 3);

      var spy4 = arityN(spy, 4);
      hasArity(spy4, spy, 4);

      var spy5 = arityN(spy, 5);
      hasArity(spy5, spy, 5);

      var spyX = arityN(spy, undefined);
      hasArity(spyX, spy, 0);
      spyX = arityN(spy, null);
      hasArity(spyX, spy, 0);

      var newFn = arityN(function(a,b,c,d,e,f,g,h,i,j,k){ return true; }, 9);
      expect(newFn.length).to.be.eql(11);
      expect(newFn()).to.be.eql(true);
    });
  });
});
