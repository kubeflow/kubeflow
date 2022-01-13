# @csstools/normalize.css [<img src="https://csstools.github.io/normalize.css/logo.svg" alt="normalize" width="90" height="90" align="right">][@csstools/normalize.css]

[@csstools/normalize.css] is a CSS library that provides consistent,
cross-browser default styling of HTML elements.

## Usage

```html
<link href="https://unpkg.com/@csstools/normalize.css" rel="stylesheet" />
```

### Install

```sh
npm install --save @csstools/normalize.css
```

#### Webpack Usage

Import [@csstools/normalize.css] in CSS:

```css
@import '~@csstools/normalize.css';
```

Alternatively, import [@csstools/normalize.css] in JS:

```js
import '@csstools/normalize.css';
```

In `webpack.config.js`, use the appropriate loaders:

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

**Download**

See https://csstools.github.io/normalize.css/latest/normalize.css

## What does it do?

* Normalizes styles for a wide range of elements.
* Corrects bugs and common browser inconsistencies.
* Explains what code does using detailed comments.

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

## Similar Projects

- [opinionate.css](https://github.com/adamgruber/opinionate.css) - A supplement
to normalize.css with opinionated rules.
- [sanitize.css](https://github.com/csstools/sanitize.css) - An alternative to
normalize.css, adhering to common developer expectations and preferences
- [remedy.css](https://github.com/mozdevs/cssremedy) - An alternative to
normalize.css, adhering to different common developer expectations and
preferences.
- [modern-normalize.css](https://github.com/csstools/sanitize.css) - An
alternative to normalize.css, adhering to a minimal set of normalizations and
common developer expectations and preferences.

## Acknowledgements

normalize.css is a project by [Jonathan Neal](https://github.com/jonathantneal),
co-created with [Nicolas Gallagher](https://github.com/necolas).

[@csstools/normalize.css]: https://github.com/csstools/normalize.css
