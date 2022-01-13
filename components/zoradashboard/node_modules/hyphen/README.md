![Franklin M. Liang's hyphenation algorithm](https://ytiurin.github.io/hyphen/01.png)

# hyphen

[Demo page](https://ytiurin.github.io/hyphen/)

This is a text hyphenation library, based on Franklin M. Liang's [hyphenation algorithm](https://tug.org/docs/liang/ "Frank Liang wrote his Stanford Ph.D. thesis on a hyphenation algorithm that is standard in TeX, and has been adapted to numerous languages."). In core of the algorithm lies a set of hyphenation patterns. They are extracted from hand-hyphenated dictionaries. Patterns for this library were taken from [ctan.org](https://ctan.org/ "The Comprehensive TEX Archive Network (CTAN) is the central place for all kinds of material around TEX.") and ported to Javascript.

```javascript
import { hyphenate } from "hyphen/en";

hyphenate("A certain king had a beautiful garden").then(result => {
  // A cer[-]tain king had a beau[-]ti[-]ful garden
  // [-] is soft hyphen
});
```

## Install

```
npm install hyphen
```

or

```
yarn add hyphen
```

## Usage

```javascript
import {
  hyphenate,
  hyphenateHTML,
  hyphenateHTMLSync,
  hyphenateSync
} from "hyphen/en";

hyphenate("Plain text - hyphenate everything").then(result => {
  // Plain text - hy[-]phen[-]ate every[-]thing
});

hyphenateHTML("<blockquote>HTML tags are NOT hyphenated</blockquote>").then(
  result => {
    // <blockquote>HTML tags are NOT hy[-]phen[-]at[-]ed</blockquote>
  }
);

hyphenateHTMLSync("<blockquote>Sync version of `hyphenateHTML`</blockquote>");
// <blockquote>Sync ver[-]sion of `hy[-]phen[-]ate[-]HTML`</blockquote>

hyphenateSync("Sync version of `hyphenate`");
// Sync ver[-]sion of `hy[-]phen[-]ate`
```

## Options

```javascript
hyphenate("Options", { debug: true, hyphenChar: "%", minWordLength: 5 });
// Op%tions
```

- **debug**

  A `Boolean` indicating, if script should output debug info to console. Default is `false`.

- **hyphenChar**

  A `String` sets a value of the soft hyphen character. Default value is `\u00AD`.

- **minWordLength**

  A `Number` sets the minimum length of the word, intended for hyphenation. Default value is `5`.

## Import available languages

- `hyphen/af` Afrikaans
- `hyphen/as` Assamese
- `hyphen/be` Belarusian
- `hyphen/bg` Bulgarian
- `hyphen/bn` Bengali
- `hyphen/ca` Catalan
- `hyphen/cop` Coptic
- `hyphen/cs` Czech
- `hyphen/cu` Church Slavonic
- `hyphen/cy` Welsh
- `hyphen/da` Danish
- `hyphen/de-1901` German, traditional spelling
- `hyphen/de-1996` German, reformed spelling
- `hyphen/de-CH-1901` German, traditional Swiss spelling
- `hyphen/de` aliases `hyphen/de-1996`
- `hyphen/el-monoton` Modern Greek, monotonic spelling
- `hyphen/el-polyton` Modern Greek, polytonic spelling
- `hyphen/el` aliases `hyphen/el-monoton`
- `hyphen/en-gb` English, British spelling
- `hyphen/en-us` English, American spelling
- `hyphen/en` aliases `hyphen/en-us`
- `hyphen/es` Spanish
- `hyphen/et` Estonian
- `hyphen/ethi` aliases `hyphen/mul-ethi`
- `hyphen/eu` Basque
- `hyphen/fi` Finnish
- `hyphen/fr` French
- `hyphen/fur` Friulan
- `hyphen/ga` Irish
- `hyphen/gl` Galician
- `hyphen/grc` Ancient Greek
- `hyphen/gu` Gujarati
- `hyphen/hi` Hindi
- `hyphen/hr` Croatian
- `hyphen/hsb` Upper Sorbian
- `hyphen/hu` Hungarian
- `hyphen/hy` Armenian
- `hyphen/ia` Interlingua
- `hyphen/id` Bahasa Indonesia, Indonesian
- `hyphen/is` Icelandic
- `hyphen/it` Italian
- `hyphen/ka` Georgian
- `hyphen/kmr` Kurmanji, Northern Kurdish
- `hyphen/kn` Kannada
- `hyphen/la-x-classic` Classical Latin
- `hyphen/la-x-liturgic` Liturgical Latin
- `hyphen/la` Latin
- `hyphen/lt` Lithuanian
- `hyphen/lv` Latvian
- `hyphen/ml` Malayalam
- `hyphen/mn-cyrl-x-lmc` Mongolian, Cyrillic script, alternative patterns
- `hyphen/mn-cyrl` Mongolian, Cyrillic script
- `hyphen/mn` aliases `hyphen/mn-cyrl`
- `hyphen/mr` Marathi
- `hyphen/mul-ethi` Multiple languages using the Ethiopic scripts
- `hyphen/nb` Norwegian Bokmål, bokmål, norsk bokmål
- `hyphen/nl` Dutch
- `hyphen/nn` Norwegian Nynorsk, nynorsk
- `hyphen/no` Norwegian, norsk
- `hyphen/oc` Occitan
- `hyphen/or` Odia, Oriya
- `hyphen/pa` Panjabi, Punjabi
- `hyphen/pi` Pāli
- `hyphen/pl` Polish
- `hyphen/pms` Piedmontese
- `hyphen/pt` Portuguese
- `hyphen/rm` Romansh
- `hyphen/ro` Romanian
- `hyphen/ru` Russian
- `hyphen/sa` Sanskrit
- `hyphen/sh-cyrl` Serbocroatian, Cyrillic script
- `hyphen/sh-latn` Serbocroatian, Latin script
- `hyphen/sh` aliases `hyphen/sh-cyrl`
- `hyphen/sk` Slovak
- `hyphen/sl` Slovenian
- `hyphen/sr-cyrl` Serbian, Cyrillic script
- `hyphen/sr` aliases `hyphen/sr-cyrl`
- `hyphen/sv` Swedish
- `hyphen/ta` Tamil
- `hyphen/te` Telugu
- `hyphen/th` Thai
- `hyphen/tk` Turkmen
- `hyphen/tr` Turkish
- `hyphen/uk` Ukrainian
- `hyphen/zh-latn-pinyin` Mandarin Chinese, pinyin transliteration
- `hyphen/zh` aliases `hyphen/zh-latn-pinyin`

## Factory function

```javascript
import createHyphenator from "hyphen";
import patterns from "hyphen/patterns/en-us";

const hyphenate = createHyphenator(patterns, { async: true });
const hyphenateHTML = createHyphenator(patterns, { async: true, html: true });
const hyphenateHTMLSync = createHyphenator(patterns, { html: true });
const hyphenateSync = createHyphenator(patterns);
```

> Note: This original factory function surves mostly for the backwards compatibility reasons.

## Text hyphenation in CSS

The CSS `hyphens` property is intended to add hyphenation support to modern browsers without Javascript:

```css
p {
  hyphens: auto;
}
```

It is part of the [CSS Text Level 3](https://drafts.csswg.org/css-text-3/#hyphens-property) specification. The browser compatibility list can be found on the [related MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens).

## Alternatives

Check other great hyphenation libraries:

- [Hyphenator.js](http://mnater.github.io/Hyphenator/) does client-side hyphenation of HTML-Documents.
- [Hypher](https://github.com/bramstein/hypher) A fast and small hyphenation engine.
