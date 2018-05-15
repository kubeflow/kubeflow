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

std.assertEqual({}, { assert true, assert true }) &&
std.assertEqual({}, { assert true, assert 1 == 1 }) &&
std.assertEqual({ assert true, assert 1 == 1 }, {}) &&
std.assertEqual({ assert 1 == 1 }, {}) &&
std.assertEqual({ assert true, f: 1 }.f, 1) &&
std.assertEqual({ assert self.f == 1, f: 1 }.f, 1) &&
std.assertEqual({ assert self.f == g, f: 1, local g = 1 }.f, 1) &&

local x = { assert x.f == y.f, f: 1 },
      y = { assert x.f == y.f, f: 1 };

std.assertEqual(x.f, y.f) &&


local Mixin1 = {
  assert self.x > 0,
  x: super.x,
};

std.assertEqual({ x: 1 } + Mixin1, { x: 1 }) &&

local Mixin2 = {
  assert self.x > super.x,
  x+: self.increment,
  increment:: 1,
};

std.assertEqual({ x: 1 } + Mixin2, { x: 2 }) &&

local Template = {
  assert self == output,
  local template = self,
  local output = {
    str: '%d %d' % [template.x, template.y],
  },
  x:: error 'Must set x',
  y:: error 'Must set y',

  str: output.str,
};

std.assertEqual(Template { x: 1, y: 2 }, { str: '1 2' }) &&

std.assertEqual(std.type({ assert false }), 'object') &&

std.assertEqual(std.length({ assert false }), 0) &&

std.assertEqual(std.objectHas({ assert false, f: 3 }, 'f'), true) &&
std.assertEqual(std.objectHas({ assert false, f: 3, g:: 3 }, 'g'), false) &&
std.assertEqual(std.objectHas({ assert false, f: 3, g:: 3 }, 'h'), false) &&

std.assertEqual(std.objectFields({ assert false, f: 3, g:: 3 }), ['f']) &&

std.assertEqual(std.objectHasAll({ assert false, f: 3 }, 'f'), true) &&
std.assertEqual(std.objectHasAll({ assert false, f: 3, g:: 3 }, 'g'), true) &&
std.assertEqual(std.objectHasAll({ assert false, f: 3, g:: 3 }, 'h'), false) &&

std.assertEqual(std.objectFieldsAll({ assert false, f: 3, g:: 3 }), ['f', 'g']) &&

true
