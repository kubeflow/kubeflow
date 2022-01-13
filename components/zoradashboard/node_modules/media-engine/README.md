# media-engine
> Media queries engine written in pure JS!

[![npm](https://img.shields.io/npm/v/media-engine.svg)](https://npm.im/media-engine)
[![Travis](https://img.shields.io/travis/diegomura/media-engine.svg)](https://travis-ci.org/diegomura/media-engine)
[![license](https://img.shields.io/npm/l/media-engine.svg)](./LICENSE)

## Install
```sh
npm install media-engine --save
# or
yarn add media-engine
```

## API
`min-height`
```js
matchMedia(
  {
    '@media min-height: 700': {
      color: 'green',
    },
  },
  { height: 800 }
);
// { color: 'green' }

matchMedia(
  {
    '@media min-height: 700': {
      color: 'green',
    },
  },
  { height: 100 }
);
// { }
```

`max-height`
```js
matchMedia(
  {
    '@media max-height: 700': {
      color: 'green',
    },
  },
  { height: 100 }
);
// { color: 'green' }

matchMedia(
  {
    '@media max-height: 700': {
      color: 'green',
    },
  },
  { height: 800 }
);
// { }
```

`min-width`
```js
matchMedia(
  {
    '@media min-width: 700': {
      color: 'green',
    },
  },
  { width: 800 }
);
// { color: 'green' }

matchMedia(
  {
    '@media min-width: 700': {
      color: 'green',
    },
  },
  { width: 100 }
);
// { }
```

`max-width`
```js
matchMedia(
  {
    '@media max-width: 700': {
      color: 'green',
    },
  },
  { width: 100 }
);
// { color: 'green' }

matchMedia(
  {
    '@media max-width: 700': {
      color: 'green',
    },
  },
  { width: 800 }
);
// { }
```

`orientation`
```js
matchMedia(
  {
    '@media orientation: landscape': {
      color: 'green',
    },
  },
  { orientation: 'landscape' }
);
// { color: 'green' }

matchMedia(
  {
    '@media orientation: landscape': {
      color: 'green',
    },
  },
  { orientation: 'portrait' }
);
// { }
```

`and operator`
```js
matchMedia(
  {
    '@media (min-width: 700) and (orientation: landscape)': {
      color: 'green',
    },
  },
  { width: 800, orientation: 'landscape' }
);
// { color: 'green' }
```

`or operator`
```js
matchMedia(
  {
    '@media (min-width: 700), (orientation: landscape)': {
      color: 'green',
    },
  },
  { orientation: 'landscape' }
);
// { color: 'green' }
```

`multiple queries`
```js
matchMedia(
  {
    '@media orientation: landscape': {
      color: 'green',
    },
    '@media min-width: 700': {
      background: 'red',
    }
  },
  { orientation: 'landscape', width: 800 }
);
// { color: 'green', background: 'red' }
```

## License
MIT © [Diego Muracciole](http://github.com/diegomura)
