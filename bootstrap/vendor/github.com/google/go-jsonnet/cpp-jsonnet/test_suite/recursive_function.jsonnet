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

local fibonacci(n) =
  if n <= 1 then
    1
  else
    fibonacci(n - 1) + fibonacci(n - 2);

std.assertEqual(fibonacci(15), 987) &&

// Tail recursive call
local sum(x, v) =
  if x <= 0 then
    v
  else
    sum(x - 1, x + v) tailstrict;

local sz = 10000;
std.assertEqual(sum(sz, 0), sz * (sz + 1) / 2) &&

std.assertEqual(local x() = 3; x() tailstrict, 3) &&

true
