[![Build Status](https://travis-ci.com/cssjanus/cssjanus.svg?branch=main)](https://travis-ci.com/cssjanus/cssjanus) [![Coverage Status](https://coveralls.io/repos/github/cssjanus/cssjanus/badge.svg?branch=main)](https://coveralls.io/github/cssjanus/cssjanus?branch=main) [![npm](https://img.shields.io/npm/v/cssjanus.svg?style=flat)](https://www.npmjs.com/package/cssjanus) [![Tested with QUnit](https://img.shields.io/badge/tested_with-qunit-9c3493.svg)](https://qunitjs.com/)

# CSSJanus

Convert CSS stylesheets between left-to-right and right-to-left.

Based the original [Google project](https://code.google.com/p/cssjanus/).

See **[Interactive demo](https://cssjanus.github.io)**.

## Install

```sh
npm install cssjanus
```

## Usage

```javascript
var cssjanus = require( 'cssjanus' );
var rtlCss = cssjanus.transform( ltrCss );
```

```
transform( string css [, Object options ] ) : string
```

Parameters:

* `css` Stylesheet to transform
* `options`: Options object (optional)
 * `options.transformDirInUrl` (Boolean): Transform directions in URLs, such as `ltr` to `rtl`. Default: `false`.
 * `options.transformEdgeInUrl` (Boolean): Transform edges in URLs, such as `left` to `right`. Default: `false`.

### Preventing flipping

If a rule is not meant to be flipped by CSSJanus, use a `/* @noflip */` comment to protect the rule.

```css
.rule1 {
  /* Will be converted to margin-right */
  margin-left: 1em;
}
/* @noflip */
.rule2 {
  /* Will be preserved as margin-left */
  margin-left: 1em;
}
```

## Integrations

* **[css](https://www.npmjs.com/package/css)** parser: [rtl-converter](https://github.com/HosseinAlipour/rtl-converter).
* **Grunt**: [grunt-cssjanus](https://github.com/cssjanus/grunt-cssjanus).
* **Gulp**: [gulp-cssjanus](https://github.com/tomyam1/gulp-cssjanus).
* **PostCSS**: [postcss-cssjanus](https://www.npmjs.com/package/postcss-janus).
* **styled-components**: [styled-components-rtl](https://www.npmjs.com/package/styled-components-rtl).
* **Stylis**: [stylis-plugin-rtl](https://www.npmjs.com/package/stylis-plugin-rtl).
* **webpack**: [cssjanus-webpack](https://www.npmjs.com/package/@mooeypoo/cssjanus-webpack), [webpack-arabic-css](https://www.npmjs.com/package/webpackarabiccssplugin).

## Who uses CSSJanus?

* **[Wikimedia Foundation](https://www.wikimedia.org/)**, the non-profit behind Wikipedia and other free knowledge projects. Used as part of [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki) and [VisualEditor](https://github.com/wikimedia/VisualEditor/#readme) on [Wikipedia](https://ar.wikipedia.org/), and [more](https://doc.wikimedia.org/).
* **[WordPress](https://wordpress.org/)**, a free and open-source content management system. Used for the interface of wp-admin and the default yearly themes.
* **[styled-components](https://styled-components.com/)**, an ecosystem of visual primitives. Its RTL support is powered by CSSJanus.
* **[AdminLTE](https://adminlte.io/)**, an open-source admin dashboard and control panel theme. See
[AdminLTE-RTL](https://github.com/mmdsharifi/AdminLTE-RTL).

## See also

* [Interactive demo](https://cssjanus.github.io)
