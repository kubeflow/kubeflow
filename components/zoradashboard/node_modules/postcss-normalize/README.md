# PostCSS Normalize [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Normalize] lets you use the parts of [normalize.css] or [sanitize.css]
that you need from your [browserslist].

```css
@import "normalize.css";
```

```css
@import "sanitize.css";
```

**PostCSS Normalize** uses a non-opinionated version of [normalize.css], but
an opinionated version may also be used.

```css
@import "normalize.css/opinionated.css";
```

### Examples

Here is a sample of what **normalize.css** looks like when the **browserslist**
is `ie >= 9`:

```css
/**
 * Add the correct display in IE 9-.
 */

audio,
video {
  display: inline-block;
}

/**
 * Remove the border on images inside links in IE 10-.
 */

img {
  border-style: none;
}
```

And here is the same sample when the **browserslist** is `ie >= 10`:

```css
/**
 * Remove the border on images inside links in IE 10-.
 */

img {
  border-style: none;
}
```

## Usage

Add [PostCSS Normalize] to your project:

```bash
npm install postcss-normalize --save-dev
```

Add a [browserslist] entry in `package.json`:

```json
{
  "browserslist": "last 2 versions"
}
```

Use **PostCSS Normalize** to process your CSS:

```js
const postcssNormalize = require('postcss-normalize')

postcssNormalize.process(YOUR_CSS /*, processOptions, pluginOptions */)
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss')
const postcssNormalize = require('postcss-normalize')

postcss([
  postcssNormalize(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */)
```

**PostCSS Normalize** runs in all Node environments, with special instructions
for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## PostCSS Import Usage

**PostCSS Normalize** includes a `postcssImport` function to configure
[PostCSS Import] and allow you to continue using the `@import` syntax.

```js
const postcss = require('postcss')
const postcssImport = require('postcss-import')
const postcssNormalize = require('postcss-normalize')

postcss([
  postcssImport(
    postcssNormalize(
      /* pluginOptions (for PostCSS Normalize) */
    ).postcssImport(
      /* pluginOptions (for PostCSS Import) */
    )
  )
]) // now you can use @import "normalize.css", etc. again
```

Alternatively, use `@import-normalize` or `@import-sanitize` to avoid conflicts
with `@import` transforms.

```pcss
@import-normalize;
```

```pcss
@import-normalize "opinionated.css";
```

```pcss
@import-sanitize;
```

## Options

### allowDuplicates

The `allowDuplicates` option determines whether multiple, duplicate insertions
of CSS libraries are allowed. By default, duplicate libraries are omitted.

```js
postcssNormalize({ allowDuplicates: true })
```

### forceImport

The `forceImport` option defines CSS libraries that will be inserted at the
beginning of the CSS file. Unless overriden by `allowDuplicates`, duplicate
CSS libraries would still be omitted.

```js
postcssNormalize({ forceImport: true })
```

Specific CSS libraries may be defined.

```js
postcssNormalize({
  forceImport: 'sanitize.css'
})
```

### browsers

The `browsers` option defines an override of the project’s **browserslist** for
**PostCSS Normalize**. This option should be avoided in leui of a browserslist
file.

```js
postcssNormalize({ browsers: 'last 2 versions' })
```

## CSS Libraries

**PostCSS Normalize** can include [normalize.css] or [sanitize.css] and
configure either with the following combinations:

```css
@import "normalize"; /* also, @import "normalize.css" */
@import "normalize/opinionated"; /* also, @import "normalize.css/opinionated.css", @import "normalize.css/*" */
@import "sanitize"; /* also, @import "sanitize.css" */
@import "sanitize/forms"; /* also, @import "sanitize.css/forms.css" */
@import "sanitize/typography"; /* also, @import "sanitize.css/typography.css" */
@import "sanitize/page"; /* also, @import "sanitize.css/page.css" */
@import "sanitize/*"; /* also, @import "sanitize.css/*" (sanitize + all additions) */
```

[cli-img]: https://img.shields.io/travis/csstools/postcss-normalize/master.svg
[cli-url]: https://travis-ci.org/csstools/postcss-normalize
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-normalize.svg
[npm-url]: https://www.npmjs.com/package/postcss-normalize

[browserslist]: http://browserl.ist/
[CSS Libraries]: #css-libraries
[normalize.css]: https://github.com/csstools/normalize.css
[Options]: #options
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Import]: https://github.com/postcss/postcss-import
[PostCSS Import Usage]: #postcss-import-usage
[PostCSS Normalize]: https://github.com/csstools/postcss-normalize
[sanitize.css]: https://github.com/csstools/sanitize.css
