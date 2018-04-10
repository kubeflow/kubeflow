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

// This file tests functions from the standard library (std.jsonnet and builtins).

// Can capture std from another file.
std.assertEqual((import 'lib/capture_std_func.libsonnet')().sqrt(4), 2) &&

// Each import has its own std.
std.assertEqual(
  local std = { sqrt: function(x) x };
  local lib = import 'lib/capture_std.libsonnet';
  lib.sqrt(4),
  2
) &&

// Now, test each std library function in turn.

std.assertEqual(std.makeArray(10, function(i) i + 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) &&
std.assertEqual(std.makeArray(0, function(i) null), []) &&

local assertClose(a, b) =
  local err =
    if b == 0 then
      a - b
    else
      if a / b - 1 > 0 then a / b - 1 else 1 - a / b;
  if err > 0.000005 then
    error 'Assertion failed (error ' + err + '). ' + a + ' !~ ' + b
  else
    true;

std.assertEqual(std.pow(3, 2), 9) &&
std.assertEqual(std.floor(10), 10) &&
std.assertEqual(std.floor(10.99999), 10) &&
std.assertEqual(std.ceil(10), 10) &&
std.assertEqual(std.ceil(10.99999), 11) &&
std.assertEqual(std.sqrt(0), 0) &&
std.assertEqual(std.sqrt(1), 1) &&
std.assertEqual(std.sqrt(9), 3) &&
std.assertEqual(std.sqrt(16), 4) &&
std.assertEqual(std.abs(33), 33) &&
std.assertEqual(std.abs(-33), 33) &&
std.assertEqual(std.abs(0), 0) &&

// Ordinary (non-test) code can define pi as 2*std.acos(0)
local pi = 3.14159265359;

assertClose(std.sin(0.0 * pi), 0) &&
assertClose(std.sin(0.5 * pi), 1) &&
assertClose(std.sin(1.0 * pi), 0) &&
assertClose(std.sin(1.5 * pi), -1) &&
assertClose(std.sin(2.0 * pi), 0) &&
assertClose(std.cos(0.0 * pi), 1) &&
assertClose(std.cos(0.5 * pi), 0) &&
assertClose(std.cos(1.0 * pi), -1) &&
assertClose(std.cos(1.5 * pi), 0) &&
assertClose(std.cos(2.0 * pi), 1) &&
assertClose(std.tan(0), 0) &&
assertClose(std.tan(0.25 * pi), 1) &&
assertClose(std.asin(0), 0) &&
assertClose(std.acos(1), 0) &&
assertClose(std.asin(1), 0.5 * pi) &&
assertClose(std.acos(0), 0.5 * pi) &&
assertClose(std.atan(0), 0) &&
assertClose(std.log(std.exp(5)), 5) &&
assertClose(std.mantissa(1), 0.5) &&
assertClose(std.exponent(1), 1) &&
assertClose(std.mantissa(128), 0.5) &&
assertClose(std.exponent(128), 8) &&

std.assertEqual(std.type(null), 'null') &&
std.assertEqual(std.type(true), 'boolean') &&
std.assertEqual(std.type(false), 'boolean') &&
std.assertEqual(std.type(0), 'number') &&
std.assertEqual(std.type(-1e10), 'number') &&
std.assertEqual(std.type([1, 2, 3]), 'array') &&
std.assertEqual(std.type([]), 'array') &&
std.assertEqual(std.type(function(x) x), 'function') &&
std.assertEqual(std.type({ x: 1, y: 2 }), 'object') &&
std.assertEqual(std.type({}), 'object') &&
std.assertEqual(std.type('fail'), 'string') &&
std.assertEqual(std.type('' + {}), 'string') &&

std.assertEqual(std.isString(''), true) &&
std.assertEqual(std.isBoolean(true), true) &&
std.assertEqual(std.isNumber(0), true) &&
std.assertEqual(std.isObject({}), true) &&
std.assertEqual(std.isArray([]), true) &&
std.assertEqual(std.isFunction(function() 0), true) &&

std.assertEqual(std.isString(null), false) &&
std.assertEqual(std.isBoolean(null), false) &&
std.assertEqual(std.isNumber(null), false) &&
std.assertEqual(std.isObject(null), false) &&
std.assertEqual(std.isArray(null), false) &&
std.assertEqual(std.isFunction(null), false) &&

std.assertEqual(std.count([true, false, false, true, true, true, false], true), 4) &&
std.assertEqual(std.count([true, false, false, true, true, true, false], false), 3) &&

std.assertEqual(std.filter(function(x) x % 2 == 0, [1, 2, 3, 4]), [2, 4]) &&
std.assertEqual(std.filter(function(x) false, [1, 2, 3, 4]), []) &&
std.assertEqual(std.filter(function(x) x, []), []) &&

std.assertEqual(std.objectHas({ x: 1, y: 2 }, 'x'), true) &&
std.assertEqual(std.objectHas({ x: 1, y: 2 }, 'z'), false) &&
std.assertEqual(std.objectHas({}, 'z'), false) &&

std.assertEqual(std.length('asdfasdf'), 8) &&
std.assertEqual(std.length([1, 4, 9, error 'foo']), 4) &&
std.assertEqual(std.length(function(x, y, z) error 'foo'), 3) &&
std.assertEqual(std.length({ x: 1, y: 2 }), 2) &&
std.assertEqual(std.length({ a: 1, b: 2, c: 0 } + { c: 3, d: error 'foo' }), 4) &&
std.assertEqual(std.length(''), 0) &&
std.assertEqual(std.length([]), 0) &&
std.assertEqual(std.length(function() error 'foo'), 0) &&
std.assertEqual(std.length({}), 0) &&

std.assertEqual(std.objectFields({}), []) &&
std.assertEqual(std.objectFields({ x: 1, y: 2 }), ['x', 'y']) &&
std.assertEqual(std.objectFields({ a: 1, b: 2, c: null, d: error 'foo' }), ['a', 'b', 'c', 'd']) &&
std.assertEqual(std.objectFields({ x: 1 } { x: 1 }), ['x']) &&
std.assertEqual(std.objectFields({ x: 1 } { x:: 1 }), []) &&
std.assertEqual(std.objectFields({ x: 1 } { x::: 1 }), ['x']) &&
std.assertEqual(std.objectFields({ x:: 1 } { x: 1 }), []) &&
std.assertEqual(std.objectFields({ x:: 1 } { x:: 1 }), []) &&
std.assertEqual(std.objectFields({ x:: 1 } { x::: 1 }), ['x']) &&
std.assertEqual(std.objectFields({ x::: 1 } { x: 1 }), ['x']) &&
std.assertEqual(std.objectFields({ x::: 1 } { x:: 1 }), []) &&
std.assertEqual(std.objectFields({ x::: 1 } { x::: 1 }), ['x']) &&


std.assertEqual(std.toString({ a: 1, b: 2 }), '{"a": 1, "b": 2}') &&
std.assertEqual(std.toString({}), '{ }') &&
std.assertEqual(std.toString([1, 2]), '[1, 2]') &&
std.assertEqual(std.toString([]), '[ ]') &&
std.assertEqual(std.toString(null), 'null') &&
std.assertEqual(std.toString(true), 'true') &&
std.assertEqual(std.toString(false), 'false') &&
std.assertEqual(std.toString('str'), 'str') &&
std.assertEqual(std.toString(''), '') &&
std.assertEqual(std.toString([1, 2, 'foo']), '[1, 2, "foo"]') &&

std.assertEqual(std.substr('cookie', 1, 3), 'ook') &&
std.assertEqual(std.substr('cookie', 1, 0), '') &&

std.assertEqual(std.startsWith('food', 'foo'), true) &&
std.assertEqual(std.startsWith('food', 'food'), true) &&
std.assertEqual(std.startsWith('food', 'foody'), false) &&
std.assertEqual(std.startsWith('food', 'wat'), false) &&

std.assertEqual(std.endsWith('food', 'ood'), true) &&
std.assertEqual(std.endsWith('food', 'food'), true) &&
std.assertEqual(std.endsWith('food', 'omgfood'), false) &&
std.assertEqual(std.endsWith('food', 'wat'), false) &&

std.assertEqual(std.codepoint('a'), 97) &&
std.assertEqual(std.char(97), 'a') &&
std.assertEqual(std.codepoint('\u0000'), 0) &&
std.assertEqual(std.char(0), '\u0000') &&

std.assertEqual(std.strReplace('A cat walked by', 'cat', 'dog'), 'A dog walked by') &&
std.assertEqual(std.strReplace('cat', 'cat', 'dog'), 'dog') &&
std.assertEqual(std.strReplace('', 'cat', ''), '') &&
std.assertEqual(std.strReplace('xoxoxoxox', 'xoxox3xox', 'A'), 'xoxoxoxox') &&
std.assertEqual(std.strReplace('xoxoxox3xox', 'xoxox3xox', 'A'), 'xoA') &&
std.assertEqual(std.strReplace('A cat is a cat', 'cat', 'dog'), 'A dog is a dog') &&
std.assertEqual(std.strReplace('wishyfishyisishy', 'ish', 'and'), 'wandyfandyisandy') &&

std.assertEqual(std.map(function(x) x * x, []), []) &&
std.assertEqual(std.map(function(x) x * x, [1, 2, 3, 4]), [1, 4, 9, 16]) &&
std.assertEqual(std.map(function(x) x * x, std.filter(function(x) x > 5, std.range(1, 10))), [36, 49, 64, 81, 100]) &&

std.assertEqual(std.mapWithIndex(function(i, x) x * i, []), []) &&
std.assertEqual(std.mapWithIndex(function(i, x) x * i, [1, 2, 3, 4]), [0, 2, 6, 12]) &&
std.assertEqual(std.mapWithIndex(function(i, x) x * i, std.filter(function(x) x > 5, std.range(1, 10))), [0, 7, 16, 27, 40]) &&

std.assertEqual(std.mapWithKey(function(k, o) k + o, {}), {}) &&
std.assertEqual(std.mapWithKey(function(k, o) k + o, { a: 1, b: 2 }), { a: 'a1', b: 'b2' }) &&

std.assertEqual(std.filterMap(function(x) x >= 0, function(x) x * x, [-3, -2, -1, 0, 1, 2, 3]), [0, 1, 4, 9]) &&

std.assertEqual(std.foldl(function(x, y) [x, y], [], 'foo'), 'foo') &&
std.assertEqual(std.foldl(function(x, y) [x, y], [1, 2, 3, 4], []), [[[[[], 1], 2], 3], 4]) &&

std.assertEqual(std.foldr(function(x, y) [x, y], [], 'bar'), 'bar') &&
std.assertEqual(std.foldr(function(x, y) [x, y], [1, 2, 3, 4], []), [1, [2, [3, [4, []]]]]) &&

std.assertEqual(std.range(2, 6), [2, 3, 4, 5, 6]) &&
std.assertEqual(std.range(2, 2), [2]) &&
std.assertEqual(std.range(2, 1), []) &&

std.assertEqual(std.join([], [[1, 2], [3, 4, 5], [6]]), [1, 2, 3, 4, 5, 6]) &&
std.assertEqual(std.join(['a', 'b'], [[]]), []) &&
std.assertEqual(std.join(['a', 'b'], []), []) &&
std.assertEqual(std.join(['a', 'b'], [null, [1, 2], null, [3, 4, 5], [6], null]), [1, 2, 'a', 'b', 3, 4, 5, 'a', 'b', 6]) &&
std.assertEqual(std.join('', [null, '12', null, '345', '6', null]), '123456') &&
std.assertEqual(std.join('ab', ['']), '') &&
std.assertEqual(std.join('ab', []), '') &&
std.assertEqual(std.join('ab', [null, '12', null, '345', '6', null]), '12ab345ab6') &&
std.assertEqual(std.lines(['a', null, 'b']), 'a\nb\n') &&

std.assertEqual(std.flattenArrays([[1, 2, 3], [4, 5, 6], []]), [1, 2, 3, 4, 5, 6]) &&

std.assertEqual(
  std.manifestIni({
    main: { a: '1', b: '2' },
    sections: {
      s1: { x: '11', y: '22', z: '33' },
      s2: { p: 'yes', q: '' },
      empty: {},
    },
  }),
  'a = 1\nb = 2\n[empty]\n[s1]\nx = 11\ny = 22\nz = 33\n[s2]\np = yes\nq = \n'
) &&

std.assertEqual(
  std.manifestIni({
    sections: {
      s1: { x: '11', y: '22', z: '33' },
      s2: { p: 'yes', q: '' },
      empty: {},
    },
  }),
  '[empty]\n[s1]\nx = 11\ny = 22\nz = 33\n[s2]\np = yes\nq = \n'
) &&

std.assertEqual(
  std.manifestIni({
    main: { a: ['1', '2'] },
    sections: {
      s2: { p: ['yes', ''] },
    },
  }), |||
    a = 1
    a = 2
    [s2]
    p = yes
    p = 
  |||
) &&


std.assertEqual(std.escapeStringJson('hello'), '"hello"') &&
std.assertEqual(std.escapeStringJson('he"llo'), '"he\\"llo"') &&
std.assertEqual(std.escapeStringJson('he"llo'), '"he\\"llo"') &&
std.assertEqual(std.escapeStringBash("he\"l'lo"), "'he\"l'\"'\"'lo'") &&
std.assertEqual(std.escapeStringDollars('The path is ${PATH}.'), 'The path is $${PATH}.') &&

std.assertEqual(std.manifestPython({
  x: 'test',
  y: [],
  z: ['foo', 'bar'],
  n: 1,
  a: true,
  b: false,
  c: null,
  o: { f1: 'foo', f2: 'bar' },
}), '{%s}' % std.join(', ', [
  '"a": True',
  '"b": False',
  '"c": None',
  '"n": 1',
  '"o": {"f1": "foo", "f2": "bar"}',
  '"x": "test"',
  '"y": []',
  '"z": ["foo", "bar"]',
])) &&

std.assertEqual(std.manifestPythonVars({
  x: 'test',
  y: [],
  z: ['foo', 'bar'],
  n: 1,
  a: true,
  b: false,
  c: null,
  o: { f1: 'foo', f2: 'bar' },
}), std.join('\n', [
  'a = True',
  'b = False',
  'c = None',
  'n = 1',
  'o = {"f1": "foo", "f2": "bar"}',
  'x = "test"',
  'y = []',
  'z = ["foo", "bar"]',
  '',
])) &&

std.assertEqual(
  std.manifestXmlJsonml(
    ['f', {}, ' ', ['g', 'inside'], 'nope', ['h', { attr: 'yolo' }, ['x', { attr: 'otter' }]]]
  ),
  '<f> <g>inside</g>nope<h attr="yolo"><x attr="otter"></x></h></f>'
) &&


std.assertEqual(std.base64('Hello World!'), 'SGVsbG8gV29ybGQh') &&
std.assertEqual(std.base64('Hello World'), 'SGVsbG8gV29ybGQ=') &&
std.assertEqual(std.base64('Hello Worl'), 'SGVsbG8gV29ybA==') &&
std.assertEqual(std.base64(''), '') &&

std.assertEqual(std.base64Decode('SGVsbG8gV29ybGQh'), 'Hello World!') &&
std.assertEqual(std.base64Decode('SGVsbG8gV29ybGQ='), 'Hello World') &&
std.assertEqual(std.base64Decode('SGVsbG8gV29ybA=='), 'Hello Worl') &&
std.assertEqual(std.base64Decode(''), '') &&

std.assertEqual(std.sort([]), []) &&
std.assertEqual(std.sort([1]), [1]) &&
std.assertEqual(std.sort([1, 2]), [1, 2]) &&
std.assertEqual(std.sort([2, 1]), [1, 2]) &&
std.assertEqual(std.sort(['1', '2']), ['1', '2']) &&
std.assertEqual(std.sort(['2', '1']), ['1', '2']) &&
std.assertEqual(
  std.sort(['The', 'rain', 'in', 'spain', 'falls', 'mainly', 'on', 'the', 'plain.']),
  ['The', 'falls', 'in', 'mainly', 'on', 'plain.', 'rain', 'spain', 'the']
) &&

std.assertEqual(std.uniq([]), []) &&
std.assertEqual(std.uniq([1]), [1]) &&
std.assertEqual(std.uniq([1, 2]), [1, 2]) &&
std.assertEqual(std.uniq(['1', '2']), ['1', '2']) &&
std.assertEqual(
  std.uniq(['The', 'falls', 'in', 'mainly', 'on', 'plain.', 'rain', 'spain', 'the']),
  ['The', 'falls', 'in', 'mainly', 'on', 'plain.', 'rain', 'spain', 'the']
) &&

local animal_set = ['ant', 'bat', 'cat', 'dog', 'elephant', 'fish', 'giraffe'];

std.assertEqual(
  std.uniq(['ant', 'bat', 'cat', 'dog', 'dog', 'elephant', 'fish', 'fish', 'giraffe']),
  animal_set
) &&

std.assertEqual(
  std.set(['dog', 'ant', 'bat', 'cat', 'dog', 'elephant', 'fish', 'giraffe', 'fish']),
  animal_set
) &&

std.assertEqual(std.setUnion(animal_set, animal_set), animal_set) &&
std.assertEqual(std.setUnion(animal_set, []), animal_set) &&
std.assertEqual(std.setUnion([], animal_set), animal_set) &&
std.assertEqual(std.setUnion([], []), []) &&
std.assertEqual(std.setUnion(['a', 'b'], ['b', 'c']), ['a', 'b', 'c']) &&

std.assertEqual(std.setInter(animal_set, animal_set), animal_set) &&
std.assertEqual(std.setInter(animal_set, []), []) &&
std.assertEqual(std.setInter([], animal_set), []) &&
std.assertEqual(std.setInter([], []), []) &&
std.assertEqual(std.setInter(['a', 'b'], ['b', 'c']), ['b']) &&

std.assertEqual(std.setDiff(animal_set, animal_set), []) &&
std.assertEqual(std.setDiff(animal_set, []), animal_set) &&
std.assertEqual(std.setDiff([], animal_set), []) &&
std.assertEqual(std.setDiff([], []), []) &&
std.assertEqual(std.setDiff(['a', 'b'], ['b', 'c']), ['a']) &&

std.assertEqual(std.setMember('a', ['a', 'b', 'c']), true) &&
std.assertEqual(std.setMember('a', []), false) &&
std.assertEqual(std.setMember('a', ['b', 'c']), false) &&

(
  if std.thisFile == '<stdin>' then
    // This happens when testing the unparser.
    true
  else
    std.assertEqual(std.thisFile, 'stdlib.jsonnet')
) &&

std.assertEqual(import 'this_file/a.libsonnet', 'this_file/a.libsonnet') &&
std.assertEqual(import 'this_file/b.libsonnet', 'this_file/a.libsonnet') &&


std.assertEqual(std.extVar('var1'), 'test') &&

std.assertEqual(std.toString(std.extVar('var2')), '{"x": 1, "y": 2}') &&
std.assertEqual(std.extVar('var2'), { x: 1, y: 2 }) &&
std.assertEqual(std.extVar('var2') { x+: 2 }.x, 3) &&

std.assertEqual(std.split('foo/bar', '/'), ['foo', 'bar']) &&
std.assertEqual(std.split('/foo/', '/'), ['', 'foo', '']) &&

std.assertEqual(std.splitLimit('foo/bar', '/', 1), ['foo', 'bar']) &&
std.assertEqual(std.splitLimit('/foo/', '/', 1), ['', 'foo/']) &&

local some_json = {
  x: [1, 2, 3, true, false, null, 'string\nstring\n'],
  arr: [[[]]],
  y: { a: 1, b: 2, c: [1, 2] },
  emptyArray: [],
  emptyObject: {},
  objectInArray: [{ f: 3 }],
  '"': null,
};

std.assertEqual(
  std.manifestJsonEx(some_json, '    ') + '\n',
  |||
    {
        "\"": null,
        "arr": [
            [
                [

                ]
            ]
        ],
        "emptyArray": [

        ],
        "emptyObject": {

        },
        "objectInArray": [
            {
                "f": 3
            }
        ],
        "x": [
            1,
            2,
            3,
            true,
            false,
            null,
            "string\nstring\n"
        ],
        "y": {
            "a": 1,
            "b": 2,
            "c": [
                1,
                2
            ]
        }
    }
  |||
) &&

std.assertEqual(
  std.manifestYamlDoc(some_json) + '\n',
  |||
    "\"": null
    "arr": 
    - - []
    "emptyArray": []
    "emptyObject": {}
    "objectInArray": 
    - "f": 3
    "x": 
    - 1
    - 2
    - 3
    - true
    - false
    - null
    - |
      string
      string
    "y": 
      "a": 1
      "b": 2
      "c": 
      - 1
      - 2
  |||
) &&

std.assertEqual(
  std.manifestYamlStream([some_json, some_json, {}, [], 3, '"']),
  |||
    ---
    "\"": null
    "arr": 
    - - []
    "emptyArray": []
    "emptyObject": {}
    "objectInArray": 
    - "f": 3
    "x": 
    - 1
    - 2
    - 3
    - true
    - false
    - null
    - |
      string
      string
    "y": 
      "a": 1
      "b": 2
      "c": 
      - 1
      - 2
    ---
    "\"": null
    "arr": 
    - - []
    "emptyArray": []
    "emptyObject": {}
    "objectInArray": 
    - "f": 3
    "x": 
    - 1
    - 2
    - 3
    - true
    - false
    - null
    - |
      string
      string
    "y": 
      "a": 1
      "b": 2
      "c": 
      - 1
      - 2
    ---
    {}
    ---
    []
    ---
    3
    ---
    "\""
    ...
  |||
) &&

std.assertEqual(std.parseInt('01234567890'), 1234567890) &&
std.assertEqual(std.parseInt('-01234567890'), -1234567890) &&
// verified by running md5 -s value
std.assertEqual(std.md5(''), 'd41d8cd98f00b204e9800998ecf8427e') &&
std.assertEqual(std.md5('grape'), 'b781cbb29054db12f88f08c6e161c199') &&
std.assertEqual(std.md5("{}[]01234567890\"'+=-_/<>?,.!@#$%^&*|\\:;`~"), 'a680db28332f0c9647376e5b2aeb4b3d') &&
std.assertEqual(std.md5('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum si.'), '3496bb633e830e7679ce53700d42de1e') &&
std.assertEqual(std.parseInt('-01234567890'), -1234567890) &&

std.assertEqual(std.prune({}), {}) &&
std.assertEqual(std.prune([]), []) &&
std.assertEqual(std.prune(null), null) &&
std.assertEqual(std.prune({ a: [], b: {}, c: null }), {}) &&
std.assertEqual(std.prune([[], {}, null]), []) &&
std.assertEqual(std.prune({ a: [[], {}, null], b: { a: [], b: {}, c: null } }), {}) &&
std.assertEqual(std.prune([[[], {}, null], { a: [], b: {}, c: null }]), []) &&
std.assertEqual(std.prune({ a: [{ b: true }] }), { a: [{ b: true }] }) &&

std.assertEqual(std.asciiUpper('!@#$%&*()asdfghFGHJKL09876 '), '!@#$%&*()ASDFGHFGHJKL09876 ') &&
std.assertEqual(std.asciiLower('!@#$%&*()asdfghFGHJKL09876 '), '!@#$%&*()asdfghfghjkl09876 ') &&

std.assertEqual(std.deepJoin(['a', ['b', 'c', [[], 'd', ['e'], 'f', 'g'], [], []], 'h']),
                'abcdefgh') &&

true
