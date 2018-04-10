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

// #
std.assertEqual(std.format('No format chars\n', []), 'No format chars\n') &&
std.assertEqual(std.format('', []), '') &&
std.assertEqual(std.format('%#%', []), '%') &&
std.assertEqual(std.format('%# +05.3%', []), '    %') &&
std.assertEqual(std.format('%# -+05.3%', []), '%    ') &&

// %
std.assertEqual(std.format('%%', []), '%') &&
std.assertEqual(std.format('%%%%', []), '%%') &&
std.assertEqual(std.format('%s%%', ['foo']), 'foo%') &&
std.assertEqual(std.format('%%%s', ['foo']), '%foo') &&

// s
std.assertEqual(std.format('%s', ['test']), 'test') &&
std.assertEqual(std.format('%s', [true]), 'true') &&
std.assertEqual(std.format('%5s', ['test']), ' test') &&

// c
std.assertEqual(std.format('%c', ['a']), 'a') &&
std.assertEqual(std.format('%# +05.3c', ['a']), '    a') &&
std.assertEqual(std.format('%c', [std.codepoint('a')]), 'a') &&

// d (also a quick test of i and u)
std.assertEqual(std.format('thing-%d', [10]), 'thing-10') &&
std.assertEqual(std.format('thing-%#ld', [10]), 'thing-10') &&
std.assertEqual(std.format('thing-%d', [-10]), 'thing--10') &&
std.assertEqual(std.format('thing-%4d', [10]), 'thing-  10') &&
std.assertEqual(std.format('thing-%04d', [10]), 'thing-0010') &&
std.assertEqual(std.format('thing-% d', [10]), 'thing- 10') &&
std.assertEqual(std.format('thing-%- 4d', [10]), 'thing- 10 ') &&
std.assertEqual(std.format('thing-% d', [-10]), 'thing--10') &&
std.assertEqual(std.format('thing-%5.3d', [10.3]), 'thing-  010') &&
std.assertEqual(std.format('thing-%+5.3d', [10.3]), 'thing- +010') &&
std.assertEqual(std.format('thing-%+-5.3d', [10.3]), 'thing-+010 ') &&
std.assertEqual(std.format('thing-%-5.3d', [10.3]), 'thing-010  ') &&
std.assertEqual(std.format('thing-%#-5.3d', [10.3]), 'thing-010  ') &&
std.assertEqual(std.format('thing-%#-5.3i', [10.3]), 'thing-010  ') &&
std.assertEqual(std.format('thing-%#-5.3u', [10.3]), 'thing-010  ') &&

// o
std.assertEqual(std.format('thing-%o', [10]), 'thing-12') &&
std.assertEqual(std.format('thing-%lo', [10]), 'thing-12') &&
std.assertEqual(std.format('thing-%o', [-10]), 'thing--12') &&
std.assertEqual(std.format('thing-%4o', [10]), 'thing-  12') &&
std.assertEqual(std.format('thing-%04o', [10]), 'thing-0012') &&
std.assertEqual(std.format('thing-% o', [10]), 'thing- 12') &&
std.assertEqual(std.format('thing-%- 4o', [10]), 'thing- 12 ') &&
std.assertEqual(std.format('thing-% o', [-10]), 'thing--12') &&
std.assertEqual(std.format('thing-%5.3o', [10.3]), 'thing-  012') &&
std.assertEqual(std.format('thing-%+5.3o', [10.3]), 'thing- +012') &&
std.assertEqual(std.format('thing-%+-5.3o', [10.3]), 'thing-+012 ') &&
std.assertEqual(std.format('thing-%-5.3o', [10.3]), 'thing-012  ') &&
std.assertEqual(std.format('thing-%#o', [10]), 'thing-012') &&
std.assertEqual(std.format('thing-%#lo', [10]), 'thing-012') &&
std.assertEqual(std.format('thing-%#o', [-10]), 'thing--012') &&
std.assertEqual(std.format('thing-%#4o', [10]), 'thing- 012') &&
std.assertEqual(std.format('thing-%#04o', [10]), 'thing-0012') &&
std.assertEqual(std.format('thing-%# o', [10]), 'thing- 012') &&
std.assertEqual(std.format('thing-%#- 4o', [10]), 'thing- 012') &&
std.assertEqual(std.format('thing-%# o', [-10]), 'thing--012') &&
std.assertEqual(std.format('thing-%#5.3o', [10.3]), 'thing-  012') &&
std.assertEqual(std.format('thing-%#+5.3o', [10.3]), 'thing- +012') &&
std.assertEqual(std.format('thing-%#+-5.3o', [10.3]), 'thing-+012 ') &&
std.assertEqual(std.format('thing-%#-5.3o', [10.3]), 'thing-012  ') &&

// x
std.assertEqual(std.format('thing-%x', [910]), 'thing-38e') &&
std.assertEqual(std.format('thing-%lx', [910]), 'thing-38e') &&
std.assertEqual(std.format('thing-%x', [-910]), 'thing--38e') &&
std.assertEqual(std.format('thing-%5x', [910]), 'thing-  38e') &&
std.assertEqual(std.format('thing-%05x', [910]), 'thing-0038e') &&
std.assertEqual(std.format('thing-% x', [910]), 'thing- 38e') &&
std.assertEqual(std.format('thing-%- 5x', [910]), 'thing- 38e ') &&
std.assertEqual(std.format('thing-% x', [-910]), 'thing--38e') &&
std.assertEqual(std.format('thing-%6.4x', [910.3]), 'thing-  038e') &&
std.assertEqual(std.format('thing-%+6.4x', [910.3]), 'thing- +038e') &&
std.assertEqual(std.format('thing-%+-6.4x', [910.3]), 'thing-+038e ') &&
std.assertEqual(std.format('thing-%-6.4x', [910.3]), 'thing-038e  ') &&
std.assertEqual(std.format('thing-%#x', [910]), 'thing-0x38e') &&
std.assertEqual(std.format('thing-%#lx', [910]), 'thing-0x38e') &&
std.assertEqual(std.format('thing-%#x', [-910]), 'thing--0x38e') &&
std.assertEqual(std.format('thing-%#7x', [910]), 'thing-  0x38e') &&
std.assertEqual(std.format('thing-%#07x', [910]), 'thing-0x0038e') &&
std.assertEqual(std.format('thing-%# x', [910]), 'thing- 0x38e') &&
std.assertEqual(std.format('thing-%#- 7x', [910]), 'thing- 0x38e ') &&
std.assertEqual(std.format('thing-%# x', [-910]), 'thing--0x38e') &&
std.assertEqual(std.format('thing-%#8.4x', [910.3]), 'thing-  0x038e') &&
std.assertEqual(std.format('thing-%#+8.4x', [910.3]), 'thing- +0x038e') &&
std.assertEqual(std.format('thing-%#+-8.4x', [910.3]), 'thing-+0x038e ') &&
std.assertEqual(std.format('thing-%#-8.4x', [910.3]), 'thing-0x038e  ') &&

// X
std.assertEqual(std.format('thing-%X', [910]), 'thing-38E') &&
std.assertEqual(std.format('thing-%lX', [910]), 'thing-38E') &&
std.assertEqual(std.format('thing-%X', [-910]), 'thing--38E') &&
std.assertEqual(std.format('thing-%5X', [910]), 'thing-  38E') &&
std.assertEqual(std.format('thing-%05X', [910]), 'thing-0038E') &&
std.assertEqual(std.format('thing-% X', [910]), 'thing- 38E') &&
std.assertEqual(std.format('thing-%- 5X', [910]), 'thing- 38E ') &&
std.assertEqual(std.format('thing-% X', [-910]), 'thing--38E') &&
std.assertEqual(std.format('thing-%6.4X', [910.3]), 'thing-  038E') &&
std.assertEqual(std.format('thing-%+6.4X', [910.3]), 'thing- +038E') &&
std.assertEqual(std.format('thing-%+-6.4X', [910.3]), 'thing-+038E ') &&
std.assertEqual(std.format('thing-%-6.4X', [910.3]), 'thing-038E  ') &&
std.assertEqual(std.format('thing-%#X', [910]), 'thing-0X38E') &&
std.assertEqual(std.format('thing-%#lX', [910]), 'thing-0X38E') &&
std.assertEqual(std.format('thing-%#X', [-910]), 'thing--0X38E') &&
std.assertEqual(std.format('thing-%#7X', [910]), 'thing-  0X38E') &&
std.assertEqual(std.format('thing-%#07X', [910]), 'thing-0X0038E') &&
std.assertEqual(std.format('thing-%# X', [910]), 'thing- 0X38E') &&
std.assertEqual(std.format('thing-%#- 7X', [910]), 'thing- 0X38E ') &&
std.assertEqual(std.format('thing-%# X', [-910]), 'thing--0X38E') &&
std.assertEqual(std.format('thing-%#8.4X', [910.3]), 'thing-  0X038E') &&
std.assertEqual(std.format('thing-%#+8.4X', [910.3]), 'thing- +0X038E') &&
std.assertEqual(std.format('thing-%#+-8.4X', [910.3]), 'thing-+0X038E ') &&
std.assertEqual(std.format('thing-%#-8.4X', [910.3]), 'thing-0X038E  ') &&

// e
std.assertEqual(std.format('%e', [910]), '9.100000e+02') &&
std.assertEqual(std.format('%.0le', [910]), '9e+02') &&
std.assertEqual(std.format('%#e', [-910]), '-9.100000e+02') &&
std.assertEqual(std.format('%16e', [910]), '    9.100000e+02') &&
std.assertEqual(std.format('%016e', [910]), '00009.100000e+02') &&
std.assertEqual(std.format('% e', [910]), ' 9.100000e+02') &&
std.assertEqual(std.format('%- 16e', [910]), ' 9.100000e+02   ') &&
std.assertEqual(std.format('% e', [-910]), '-9.100000e+02') &&
std.assertEqual(std.format('%16.4e', [910.3]), '      9.1030e+02') &&
std.assertEqual(std.format('%+16.4e', [910.3]), '     +9.1030e+02') &&
std.assertEqual(std.format('%+-16.4e', [910.3]), '+9.1030e+02     ') &&
std.assertEqual(std.format('%-16.4e', [910.3]), '9.1030e+02      ') &&
std.assertEqual(std.format('%#.0e', [910.3]), '9.e+02') &&
std.assertEqual(std.format('%#.0e', [900]), '9.e+02') &&
std.assertEqual(std.format('%.3e', [1000000001]), '1.000e+09') &&

// E
std.assertEqual(std.format('%E', [910]), '9.100000E+02') &&
std.assertEqual(std.format('%.0lE', [910]), '9E+02') &&
std.assertEqual(std.format('%#E', [-910]), '-9.100000E+02') &&
std.assertEqual(std.format('%16E', [910]), '    9.100000E+02') &&
std.assertEqual(std.format('%016E', [910]), '00009.100000E+02') &&
std.assertEqual(std.format('% E', [910]), ' 9.100000E+02') &&
std.assertEqual(std.format('%- 16E', [910]), ' 9.100000E+02   ') &&
std.assertEqual(std.format('% E', [-910]), '-9.100000E+02') &&
std.assertEqual(std.format('%16.4E', [910.3]), '      9.1030E+02') &&
std.assertEqual(std.format('%+16.4E', [910.3]), '     +9.1030E+02') &&
std.assertEqual(std.format('%+-16.4E', [910.3]), '+9.1030E+02     ') &&
std.assertEqual(std.format('%-16.4E', [910.3]), '9.1030E+02      ') &&
std.assertEqual(std.format('%#.0E', [910.3]), '9.E+02') &&
std.assertEqual(std.format('%#.0E', [900]), '9.E+02') &&
std.assertEqual(std.format('%.3E', [1000000001]), '1.000E+09') &&

// f
std.assertEqual(std.format('%f', [910]), '910.000000') &&
std.assertEqual(std.format('%f', 0), '0.000000') &&
std.assertEqual(std.format('%.0lf', [910]), '910') &&
std.assertEqual(std.format('%#f', [-910]), '-910.000000') &&
std.assertEqual(std.format('%12f', [910]), '  910.000000') &&
std.assertEqual(std.format('%012f', [910]), '00910.000000') &&
std.assertEqual(std.format('% f', [910]), ' 910.000000') &&
std.assertEqual(std.format('%- 12f', [910]), ' 910.000000 ') &&
std.assertEqual(std.format('% f', [-910]), '-910.000000') &&
std.assertEqual(std.format('%12.4f', [910.3]), '    910.3000') &&
std.assertEqual(std.format('%+12.4f', [910.3]), '   +910.3000') &&
std.assertEqual(std.format('%+-12.4f', [910.3]), '+910.3000   ') &&
std.assertEqual(std.format('%-12.4f', [910.3]), '910.3000    ') &&
std.assertEqual(std.format('%#.0f', [910.3]), '910.') &&
std.assertEqual(std.format('%#.0f', [910]), '910.') &&
std.assertEqual(std.format('%.3f', [1000000001]), '1000000001.000') &&

// g
std.assertEqual(std.format('%#.3g', [1000000001]), '1.00e+09') &&
std.assertEqual(std.format('%#.3g', [1100]), '1.10e+03') &&
std.assertEqual(std.format('%#.3g', [1.1]), '1.10') &&
std.assertEqual(std.format('%#.5g', [1000000001]), '1.0000e+09') &&
std.assertEqual(std.format('%#.5g', [1100]), '1100.0') &&
std.assertEqual(std.format('%#.5g', [110]), '110.00') &&
std.assertEqual(std.format('%#.5g', [1.1]), '1.1000') &&
std.assertEqual(std.format('%#10.3g', [1000000001]), '  1.00e+09') &&
std.assertEqual(std.format('%#10.3g', [1100]), '  1.10e+03') &&
std.assertEqual(std.format('%#10.3g', [1.1]), '      1.10') &&
std.assertEqual(std.format('%#10.5g', [1000000001]), '1.0000e+09') &&
std.assertEqual(std.format('%#10.5g', [1100]), '    1100.0') &&
std.assertEqual(std.format('%#10.5g', [110]), '    110.00') &&
std.assertEqual(std.format('%#10.5g', [1.1]), '    1.1000') &&
std.assertEqual(std.format('%.3g', [1000000001]), '1e+09') &&
std.assertEqual(std.format('%.3g', [1100]), '1.1e+03') &&
std.assertEqual(std.format('%.3g', [1.1]), '1.1') &&
std.assertEqual(std.format('%.5g', [1000000001]), '1e+09') &&
std.assertEqual(std.format('%.5g', [1100]), '1100') &&
std.assertEqual(std.format('%.5g', [110]), '110') &&
std.assertEqual(std.format('%.5g', [1.1]), '1.1') &&
std.assertEqual(std.format('%10.3g', [1000000001]), '     1e+09') &&
std.assertEqual(std.format('%10.3g', [1100]), '   1.1e+03') &&
std.assertEqual(std.format('%10.3g', [1.1]), '       1.1') &&
std.assertEqual(std.format('%10.5g', [1000000001]), '     1e+09') &&
std.assertEqual(std.format('%10.5g', [1100]), '      1100') &&
std.assertEqual(std.format('%10.5g', [110]), '       110') &&
std.assertEqual(std.format('%10.5g', [1.1]), '       1.1') &&

// G
std.assertEqual(std.format('%#.3G', [1000000001]), '1.00E+09') &&
std.assertEqual(std.format('%#.3G', [1100]), '1.10E+03') &&
std.assertEqual(std.format('%#.3G', [1.1]), '1.10') &&
std.assertEqual(std.format('%#.5G', [1000000001]), '1.0000E+09') &&
std.assertEqual(std.format('%#.5G', [1100]), '1100.0') &&
std.assertEqual(std.format('%#.5G', [110]), '110.00') &&
std.assertEqual(std.format('%#.5G', [1.1]), '1.1000') &&
std.assertEqual(std.format('%#10.3G', [1000000001]), '  1.00E+09') &&
std.assertEqual(std.format('%#10.3G', [1100]), '  1.10E+03') &&
std.assertEqual(std.format('%#10.3G', [1.1]), '      1.10') &&
std.assertEqual(std.format('%#10.5G', [1000000001]), '1.0000E+09') &&
std.assertEqual(std.format('%#10.5G', [1100]), '    1100.0') &&
std.assertEqual(std.format('%#10.5G', [110]), '    110.00') &&
std.assertEqual(std.format('%#10.5G', [1.1]), '    1.1000') &&
std.assertEqual(std.format('%.3G', [1000000001]), '1E+09') &&
std.assertEqual(std.format('%.3G', [1100]), '1.1E+03') &&
std.assertEqual(std.format('%.3G', [1.1]), '1.1') &&
std.assertEqual(std.format('%.5G', [1000000001]), '1E+09') &&
std.assertEqual(std.format('%.5G', [1100]), '1100') &&
std.assertEqual(std.format('%.5G', [110]), '110') &&
std.assertEqual(std.format('%.5G', [1.1]), '1.1') &&
std.assertEqual(std.format('%10.3G', [1000000001]), '     1E+09') &&
std.assertEqual(std.format('%10.3G', [1100]), '   1.1E+03') &&
std.assertEqual(std.format('%10.3G', [1.1]), '       1.1') &&
std.assertEqual(std.format('%10.5G', [1000000001]), '     1E+09') &&
std.assertEqual(std.format('%10.5G', [1100]), '      1100') &&
std.assertEqual(std.format('%10.5G', [110]), '       110') &&
std.assertEqual(std.format('%10.5G', [1.1]), '       1.1') &&

// lots together, also test % operator
std.assertEqual('%s[%05d]-%2x%2x%2x%c' % ['foo', 3991, 17, 18, 17, 100], 'foo[03991]-111211d') &&

// use of *
std.assertEqual('%*d' % [10, 8], '%10d' % [8]) &&
std.assertEqual('%*.*f' % [10, 3, 1 / 3], '%10.3f' % [1 / 3]) &&

// Test mappings
std.assertEqual('%(name)s[%(id)05d]-%(a)2x%(b)2x%(c)2x%(x)c' % { name: 'foo', id: 3991, a: 17, b: 18, c: 17, x: 100 },
                'foo[03991]-111211d') &&

local text = |||
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque felis mi, et iaculis
  tellus consectetur pretium. Integer ultricies ullamcorper arcu quis bibendum. Vivamus luctus nec
  nulla id egestas. Vestibulum lectus nibh, lobortis sed gravida ac, pellentesque sit amet eros.
  Nulla urna purus, ornare at iaculis eget, pharetra sed libero. Fusce a neque malesuada,
  hendrerit ex nec, suscipit lorem. Aenean orci quam, placerat sed mollis ut, faucibus nec turpis.
  Vivamus consectetur auctor vehicula. Nam eu risus sit amet eros mattis finibus nec ac enim.
  Quisque velit metus, tristique in urna in, dictum gravida elit.%(a)s

  Aenean laoreet libero nunc. Cras molestie condimentum mollis. Nam quis leo sed enim vestibulum
  dapibus faucibus eget elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class
  aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent
  cursus magna at urna viverra, eget venenatis ante sodales. In vitae magna sed lacus iaculis
  porttitor eu vel nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae sapien
  vel eros ultricies iaculis. Pellentesque et metus libero. Proin nec rhoncus est. Vivamus a
  aliquam ipsum, ut vehicula nibh. Sed ac posuere dolor.
||| % { a: 'a' };

std.assertEqual(std.length(text), 1244) &&


true
