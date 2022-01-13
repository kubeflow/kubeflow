sessionStorage & localStorage for NodeJS
===

| **dom-storage**
| [atob](https://git.coolaj86.com/coolaj86/atob.js)
| [btoa](https://git.coolaj86.com/coolaj86/btoa.js)
| [unibabel.js](https://git.coolaj86.com/coolaj86/unibabel.js)
| Sponsored by [ppl](https://ppl.family)


An inefficient, but as W3C-compliant as possible using only pure JavaScript, `DOMStorage` implementation.

Purpose
----

This is meant for the purpose of being able to run unit-tests and such for browser-y modules in node.

Usage
----

```javascript
var Storage = require('dom-storage');

// in-file, doesn't call `String(val)` on values (default)
var localStorage = new Storage('./db.json', { strict: false, ws: '  ' });

// in-memory, does call `String(val)` on values (i.e. `{}` becomes `'[object Object]'`
var sessionStorage = new Storage(null, { strict: true });

var myValue = { foo: 'bar', baz: 'quux' };

localStorage.setItem('myKey', myValue);
myValue = localStorage.getItem('myKey');

// use JSON to stringify / parse when using strict w3c compliance
sessionStorage.setItem('myKey', JSON.stringify(myValue));
myValue = JSON.parse(localStorage.getItem('myKey'));
```

API
---

  * getItem(key)
  * setItem(key, value)
  * removeItem(key)
  * clear()
  * key(n)
  * length

### Options

  * strict - whether to stringify strictly as text `[Object object]` or as json `{ foo: bar }`.
  * ws - the whitespace to use saving json to disk. Defaults to `'  '`.

Tests
---

```javascript
0 === localStorage.length;
null === localStorage.getItem('doesn\'t exist');
undefined === localStorage['doesn\'t exist'];

localStorage.setItem('myItem');
'undefined' === localStorage.getItem('myItem');
1 === localStorage.length;

localStorage.setItem('myItem', 0);
'0' === localStorage.getItem('myItem');

localStorage.removeItem('myItem', 0);
0 === localStorage.length;

localStorage.clear();
0 === localStorage.length;
```

Notes
---

  * db is read in synchronously
  * No callback when db is saved
  * Doesn't not emit `Storage` events (not sure how to do)

License
-------

Code copyright 2012-2018 AJ ONeal

Dual-licensed MIT and Apache-2.0

Docs copyright 2012-2018 AJ ONeal

Docs released under Creative Commons.
