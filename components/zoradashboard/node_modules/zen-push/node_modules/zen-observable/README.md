# zen-observable

An implementation of [ES Observables](https://github.com/zenparsing/es-observable).

Requires ES6 Promises or a Promise polyfill.

## Install

```sh
npm install zen-observable
```

## Download

- [zen-observable.js](https://raw.githubusercontent.com/zenparsing/zen-observable/master/zen-observable.js)

## Usage

Node:

```js
var Observable = require("zen-observable");
Observable.of(1, 2, 3).subscribe(x => console.log(x));
```

Browser:

```html
<script src="zen-observable.js"></script>
<script>
    Observable.of(1, 2, 3).subscribe(x => console.log(x));
</script>
```

ES Modules:

```js
import Observable from "zen-observable";
Observable.of(1, 2, 3).subscribe(x => console.log(x));
```

## API

### new Observable ( subscribe )

```js
let observable = new Observable(observer => {
    // Emit a single value after 1 second
    let timer = setTimeout(_=> {
        observer.next("hello");
        observer.complete();
    }, 1000);

    // On unsubscription, cancel the timer
    return _=> clearTimeout(timer);
});
```

Creates a new Observable object using the specified subscriber function.  The subscriber function is called whenever the `subscribe` method of the observable object is invoked.  The subscriber function is passed an *observer* object which has the following methods:

- `next(value)` Sends the next value in the sequence.
- `error(exception)` Terminates the sequence with an exception.
- `complete()` Terminates the sequence successfully.

The subscriber function can optionally return either a cleanup function or a subscription object.  If it returns a cleanup function, that function will be called when the subscription has closed.  If it returns a subscription object, then the subscription's `unsubscribe` method will be invoked when the subscription has closed.

### Observable.of ( ...items )

```js
// Logs 1, 2, 3
Observable.of(1, 2, 3).subscribe(x => {
    console.log(x);
});
```

Returns an observable which will emit each supplied argument.

### Observable.from ( value )

```js
let list = [1, 2, 3];

// Iterate over an object
Observable.from(list).subscribe(x => {
    console.log(x);
});
```

```js
// Convert something "observable" to an Observable instance
Observable.from(otherObservable).subscribe(x => {
    console.log(x);
});
```

Converts `value` to an Observable.

- If `value` is an implementation of ES Observables, then it is converted to an instance of Observable as defined by this library.
- Otherwise, it is converted to an Observable which synchronously iterates over `value`.

### observable.subscribe ( observer )

```js
let subscription = observable.subscribe({
    next(x) { console.log(x) },
    error(err) { console.log(`Finished with error: ${ err }`) },
    complete() { console.log("Finished") }
})
```

Subscribes to the observable.  The `observer` argument must be an object.  It may have any of the following methods:

- `start(subscription)` Receives the subscription object during initialization.
- `next(value)` Receives the next value of the sequence.
- `error(exception)` Receives the terminating error of the sequence.
- `complete()` Called when the stream has completed successfully.

The subscription object can be used to cancel the stream.

```js
// Stop receiving data from the stream
subscription.unsubscribe();
```

## Extended API

*The following methods are not yet defined by the ES Observable specification.*

### observable.forEach ( callback )

```js
observable.forEach(x => {
    console.log(`Received value: ${ x }`);
}).then(_=> {
    console.log("Finished successfully")
}).catch(err => {
    console.log(`Finished with error: ${ err }`);
})
```

Subscribes to the observable and returns a Promise for the completion value of the stream.  The `callback` argument is called once for each value in the stream.

### observable.filter ( callback )

```js
Observable.of(1, 2, 3).filter(value => {
    return value > 2;
}).subscribe(value => {
    console.log(value);
});
// 3
```

Returns a new Observable that emits all values which pass the test implemented by the `callback` argument.

### observable.map ( callback )

Returns a new Observable that emits the results of calling the `callback` argument for every value in the stream.

```js
Observable.of(1, 2, 3).map(value => {
    return value * 2;
}).subscribe(value => {
    console.log(value);
});
// 2
// 4
// 6
```

### observable.reduce ( callback [, initialValue] )

```js
Observable.of(0, 1, 2, 3, 4).reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
}).subscribe(result => {
    console.log(result);
});
// 10
```

Returns a new Observable that applies a function against an accumulator and each value of the stream to reduce it to a single value.
