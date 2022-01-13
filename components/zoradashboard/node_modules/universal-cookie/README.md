<h3 align="center">
  universal-cookie
</h3>

<p align="center">
  Universal cookies for JavaScript<br />
  <a href="https://badge.fury.io/js/universal-cookie"><img src="https://badge.fury.io/js/universal-cookie.svg" /></a>
</p>

[![Build Status](https://travis-ci.org/reactivestack/cookies.svg?branch=master)](https://travis-ci.org/reactivestack/cookies)
<br />
[![Sauce Test Status](https://saucelabs.com/browser-matrix/coookies.svg)](https://saucelabs.com/u/coookies)

## Integrations
 - [`react-cookie`](https://www.npmjs.com/package/react-cookie) - Universal cookies for React
 - [`universal-cookie-express`](https://www.npmjs.com/package/universal-cookie-express) - Hook cookies get/set on Express for server-rendering

## Getting started

`npm install universal-cookie`

 or in the browser (global variable `UniversalCookie`):

```html
<script crossorigin src="https://unpkg.com/universal-cookie@3/umd/universalCookie.min.js"></script>
```

## API - Cookies class

### `constructor([cookieHeader])`
Create a cookies context
 - cookieHeader (string|object): specify the cookie header or object

### `get(name, [options])`
Get a cookie value
 - name (string): cookie name
 - options (object):
   - doNotParse (boolean): do not convert the cookie into an object no matter what

### `getAll([options])`
Get all cookies
 - options (object):
   - doNotParse (boolean): do not convert the cookie into an object no matter what

### `set(name, value, [options])`
Set a cookie value
- name (string): cookie name
- value (string|object): save the value and stringify the object if needed
- options (object): Support all the cookie options from RFC 6265
  - path (string): cookie path, use `/` as the path if you want your cookie to be accessible on all pages
  - expires (Date): absolute expiration date for the cookie
  - maxAge (number): relative max age of the cookie from when the client receives it in seconds
  - domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
  - secure (boolean): Is only accessible through HTTPS?
  - httpOnly (boolean): Is only the server can access the cookie?
  - sameSite (boolean|none|lax|strict): Strict or Lax enforcement

### `remove(name, [options])`
Remove a cookie
- name (string): cookie name
- options (object): Support all the cookie options from RFC 6265
  - path (string): cookie path, use `/` as the path if you want your cookie to be accessible on all pages
  - expires (Date): absolute expiration date for the cookie
  - maxAge (number): relative max age of the cookie from when the client receives it in seconds
  - domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
  - secure (boolean): Is only accessible through HTTPS?
  - httpOnly (boolean): Is only the server can access the cookie?
  - sameSite (boolean|none|lax|strict): Strict or Lax enforcement

### `addChangeListener(callback)`
Add a listener to when a cookie is set or removed.
 - callback (function): Call that will be called with the first argument containing `name`, `value` and `options` of the changed cookie.

### `removeChangeListener(callback)`
Remove a listener from the change callback.

## Browser Example

```js
import Cookies from 'universal-cookie';

const cookies = new Cookies();

cookies.set('myCat', 'Pacman', { path: '/' });
console.log(cookies.get('myCat')); // Pacman
```

## Server Example

```js
import Cookies from 'universal-cookie';

const cookies = new Cookies(req.headers.cookie);

console.log(cookies.get('myCat')); // Pacman or undefined if not set yet
```
