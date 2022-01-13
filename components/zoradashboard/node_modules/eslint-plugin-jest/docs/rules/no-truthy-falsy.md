# Disallow using `toBeTruthy()` & `toBeFalsy()` (`no-truthy-falsy`)

## Deprecated

This rule has been deprecated in favor of
[`no-restricted-matchers`](no-restricted-matchers.md) with the following config:

```json
{
  "rules": {
    "jest/no-restricted-matchers": [
      "error",
      {
        "toBeTruthy": "Avoid `toBeTruthy`",
        "toBeFalsy": "Avoid `toBeFalsy`"
      }
    ]
  }
}
```

---

Tests against boolean values should assert true or false. Asserting `toBeTruthy`
or `toBeFalsy` matches non-boolean values as well and encourages weaker tests.

For example, `expect(someBoolean).toBeFalsy()` passes when
`someBoolean === null`, and when `someBoolean === false`.

Similarly, `expect(someBoolean).toBeTruthy()` passes when `someBoolean === []`,
and when `someBoolean === 'false'` (note that `'false'` is a string).

## Rule details

This rule triggers a warning if `toBeTruthy()` or `toBeFalsy()` are used.

This rule is disabled by default.

### Default configuration

The following patterns are considered warnings:

```js
expect(someValue).toBeTruthy();
expect(someValue).toBeFalsy();
```

The following patterns are not considered warnings:

```js
expect(someValue).toBe(true);
expect(someValue).toBe(false);
```
