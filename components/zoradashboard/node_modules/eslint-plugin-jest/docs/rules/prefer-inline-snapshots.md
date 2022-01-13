# Suggest using inline snapshots (`prefer-inline-snapshots`)

## Deprecated

This rule has been deprecated in favor of
[`no-restricted-matchers`](no-restricted-matchers.md) with the following config:

```json
{
  "rules": {
    "jest/no-restricted-matchers": [
      "error",
      {
        "toThrowErrorMatchingSnapshot": "Use `toThrowErrorMatchingInlineSnapshot()` instead",
        "toMatchSnapshot": "Use `toMatchInlineSnapshot()` instead"
      }
    ]
  }
}
```

---

In order to make snapshot tests more manageable and reviewable
`toMatchInlineSnapshot()` and `toThrowErrorMatchingInlineSnapshot` should be
used to write the snapshots' inline in the test file.

## Rule details

This rule triggers a warning if `toMatchSnapshot()` or
`toThrowErrorMatchingSnapshot` is used to capture a snapshot.

The following pattern is considered warning:

```js
expect(obj).toMatchSnapshot();
```

```js
expect(error).toThrowErrorMatchingSnapshot();
```

The following pattern is not warning:

```js
expect(obj).toMatchInlineSnapshot();
```

```js
expect(error).toThrowErrorMatchingInlineSnapshot();
```
