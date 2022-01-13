# sanitize.css [<img src="https://csstools.github.io/sanitize.css/logo.svg" alt="sanitize" width="90" height="90" align="right">][sanitize.css]

[sanitize.css] is a CSS library that provides consistent, cross-browser
default styling of HTML elements alongside useful defaults.

It is developed alongside [normalize.css], which means every normalization
is included, and every normalization and opinion are clearly marked and
documented.

## Usage

```html
<link href="https://unpkg.com/sanitize.css" rel="stylesheet" />
```

### Forms

A separate stylesheet that normalizes form controls without side effects.

```html
<link href="https://unpkg.com/sanitize.css/forms.css" rel="stylesheet" />
```

A separate stylesheet that sizes form controls without affecting native styles.

```html
<link href="https://unpkg.com/sanitize.css/formsize.css" rel="stylesheet" />
```

### Typography

A separate stylesheet that normalizes typography using system interface fonts.

```html
<link href="https://unpkg.com/sanitize.css/typography.css" rel="stylesheet" />
```

### Measure

A separate stylesheet that applies a comfortable measure to the page.

```html
<link href="https://unpkg.com/sanitize.css/measure.css" rel="stylesheet" />
```

### Install

```sh
npm install --save sanitize.css
```

#### Webpack Usage

Import [sanitize.css] in CSS:

```css
@import 'sanitize.css';
@import 'sanitize.css/typography.css';
@import 'sanitize.css/forms.css';
```

Alternatively, import [sanitize.css] in JS:

```js
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
```

In `webpack.config.js`, be sure to use the appropriate loaders:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

## What does it do?

* Normalizes styles for a wide range of elements.
* Corrects bugs and common browser inconsistencies.
* Provides common, useful defaults.
* Explains what code does using detailed comments.

## Features

##### Box sizing defaults to border-box

```css
*, ::before, ::after {
  box-sizing: border-box;
}
```

##### Backgrounds do not repeat by default

```css
*, ::before, ::after {
  background-repeat: no-repeat;
}
```

##### Pseudo-elements inherit text decoration and vertical alignment

```css
::before,
::after {
  text-decoration: inherit;
  vertical-align: inherit;
}
```

##### Cursors only change to hint non-obvious interfaces

```css
html {
  cursor: default;
}
```

##### Text has a comfortable line height in all browsers

```css
html {
  line-height: 1.5;
}
```

##### Tabs appear the same on the web as in a typical editor

```css
html {
  tab-size: 4;
}
```

##### Words break to prevent overflow

```css
html {
  word-break: break-all;
}
```

##### Documents do not use a margin for outer padding

```css
body {
  margin: 0;
}
```

##### Navigation lists do not include a marker style

```css
nav ol, nav ul {
  list-style: none;
  padding: 0;
}
```

##### Media elements align to the text center of other content

```css
audio, canvas, iframe, img, svg, video {
  vertical-align: middle;
}
```

##### SVGs fallback to the current text color

```css
svg:not([fill]) {
  fill: currentColor;
}
```

##### Tables do not include additional border spacing

```css
table {
  border-collapse: collapse;
}
```

##### Textareas only resize vertically by default

```css
textarea {
  resize: vertical;
}
```

##### Single taps are dispatched immediately on clickable elements

```css
a, area, button, input, label, select, summary, textarea, [tabindex] {
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}
```

##### ARIA roles include visual cursor hints

```css
[aria-busy="true"] {
  cursor: progress;
}

[aria-controls] {
  cursor: pointer;
}

[aria-disabled="true"], [disabled] {
  cursor: default;
}
```

##### Visually hidden content remains accessible

```css
[aria-hidden="false"][hidden] {
  display: initial;
}

[aria-hidden="false"][hidden]:not(:focus) {
  clip: rect(0, 0, 0, 0);
  position: absolute;
}
```

### Typography

[sanitize.css] includes a separate stylesheet for normalizing typography using
system interface fonts.

### Forms

[sanitize.css] includes a separate stylesheet for normalizing forms using
minimal, standards-like styling.

**Browser**

```html
<link href="https://unpkg.com/sanitize.css/typography.css" rel="stylesheet" />
```

**Download**

See https://csstools.github.io/sanitize.css/latest/typography.css

**CDN**

see https://cdnjs.com/libraries/10up-sanitize.css/typography.css

#### Typography Features

##### The default font is the system ui font

```css
html {
  font-family:
    system-ui,
    /* macOS 10.11-10.12 */ -apple-system,
    /* Windows 6+ */ Segoe UI,
    /* Android 4+ */ Roboto,
    /* Ubuntu 10.10+ */ Ubuntu,
    /* Gnome 3+ */ Cantarell,
    /* KDE Plasma 5+ */ Noto Sans,
    /* fallback */ sans-serif,
    /* macOS emoji */ "Apple Color Emoji",
    /* Windows emoji */ "Segoe UI Emoji",
    /* Windows emoji */ "Segoe UI Symbol",
    /* Linux emoji */ "Noto Color Emoji";
}
```

##### Pre-formatted and code-formatted text uses the monospace system ui font

```css
code, kbd, pre, samp {
  font-family:
    /* macOS 10.10+ */ Menlo,
    /* Windows 6+ */ Consolas,
    /* Android 4+ */ Roboto Mono,
    /* Ubuntu 10.10+ */ Ubuntu Monospace,
    /* KDE Plasma 5+ */ Noto Mono,
    /* KDE Plasma 4+ */ Oxygen Mono,
    /* Linux/OpenOffice fallback */ Liberation Mono,
    /* fallback */ monospace;
}
```

## Differences

[normalize.css] and [sanitize.css] correct browser bugs while carefully testing
and documenting changes. normalize.css styles adhere to css specifications.
sanitize.css styles adhere to common developer expectations and preferences.
[reset.css] unstyles all elements. Both sanitize.css and normalize.css are
maintained in sync.

## Browser support

* Chrome (last 3)
* Edge (last 3)
* Firefox (last 3)
* Firefox ESR
* Opera (last 3)
* Safari (last 3)
* iOS Safari (last 2)
* Internet Explorer 9+

## Contributing

Please read the [contribution guidelines](CONTRIBUTING.md) in order to make the
contribution process easy and effective for everyone involved.

## Acknowledgements

sanitize.css is a project by [Jonathan Neal](https://github.com/jonathantneal),
built upon normalize.css, a project by
[Jonathan Neal](https://github.com/jonathantneal),
co-created with [Nicolas Gallagher](https://github.com/necolas).

[normalize.css]: https://github.com/csstools/normalize.css
[reset.css]: http://meyerweb.com/eric/tools/css/reset/
[sanitize.css]: https://github.com/csstools/sanitize.css
