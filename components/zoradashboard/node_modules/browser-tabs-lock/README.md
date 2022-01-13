[![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)](https://supertokens.io)

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/supertokens/auth-node-mysql-ref-jwt/blob/master/LICENSE)
<a href="https://supertokens.io/discord">
        <img src="https://img.shields.io/discord/603466164219281420.svg?logo=discord"
            alt="chat on Discord"></a>
[![Slack](https://img.shields.io/badge/slack-chat-brightgreen?logo=slack)](https://join.slack.com/t/webmobilesecurity/shared_invite/enQtODM4MDM2MTQ1MDYyLTFiNmNhYzRlNGNjODhkNjc5MDRlYTBmZTBiNjFhOTFhYjI1MTc3ZWI2ZjY3Y2M3ZjY1MGJhZmRiNDFjNDNjOTM)
	    

# Browser Tabs Lock

Using this package, you can easily get lock functionality across tabs on all modern browsers.

**This library was originally designed to be used as a part of our project - SuperTokens - the most secure session management solution for web and mobile apps. Support us by checking it out [here](https://supertokens.io).**

We are also offering free, one-to-one implementation support:
- Schedule a short call with us on https://calendly.com/supertokens-rishabh.


## Some things to note about:
- This is not a reentrant lock. So please do not attempt to re-acquire a lock using the same lock instance with the same key without releasing the acquired lock / key first. 
- Theoretically speaking, it is impossible to have foolproof locking built on top of javascript in the browser. One can only make it so that in all practical scenarios, it emulates locking.

## Installation using Node:
```bash
npm i --save browser-tabs-lock
```

### Usage in an async function:
```js
import SuperTokensLock from "browser-tabs-lock";

let superTokensLock = new SuperTokensLock()
async function lockingIsFun() {
	if (await superTokensLock.acquireLock("hello", 5000)) {
		// lock has been acquired... we can do anything we want now.
		// ...
		await superTokensLock.releaseLock("hello");
	} else {
		// failed to acquire lock after trying for 5 seconds. 
	}
}
```

### Usage using callbacks:

```js
import SuperTokensLock from "browser-tabs-lock";

let superTokensLock = new SuperTokensLock()
superTokensLock.acquireLock("hello", 5000).then((success) => {
	if (success) {
		// lock has been acquired... we can do anything we want now.
		// ...
		superTokensLock.releaseLock("hello").then(() => {
			// lock released, continue
		});
	} else {
		// failed to acquire lock after trying for 5 seconds. 
	}
});
```

## Installation using plain JS

As of version 1.2.0 of browser-tabs-lock the package can also be used as in plain javascript script.

### Add the script

```html
<script
	type="text/javascript"
	src="https://cdn.jsdelivr.net/gh/supertokens/browser-tabs-lock@1.2/bundle/bundle.js">
</script>
```

### Creating and using the lock

```js
let lock = new supertokenslock.getNewInstance();
lock.acquireLock("hello")
	.then(success => {
		if (success) {
			// lock has been acquired... we can do anything we want now.
			...
			lock.releaseLock("hello").then(() => {
				// lock released, continue
			});
		} else {
			// failed to acquire lock after trying for 5 seconds. 
		}
});
```


Also note, that if your web app only needs to work on google chrome, you can use the [Web Locks API](https://developer.mozilla.org/en-US/docs/Web/API/Lock) instead. This probably has true locking!

## Migrating from 1.1x to 1.2x

In some cases, version 1.1x did not entirely ensure mutual exclusion. To explain the problem:

Lets say you create two lock instances L1 and L2. L1 acquires a lock with key K1 and is performing some action that takes 20 seconds to finish.

Immediately after L1 acquires a lock, L2 tries to acquire a lock with the same key(K1). Normally L2 would not be able to acquire the lock until L1 releases it (in this case after 20 seconds) or when the tab that uses L1 is closed abruptly. However it is seen that sometimes L2 is able to acquire the lock automatically after 10 seconds (note that L1 has still not released the lock) - thereby breaking mutual exclusion.

This bug has been fixed and released in version 1.2x of browser-tabs-lock. We highly recommend users to upgrade to 1.2x versions.

After upgrading the only change that requires attention to is that ```lock.releaseLock``` is now an asynchronous function and needs to be handled accordingly.

#### Using async/await

Simply change calls to releaseLock from

```js
lock.releaseLock("hello");
```

to

```js
await lock.releaseLock("hello");
```

#### Using callbacks

Simple change calls to releaseLock from

```js
lock.releaseLock("hello");
```

to

```js
lock.releaseLock("hello")
	.then(() => {
		// continue
	});
```

## Test coverage

In an effort to make this package as production ready as possible we use puppeteer to run browser-tabs-lock in a headless browser environment and perform the following action:

- Create 15 tabs in the browser. Each tab tries to acquire a lock with the same key(K1) and then updates a counter in local storage(C1) as well as updates a counter local to that tab(Ct). The local counter(Ct) serves as a way to know how many times that particular tab has updated local storage counter(C1). This process happens recursively for 20 seconds. After 20 seconds we signal all tabs to stop and after all of them have stopped, we calculate the sum of all the local counter values(sum(Ct...Cn)) for each tab and compare that with the value in local storage(C1). If the two values are the same and the value in local storage matches an estimated value then we know that all tabs use locking in a proper manner.

- Create a tab(T1) which acquires a lock with a key(K1). We then create another tab(T2) that tries to acquire a lock with the same key(K1) and after waiting for some time we verify that the second tab(T2) does not acquire the lock. We close both tabs, note however that tab 1(T1) still had not released the lock. We create another tab(T3) that tries to acquire a lock with the same key(K1) and we verify that the tab is able to acquire the lock. This way we can be sure that locks are released when the tab that holds it(in this case T1) is closed abruptly.

- Create a tab that creates two separate instances of the lock object I1 and I2. I1 acquires a lock with a key(K1), immediately after I2 tries to acquire the lock with the same key(K1). We verify that I2 cannot acquire the lock even after some time has passed. I1 then releases the lock and immediately after I2 tries the acquire it, we verify that I2 can now acquire the lock.

- Create a tab that holds 15 separate lock instances. Each instance tries to acquire the lock using the same key(K1), it then updates a counter(C1) in local storage and also updates a local counter value specific to this instance (Ci). After incrementing the counters the instance recursively repeats this process. We wait for 20 seconds after which we signal each instance to stop and wait for all of them to stop. We then get the counter value from storage(C1) and add all local counter values(sum(Ci....Cn)) and compare the 2 values. We verify that the  values are the same and the value in local storage(C1) matches an estimated value. This way we can be sure that in a single tab multiple lock instances using the same key work correctly.

## Support, questions and bugs
For now, we are most reachable via team@supertokens.io and via the GitHub issues feature

## Authors
Created with :heart: by the folks at [SuperTokens](https://supertokens.io). We are a startup passionate about security and solving software challenges in a way that's helpful for everyone! Please feel free to give us feedback at team@supertokens.io, until our website is ready :grinning:
