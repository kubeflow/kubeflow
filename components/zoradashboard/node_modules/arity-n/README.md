arity-n
============
[![Build Status](https://travis-ci.org/stoeffel/arityN.svg)](https://travis-ci.org/stoeffel/arityN) [![npm version](https://badge.fury.io/js/arity-n.svg)](http://badge.fury.io/js/arity-n)
> Wraps a function with a function of a sertain arity.

Installation
------------

`npm install arity-n`

Usage
-----

```js
function fn(a, b, c, d) {
}

var arityN = require('arity-n');
var newFn = arityN(fn, 3);

newFn.length; // => 3

var arity4 = require('arity-n/4');
var newFn = arity4(fn);

newFn.length; // => 4

// Max arity is 5.
var newFn = arityN(fn, 7);

newFn.length; // => 4
```
