# dump

Package dump can dump a Go data structure to Go source file, so that it can be statically embeded into other code.

# Project Status
* UnsafePointer is not supported yet
* Cycles in the object graph are not supported yet

# Implementation Notes

## Aliasing

Aliases to primitives and structs will be preserved in the objects described by the generated code.

### Primitive pointers
```go
var a = "hello world"

var Obj = &struct {
    Foo *string
    Bar *string
}{
	Foo: &a,
	Bar: &a,
}

dump.dump(Obj)

```

will output
```go
var p1Var = "hello world"
var p1 = &p1Var
var Obj = &struct { Foo *string; Bar *string }{
	Foo: p1,
	Bar: p1,
}
```

### Reused pointers
```go
type Zeo struct {
	A *string
}

var z = Zeo {
	A: "hello world",
}

var Obj = &struct {
	Foo *Zeo
	Bar *Zeo
}{
	Foo: &z,
	Bar: &z,
}

dump.dump(Obj)
```

will output

```go
var p1 = &Zeo{
	A: "hello world",
}
var Obj = &struct { Foo *Zeo; Bar *Zeo }{
	Foo: p1,
	Bar: p1,
}
```