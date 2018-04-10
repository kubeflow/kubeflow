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

std.assertEqual((function(x) x * x)(5), 5 * 5) &&

// Correct self binding from within a function.
std.assertEqual({ x: 1, y: { x: 0, y: function() self.x }.y() }, { x: 1, y: 0 }) &&

local max = function(a, b) if a > b then a else b;
local inv(d) = if d != 0 then 1 / d else 0;

std.assertEqual(max(4, 8), 8) &&
std.assertEqual(inv(0.5), 2) &&

local is_even = function(n) if n == 0 then true else is_odd(n - 1),
      is_odd = function(n) if n == 1 then true else is_even(n - 1);

std.assertEqual(is_even(42), true) &&
std.assertEqual(is_odd(41), true) &&

std.assertEqual((function(a, b) [a, b])(b=1, a=2), [2, 1]) &&
std.assertEqual((function(a, b=2) [a, b])(3), [3, 2]) &&

// Mutually recursive default arguments.
std.assertEqual((function(a=[1, b[1]], b=[a[0], 2]) [a, b])(), [[1, 2], [1, 2]]) &&
std.assertEqual((local a = 'no1', b = 'no2'; function(a=[1, b[1]], b=[a[0], 2]) [a, b])(),
                [[1, 2], [1, 2]]) &&
std.assertEqual((local x = 3; function(a=[x, b[1]], b=[a[0], 2]) [a, b])(),
                [[3, 2], [3, 2]]) &&
std.assertEqual({ g: 3, f(a=[self.g, b[1]], b=[a[0], 2]): [a, b] }.f(),
                [[3, 2], [3, 2]]) &&

local url(host, port=80, protocol='http', url='%s://%s:%d/' % [protocol, host, port]) = url;

std.assertEqual(url('myhost'), 'http://myhost:80/') &&
std.assertEqual(url('mybucket', 8080, protocol='gs'), 'gs://mybucket:8080/') &&
std.assertEqual(url(null, url='wat'), 'wat') &&

local test(a=error 'Need a', alt="'" + a + "'") = alt;
std.assertEqual(test(a='Q'), "'Q'") &&
std.assertEqual(test(alt='|Q|'), '|Q|') &&

local X = 3;
std.assertEqual((function(X=4) X)(), 4) &&
std.assertEqual((function(X=4, Y=X) Y)(), 4) &&

true
