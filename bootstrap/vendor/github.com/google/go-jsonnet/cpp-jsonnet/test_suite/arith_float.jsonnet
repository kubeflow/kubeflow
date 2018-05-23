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

//Test lexing:
std.assertEqual(0, 0.0) &&
std.assertEqual(0e0, 0.0) &&
std.assertEqual(0e+0, 0.0) &&
std.assertEqual(0e-0, 0.0) &&
std.assertEqual(0e00, 0.0) &&
std.assertEqual(0E0, 0.0) &&
std.assertEqual(0E+0, 0.0) &&
std.assertEqual(0E-0, 0.0) &&
std.assertEqual(0E00, 0.0) &&
std.assertEqual(0.0e0, 0.0) &&
std.assertEqual(0.0e+0, 0.0) &&
std.assertEqual(0.0e-0, 0.0) &&
std.assertEqual(0.0e00, 0.0) &&
std.assertEqual(0.0E0, 0.0) &&
std.assertEqual(0.0E+0, 0.0) &&
std.assertEqual(0.0E-0, 0.0) &&
std.assertEqual(0.0E00, 0.0) &&
std.assertEqual(0.00e0, 0.0) &&
std.assertEqual(0.00e+0, 0.0) &&
std.assertEqual(0.00e-0, 0.0) &&
std.assertEqual(0.00e00, 0.0) &&
std.assertEqual(0.00E0, 0.0) &&
std.assertEqual(0.00E+0, 0.0) &&
std.assertEqual(0.00E-0, 0.0) &&
std.assertEqual(0.00E00, 0.0) &&

std.assertEqual(1, 1.0) &&
std.assertEqual(1e0, 1.0) &&
std.assertEqual(1e+0, 1.0) &&
std.assertEqual(1e-0, 1.0) &&
std.assertEqual(1e00, 1.0) &&
std.assertEqual(1E0, 1.0) &&
std.assertEqual(1E+0, 1.0) &&
std.assertEqual(1E-0, 1.0) &&
std.assertEqual(1E00, 1.0) &&
std.assertEqual(1.0e0, 1.0) &&
std.assertEqual(1.0e+0, 1.0) &&
std.assertEqual(1.0e-0, 1.0) &&
std.assertEqual(1.0e00, 1.0) &&
std.assertEqual(1.0E0, 1.0) &&
std.assertEqual(1.0E+0, 1.0) &&
std.assertEqual(1.0E-0, 1.0) &&
std.assertEqual(1.0E00, 1.0) &&
std.assertEqual(1.00e0, 1.0) &&
std.assertEqual(1.00e+0, 1.0) &&
std.assertEqual(1.00e-0, 1.0) &&
std.assertEqual(1.00e00, 1.0) &&
std.assertEqual(1.00E0, 1.0) &&
std.assertEqual(1.00E+0, 1.0) &&
std.assertEqual(1.00E-0, 1.0) &&
std.assertEqual(1.00E00, 1.0) &&

std.assertEqual(11, 11.0) &&
std.assertEqual(11e0, 11.0) &&
std.assertEqual(11e+0, 11.0) &&
std.assertEqual(11e-0, 11.0) &&
std.assertEqual(11e00, 11.0) &&
std.assertEqual(11E0, 11.0) &&
std.assertEqual(11E+0, 11.0) &&
std.assertEqual(11E-0, 11.0) &&
std.assertEqual(11E00, 11.0) &&
std.assertEqual(11.0e0, 11.0) &&
std.assertEqual(11.0e+0, 11.0) &&
std.assertEqual(11.0e-0, 11.0) &&
std.assertEqual(11.0e00, 11.0) &&
std.assertEqual(11.0E0, 11.0) &&
std.assertEqual(11.0E+0, 11.0) &&
std.assertEqual(11.0E-0, 11.0) &&
std.assertEqual(11.0E00, 11.0) &&
std.assertEqual(11.00e0, 11.0) &&
std.assertEqual(11.00e+0, 11.0) &&
std.assertEqual(11.00e-0, 11.0) &&
std.assertEqual(11.00e00, 11.0) &&
std.assertEqual(11.00E0, 11.0) &&
std.assertEqual(11.00E+0, 11.0) &&
std.assertEqual(11.00E-0, 11.0) &&
std.assertEqual(11.00E00, 11.0) &&

// Test arithmetic
std.assertEqual(4.5 + 3, 7.5) &&
std.assertEqual(4.5 - 2, 2.5) &&
std.assertEqual(4.5 * 3, 13.5) &&
std.assertEqual(4.5 / 3, 1.5) &&
std.assertEqual(4.5 % 2, 0.5) &&

std.assertEqual(4.5 << 2, 16) &&
std.assertEqual(4.5 >> 2, 1) &&
std.assertEqual(4.5 ^ 3.6, 7) &&
std.assertEqual(5.5 & 3.3, 1) &&
std.assertEqual(4.5 | 1.9, 5) &&

std.assertEqual(~4.5, -#
5) &&

std.assertEqual(~4.5, -5) &&
std.assertEqual(-4.5, 0-4.5) &&

std.assertEqual(4.5 >= 4.5, true) &&
std.assertEqual(4.5 > 1, true) &&
std.assertEqual(4.5 <= 4.5, true) &&
std.assertEqual(4.5 < 5, true) &&
std.assertEqual(4.5 > 4.5, false) &&
std.assertEqual(4.5 <= 1, false) &&
std.assertEqual(4.5 < 4.5, false) &&
std.assertEqual(4.5 >= 5, false) &&

std.assertEqual(4.5 == 4.5, true) &&
std.assertEqual(4.5 != 3.5, true) &&

std.assertEqual(std.toString(1e20), "100000000000000000000") &&

// Check formatter handles - $ correctly.
local obj = {
    f: { f: { f: 1 } },
    g: - $.f.f.f,
};

std.assertEqual(obj.g, -1) &&

true
