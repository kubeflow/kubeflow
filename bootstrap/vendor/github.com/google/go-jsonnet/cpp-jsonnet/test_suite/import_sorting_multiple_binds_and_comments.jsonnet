local b = import 'b.jsonnet',  # B comment.
      a = import 'a.jsonnet';  # A comment.

local /* bbb */ b = import 'b.jsonnet',  # B comment.
      /* aaa */ a = import 'a.jsonnet';  # A comment.

local /* bbb
         bbb
         bbb */ b = import 'b.jsonnet',  # B comment.
      /* aaa */ a = import 'a.jsonnet';  # A comment.

// semi-ok...
local /* bbb */ b = import 'b.jsonnet',  # B comment.
      /* aaa
         aaa
         aaa */ a = import 'a.jsonnet';  # A comment.

// We don't really support that, it's going to be messy.
// There's an endline inserted before any paragraph comment.
local b = import 'b.jsonnet',  /* BBB */ /* B comment.
      bbb
      bbb
      bbb */ a = import 'a.jsonnet';  # A comment.

// The example above is equivalent to this one, due to fodder representation constraints.
local b = import 'b.jsonnet',  /* BBB */
      /* B comment.
      bbb
      bbb
      bbb */
a = import 'a.jsonnet';  # A comment.
true
