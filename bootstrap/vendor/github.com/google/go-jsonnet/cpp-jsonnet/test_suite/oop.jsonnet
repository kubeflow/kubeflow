/*
Copyright 2015 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// basic self
std.assertEqual({ x: 1, y: self.x }.y, 1) &&
std.assertEqual(({ x: 1, y: self.x } + {}).y, 1) &&

// self as object
std.assertEqual({ x: 1, y: self }.y.y.x, 1) &&
std.assertEqual(({ x: 1, y: self } + {}).y.y.x, 1) &&

// self bound correctly in superobjects
std.assertEqual(({ x: 1, y: self.x } + { x: 2 }).y, 2) &&

// basic super
std.assertEqual(({ x: 1, y: self.x } + { x: 2, y: super.y + 1, z: super.y }), { x: 2, y: 3, z: 2 }) &&

// self bound correctly in super objects when calling via super
std.assertEqual(({ x: self.x } + { x: 2, y: super.x }).y, 2) &&

// super up 2 levels (note + is left associative)
std.assertEqual({ x: 1 } + { x: 2, y: super.x } + { x: 3, z: super.x }, { x: 3, y: 1, z: 2 }) &&

// variables bound statically in superobjects
std.assertEqual((local z = 3; { x: z }) + (local z = 4; { x: z, y: super.x }), { x: 4, y: 3 }) &&

// static binding in superobject
std.assertEqual(local A = { a1: 1, a2: self.a1, a3: A.a2 };
                A { a1: 2, a2: super.a2 + 1, b1: super.a2, b2: super.a3 }, { a1: 2, a2: 3, a3: 1, b1: 2, b2: 1 }) &&


// multiple inheritance
std.assertEqual({ x: 1, y: self.x } + ({ x: 2 } + { x: 3, y: 5, z: super.y }), { x: 3, y: 5, z: 3 }) &&

// multiple inheritance of empty middle

std.assertEqual({ x: 1 } + ({} + { y: super.x }), { x: 1, y: 1 }) &&


// grandparents with super visiting all leaves
local A = { name: 'A' },
      B = { name: 'B', sB: super.name },
      C = { name: 'C', sC: super.name },
      D = { name: 'D', sD: super.name };

std.assertEqual((A + B) + (C + D), { name: 'D', sB: 'A', sC: 'B', sD: 'C' }) &&

// Outer variable
local a = {
  d: 0,
  local outer = self,
  b: { c: outer.d + 1, c2: a.d + 1 },
};

local e = a.b { d: 4 };
local e2 = (a { d: 4 }).b;

std.assertEqual(e.c, 1) &&
std.assertEqual(e.c2, 1) &&
std.assertEqual(e2.c, 5) &&
std.assertEqual(e2.c2, 1) &&

// $ is late-bound
std.assertEqual(({ x: 1, y: { a: $.x } } + { x: 2 }).y.a, 2) &&

// DAG
std.assertEqual({ x: 1, y: 2 } + (local A = { x: super.y, y: super.x }; A + A), { x: 1, y: 2 }) &&


// Object composition: inheritance
std.assertEqual(local f = 'x'; { x: 2 } + { [f]: 1 }, { x: 1 }) &&
// more object composition
std.assertEqual({ x: 3, z: 4 } + { [pair[0]]: pair[1] for pair in [['x', 1], ['y', 2]] }, { x: 1, y: 2, z: 4 }) &&
// more inheritance and object composition
std.assertEqual({} + { [k]: k + '_' for k in ['x', 'y', 'foo', 'foobar'] }, { x: 'x_', y: 'y_', foo: 'foo_', foobar: 'foobar_' }) &&
true
