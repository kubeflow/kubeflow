# Avoid using `expect().resolves` (`no-expect-resolves`)

## Deprecated

This rule has been deprecated in favor of
[`no-restricted-matchers`](no-restricted-matchers.md) with the following config:

```json
{
  "rules": {
    "jest/no-restricted-matchers": [
      "error",
      { "resolves": "Use `expect(await promise)` instead." }
    ]
  }
}
```

---

Jest allows you to test a promise resolve value using `await expect().resolves`.
For consistency and readability this rule bans `expect().resolves` in favor of
`expect(await promise)`.

## Rule details

This rule triggers a warning if `expect().resolves` is used.

This rule is disabled by default.

### Default configuration

The following patterns is considered warning:

```js
test('some test', async () => {
  await expect(Promise.resolve(1)).resolves.toBe(1);
});
```

The following pattern is not considered warning:

```js
test('some test', async () => {
  expect(await Promise.resolve(1)).toBe(1);
});
```
