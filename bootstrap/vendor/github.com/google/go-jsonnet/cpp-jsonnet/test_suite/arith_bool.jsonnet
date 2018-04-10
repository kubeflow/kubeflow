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

std.assertEqual(!false, true) &&
std.assertEqual(!true, false) &&
std.assertEqual(!!true, true) &&
std.assertEqual(!!false, false) &&

std.assertEqual(false && false, false) &&
std.assertEqual(false && true, false) &&
std.assertEqual(true && false, false) &&
std.assertEqual(true && true, true) &&

std.assertEqual(false || false, false) &&
std.assertEqual(false || true, true) &&
std.assertEqual(true || false, true) &&
std.assertEqual(true || true, true) &&

// Shortcut semantics
std.assertEqual(false && error 'foo', false) &&
std.assertEqual(true || error 'foo', true) &&

std.assertEqual(false == false, true) &&
std.assertEqual(false == true, false) &&
std.assertEqual(true == false, false) &&
std.assertEqual(true == true, true) &&

std.assertEqual(false != false, false) &&
std.assertEqual(false != true, true) &&
std.assertEqual(true != false, true) &&
std.assertEqual(true != true, false) &&

std.assertEqual('1' == 1, false) &&
std.assertEqual('true' == true, false) &&

std.assertEqual(if true then 3 else 5, 3) &&
std.assertEqual(if false then 3 else 5, 5) &&

true
