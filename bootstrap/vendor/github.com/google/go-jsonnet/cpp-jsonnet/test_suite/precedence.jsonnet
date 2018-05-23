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

std.assertEqual(1 + 2 * 3, 7) &&
std.assertEqual(1 + 2 * 3, 7) &&
std.assertEqual(+1 + 2 * 3, 7) &&
std.assertEqual(-1 + 2 * 3, 5) &&
std.assertEqual(3 + 2 / 2, 4) &&
std.assertEqual(6 - 3 + 2, 5) &&
std.assertEqual(6 / 3 / 2, 1) &&
std.assertEqual(6 / 3 / 2, 1) &&
std.assertEqual(6 / 3 * 2, 4) &&
std.assertEqual(6 / 3 % 2, 0) &&
std.assertEqual(1 + 2 << 1, 6) &&
std.assertEqual(42 << 1 >> 1, 42) &&
std.assertEqual(42 > 40 + 2, false) &&
std.assertEqual(42 >= 40 + 2, true) &&
std.assertEqual(42 < 40 + 2, false) &&
std.assertEqual(42 <= 40 + 2, true) &&
std.assertEqual(1 + 1 == 2, true) &&
std.assertEqual(1 | 3 & 6, 3) &&
std.assertEqual(1 | 3 & 6 ^ 2, 1) &&
std.assertEqual(false && true || false, false) &&
std.assertEqual(!false && true || false, true) &&
std.assertEqual(true && false || false, false) &&
std.assertEqual(if true then 1 else 2 + 3, 1) &&
std.assertEqual(':' + if true then 'foo' else error 'bar' + 'baz', ':foo') &&
std.assertEqual(':' + if true then 'foo' else function() 'bar' + 'baz', ':foo') &&
std.assertEqual(20 * local x = 6; x + 4, 200) &&

true
