# es-cookie
[![NPM version](https://img.shields.io/npm/v/es-cookie.svg)](https://www.npmjs.org/package/es-cookie)

A simple, lightweight module for handling cookies

* Includes TypeScript definitions
* Works with Webpack, Rollup, and Browserify module bundlers
* Fully compliant with [RFC 6265](https://tools.ietf.org/html/rfc6265)
* No dependencies
* Originally based on js-cookie, but rewritten as a TypeScript module with a lean, type-safe API

## Installation

`npm install es-cookie --save`

## Usage

Import entire module:

```javascript
import * as Cookies from 'es-cookie';

Cookies.set('name', 'value');
Cookies.get('name'); // => 'value'
```

Alternatively, just import the functions you need:

```javascript
import {set as setCookie, get as getCookie} from 'es-cookie';

setCookie('name', 'value');
getCookie('name'); // => 'value'
```

Create a cookie that expires 7 days from now, valid across the entire site:

```javascript
Cookies.set('name', 'value', { expires: 7 });
```

## Functions

### set

Creates a new cookie. The first parameter is for the name, and the second
for the value. The third parameter is optional and allows you to modify
attributes for the new cookie (see the [Attributes section](#attributes) below).

```javascript
// Create an expiring cookie, valid to the path of the current page:
Cookies.set('name', 'value', { expires: 7, path: '' });
```

### get

Returns a single cookie with the specified name, or `undefined` if the cookie doesn't exist.

```javascript
Cookies.get('name'); // => 'value'
Cookies.get('nothing'); // => undefined
```

### getAll

Returns an object containing all visible cookies.

```javascript
Cookies.getAll(); // => { name: 'value' }
```

### remove

Deletes a single cookie by name.

```javascript
Cookies.remove('name');
```

*IMPORTANT! When removing a cookie, you must pass the exact same path and
domain attributes that were used to set the cookie, unless you're using
the default attributes.*

```javascript
Cookies.set('name', 'value', { path: '' });
Cookies.remove('name'); // fail!
Cookies.remove('name', { path: '' }); // removed!
```

*Note: Removing a nonexistant cookie does not raise an exception or return a value.*

### parse

Parses a cookie string (e.g. `document.cookie`) and returns the names/values as an object.

```javascript
Cookies.parse('c=v; name=value'); // => {c: 'v', name: 'value'}
```

### encode

Takes a name, value, and attributes object and returns an encoded string
which can be used to create a new cookie.

```javascript
Cookies.encode('c', 'v', {secure: true}); // => 'c=v; Secure'
```

## Attributes

### expires

Define when the cookie will be removed. Value can be a number which
will be interpreted as days from time of creation or a `Date` instance.
If omitted, the cookie becomes a session cookie.

To create a cookie that expires in less than a day, use a `Date` object.

**Default:** Cookie is removed when the user closes the browser.

**Examples:**

```javascript
Cookies.set('name', 'value', { expires: 365 });
Cookies.get('name'); // => 'value'
Cookies.remove('name');

let twoHoursFromNow = new Date();
twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2);
Cookies.set('name', 'value', { expires: twoHoursFromNow });
```

### path

A string indicating the path where the cookie is visible.

**Default:** `/`

**Examples:**

```javascript
Cookies.set('name', 'value', { path: '' });
Cookies.get('name'); // => 'value'
Cookies.remove('name', { path: '' });
```

### domain

A string indicating a valid domain where the cookie should be visible.
The cookie will also be visible to all subdomains.

**Default:** Cookie is visible only to the domain or subdomain of the page where the cookie was created.

**Examples:**

Assuming a cookie that is being created on `site.com`:

```javascript
Cookies.set('name', 'value', { domain: 'subdomain.site.com' });
Cookies.get('name'); // => undefined (need to read at 'subdomain.site.com')
```

### secure

Either `true` or `false`, indicating if the cookie transmission requires a secure protocol (https).

**Default:** No secure protocol requirement.

**Examples:**

```javascript
Cookies.set('name', 'value', { secure: true });
Cookies.get('name'); // => 'value'
Cookies.remove('name');
```

### sameSite

A string with a value of either `strict`, `lax`, or `none`. When enabled,
supporting browsers will only send the cookie if the request originates
from the same website the cookie is from. This provides some protection
against cross-site request forgery attacks (CSRF).

The strict mode witholds the cookie from any kind of cross-site usage
(including inbound links from external sites). The lax mode witholds the
cookie on cross-domain subrequests (e.g. images or frames), but sends it
whenever a user navigates safely from an external site (e.g. by following
a link).

**Default:** No same-site requirement is set - the browser default will be used.

**Examples:**

```javascript
Cookies.set('name', 'value', { sameSite: 'strict' });
Cookies.set('other', 'value', { sameSite: 'lax' });
```

## Encoding

This project is [RFC 6265](http://tools.ietf.org/html/rfc6265#section-4.1.1)
compliant. Special characters that are not allowed in the cookie name or
value are encoded with their UTF-8 Hex equivalent using
[percent-encoding](http://en.wikipedia.org/wiki/Percent-encoding).

The only character allowed in cookie names or values that is still encoded
is the percent (`%`) character. It is escaped in order to interpret
percent input as literal.

## Author

Theodore Brown  
<https://theodorejb.me>

## License

MIT
