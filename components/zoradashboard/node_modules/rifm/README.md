# RIFM - React Input Format & Mask

Is a tiny (≈ 800b) component (and hook) to transform any input component
into formatted or masked input.

[Demo](https://realadvisor.github.io/rifm)

## Highlights

- Requires React 16.8+
- Dependency free
- Tiny (≈ 800b)
- Supports any [input](https://realadvisor.github.io/rifm#material-ui).
- Can [mask](https://realadvisor.github.io/rifm#date-format) input,
  [format](https://realadvisor.github.io/rifm#number-format) and [more](https://realadvisor.github.io/rifm#case-enforcement)
- Small readable source
- flow + typescript definitions

## Example

Rifm offers both a Render Prop and a Hook API:

### Render Prop

```js
import { Rifm } from 'rifm';
import { TextField } from '@material-ui/core';

const numberFormat = (str: string) => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
  return r ? r.toLocaleString('en') : '';
}

...

  const [value, setValue] = React.useState('')

  <Rifm
    value={value}
    onChange={setValue}
    format={numberFormat}
  >
    {({ value, onChange }) => (
      <TextField
        type="tel"
        value={value}
        onChange={onChange}
      />
    )}
  </Rifm>

...
```

### Hook

```js
import { useRifm } from 'rifm';
import { TextField } from '@material-ui/core';

const numberFormat = (str: string) => {
  const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
  return r ? r.toLocaleString('en') : '';
}

...

  const [value, setValue] = React.useState('')

  const rifm = useRifm({
    value,
    onChange: setValue,
    format: numberFormat
  })

  <TextField
    type="tel"
    value={rifm.value}
    onChange={rifm.onChange}
  />

...
```

## Install

```sh
yarn add rifm
```

## API

### Terminology

Rifm is based on simple idea (**\***):

- format operation applied to input value after edit doesn't change the order of some symbols before cursor

**\*** _This is not always true, but we solve some edge cases where it's not._

> Imagine you have simple integer number formatter with **\`** as thousands separator
> and current input state is _123\`4_**|**_67_ _("|" shows current cursor position)_.
>
> User press _5_ then formatted input must be equal to _1\`234\`5_**|**_67_.
>
> The overall order of elements has changed (was _1->2->3->\`->4->..._ became _1->\`->2->3->4..._)
> but the order of digits before cursor hasn't changed (was _1->2->3->4_ and hasn't changed).

The same is true for float numbers formatting, dates and more.
Symbols with preserved order are different and depends on format.
We call this kind of symbols - **"accepted"** symbols.

Rifm solves only one task -
find the right place for cursor after formatting.

Knowledge about what symbols are **"accepted"** and cursor position after any user action
is enough to find the final cursor position.

Most operations which are not covered with above idea like
case enforcements, masks guides, floating point _","=>"."_ replacement
can be done using simple postprocessing step - replace.
This operation works well if you need to change input value without loosing cursor position.

And finaly masks - masks are usually is format with replace editing mode + some small cursor visual hacks.

### Input Props

These are accepted by the Rifm component as props and the useRifm hook as named arguments.

| Prop         | type                          | default | Description                                                                                                                                                   |
| ------------ | :---------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **accept**   | RegExp (optional)             | /\d/g   | Regular expression to detect **"accepted"** symbols                                                                                                           |
| **format**   | string => string              |         | format function                                                                                                                                               |
| **value**    | string                        |         | input value                                                                                                                                                   |
| **onChange** | string => void                |         | event fired on input change                                                                                                                                   |
| **children** | ({ value, onChange }) => Node |         | value and onChange handler you need to pass to underlying input element                                                                                       |
| **mask**     | boolean (optional)            |         | use replace input mode if true, use cursor visual hacks if prop provided                                                                                      |
| **replace**  | string => string (optional)   |         | format postprocessor allows you to fully replace any/all symbol/s preserving cursor                                                                           |
| **append**   | string => string (optional)   |         | format postprocessor called only if cursor is in the last position and new symbols added, used for specific use-case to add non accepted symbol when you type |

### Output Props

These will be passed into the `children` render prop for the Rifm component as named arguments, and returned from the useRifm hook as an object.

| Prop         | type                   | default | Description                                                      |
| ------------ | :--------------------- | :------ | :--------------------------------------------------------------- |
| **value**    | string                 |         | A formatted string value to pass as a prop to your input element |
| **onChange** | SyntheticEvent => void |         | The change handler to pass as a prop to your input element       |

See the [Demo](https://realadvisor.github.io/rifm) there are a lot of examples there.

## Thanks

[@TrySound](https://github.com/TrySound) for incredible help and support on this
