# rework [![Build Status](https://travis-ci.org/reworkcss/rework.png)](https://travis-ci.org/reworkcss/rework)

CSS manipulations built on [`css`](https://github.com/reworkcss/css), allowing
you to automate vendor prefixing, create your own properties, inline images,
anything you can imagine!

Please refer to [`css`](https://github.com/reworkcss/css) for AST documentation
and to report parser/stringifier issues.

## Installation

    $ npm install rework

## Usage

```js
var rework = require('rework');
var pluginA = require('pluginA');
var pluginB = require('pluginB');

rework('body { font-size: 12px; }', { source: 'source.css' })
  .use(pluginA)
  .use(pluginB)
  .toString({ sourcemap: true })
```

## API

### rework(code, [options])

Accepts a CSS string and returns a new `Rework` instance. The `options` are
passed directly to `css.parse`.

### Rework#use(fn)

Use the given plugin `fn`. A rework "plugin" is simply a function accepting the
stylesheet root node and the `Rework` instance.

### Rework#toString([options])

Returns the string representation of the manipulated CSS. The `options` are
passed directly to `css.stringify`.

Unlike `css.stringify`, if you pass `sourcemap: true` a string will still be
returned, with the source map inlined. Also use `sourcemapAsObject: true` if
you want the `css.stringify` return value.

## Plugins

Rework has a rich collection of plugins and mixins. Browse all the [Rework
plugins](https://www.npmjs.org/search?q=rework) available on npm.

Plugins of particular note:

- [at2x](https://github.com/reworkcss/rework-plugin-at2x/) – serve high resolution images
- [calc](https://github.com/reworkcss/rework-calc) – resolve simple `calc()` expressions
- [colors](https://github.com/reworkcss/rework-plugin-colors/) – color helpers like `rgba(#fc0, .5)`
- [ease](https://github.com/reworkcss/rework-plugin-ease/) – several additional easing functions
- [extend](https://github.com/reworkcss/rework-inherit/) – `extend: selector` support
- [function](https://github.com/reworkcss/rework-plugin-function/) – user-defined CSS functions
- [import](https://github.com/reworkcss/rework-import) – read and inline CSS via `@import`
- [inline](https://github.com/reworkcss/rework-plugin-inline) – inline assets as data URIs
- [mixin](https://github.com/reworkcss/rework-plugin-mixin/) – custom property logic with mixins
- [npm](https://github.com/reworkcss/rework-npm) - inline CSS via `@import` using node's module resolver
- [references](https://github.com/reworkcss/rework-plugin-references/) – property references like `height: @width`
- [url](https://github.com/reworkcss/rework-plugin-url/) – rewrite `url()`s with a given function
- [variables](https://github.com/reworkcss/rework-vars/) – W3C-style variables

## Built with rework

- [styl](https://github.com/visionmedia/styl)
- [rework-pure-css](https://github.com/ianstormtaylor/rework-pure-css)
- [rework-suit](https://github.com/suitcss/rework-suit)
- [resin](https://github.com/topcoat/resin)
- [Myth](https://github.com/segmentio/myth)

## License

(The MIT License)

Copyright (c) 2012–2013 TJ Holowaychuk <tj@vision-media.ca>

Copyright (c) 2014 Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
