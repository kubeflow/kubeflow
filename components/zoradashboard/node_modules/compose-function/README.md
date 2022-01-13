[![Travis](https://img.shields.io/travis/stoeffel/compose-function.svg?style=flat-square)](https://travis-ci.org/stoeffel/compose-function)
[![npm](https://img.shields.io/npm/v/compose-function.svg?style=flat-square)](https://www.npmjs.com/package/compose-function)
[![Dependency Status](https://david-dm.org/stoeffel/compose-function.svg?style=flat-square)](https://david-dm.org/stoeffel/compose-function)
[![Coveralls](https://img.shields.io/coveralls/stoeffel/compose-function.svg?style=flat-square)](https://coveralls.io/github/stoeffel/compose-function)


<h1 align="center">Compose-Function</h1>

<p align="center">
  <a href="#installation">Installation</a> |
  <a href="#usage">Usage</a> |
  <a href="#related">Related</a> |
  <a href="#license">License</a>
  <br><br>
  <img align="center" height="300" src="http://33.media.tumblr.com/006dfad04f93ec5b3680ec7cdae3fafa/tumblr_n8kgl18uU41qcung4o1_1280.gif">
  <br>
  <sub>logo by <a href="http://justinmezzell.tumblr.com/">Justin Mezzell</a></sub>
  <blockquote align="center">Compose a new function from smaller functions `f(g(x))`</blockquote>
</p>

Installation
------------

`npm install compose-function`

Usage
-----

## Basic usage

```js
import compose from 'compose-function';

const composition = compose(sqr, add2); // sqr(add2(x))

composition(2) // => 16

compose(sqr, inc)(2); // => 9
compose(inc, sqr)(2); // => 5
```


## with curry

```js
import compose from 'compose-function';
import { curry, _ } from 'curry-this';


const add = (x, y) => x + y;

// add(6, sqr(add(2, x)))
compose(
  add::curry(6),
  sqr,
  add::curry(2),
);

// map(filter(list, even), sqr)
compose(
  map::curry(_, sqr),
  filter::curry(_, even),
)([1,2,3,4,5,6,7,8]) // => [4, 16, 36, 64]
```

### `::` huh?

If you’re wondering what the `::` thing means, you’d better read this excellent [overview](https://github.com/jussi-kalliokoski/trine/blob/5b735cbfb6b28ae94bac0446d9ecd5ce51fb149b/README.md#why) by [@jussi-kalliokoski](https://github.com/jussi-kalliokoski) or have a look at the [function bind syntax proposal](https://github.com/zenparsing/es-function-bind).
Or checkout the [curry-this docs][ct].


Related
----

* [curry-this][ct]

License
----

MIT © [Christoph Hermann](http://stoeffel.github.io)

[r]: http://ramdajs.com
[ct]: https://github.com/stoeffel/curry-this
