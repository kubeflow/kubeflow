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

std.assertEqual('foo', 'foo') &&
std.assertEqual('foo' == 'foo', true) &&
std.assertEqual('foo' != 'bar', true) &&
std.assertEqual('foo' != 'foo', false) &&
std.assertEqual('foo' == 'bar', false) &&
std.assertEqual('foo' + 'bar', 'foobar') &&

std.assertEqual('foo' + true, 'footrue') &&
std.assertEqual('foo' + false, 'foofalse') &&
std.assertEqual('foo' + 0, 'foo0') &&
std.assertEqual('foo' + null, 'foonull') &&

std.assertEqual(true + 'foo', 'truefoo') &&
std.assertEqual(false + 'foo', 'falsefoo') &&
std.assertEqual(0 + 'foo', '0foo') &&
std.assertEqual(null + 'foo', 'nullfoo') &&

std.assertEqual('foo' < 'bar', false) &&
std.assertEqual('foo' <= 'bar', false) &&
std.assertEqual('bar' < 'foo', true) &&
std.assertEqual('bar' <= 'foo', true) &&
std.assertEqual('foo' > 'bar', true) &&
std.assertEqual('foo' >= 'bar', true) &&
std.assertEqual('bar' > 'foo', false) &&
std.assertEqual('bar' >= 'foo', false) &&
std.assertEqual('afoo' < 'abar', false) &&
std.assertEqual('afoo' <= 'abar', false) &&
std.assertEqual('abar' < 'afoo', true) &&
std.assertEqual('abar' <= 'afoo', true) &&
std.assertEqual('afoo' > 'abar', true) &&
std.assertEqual('afoo' >= 'abar', true) &&
std.assertEqual('abar' > 'afoo', false) &&
std.assertEqual('abar' >= 'afoo', false) &&
std.assertEqual('a' >= 'a', true) &&
std.assertEqual('a' <= 'a', true) &&
std.assertEqual('a' > 'a', false) &&
std.assertEqual('a' < 'a', false) &&

std.assertEqual('alphabet'[7], 't') &&
std.assertEqual('alphabet'[0], 'a') &&

true
