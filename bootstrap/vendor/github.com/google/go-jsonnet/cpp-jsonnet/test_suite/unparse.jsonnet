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

{
  neg_integer: -1029301293,
  pos_integer: 13212381932,
  number: 1 / 3,
  small_number: 0.00000000000001,
  zero: 0,
  string: "'foo\n bar\n\n\"bar\u0005\"\'\t \u0050\b\f\r\\",
  string2: '"foo\n bar\n\n\'bar\u0005\"\'\t \u0050\b\f\r\\',
  string3: @'"foo\n bar\n\n''bar\u0005\"''\t \u0050\b\f\r\\',
  string4: @"'foo\n bar\n\n'bar\u0005""'\t \u0050\b\f\r\\",
  "lit_field1": 1,
  'lit_field2': 1,
  "false": false,
  "true": true,
  "null": null,
  'with"quote': '"',
  hidden_field:: null,
  ["hidden_field2"]:: null,
}
