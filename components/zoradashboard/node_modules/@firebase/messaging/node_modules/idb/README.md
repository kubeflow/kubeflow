# IndexedDB Promised

This is a tiny library that mirrors IndexedDB, but replaces the weird `IDBRequest` objects with promises, plus a couple of other small changes.

# Installation

If you're using Rollup/Webpack or similar:

```sh
npm install idb
```

Then in your JS:

```js
import { openDb, deleteDb } from 'idb';

await openDb(…);
```

Or include [the script](https://github.com/jakearchibald/idb/blob/master/build/idb.js) as it is, and `idb` will exist on the global scope.

# Changes from 2.x

The library is now a module. To take advantage of this, importing has changed slightly:

```js
// Old 2.x way:
import idb from 'idb';
idb.open(…);
idb.delete(…);

// New way:
import { openDb, deleteDb } from 'idb';
openDb(…);
deleteDb(…);
```

# Examples

## Keyval Store

This is very similar to `localStorage`, but async. If this is *all* you need, you may be interested in [idb-keyval](https://www.npmjs.com/package/idb-keyval), you can always upgrade to this library later.

```js
const dbPromise = openDb('keyval-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('keyval');
});

const idbKeyval = {
  async get(key) {
    const db = await dbPromise;
    return db.transaction('keyval').objectStore('keyval').get(key);
  },
  async set(key, val) {
    const db = await dbPromise;
    const tx = db.transaction('keyval', 'readwrite');
    tx.objectStore('keyval').put(val, key);
    return tx.complete;
  },
  async delete(key) {
    const db = await dbPromise;
    const tx = db.transaction('keyval', 'readwrite');
    tx.objectStore('keyval').delete(key);
    return tx.complete;
  },
  async clear() {
    const db = await dbPromise;
    const tx = db.transaction('keyval', 'readwrite');
    tx.objectStore('keyval').clear();
    return tx.complete;
  },
  async keys() {
    const db = await dbPromise;
    return db.transaction('keyval').objectStore('keyval').getAllKeys(key);
  },
};
```

### Usage

```js
idbKeyval.set('foo', {hello: 'world'});

// logs: {hello: 'world'}
idbKeyval.get('foo').then(val => console.log(val));
```

## Set of objects

Imagine we had a set of objects like…

```json
{
  "id": 123456,
  "data": {"foo": "bar"}
}
```

### Upgrading existing DB

```js
const dbPromise = openDb('keyval-store', 2, upgradeDB => {
  // Note: we don't use 'break' in this switch statement,
  // the fall-through behaviour is what we want.
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('keyval');
    case 1:
      upgradeDB.createObjectStore('objs', {keyPath: 'id'});
  }
});
```

### Adding

```js
dbPromise.then(db => {
  const tx = db.transaction('objs', 'readwrite');
  tx.objectStore('objs').put({
    id: 123456,
    data: {foo: "bar"}
  });
  return tx.complete;
});
```

### Getting all

```js
dbPromise.then(db => {
  return db.transaction('objs')
    .objectStore('objs').getAll();
}).then(allObjs => console.log(allObjs));
```

### Getting by ID

```js
dbPromise.then(db => {
  return db.transaction('objs')
    .objectStore('objs').get(123456);
}).then(obj => console.log(obj));
```

# Limitations

## Transaction lifetime

An IDB transaction will auto-close if it doesn't have anything to do once microtasks have been processed. As a result, this works fine:

```js
dbPromise.then(async db => {
  const tx = db.transaction('keyval', 'readwrite');
  const store = tx.objectStore('keyval');
  const val = await store.get('counter') || 0;
  store.put(val + 1, 'counter');
  return tx.complete;
});
```

But this doesn't:

```js
dbPromise.then(async db => {
  const tx = db.transaction('keyval', 'readwrite');
  const store = tx.objectStore('keyval');
  const val = await store.get('counter') || 0;
  // The transaction will auto-close while the fetch is in-progress
  const newVal = await fetch('/increment?val=' + val)
  store.put(newVal, 'counter');
  return tx.complete;
});
```

## Promise issues in older browsers

Some older browsers don't handle promises properly, which causes issues if you do more than one thing in a transaction:

```js
dbPromise.then(async db => {
  const tx = db.transaction('keyval', 'readwrite');
  const store = tx.objectStore('keyval');
  const val = await store.get('counter') || 0;
  // In some older browsers, the transaction closes here.
  // Meaning this next line fails:
  store.put(val + 1, 'counter');
  return tx.complete;
});
```

All modern browsers have fixed this. [Test your browser](https://simple-idb-demo.glitch.me/microtask-issue.html).

You can work around this in some versions of Firefox by using a promise polyfill that correctly uses microtasks, such as [es6-promise](https://github.com/jakearchibald/es6-promise).

# API

## `idb`

This is your entry point to the API. It's exposed to the global scope unless you're using a module system such as browserify, in which case it's the exported object. If you are using native ES modules, the functions are provided as individual exports, so you can `import * as idb from 'idb'` or `import { openDb, deleteDb } from 'idb'`.

### `openDb(name, version, upgradeCallback)`

This method returns a promise that resolves to a `DB`.

`name` and `version` behave as they do in `indexedDB.open`.

`upgradeCallback` is called if `version` is greater than the version last opened. It's similar to IDB's `onupgradeneeded`. The callback receives an instance of `UpgradeDB`.

```js
openDb('keyval-store', 2, upgradeDB => {
  // Note: we don't use 'break' in this switch statement,
  // the fall-through behaviour is what we want.
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('keyval');
    case 1:
      upgradeDB.createObjectStore('stuff', {keyPath: ''});
  }
}).then(db => console.log("DB opened!", db));
```

### `deleteDb(name)`

Behaves like `indexedDB.deleteDatabase`, but returns a promise.

```js
deleteDb('keyval-store').then(() => console.log('done!'));
```

## `DB`

Properties:

* Same as equivalent properties on an instance of `IDBDatabase`:
  * `name`
  * `version`
  * `objectStoreNames`

Methods:

* `close` - as `idbDatabase.close`
* `transaction` - as `idbDatabase.transaction`, but returns a `Transaction`

## `UpgradeDB`

As `DB`, except:

Properties:

* `transaction` - this is a property rather than a method. It's a `Transaction` representing the upgrade transaction
* `oldVersion` - the previous version of the DB seen by the browser, or 0 if it's new

Methods:

* `createObjectStore` - as `idbDatabase.createObjectStore`, but returns an `ObjectStore`
* `deleteObjectStore` - as `idbDatabase.deleteObjectStore`

## `Transaction`

Properties:

* `complete` - a promise. Resolves when transaction completes, rejects if transaction aborts or errors
* Same as equivalent properties on an instance of `IDBTransaction`:
  * `objectStoreNames`
  * `mode`

Methods:

* `abort` - as `idbTransaction.abort`
* `objectStore` - as `idbTransaction.objectStore`, but returns an `ObjectStore`

```js
openDb('keyval-store', 1, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('keyval');
  }
}).then(db => {
  const tx = db.transaction('keyval', 'readwrite');
  tx.objectStore('keyval').put('hello', 'world');
  return tx.complete;
}).then(() => console.log("Done!"));
```

## `ObjectStore`

Properties:

* Same as equivalent properties on an instance of `IDBObjectStore`:
  * `name`
  * `keyPath`
  * `indexNames`
  * `autoIncrement`

Methods:

* Same as equivalent methods on an instance of `IDBObjectStore`, but returns a promise that resolves/rejects based on operation success/failure:
  * `put`
  * `add`
  * `delete`
  * `clear`
  * `get`
  * `getAll`
  * `getAllKeys`
  * `count`
* Same as equivalent methods on an instance of `IDBObjectStore`, but returns a promise that resolves with a `Cursor`:
  * `openCursor`
  * `openKeyCursor`
* `deleteIndex` - as `idbObjectStore.deleteIndex`
* Same as equivalent methods on an instance of `IDBObjectStore`, but returns an `Index`:
  * `createIndex`
  * `index`
* `iterateCursor` - see below
* `iterateKeyCursor` - see below


### `iterateCursor` & `iterateKeyCursor`

Due to the microtask issues in some browsers, iterating over a cursor using promises doesn't always work:

```js
const tx = db.transaction('stuff');
tx.objectStore('stuff').openCursor().then(function cursorIterate(cursor) {
  if (!cursor) return;
  console.log(cursor.value);
  return cursor.continue().then(cursorIterate);
});
tx.complete.then(() => console.log('done'));
```

So in the mean time, `iterateCursor` and `iterateKeyCursor` map to `openCursor` & `openKeyCursor`, take identical arguments, plus an additional callback that receives an `IDBCursor`, so the above example becomes:

```js
const tx = db.transaction('stuff');
tx.objectStore('stuff').iterateCursor(cursor => {
  if (!cursor) return;
  console.log(cursor.value);
  cursor.continue();
});
tx.complete.then(() => console.log('done'));
```

The intent is to remove `iterateCursor` and `iterateKeyCursor` from the library once browsers support promises and microtasks correctly.

## `Index`

Properties:

* Same as equivalent properties on an instance of `IDBIndex`:
  * `name`
  * `keyPath`
  * `multiEntry`
  * `unique`

Methods:

* Same as equivalent methods on an instance of `IDBIndex`, but returns a promise that resolves/rejects based on operation success/failure:
  * `get`
  * `getKey`
  * `getAll`
  * `getAllKeys`
  * `count`
* Same as equivalent methods on an instance of `IDBIndex`, but returns a promise that resolves with a `Cursor`:
  * `openCursor`
  * `openKeyCursor`
* `iterateCursor` - as `objectStore.iterateCursor` but over the index
* `iterateKeyCursor` - as `objectStore.iterateKeyCursor` but over the index

## Cursor

Properties:

* Same as equivalent properties on an instance of `IDBCursor`:
  * `direction`
  * `key`
  * `primaryKey`
  * `value`

Methods:

* Same as equivalent methods on an instance of `IDBCursor`, but returns a promise that resolves/rejects based on operation success/failure:
  * `update`
  * `delete`
* Same as equivalent methods on an instance of `IDBCursor`, but returns a promise that resolves with a `Cursor`:
  * `advance`
  * `continue`
  * `continuePrimaryKey`
