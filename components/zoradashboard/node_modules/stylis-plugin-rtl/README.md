# stylis-plugin-rtl

Stylis RTL plugin based on CSSJanus

> NOTE! Use v1 of this plugin for styled-components v5, NOT v2 (v2 is for libraries that have upgraded to stylis v4, which s-c has not yet. At the moment only emotion 11 is updated.)

## Installation

### v1

```shell
yarn add stylis-plugin-rtl@^1
```

### v2

```shell
yarn add stylis-plugin-rtl stylis
```

## Usage with styled-components v5+

```javascript
import styled, { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";

const Box = styled.div`
  padding-left: 10px;
`;

function MakeItRTL() {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      <Box>My padding will be on the right!</Box>
    </StyleSheetManager>
  );
}
```

#### NOTE: Preventing flipping

Because minification removes all comments from your CSS before it passes to `<StyleSheetManager>`, `/* @noflip */` comment won't work. 
You will have to either:
- add an exclamation mark at the beginning of the comment, like this  `/*! @noflip */`, to prevent it from being removed
- disable minification entirely by setting `minify` to `false` in `.babelrc` (see [styled-components documentation](https://styled-components.com/docs/tooling#minification)).

<small>This is a fork of `stylis-rtl` for use with styled-components v5+</small>