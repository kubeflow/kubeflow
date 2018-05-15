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

std.assertEqual([], []) &&
std.assertEqual([1], [1]) &&
std.assertEqual([1,], [1]) &&
std.assertEqual([1, 4, 9, 16][2], 9) &&
std.assertEqual([1, 4, 9, 16] == [1, 4, 9, 16], true) &&
std.assertEqual([1, 4, 9, 16] != [1, 4, 9, 15], true) &&
std.assertEqual([1, 4, 9, 16] == [1, 4, 9, 15], false) &&
std.assertEqual([1, 4, 9, 16] != [1, 4, 9, 16], false) &&

std.assertEqual([1, 4, 9, 16] == [1, 4, 9, 16, 17], false) &&
std.assertEqual([1, 4, 9, 16] != [1, 4, 9, 16, 17], true) &&
std.assertEqual([1, 4, 9, 16, 17] == [1, 4, 9, 16], false) &&
std.assertEqual([1, 4, 9, 16, 17] != [1, 4, 9, 16], true) &&

std.assertEqual([1, 4, 9, error 'foo'][2], 9) &&
std.assertEqual([] + [1, 2, 3] + [4, 5, 6] + [], [1, 2, 3, 4, 5, 6]) &&
std.assertEqual([] + [], []) &&

std.assertEqual([x * x for x in [1, 2, 3, 4]], [1, 4, 9, 16]) &&
std.assertEqual([x * x for x in [-3, -2, -1, 0, 1, 2, 3] if x >= 0], [0, 1, 4, 9]) &&

std.assertEqual([x * x for x in [-3, -2, -1, 0, 1, 2, 3] if x >= 0], [0, 1, 4, 9]) &&
std.assertEqual([x * x for x in []], []) &&

std.assertEqual(local x = 10; [x for x in [x, x, x]], [10, 10, 10]) &&

local arr = [
  { x: 1, y: 4, z: true },
  { x: 1, y: 4, z: false },
  { x: 1, y: 6, z: true },
  { x: 1, y: 6, z: false },
  { x: 2, y: 6, z: true },
  { x: 2, y: 6, z: false },
  { x: 3, y: 6, z: true },
  { x: 3, y: 6, z: false },
];

std.assertEqual(arr, [{ x: x, y: y, z: z } for x in [1, 2, 3] for y in [1, 4, 6] if x + 2 < y for z in [true, false]]) &&


true
