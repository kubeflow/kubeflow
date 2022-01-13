# Enforce having return statement when testing with promises (`valid-expect-in-promise`)

Ensure to return promise when having assertions in `then` or `catch` block of
promise

## Rule details

This rule looks for tests that have assertions in `then` and `catch` methods on
promises that are not returned by the test.

### Default configuration

The following pattern is considered warning:

```js
it('promise test', () => {
  somePromise.then(data => {
    expect(data).toEqual('foo');
  });
});
```

The following pattern is not warning:

```js
it('promise test', () => {
  return somePromise.then(data => {
    expect(data).toEqual('foo');
  });
});
```
