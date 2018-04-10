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

local arr = std.range(0, 5);
local str = '012345';
local a = 2;
local b = 4;

local arrCases = [
  {
    input: arr[2:4],
    output: [2, 3],
  },
  {
    input: arr[2:4:1],
    output: [2, 3],
  },
  {
    input: arr[:4],
    output: [0, 1, 2, 3],
  },
  {
    input: arr[2:],
    output: [2, 3, 4, 5],
  },
  {
    input: arr[:],
    output: arr,
  },
  {
    input: arr[:1000],
    output: arr,
  },
  {
    input: arr[::],
    output: arr,
  },
  {
    input: arr[1::],
    output: [1, 2, 3, 4, 5],
  },
  {
    input: arr[(1)::],
    output: [1, 2, 3, 4, 5],
  },
  {
    input: arr[1::2],
    output: [1, 3, 5],
  },
  {
    input: arr[(1)::2],
    output: [1, 3, 5],
  },
  {
    input: arr[::2],
    output: [0, 2, 4],
  },
  {
    input: arr[:0:],
    output: [],
  },
  {
    input: arr[:(0):],
    output: [],
  },
  {
    input: arr[a:b],
    output: [2, 3 ],
  },
  {
    input: arr[a:b + 1],
    output: [2, 3, 4],
  },
  {
    input: arr[2:1000],
    output: [2, 3, 4, 5],
  },
  {
    input: (arr)[2:1000],
    output: [2, 3, 4, 5],
  },

];

local strCases = [
  {
    input: str[2:4],
    output: '23',
  },
  {
    input: str[2:4:1],
    output: '23',
  },
  {
    input: str[:4],
    output: '0123',
  },
  {
    input: str[2:],
    output: '2345',
  },
  {
    input: str[:],
    output: str,
  },
  {
    input: str[:1000],
    output: str,
  },
  {
    input: str[::],
    output: str,
  },
  {
    input: str[1::],
    output: '12345',
  },
  {
    input: str[(1)::],
    output: '12345',
  },
  {
    input: str[1::2],
    output: '135',
  },
  {
    input: str[(1)::2],
    output: '135',
  },
  {
    input: str[::2],
    output: '024',
  },
  {
    input: str[:0:],
    output: '',
  },
  {
    input: str[:(0):],
    output: '',
  },
  {
    input: str[a:b],
    output: '23',
  },
  {
    input: str[a:b + 1],
    output: '234',
  },
  {
    input: str[2:1000],
    output: '2345',
  },
  {
    input: (str)[2:1000],
    output: '2345',
  },
];

std.foldl(
  function(bool, case)
    bool && std.assertEqual(case.input, case.output),
  arrCases + strCases,
  true,
)
