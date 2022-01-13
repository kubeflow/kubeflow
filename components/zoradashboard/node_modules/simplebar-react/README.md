<p align="center">
  <img src="https://user-images.githubusercontent.com/527559/66231995-3cd0c380-e6be-11e9-8782-c50c834aac93.png" width="570" alt="SimpleBar" />
</p>
<br/>
<p align="center" style="margin: 40px;">
  <a href="https://npmjs.org/package/simplebar-react"><img alt="NPM version" src="https://img.shields.io/npm/v/simplebar-react.svg?style=flat-square" /></a>
  <a href="https://npmjs.org/package/simplebar-react"><img alt="NPM downloads" src="https://img.shields.io/npm/dm/simplebar-react.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/grsmto/simplebar"><img alt="Build Status" src="https://img.shields.io/travis/grsmto/simplebar/master.svg?style=flat-square" /></a>
  <a href="https://automate.browserstack.com/public-build/amtTU2pEa1FjNmpabTBCbUh2b3FpbFZQaXhNd1Q3bEg0L1dlSzd2SGN2Zz0tLWpjK1ZwWWRNWnVGQWI4OXphWGRISEE9PQ==--39b14340be576db5bd01b020627cd17414003bfb%"><img src='https://automate.browserstack.com/badge.svg?badge_key=amtTU2pEa1FjNmpabTBCbUh2b3FpbFZQaXhNd1Q3bEg0L1dlSzd2SGN2Zz0tLWpjK1ZwWWRNWnVGQWI4OXphWGRISEE9PQ==--39b14340be576db5bd01b020627cd17414003bfb%'/></a>
</p>
<br/>

# SimplebarReact

### Installation

**- Via npm**
`npm install simplebar-react --save`

**- Via Yarn**
`yarn add simplebar-react`

If you are using Gatsby, please see [#345](https://github.com/Grsmto/simplebar/issues/345).

### Usage

Check out the [Demo project](https://github.com/Grsmto/simplebar/blob/master/examples/react/src/App.js) or our live [Codesandbox example](https://codesandbox.io/s/simplebar-react-gwgyw).

If you are using a module loader (like Webpack) you first need to load SimpleBar:

```js
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const App = () => (
  <SimpleBar style={{ maxHeight: 300 }}>
    // your content
  </SimpleBar>
);
```

**Don't forget to import both css and js in your project!**

### :warning: Warning!

SimpleBar is **not intended to be used on the `body` element!** I don't recommend wrapping your entire web page inside a custom scroll as it will often badly affect the user experience (slower scroll performance compared to the native body scroll, no native scroll behaviours like click on track, etc.). Do it at your own risk! SimpleBar is meant to improve the experience of **internal web page scrolling**; such as a chat box or a small scrolling area. **Please read the [caveats](#5-caveats) section first to be aware of the limitations!**

### Troubleshooting

If you are experiencing issues when setting up SimpleBar, it is most likely because your styles are clashing with SimpleBar ones. Make sure the element you are setting SimpleBar on does not override any SimpleBar css properties! **We recommend to not style that element at all and use an inner element instead.**

### Sponsors

Thanks to BrowserStack for sponsoring open source projects and letting us test SimpleBar for free.
<a href="https://www.browserstack.com" target="_blank">
<img src="https://user-images.githubusercontent.com/15015324/45184727-368fbf80-b1fe-11e8-8827-08dbc80b0fb1.png" width="200">
</a>

1. [Documentation](#1-documentation)

## 1. Documentation

### Passing options

Find the list of available options on [the core documentation](https://github.com/Grsmto/simplebar/blob/master/packages/simplebar/README.md#options).

```js
<SimpleBar forceVisible="y" autoHide={false}>
  // your content
</SimpleBar>
```

### Extra options

#### scrollableNodeProps

You can pass props to the underlying scrollable `div` element. This is useful for example to get a `ref` of it, if you want to access the `scroll` event or apply imperative directive (like scrolling SimpleBar to the bottom, etc.).

```js
const scrollableNodeRef = React.createRef();

<SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }}>
  // your content
</SimpleBar>
```

### Accessing SimpleBar instance

You can pass a ref to the SimpleBar element: 

```js
const ref = useRef();

useEffect(() => {
  ref.current.recalculate();
  console.log(ref.current.el); // <- the root element you applied SimpleBar on
})

<SimpleBar ref={ref}>
  // your content
</SimpleBar>
```

### Accessing refs

For advanced usage, you can access refs of the scrollable and content nodes by using a render prop pattern:

```js
<SimpleBar>
  {({ scrollableNodeRef, contentNodeRef }) => {
    // Now you have access to scrollable and content nodes
    return <div></div>;
  }}
</SimpleBar>
```
