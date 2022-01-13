# zen-push

A push stream observable class. *(Sometimes called a Subject in Rx-speak.)*

## Install

```sh
npm install zen-push
```

## Usage

```js
import PushStream from 'zen-push';

let pushStream = new PushStream();
pushStream.observable.subscribe(value => console.log(`Hello ${value}!`));
pushStream.next('World'); // 'Hello World!'
```

## API

### new PushStream ( )

```js
let pushStream = new PushStream();
```

Creates a new PushStream object.

### pushStream.observable

```js
pushStream.observable.subscribe(value => console.log(`Hello ${value}!`));
```

The instance of [Observable](https://github.com/tc39/proposal-observable) used to listen to elements in the push stream.

### pushStream.next ( value )

```js
pushStream.next('World');
```

Sends the next stream value to all observers.

### pushStream.error ( error )

```js
pushStream.error(new Error('The planet as been destroyed'));
```

Sends an error to all observers. Calling this method terminates the stream.

### pushStream.complete ( )

```js
pushStream.complete();
```

Sends a signal to all observers that the stream is finished. Calling this method terminates the stream.
