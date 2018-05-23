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

std.assertEqual('Ā', 'Ā') &&

std.assertEqual(std.length('Ā'), 1) &&
std.assertEqual('Ā' + 'Ā', 'ĀĀ') &&

std.assertEqual('£7'[0], '£') &&
std.assertEqual('£7'[1], '7') &&

local test_korean = '안녕 세상아!';  // Hello world!
std.assertEqual(std.length(test_korean), 7) &&

local test_russian = 'ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ ёйцукенгшщзхъфывапролджэячсмитьбю';
std.assertEqual(std.length(test_russian), 67) &&

local test_chinese = '肉';  // Meat.
std.assertEqual(std.length(test_chinese), 1) &&

std.assertEqual('Ā', 'Ā') &&
std.assertEqual(@"\u0100", '\\u0100') &&
std.assertEqual(@"Ā", 'Ā') &&

true
