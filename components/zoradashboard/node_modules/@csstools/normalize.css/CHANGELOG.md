# Changes to @csstools/normalize.css

### 10.1.0 (June 3, 2019)

- Fixed: `Edge` comments without `Chrome` are are changed to `Edge 18-`.
- Fixed: `Chrome` comments without `Edge` have `Edge` added.
- Fixed: Nested list `dl` normalizations split.
- Fixed: Logical `margin-block` normalization changed to `margin`.

### 10.0.0 (May 16, 2019)

- Added: Removal of the margin on nested lists in Chrome and Safari.
- Added: opinionated.css, normalize.css with classic opinionated styles.
- Changed: Reverted license to prehistory state, or CC0-1.0 as intended.

> There are now 2 versions of normalize.css. Nicolas Gallagher and I started
> writing normalize.css together. I named and created the normalize.css
> repository with the help of Paul Irish and Ben Alman. I transferred the
> repository to Necolas, who made it into a “household” CSS library. Much
> later I resumed management of normalize.css with Luciano Battagliero. We
> tagged, deprecated, and removed “opinionated” styles — styles developers
> often prefer but which do not fix bugs or “normalize” browser differences.
> Necolas disagreed with this change, and resolved the matter AFAIK by removing
> all of the other contributors, locking discussion threads, wiping my name
> (and his) from all files, and blocking me from being able to follow the
> project.
>
> I may later create a new project with a new name, but for now I intend to
> continue working on the normalize.css project, sometimes under the
> “csstools” tag. I hope one day our differences are resolved and the projects
> will be one again.
>
> For reference within this project:
> normalize.css resolves bugs and common browser inconsistencies.
> opinionated.css does the same while preserving the classic opinionated styles.

---

### 9.0.1 (September 4, 2018)

- Changed: Restored `::-moz-focus-inner` and `:-moz-focusring` normalizations
  confirmed necessary in Firefox 61.
- Changed: Sorted the `::-webkit-inner-spin-button` and
  `::-webkit-outer-spin-button` pseudo-class selectors.
- Updated: Tests.

### 9.0.0 (August 22, 2018)

- Fixed: Cursor style of increment and decrement buttons in Safari, not Chrome.
- Fixed: Text style of placeholders in Chrome, Edge, and Safari.
- Removed: unnecessary form control margin normalizations in Firefox.
- Removed: opinionated fieldset padding in all browsers.
- Removed: `::-moz-focus-inner` and `:-moz-focusring` normalizations fixed in
  Firefox 53 https://bugzilla.mozilla.org/show_bug.cgi?id=140562

---

### 8.0.0 (June 15, 2018)

- Removed: Normalizations for unsupported browsers, such as Android 4-,
  Chrome 57-, Firefox 52-, IE 8-, and Safari 7-.
- Removed: Removal of gaps on link underlines in iOS and Safari.
- Changed: Selector weight on form control normalizations.
- Removed: Removal of search input cancel button in Chrome and Safari.
- Added: Dialog styles for Edge, IE, and Safari.
- Added: Tests for every single feature.
- Updated: Documentation to be more clear and helpful.

---

### 7.0.0 (May 26, 2017)

- Changed: Separated out selector targeted fixes for readability.
- Updated: Browser landscape of abbr[title] fixes.
- Updated: Browser landscape of details fixes.
- Fixed: Browser landscape of displays.
- Removed: Opinionated changes on sub and sup elements.

---

### 6.0.0 (March 26, 2017)

- Removed: All opinionated rules.
- Fixed: Document heading comment.
- Updated: Support for `abbr[title]`.

> At the time of this writing, for anyone who still wants/needs the opinionated
> rules, see [opinionate.css](https://github.com/adamgruber/opinionate.css)_.

---

### 5.0.0 (October 3, 2016)

- Added: Normalized sections not already present from
  https://html.spec.whatwg.org/multipage/.
- Removed: `::placeholder` styles due to a bug in Edge.
- Removed: `optgroup` normalization needed by the previous font reset.
- Changed: Moved unsorted rules into their respective sections.
- Changed: Explicitly defined font resets on form controls.
- Updated: `summary` style in all browsers.
- Updated: Text-size-adjust documentation  for IE on Windows Phone
- Updated: OS X reference to macOS
- Updated: Semver strategy.

---

### 4.2.0 (June 30, 2016)

- Fixed: `line-height` in all browsers.
- Fixed: `optgroup` font inheritance.
- Updated: Project heading.

### 4.1.1 (April 12, 2016)

- Updated: Project heading.

### 4.1.0 (April 11, 2016)

- Added: Normalized placeholders in Chrome, Edge, and Safari.
- Added: Normalized `text-decoration-skip` property in Safari.
- Added: Normalized file select buttons.
- Added: Normalized search input outlines in Safari.
- Removed: Opinionated cursor styles on buttons.
- Changed: Limited Firefox focus normalizations to buttons.
- Changed: Restored `main` to package.json.
- Changed: Restored proper overflow to certain `select` elements.
- Updated: Stylelint configuration.
- Updated: Tests.

### 4.0.0 (March 19, 2016)

- Added: Correct font weight for `b` and `strong` in Chrome, Edge, and Safari.
- Removed: Unnecessary normalization of `line-height` for `input`.
- Removed: Unnecessary normalization of `color` for form controls.
- Removed: Unnecessary `box-sizing` for `input[type="search"]` in Chrome, Edge,
  Firefox, IE, and Safari.
- Removed: Opinionated table resets.
- Removed: Opinionated `pre` overflow.
- Removed: Selector weight from some input selectors.
- Updated: Normalization of `border-style` for `img`.
- Updated: Normalization of `color` inheritance for `legend`.
- Updated: Normalization of `background-color` for `mark`.
- Updated: Normalization of `outline` for `:-moz-focusring` removed by a
  previous Normalization in Firefox.
- Updated: Opinionated style of `outline-width` for `a:active` and `a:hover`.
- Updated: Comments to identify opinionated styles.
- Updated: Comments to specify browser/versions affected by all changes.
- Updated: Comments to use one voice.
- Fixed: inconsistent `overflow` for `hr` in Edge and IE.
- Fixed: inconsistent `box-sizing` for `hr` in Firefox.
- Fixed: inconsistent `text-decoration` and `border-bottom` for `abbr[title]`
  in Chrome, Edge, Firefox IE, Opera, and Safari.
- Fixed: inheritance and scaling of `font-size` for preformatted text.
- Fixed: `legend` text wrapping not present in Edge and IE.

---

### 3.0.3 (March 30, 2015)

- Added: `main` property.
- Removed: Unnecessary vendor prefixes.

### 3.0.2 (October 4, 2014)

- Added: `menu` element to HTML5 display definitions.
- Changed: alter `background-color` of links in IE 10.

### 3.0.1 (March 27, 2014)

- Added: package.json for npm support.

### 3.0.0 (January 28, 2014)

### 3.0.0-rc.1 (January 26, 2014)

- Added: Explicit tests for each normalization.
- Added: Normalizations for `optgroup`.
- Added: Display for `progress` in IE 8/9.
- Removed: `textarea` alignment modification.
- Removed: `a:focus` outline normalization.
- Removed: default table cell padding.
- Fixed: i18n for `q` element.
- Fixed: `pre` text formatting and overflow.
- Fixed: Vertical alignment of `progress`.
- Fixed: `button` overflow in IE 8/9/10.
- Fixed: number input button cursor in Chrome on OS X.
- Fixed: `figure` margin normalization.
- Fixed: `font` and `color` inheritance for forms.

---

### 2.1.3 (August 26, 2013)

- Fixed: component.json.
- Removed: the gray background color from active links in IE 10.

### 2.1.2 (May 11, 2013)

- Changed: Reverted root `color` and `background` normalizations.

### 2.1.1 (April 8, 2013)

- Added: root `color` and `background` normalizations to counter the effects of
- system color schemes.

### 2.1.0 (January 21, 2013)

- Added: Normalization of `text-transform` for `button` and `select`.
- Added: Normalization of `h1` margin when within HTML5 sectioning elements.
- Added: Normalization of `hr` element.
- Added: `main` element to HTML5 display definitions.
- Removed: unnecessary `pre` styles.
- Fixed: cursor style for disabled button `input`.

### 2.0.1 (August 20, 2012)

- Removed: stray IE 6/7 `inline-block` hack from HTML5 display settings.

### 2.0.0 (August 19, 2012)

- Removed: Legacy browser form normalizations.
- Removed: List normalizations.
- Removed: heading normalizations except `h1` font size.
- Removed: Support for IE 6/7, Firefox < 4, and Safari < 5.
- Added: `quotes` normalizations.
- Changed: Form elements automatically inherit `font-family` from ancestor.

---

### 1.0.1 (August 19, 2012)

- Changed: Adjusted `small` font size normalization.

### 1.0.0 (August 14, 2012)

- Added: MIT License.
- Added: Hide `audio` elements without controls in iOS 5.
- Added: Heading margins and font size.
- Removed: scrollbar normalization.
- Removed: excess padding from checkbox and radio inputs in IE 7.
- Changed: Moved font-family normalization from `body` to `html`.
- Added: IE9 correction for SVG overflow.
- Added: Fix for legend not inheriting color in IE 6/7/8/9.

### Prehistory

- Initial version
