# Prevent calling `expect` conditionally (`no-conditional-expect`)

This rule prevents the use of `expect` in conditional blocks, such as `if`s &
`catch`s.

This includes using `expect` in callbacks to functions named `catch`, which are
assumed to be promises.

## Rule Details

Jest considered a test to have failed if it throws an error, rather than on if
any particular function is called, meaning conditional calls to `expect` could
result in tests silently being skipped.

Additionally, conditionals tend to make tests more brittle and complex, as they
increase the amount of mental thinking needed to understand what is actually
being tested.

While `expect.assertions` & `expect.hasAssertions` can help prevent tests from
silently being skipped, when combined with conditionals they typically result in
even more complexity being introduced.

The following patterns are warnings:

```js
it('foo', () => {
  doTest && expect(1).toBe(2);
});

it('bar', () => {
  if (!skipTest) {
    expect(1).toEqual(2);
  }
});

it('baz', async () => {
  try {
    await foo();
  } catch (err) {
    expect(err).toMatchObject({ code: 'MODULE_NOT_FOUND' });
  }
});

it('throws an error', async () => {
  await foo().catch(error => expect(error).toBeInstanceOf(error));
});
```

The following patterns are not warnings:

```js
it('foo', () => {
  expect(!value).toBe(false);
});

function getValue() {
  if (process.env.FAIL) {
    return 1;
  }

  return 2;
}

it('foo', () => {
  expect(getValue()).toBe(2);
});

it('validates the request', () => {
  try {
    processRequest(request);
  } catch {
    // ignore errors
  } finally {
    expect(validRequest).toHaveBeenCalledWith(request);
  }
});

it('throws an error', async () => {
  await expect(foo).rejects.toThrow(Error);
});
```
