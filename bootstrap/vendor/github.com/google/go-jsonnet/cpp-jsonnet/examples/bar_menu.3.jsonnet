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

// bar_menu.3.jsonnet
{
  foo: 3,
  bar: 2 * self.foo,  // Multiplication.
  baz: 'The value ' + self.bar + ' is '
       + (if self.bar > 5 then 'large' else 'small') + '.',
  word: 'horse',
  fmt1: 'The word %s has %d letters.'
        % [self.word, std.length(self.word)],
  fmt2: 'The word %(wd)s has %(le)d letters.  Go %(wd)s!'
        % { wd: $.word, le: std.length($.word) },
  array: [1, 2, 3] + [4],
  obj: { a: 1, b: 2 } + { b: 3, c: 4 },
  equality: 1 == '1',
  obj_member: 'foo' in { foo: 1 },
  multiline_string: |||
    1
    2
    3
  |||,
  multiline_string_fmt: |||
    foo = %(foo)d
    bar = %(bar)d
  ||| % self,
}
