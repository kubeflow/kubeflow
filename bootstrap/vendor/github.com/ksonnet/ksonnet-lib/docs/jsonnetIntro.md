# Introduction to Jsonnet

If you're not familiar with **Jsonnet**, this brief introduction can 
help you get started with **ksonnet**. See also the **Jsonnet** 
[tutorial][jsonnetTutorial].

## References, variables, simple JSON templating

You can think of **Jsonnet** as a domain-specific language 
that can be extended to provide templating for other 
languages. Think JSON, but with:

* variables ([lexically-scoped locals][jsonnetLocals] and
  JsonPath-style [references][jsonnetReferences])
* [functions][jsonnetFunctions]
* some notion of [object-oriented inheritance between JSON
  objects][jsonnetOO]
* the ability to define libraries and [import][jsonnetImports] them
* [cleaner syntax][jsonnetSyntax].

This introdution focuses on the first three items.

## Local variables and references

In Jsonnet, you can define lexically-scoped local variables:

```javascript
{
  local foo = "bar",
  baz: foo,
}
```

which produces:

```json
{ "baz": "bar" }
```

**Jsonnet** also exposes a `self` to access properties of the
current object, and a JsonPath-style `$`, which refers to the root
object (the grandparent that is farthest away from the `$`):

```javascript
{
  foo: "bar",
  baz: self.foo,
  cow: {
    moo: $.foo,
  },
}
```

```json
{
  "foo": "bar",
  "baz": "bar",
  "cow": { "moo": "bar" }
}
```

It is worth noting that both `local` variables and references are
_order-independent_, which is a decision that largely falls out of
JSON's design. Notice, for example, that if we re-order `foo` and
`baz`, it does not affect the output of Jsonnet:

```javascript
{
  baz: self.foo,
  cow: {
    moo: $.foo,
  },

  // This is perfectly legal.
  foo: "bar",
}
```

## Functions

Jsonnet implements lexically-scoped functions, but they can be
declared in a few ways, and it's worth pointing them out.

In the example below, note the use of the double colon (`::`) in
the declaration of `function2`. This marks the field as _hidden_,
which is a concept we will look closer at in the section on
object-orientation. For now, it is only important to understand that a
function must be either `local` or hidden with `::`, because Jsonnet
doesn't know how to render a function as JSON data. (Instead of
rendering it, Jsonnet will complain and crash.)

```javascript
{
  local function1(arg1) = { foo: arg1 },
  function2(arg1="cluck"):: { bar: arg1 },
  cow: function1("moo"),
  chicken: self.function2(),
}
```

```json
{
   "chicken": {
      "bar": "cluck"
   },
   "cow": {
      "foo": "moo"
   }
}
```

## Object-orientation (inheritance, mixins)

One of Jsonnet's most powerful features, which we use liberally in
this tutorial and in **ksonnet**, is its object model, which
implements a concise, [well-specified _algebra_][jsonnetAlgebra] for
combining JSON-like objects.

The primary tool for combining objects is the `+` operator. In this
example we see two objects (the first is called the _parent_, or
_base_, and the second is called the _child_) that are combined with
the `+`. The child (which is said to _inherit_ from the parent)
overwrites the `bar` property that was defined in the parent:

```javascript

{
  // Parent object.
  foo: "foo",
  bar: "bar",
} + {
  // Child object.
  bar: "fubar",
}
```

```json
{
   "bar": "fubar",
   "foo": "foo"
}
```

It is sometimes convenient for a child to reference members of the
parent, so Jsonnet also exposes `super`, which behaves a lot like
`self`, except in reference to the parent:

```javascript
{
  foo: "foo",
} + {
  bar: super.foo + "bar",
}
```

```json
{
   "bar": "foobar",
   "foo": "foo"
}
```

One interesting aspect of `super` is that it can be "mixed in",
meaning that if you have an object that refers to `super.bar`, then it
can dynamically be made to inherit from _any object_ that has a `bar`
property. For example:

```javascript
local fooTheBar = { bar: super.bar + "foo" };
{
  bar: "bar",
} + fooTheBar
```

```json
{
   "bar": "barfoo"
}
```

This stands in contrast to the object model of (say) Java, where you
would have to declare at compile time an `Animal` class before a `Dog`
class could be made to inherit from it. The technique above (called a
_mixin_) causes the object to inherit dynamically, at runtime rather
than compile time.

Lastly, Jsonnet allows you to create hidden properties, not included
when we generate the final JSON. Denoted with with a `::`, they are
also visible to all descendent objects (_i.e._, children,
grandchildren, _etc_.), and are useful for holding data you'd like to
use to construct other properties, but not expose as part of the
generated JSON itself:

```javascript
{
  foo:: "foo",
} + {
  bar: super.foo + "bar",
}
```

```json
{
   "bar": "foobar"
}
```

[jsonnetTutorial]: http://jsonnet.org/docs/tutorial.html "Jsonnet tutorial"
[jsonnetSyntax]: http://jsonnet.org/docs/tutorial.html#syntax_improvements "Jsonnet syntax improvements"
[jsonnetFunctions]: http://jsonnet.org/docs/tutorial.html#functions "Jsonnet functions"
[jsonnetLocals]: http://jsonnet.org/docs/tutorial.html#locals "Jsonnet local variables"
[jsonnetReferences]: http://jsonnet.org/docs/tutorial.html#references "Jsonnet references"
[jsonnetImports]: http://jsonnet.org/docs/tutorial.html#imports "Jsonnet imports"
[jsonnetOO]: http://jsonnet.org/docs/tutorial.html#oo "Jsonnet OO"
[jsonnetAlgebra]: http://jsonnet.org/language/spec.html#properties "Jsonnet inheritance algebra"
