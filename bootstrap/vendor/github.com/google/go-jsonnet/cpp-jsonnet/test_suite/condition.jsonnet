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

local f(x) =
  if x < 0 then
    'negative'
  else if x == 0 then
    'zero'
  else if x <= 5 then
    'small'
  else if x <= 10 then
    'large'
  else
    'huge';

std.assertEqual(f(-10), 'negative') &&
std.assertEqual(f(0), 'zero') &&
std.assertEqual(f(3), 'small') &&
std.assertEqual(f(8), 'large') &&
std.assertEqual(f(100), 'huge') &&
std.assertEqual(if 1 > 0 then 1, 1) &&
std.assertEqual(if 1 > 2 then 1, null) &&

std.assertEqual(if true then if false then 'f' else 'y', 'y') &&
std.assertEqual(if true then (if false then 'f') else 'y', null) &&

std.assertEqual(if true then if true then 'f' + 'y', 'fy') &&
std.assertEqual(if false then (if true then 'f') + 'y', null) &&
std.assertEqual((if false then (if true then 'f')) + 'y', 'nully') &&

true
