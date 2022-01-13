# Restructure

[![Build Status](https://travis-ci.org/devongovett/restructure.svg?branch=master)](https://travis-ci.org/devongovett/restructure)
[![Coverage Status](https://coveralls.io/repos/devongovett/restructure/badge.png?branch=master)](https://coveralls.io/r/devongovett/restructure?branch=master)

Restructure allows you to declaratively encode and decode binary data.
It supports a wide variety of types to enable you to express a multitude
of binary formats without writing any parsing code.

Some of the supported features are C-like structures, versioned structures,
pointers, arrays of any type, strings of a large number of encodings, enums,
bitfields, and more.  See the documentation below for more details.

## Example

This is just a small example of what Restructure can do. Check out the API documentation
below for more information.

```javascript
var r = require('restructure');

var Person = new r.Struct({
  name: new r.String(r.uint8, 'utf8'),
  age: r.uint8
});

// decode a person from a buffer
var stream = new r.DecodeStream(buffer);
Person.decode(stream); // returns an object with the fields defined above

// encode a person from an object
// pipe the stream to a destination, such as a file
var stream = new r.EncodeStream();
stream.pipe(fs.createWriteStream('out.bin'));

Person.encode(stream, {
  name: 'Devon',
  age: 21
});

stream.end();
```


## API

All of the following types support three standard methods:

* `decode(stream)` - decodes an instance of the type from the given DecodeStream
* `size(value)` - returns the amount of space the value would take if encoded
* `encode(stream, value)` - encodes the given value into the given EncodeStream

Restructure supports a wide variety of types, but if you need to write your own for
some custom use that cannot be represented by them, you can do so by just implementing
the above methods. Then you can use your type just as you would any other type, in structures
and whatnot.

### Number Types

The following built-in number types are available:

```javascript
uint8, uint16, uint24, uint32, int8, int16, int24, int32, float, double, fixed16, fixed32
```

Numbers are big-endian (network order) by default, but little-endian is supported, too:

```javascript
uint16le, uint24le, uint32le, int16le, int24le, int32le, floatle, doublele, fixed16le, fixed32le
```

To avoid ambiguity, big-endian may be used explicitly:

```javascript
uint16be, uint24be, uint32be, int16be, int24be, int32be, floatbe, doublebe, fixed16be, fixed32be
```

### Boolean

Booleans are encoded as `0` or `1` using one of the above number types.

```javascript
var bool = new r.Boolean(r.uint32);
```

### Reserved

The `Reserved` type simply skips data in a structure, where there are reserved fields.
Encoding produces zeros.

```javascript
// 10 reserved uint8s (default is 1)
var reserved = new r.Reserved(r.uint8, 10);
```

### Optional

The `Optional` type only encodes or decodes when given condition is truthy.

```javascript
// includes field
var optional = new r.Optional(r.uint8, true);

// excludes field
var optional = new r.Optional(r.uint8, false);

// determine whether field is to be included at runtime with a function
var optional = new r.Optional(r.uint8, function() {
  return this.flags & 0x50;
});
```

### Enum

The `Enum` type maps a number to the value at that index in an array.

```javascript
var color = new r.Enum(r.uint8, ['red', 'orange', 'yellow', 'green', 'blue', 'purple']);
```

### Bitfield

The `Bitfield` type maps a number to an object with boolean keys mapping to each bit in that number,
as defined in an array.

```javascript
var bitfield = new r.Bitfield(r.uint8, ['Jack', 'Kack', 'Lack', 'Mack', 'Nack', 'Oack', 'Pack', 'Quack']);
bitfield.decode(stream);

var result = {
  Jack: true,
  Kack: false,
  Lack: false,
  Mack: true,
  Nack: true,
  Oack: false,
  Pack: true,
  Quack: true
};

bitfield.encode(stream, result);
```

### Buffer

Extracts a slice of the buffer to a Node `Buffer`.  The length can be a constant, or taken from
a previous field in the parent structure.

```javascript
// fixed length
var buf = new r.Buffer(2);

// length from parent structure
var struct = new r.Struct({
  bufLen: r.uint8,
  buf: new r.Buffer('bufLen')
});
```

### String

A `String` maps a JavaScript string to and from binary encodings.  The length can be a constant, taken
from a previous field in the parent structure, or encoded using a number type immediately before the string.

Supported encodings include `'ascii'`, `'utf8'`, `'ucs2'`, `'utf16le'`, `'utf16be'`, and if you also install
[iconv-lite](https://github.com/ashtuchkin/iconv-lite), many other legacy codecs.

```javascript
// fixed length, ascii encoding by default
var str = new r.String(2);

// length encoded as number before the string, utf8 encoding
var str = new r.String(r.uint8, 'utf8');

// length from parent structure
var struct = new r.Struct({
  len: r.uint8,
  str: new r.String('len', 'utf16be')
});

// null-terminated string (also known as C string)
var str = new r.String(null, 'utf8')
```

### Array

An `Array` maps to and from a JavaScript array containing instances of a sub-type. The length can be a constant,
taken from a previous field in the parent structure, encoded using a number type immediately
before the string, or computed by a function.

```javascript
// fixed length, containing numbers
var arr = new r.Array(r.uint16, 2);

// length encoded as number before the array containing strings
var arr = new r.Array(new r.String(10), r.uint8);

// length computed by a function
var arr = new r.Array(r.uint8, function() { return 5 });

// length from parent structure
var struct = new r.Struct({
  len: r.uint8,
  arr: new r.Array(r.uint8, 'len')
});

// treat as amount of bytes instead (may be used in all the above scenarios)
var arr = new r.Array(r.uint16, 6, 'bytes');
```

### LazyArray

The `LazyArray` type extends from the `Array` type, and is useful for large arrays that you do not need to access sequentially. 
It avoids decoding the entire array upfront, and instead only decodes and caches individual items as needed. It only works when 
the elements inside the array have a fixed size.

Instead of returning a JavaScript array, the `LazyArray` type returns a custom object that can be used to access the elements.

```javascript
var arr = new r.LazyArray(r.uint16, 2048);
var res = arr.decode(stream);

// get a single element
var el = res.get(2);

// convert to a normal array (decode all elements)
var array = res.toArray();
```

### Struct

A `Struct` maps to and from JavaScript objects, containing keys of various previously discussed types. Sub structures,
arrays of structures, and pointers to other types (discussed below) are supported.

```javascript
var Person = new r.Struct({
  name: new r.String(r.uint8, 'utf8'),
  age: r.uint8
});
```

### VersionedStruct

A `VersionedStruct` is a `Struct` that has multiple versions. The version is typically encoded at
the beginning of the structure, or as a field in a parent structure. There is an optional `header`
common to all versions, and separate fields listed for each version number.

```javascript
// the version is read as a uint8 in this example
// you could also get the version from a key on the parent struct
var Person = new r.VersionedStruct(r.uint8, {
  // optional header common to all versions
  header: {
    name: new r.String(r.uint8, 'utf8')
  },
  0: {
    age: r.uint8
  },
  1: {
    hairColor: r.Enum(r.uint8, ['black', 'brown', 'blonde'])
  }
});
```

### Pointer

Pointers map an address or offset encoded as a number, to a value encoded elsewhere in the buffer.
There are a few options you can use: `type`, `relativeTo`, `allowNull`, and `nullValue`. 
The `type` option has these possible values:

* `local` (default) - the encoded offset is relative to the start of the containing structure
* `immediate` - the encoded offset is relative to the position of the pointer itself
* `parent` - the encoded offset is relative to the parent structure of the immediate container
* `global` - the encoded offset is global to the start of the file

The `relativeTo` option specifies that the encoded offset is relative to a field on the containing structure.
By default, pointers are relative to the start of the containing structure (`local`).

The `allowNull` option lets you specify whether zero offsets are allowed or should produce `null`. This is
set to `true` by default. The `nullValue` option is related, and lets you override the encoded value that
represents `null`. By default, the `nullValue` is zero.

The `lazy` option allows lazy decoding of the pointer's value by defining a getter on the parent object.
This only works when the pointer is contained within a Struct, but can be used to speed up decoding
quite a bit when not all of the data is needed right away.

```javascript
var Address = new r.Struct({
  street: new r.String(r.uint8),
  zip: new r.String(5)
});

var Person = new r.Struct({
  name: new r.String(r.uint8, 'utf8'),
  age: r.uint8,
  ptrStart: r.uint8,
  address: new r.Pointer(r.uint8, Address)
});
```

If the type of a pointer is set to 'void', it is not decoded and the computed address in the buffer
is simply returned. To encode a void pointer, create a `new r.VoidPointer(type, value)`.

## License

MIT
