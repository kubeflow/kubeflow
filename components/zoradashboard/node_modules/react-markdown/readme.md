# react-markdown

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Markdown component for React using [**remark**][remark].

[Learn markdown here][learn] and [check out the demo here][demo].

## Install

[npm][]:

```sh
npm install react-markdown
```

## Why this one?

There are other ways for markdown in React out there so why use this one?
The two main reasons are that they often rely on `dangerouslySetInnerHTML` or
have bugs with how they handle markdown.
`react-markdown` uses a syntax tree to build the virtual dom which allows for
updating only the changing DOM instead of completely overwriting.
`react-markdown` is 100% CommonMark (optionally GFM) compliant and has
extensions to support custom syntax.

## Use

A basic hello world:

```jsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'

render(<ReactMarkdown># Hello, *world*!</ReactMarkdown>, document.body)
```

<details>
<summary>Show equivalent JSX</summary>

```jsx
<h1>
  Hello, <em>world</em>!
</h1>
```

</details>

Here is an example using `require`s, passing the markdown as a string, and how
to use a plugin ([`remark-gfm`][gfm], which adds support for strikethrough,
tables, tasklists and URLs directly):

```jsx
const React = require('react')
const ReactMarkdown = require('react-markdown')
const render = require('react-dom').render
const gfm = require('remark-gfm')

const markdown = `Just a link: https://reactjs.com.`

render(<ReactMarkdown plugins={[gfm]} children={markdown} />, document.body)
```

<details>
<summary>Show equivalent JSX</summary>

```jsx
<p>
  Just a link: <a href="https://reactjs.com">https://reactjs.com</a>.
</p>
```

</details>

## API

### `props`

*   `children` (`string`, default: `''`)\
    Markdown to parse
*   `className` (`string?`)\
    Wrap the markdown in a `div` with this class name
*   `allowDangerousHtml` (`boolean`, default: `false`)\
    This project is safe by default and escapes HTML.
    Use `allowDangerousHtml: true` to allow dangerous html instead.
    See [security][]
*   `skipHtml` (`boolean`, default: `false`)\
    Ignore HTML in Markdown
*   `sourcePos` (`boolean`, default: `false`)\
    Pass a prop to all renderers with a serialized position
    (`data-sourcepos="3:1-3:13"`)
*   `rawSourcePos` (`boolean`, default: `false`)\
    Pass a prop to all renderers with their [position][]
    (`sourcePosition: {start: {line: 3, column: 1}, end:…}`)
*   `includeNodeIndex` (`boolean`, default: `false`)\
    Pass [`index`][index] and `parentChildCount` in props to all renderers
*   `allowedTypes` (`Array.<string>`, default: list of all types)\
    Node types to allow (can’t combine w/ `disallowedTypes`).
    All types are available at `ReactMarkdown.types`
*   `disallowedTypes` (`Array.<string>`, default: `[]`)\
    Node types to disallow (can’t combine w/ `allowedTypes`)
*   `allowNode` (`(node, index, parent) => boolean?`, optional)\
    Function called to check if a node is allowed (when truthy) or not.
    `allowedTypes` / `disallowedTypes` is used first!
*   `unwrapDisallowed` (`boolean`, default: `false`)\
    Extract (unwrap) the children of not allowed nodes.
    By default, when `strong` is not allowed, it and it’s content is dropped,
    but with `unwrapDisallowed` the node itself is dropped but the content used
*   `linkTarget` (`string` or `(url, text, title) => string`, optional)\
    Target to use on links (such as `_blank` for `<a target="_blank"…`)
*   `transformLinkUri` (`(uri) => string`, default:
    [`./uri-transformer.js`][uri], optional)\
    URL to use for links.
    The default allows only `http`, `https`, `mailto`, and `tel`, and is
    available at `ReactMarkdown.uriTransformer`.
    Pass `null` to allow all URLs.
    See [security][]
*   `transformImageUri` (`(uri) => string`, default:
    [`./uri-transformer.js`][uri], optional)\
    Same as `transformLinkUri` but for images
*   `renderers` (`Object.<Component>`, default: `{}`)\
    Object mapping node types to React components.
    Merged with the default renderers (available at `ReactMarkdown.renderers`).
    Which props are passed varies based on the node
*   `plugins` (`Array.<Plugin>`, default: `[]`)\
    List of [remark plugins][remark-plugins] to use.
    See the next section for examples on how to pass options

## Examples

### Use a plugin

This example shows how to use a plugin.
In this case, [`remark-gfm`][gfm], which adds support for
strikethrough, tables, tasklists and URLs directly:

```jsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'
import gfm from 'remark-gfm'

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

render(<ReactMarkdown plugins={[gfm]} children={markdown} />, document.body)
```

<details>
<summary>Show equivalent JSX</summary>

```jsx
<>
  <p>
    A paragraph with <em>emphasis</em> and <strong>strong importance</strong>.
  </p>
  <blockquote>
    <p>
      A block quote with <del>strikethrough</del> and a URL:{' '}
      <a href="https://reactjs.org">https://reactjs.org</a>.
    </p>
  </blockquote>
  <ul>
    <li>Lists</li>
    <li>
      <input checked={false} readOnly={true} type="checkbox" /> todo
    </li>
    <li>
      <input checked={true} readOnly={true} type="checkbox" /> done
    </li>
  </ul>
  <p>A table:</p>
  <table>
    <thead>
      <tr>
        <td>a</td>
        <td>b</td>
      </tr>
    </thead>
  </table>
</>
```

</details>

### Use a plugin with options

This example shows how to use a plugin and give it options.
To do that, use an array with the plugin at the first place, and the options
second.
[`remark-gfm`][gfm] has an option to allow only double tildes for strikethrough:

```jsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'
import gfm from 'remark-gfm'

render(
  <ReactMarkdown plugins={[[gfm, {singleTilde: false}]]}>
    This ~is not~ strikethrough, but ~~this is~~!
  </ReactMarkdown>,
  document.body
)
```

<details>
<summary>Show equivalent JSX</summary>

```jsx
<p>
  This ~is not~ strikethrough, but <del>this is</del>!
</p>
```

</details>

### Use custom renderers (syntax highlight)

This example shows how you can overwrite the normal handling of a node by
passing a renderer.
In this case, we apply syntax highlighting with the seriously super amazing
[`react-syntax-highlighter`][react-syntax-highlighter] by
[**@conorhastings**][conor]:

```jsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {render} from 'react-dom'

const renderers = {
  code: ({language, value}) => {
    return <SyntaxHighlighter style={dark} language={language} children={value} />
  }
}

// Did you know you can use tildes instead of backticks for code in markdown? ✨
const markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`

render(<ReactMarkdown renderers={renderers} children={markdown} />, document.body)
```

<details>
<summary>Show equivalent JSX</summary>

```jsx
<>
  <p>Here is some JavaScript code:</p>
  <SyntaxHighlighter language="js" style={dark} children="console.log('It works!')" />
</>
```

</details>

### Use a plugin and custom renderers (math)

This example shows how a syntax extension is used to support math in markdown
that adds new node types ([`remark-math`][math]), which are then handled by
renderers to use [`react-katex`][react-katex]:

```jsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {InlineMath, BlockMath} from 'react-katex'
import {render} from 'react-dom'
import math from 'remark-math'
import 'katex/dist/katex.min.css' // `react-katex` does not import the CSS for you

const renderers = {
  inlineMath: ({value}) => <InlineMath math={value} />,
  math: ({value}) => <BlockMath math={value} />
}

render(
  <ReactMarkdown
    plugins={[math]}
    renderers={renderers}
    children={`The lift coefficient ($C_L$) is a dimensionless coefficient.`}
  />,
  document.body
)
```

<details>
<summary>Show equivalent JSX</summary>

```jsx
<p>
  The lift coefficient (<InlineMath math="C_L" />) is a dimensionless coefficient.
</p>
```

</details>

## Appendix A: HTML in markdown

`react-markdown` typically escapes HTML (or ignores it, with `skipHtml`),
because it is dangerous and defeats the purpose of this library.

However, if you are in a trusted environment (you trust the markdown), you can
`react-markdown/with-html`:

```jsx
const React = require('react')
const ReactMarkdownWithHtml = require('react-markdown/with-html')
const render = require('react-dom').render

const markdown = `
This Markdown contains <a href="https://en.wikipedia.org/wiki/HTML">HTML</a>, and will require the <code>html-parser</code> AST plugin to be loaded, in addition to setting the <code class="prop">allowDangerousHtml</code> property to false.
`

render(<ReactMarkdownWithHtml children={markdown} allowDangerousHtml />, document.body)
```

<details>
<summary>Show equivalent JSX</summary>

```jsx
<p>
  This Markdown contains <a href="https://en.wikipedia.org/wiki/HTML">HTML</a>, and will require
  the <code>html-parser</code> AST plugin to be loaded, in addition to setting the{' '}
  <code className="prop">allowDangerousHtml</code> property to false.
</p>
```

</details>

If you want to specify options for the HTML parsing step, you can instead import
the extension directly:

```jsx
const ReactMarkdown = require('react-markdown')
const htmlParser = require('react-markdown/plugins/html-parser')

// For more info on the processing instructions, see
// <https://github.com/aknuds1/html-to-react#with-custom-processing-instructions>
const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== 'script',
  processingInstructions: [
    /* ... */
  ]
})

<ReactMarkdown astPlugins={[parseHtml]} allowDangerousHtml children={markdown} />
```

## Appendix B: Node types

The node types available by default are:

*   `root` — Whole document
*   `text` — Text (`foo`)
*   `break` — Hard break (`<br>`)
*   `paragraph` — Paragraph (`<p>`)
*   `emphasis` — Emphasis (`<em>`)
*   `strong` — Strong (`<strong>`)
*   `thematicBreak` — Horizontal rule (`<hr>`)
*   `blockquote` — Block quote (`<blockquote>`)
*   `link` — Link (`<a>`)
*   `image` — Image (`<img>`)
*   `linkReference` — Link through a reference (`<a>`)
*   `imageReference` — Image through a reference (`<img>`)
*   `list` — List (`<ul>` or `<ol>`)
*   `listItem` — List item (`<li>`)
*   `definition` — Definition for a reference (not rendered)
*   `heading` — Heading (`<h1>` through `<h6>`)
*   `inlineCode` — Inline code (`<code>`)
*   `code` — Block of code (`<pre><code>`)
*   `html` — HTML node (Best-effort rendering)
*   `virtualHtml` — If `allowDangerousHtml` is not on and `skipHtml` is off, a
    naive HTML parser is used to support basic HTML
*   `parsedHtml` — If `allowDangerousHtml` is on, `skipHtml` is off, and
    `html-parser` is used, more advanced HTML is supported

With [`remark-gfm`][gfm], the following are also available:

*   `delete` — Delete text (`<del>`)
*   `table` — Table (`<table>`)
*   `tableHead` — Table head (`<thead>`)
*   `tableBody` — Table body (`<tbody>`)
*   `tableRow` — Table row (`<tr>`)
*   `tableCell` — Table cell (`<td>` or `<th>`)

## Security

Use of `react-markdown` is secure by default.
Overwriting `transformLinkUri` or `transformImageUri` to something insecure or
turning `allowDangerousHtml` on, will open you up to XSS vectors.
Furthermore, the `plugins` you use and `renderers` you write may be insecure.

## Related

*   [`MDX`](https://github.com/mdx-js/mdx)
    — JSX *in* markdown
*   [`remark-gfm`](https://github.com/remarkjs/remark-gfm)
    — Plugin for GitHub flavored markdown support

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Espen Hovlandsdal][author]

[build-badge]: https://github.com/remarkjs/react-markdown/workflows/main/badge.svg

[build]: https://github.com/remarkjs/react-markdown/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/react-markdown.svg

[coverage]: https://codecov.io/github/remarkjs/react-markdown

[downloads-badge]: https://img.shields.io/npm/dm/react-markdown.svg

[downloads]: https://www.npmjs.com/package/react-markdown

[size-badge]: https://img.shields.io/bundlephobia/minzip/react-markdown.svg

[size]: https://bundlephobia.com/result?p=react-markdown

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://espen.codes/

[remark]: https://github.com/remarkjs/remark

[demo]: https://remarkjs.github.io/react-markdown/

[learn]: https://commonmark.org/help/

[position]: https://github.com/syntax-tree/unist#position

[index]: https://github.com/syntax-tree/unist#index

[gfm]: https://github.com/remarkjs/remark-gfm

[math]: https://github.com/remarkjs/remark-math

[remark-plugins]: https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins

[uri]: https://github.com/remarkjs/react-markdown/blob/v5/src/uri-transformer.js

[security]: #security

[react-katex]: https://github.com/talyssonoc/react-katex

[react-syntax-highlighter]: https://github.com/react-syntax-highlighter/react-syntax-highlighter

[conor]: https://github.com/conorhastings
