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

std.assertEqual(local x = 3; x, 3) &&
std.assertEqual(local x = error 'foo'; 3, 3) &&
std.assertEqual(local x = y, y = 3; x, 3) &&

local x = [x, y, 'foo'], y = [y, 'bar', x];
std.assertEqual(x[1][1], 'bar') &&
std.assertEqual(y[0][2][2], 'foo') &&

local x = { '0': 'zero', '1': y['1'] },
      y = { '0': x['0'], '1': 'one' };

std.assertEqual(x, y) &&

local x = ['zero', y[1]],
      y = [x[0], 'one'];

std.assertEqual(x, y) &&


true
