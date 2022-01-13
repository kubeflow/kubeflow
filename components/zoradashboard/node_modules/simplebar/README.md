# SimpleBar [![npm package][npm-badge]][npm] ![size-badge]

:warning: SimpleBar v5 is here! There are some **breaking changes!** Make sure to check out [the changelog](https://github.com/Grsmto/simplebar/releases) before updating.

SimpleBar is a plugin that tries to solve a long time problem: how to get custom scrollbars for your web-app while keeping a good user experience?
SimpleBar **does NOT implement a custom scroll behaviour**. It keeps the **native** `overflow: auto` scroll and **only** replace the scrollbar visual appearance.

SimpleBar is meant to be as easy to use as possible and lightweight. If you want something more advanced I recommend [KingSora](https://github.com/KingSora) 's [Overlay Scrollbars](https://kingsora.github.io/OverlayScrollbars/).

### Installation

**- Via npm**
`npm install simplebar --save`

**- Via Yarn**
`yarn add simplebar`

**- Via `<script>` tag**

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/simplebar@latest/dist/simplebar.css"
/>
<script src="https://unpkg.com/simplebar@latest/dist/simplebar.min.js"></script>
<!-- or -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.css"
/>
<script src="https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.min.js"></script>
```

note: you should replace `@latest` to the latest version (ex `@5.3.3`), if you want to lock to a specific version.
You can find the full list of modules available [there](https://unpkg.com/simplebar@latest/dist/).

### Usage

Check out the [React](https://github.com/Grsmto/simplebar/blob/master/examples/react/src/App.js) and [Vue](https://github.com/Grsmto/simplebar/blob/master/examples/vue/src/App.vue) examples.

If you are using Gatsby, please see [#345](https://github.com/Grsmto/simplebar/issues/345).

If you are using a module loader (like Webpack) you first need to load SimpleBar:

```js
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
```

Set `data-simplebar` on the element you want your custom scrollbar. You're done.

```html
<div data-simplebar></div>
```

**Don't forget to import both css and js in your project!**

### Noscript support

To make sure your elements are scrollable when JavaScript is disabled, it's important to include this snippet in your `<head>` to reset scrolling:

```js
<noscript>
  <style>
    /**
    * Reinstate scrolling for non-JS clients
    */
    .simplebar-content-wrapper {
      overflow: auto;
    }
  </style>
</noscript>
```

### :warning: Warning!

SimpleBar is **not intended to be used on the `body` element!** I don't recommend wrapping your entire web page inside a custom scroll as it will often badly affect the user experience (slower scroll performance compared to the native body scroll, no native scroll behaviours like click on track, etc.). Do it at your own risk! SimpleBar is meant to improve the experience of **internal web page scrolling**; such as a chat box or a small scrolling area. **Please read the [caveats](#5-caveats) section first to be aware of the limitations!**

### Troubleshooting

If you are experiencing issues when setting up SimpleBar, it is most likely because your styles are clashing with SimpleBar ones. Make sure the element you are setting SimpleBar on does not override any SimpleBar css properties! **We recommend to not style that element at all and use an inner element instead.**

### Sponsors

Thanks to BrowserStack for sponsoring open source projects and letting us test SimpleBar for free.
<a href="https://www.browserstack.com" target="_blank">
<img src="https://user-images.githubusercontent.com/15015324/45184727-368fbf80-b1fe-11e8-8827-08dbc80b0fb1.png" width="200">
</a>

---

1. [Documentation](#1-documentation)
2. [Browsers support](#2-browsers-support)
3. [Demo](#3-demo)
4. [How it works](#4-how-it-works)
5. [Caveats](#5-caveats)
6. [Changelog](#6-changelog)
7. [Credits](#7-credits)

## 1. Documentation

### Other usages

You can start SimpleBar manually if you need to:

```js
new SimpleBar(document.getElementById('myElement'));
```

or

```js
Array.prototype.forEach.call(
  document.querySelectorAll('.myElements'),
  el => new SimpleBar()
);
```

If you want to use jQuery:

```js
new SimpleBar($('#myElement')[0]);
```

or

```js
$('.myElements').each(element, new SimpleBar());
```

### Styling

The default styling is applied with CSS. There is no "built-in" way to style the scrollbar, you just need to override the default CSS.

Ex, to change the color of the scrollbar:
```css
.simplebar-scrollbar::before {
  background-color: red;
}
```

### Options

Options can be applied to the plugin during initialization:

```js
new SimpleBar(document.getElementById('myElement'), {
  option1: value1,
  option2: value2
});
```

or using data-attributes:

```html
<div data-simplebar data-simplebar-auto-hide="false"></div>
```

Available options are:

#### autoHide

By default SimpleBar automatically hides the scrollbar if the user is not scrolling (it emulates Mac OSX Lion's scrollbar). You can make the scrollbar always visible by setting the `autoHide` option to `false`:

```js
new SimpleBar(document.getElementById('myElement'), { autoHide: false });
```

Default value is `true`.

You can also control the animation via CSS as it's a simple CSS opacity transition.

#### classNames

It is possible to change the default class names that SimpleBar uses. To get your own styles to work refer to `simplebar.css` to get an idea how to setup your css.

- `content` represents the wrapper for the content being scrolled.
- `scrollContent` represents the container containing the elements being scrolled.
- `scrollbar` defines the style of the scrollbar with which the user can interact to scroll the content.
- `track` styles the area surrounding the `scrollbar`.

```js
classNames: {
  // defaults
  content: 'simplebar-content',
  scrollContent: 'simplebar-scroll-content',
  scrollbar: 'simplebar-scrollbar',
  track: 'simplebar-track'
}
```

#### forceVisible

You can force the track to be visible (same behaviour as `overflow: scroll`) using the `forceVisible` option:

```
forceVisible: true|'x'|'y' (default to `false`)
```

By default, SimpleBar behave like `overflow: auto`.

#### direction (RTL support)

You can activate RTL support by passing the `direction` option:

```
direction: 'rtl' (default to `ltr`)
```

You will need both `data-simplebar-direction='rtl'` and a css rule with `direction: rtl`.

#### timeout

Define the delay until the scrollbar hides. Has no effect if `autoHide` is `false`.

Default value is `1000`.

#### clickOnTrack

Controls the click on track behaviour.

Default to `true`.

#### scrollbarMinSize / scrollbarMaxSize

Controls the min and max size of the scrollbar in `px`.

Default for `scrollbarMinSize` is `25`.
Default for `scrollbarMaxSize` is `0` (no max size).

### Apply scroll vertically only

Simply define in css `overflow-x: hidden` on your element.

### Notifying the plugin of content changes

#### Note: you shouldn't need to use these functions as SimpleBar takes care of that automatically. This is for advanced usage only.

If later on you dynamically modify your content, for instance changing its height or width, or adding or removing content, you should recalculate the scrollbars like so:

```js
const simpleBar = new SimpleBar(document.getElementById('myElement'));
simpleBar.recalculate();
```

### Trigger programmatical scrolling

If you want to access to the original scroll element, you can retrieve it via a getter:

```js
const simpleBar = new SimpleBar(document.getElementById('myElement'));
simpleBar.getScrollElement();
```

### Subscribe to `scroll` event

You can subscribe to the `scroll` event, just like you do with native scrolling elements:

```js
const simpleBar = new SimpleBar(document.getElementById('myElement'));
simpleBar.getScrollElement().addEventListener('scroll', function(...));
```

### Add content dynamically

You can retrieve the element containing data like this:

```js
const simpleBar = new SimpleBar(document.getElementById('myElement'));
simpleBar.getContentElement();
```

### Disable Mutation Observer (core package only)

```js
SimpleBar.removeObserver();
```

### Retrieve SimpleBar instance from data-simplebar nodes

```js
SimpleBar.instances.get(document.querySelector('[data-simplebar]']))
```

### Unmount/destroy

```js
const simpleBar = new SimpleBar(document.getElementById('myElement'));

simpleBar.unMount()
```

:warning: **Calling this function will not restore the default scrollbar!**

A common usecase is to only want SimpleBar on desktop/wider screens, but instead of trying to mount/unmount the plugin based on screen size, you should instead simply never mount it in the first place.

For example if you want it only on desktop you can first test for screen size using `matchMedia`:

```js
if (window.matchMedia('(min-width: 600px)').matches) {
  new SimpleBar(..)
}
```

### Non-JS fallback

SimpleBar hides the browser's default scrollbars, which obviously is undesirable if the user has JavaScript disabled. To restore the browser's scrollbars you can include the following `noscript` element in your document's `head`:

```html
<noscript>
  <style>
    [data-simplebar] {
      overflow: auto;
    }
  </style>
</noscript>
```

## 2. Browsers support

SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.

Notice: IE10 doesn't support `MutationObserver` so you will still need to instantiate SimpleBar manually and call `recalculate()` as needed (or you can just use a polyfill for `MutationObserver`).

If you want to apply SimpleBar on an SVG element on IE11, you will need a [polyfill for `classList`](https://github.com/eligrey/classList.js/blob/master/classList.js).

IE9 is not supported anymore (because we use `translate3d` to position the scrollbar) so please use SimpleBar v1 if you really need it.

## 3. Demo

https://grsmto.github.io/simplebar/

## 4. How it works

SimpleBar only does one thing: replace the browser's default scrollbars with a custom CSS-styled scrollbar without sacrificing performance. Unlike most other plugins, SimpleBar doesn't mimic scroll behaviour with Javascript, which typically causes jank and strange scrolling behaviour. You keep the awesomeness of native scrolling… with a custom scrollbar!
Design your scrollbar how you like, with CSS, across all browsers.

For the most part SimpleBar uses the browser's native scrolling functionality, but replaces the conventional scrollbar with a custom CSS-styled scrollbar. The plugin listens for scroll events and redraws the custom scrollbar accordingly.

Key to this technique is hiding the native browser scrollbar. The scrollable element is made slightly wider/taller than its containing element, effectively hiding the scrollbar from view.

## 5. Caveats

- SimpleBar can't be used on the `<body>`, `<textarea>`, `<table>` or `<select>` elements. `<iframe>` should be working (depends of your usecase). If you are looking to support these, I suggest taking a look at [OverLayScrollbars](https://kingsora.github.io/OverlayScrollbars).
- SimpleBar doesn't currently support `overflow: visible`. Which means any children of your scrolling div will be clipped (like with `overflow: hidden`).

Please take a look at [this comparison table](https://kingsora.github.io/OverlayScrollbars/#!faq) to see what SimpleBar does compare to others.

### Community plugins

**Ruby On Rails**
To include SimpleBar in the Ruby On Rails asset pipeline, use the [simplebar-rails](https://github.com/thutterer/simplebar-rails) gem.

**Ember.js**
To use SimpleBar with the Ember.js framework, use the [ember-simplebars](https://github.com/fpauser/ember-simplebar) addon.

[npm-badge]: https://img.shields.io/npm/v/simplebar.svg?style=flat-square
[npm]: https://www.npmjs.org/package/simplebar
[size-badge]: http://img.badgesize.io/Grsmto/simplebar/master/packages/simplebar/src/simplebar.js?compression=gzip&&style=flat-square
