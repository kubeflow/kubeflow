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

// Can capture variables from another file.
std.assertEqual((import 'lib/A_20_func.libsonnet')(), 20) &&

// Ensure string is quoted.
std.assertEqual((import 'lib/A_20_func.libsonnet')(), 20) &&

// Test single quoted string.
std.assertEqual((import 'lib/A_20_func.libsonnet')(), 20) &&
// The block string is hard to test because the filename would include a terminating \n

// Each import has its own environment, can't be overidden.
std.assertEqual(local A = 7; local lib = import 'lib/A_20.libsonnet'; lib, 20) &&
std.assertEqual(local A = 7, lib = import 'lib/A_20.libsonnet'; lib, 20) &&

std.assertEqual(importstr 'lib/some_file.txt', 'Hello World!\n') &&
std.assertEqual(importstr 'lib/some_file.txt', 'Hello World!\n') &&

std.assertEqual(import 'lib/rel_path.libsonnet', 'rel_path') &&
std.assertEqual(import 'lib/rel_path4.libsonnet', 'rel_path') &&

true
