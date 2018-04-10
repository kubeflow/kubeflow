/*
Copyright 2016 Google Inc. All rights reserved.

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

// These cases are shamelessly lifted from
// https://tools.ietf.org/html/draft-ietf-appsawg-json-merge-patch-07#appendix-A
local cases = [
  {
    target: { a: 'b' },
    patch: { a: 'c' },
    expect: { a: 'c' },
  },
  {
    target: { a: 'b' },
    patch: { b: 'c' },
    expect: { a: 'b', b: 'c' },
  },
  {
    target: { a: 'b' },
    patch: { a: null },
    expect: {},
  },
  {
    target: { a: 'b', b: 'c' },
    patch: { a: null },
    expect: { b: 'c' },
  },
  {
    target: { a: ['b'] },
    patch: { a: 'c' },
    expect: { a: 'c' },
  },
  {
    target: { a: 'c' },
    patch: { a: ['b'] },
    expect: { a: ['b'] },
  },
  {
    target: { a: { b: 'c' } },
    patch: { a: [1] },
    expect: { a: [1] },
  },
  {
    target: ['a', 'b'],
    patch: ['c', 'd'],
    expect: ['c', 'd'],
  },
  {
    target: { a: 'b' },
    patch: ['c'],
    expect: ['c'],
  },
  {
    target: { a: 'foo' },
    patch: null,
    expect: null,
  },
  {
    target: { a: 'foo' },
    patch: 'bar',
    expect: 'bar',
  },
  {
    target: { e: null },
    patch: { a: 1 },
    expect: { e: null, a: 1 },
  },
  {
    target: [1, 2],
    patch: { a: 'b', c: null },
    expect: { a: 'b' },
  },
  {
    target: {},
    patch: { a: { bb: { ccc: null } } },
    expect: { a: { bb: {} } },
  },
];

local results =
  [
    std.assertEqual(std.mergePatch(case.target, case.patch), case.expect)
    for case in cases
  ];

std.foldl(function(a, b) a && b, results, true)
