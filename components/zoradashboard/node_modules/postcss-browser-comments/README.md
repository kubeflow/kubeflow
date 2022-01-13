# PostCSS Browser Comments [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Browser Comments] lets you keep only the CSS you need based on
comments and your [browserslist].

```css
/**
 * Prevent adjustments of font size after orientation changes in IE and iOS.
 */

html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
```

The comment and rule above would be removed with the following browserslist:

```yml
last 2 chrome versions
```

The rule below would be more carefully altered:

```css
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/* with a `last 2 firefox versions` browserslist becomes */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
}
```

---

[PostCSS Browser Comments] can remove rules based upon the comment above them,
or it can remove declarations using numbered comments that reference the rule
above them. In the later case, when all of the numbered comments are removed,
then the entire rule and comment are also removed.

## Usage

Add [PostCSS Browser Comments] to your project:

```bash
npm install postcss-browser-comments --save-dev
```

Use [PostCSS Browser Comments] to process your CSS:

```js
const postcssBrowserComments = require('postcss-browser-comments');

postcssBrowserComments.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssBrowserComments = require('postcss-browser-comments');

postcss([
  postcssBrowserComments(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Browser Comments] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

### browsers

The `browsers` option overrides of the project’s browserslist.

```js
postcssBrowserComments({
  browsers: 'last 2 versions'
});
```

[cli-img]: https://img.shields.io/travis/csstools/postcss-browser-comments.svg
[cli-url]: https://travis-ci.org/csstools/postcss-browser-comments
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-browser-comments.svg
[npm-url]: https://www.npmjs.com/package/postcss-browser-comments

[browserslist]: https://github.com/browserslist/browserslist
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Browser Comments]: https://github.com/csstools/postcss-browser-comments
