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

local num_chains = 10, chain_len = 500000;

local chain(last, n) =
  if n == 0 then
    last
  else
    chain({ next: last, data: 0 }, n - 1) tailstrict;

local length(chain, n) =
  if std.objectHas(chain, 'next') then
    length(chain.next, n + 1) tailstrict
  else
    n;

local chain_lens = [length(chain({}, chain_len), 0) for x in std.range(1, num_chains)];

std.foldl(function(a, b) a + b, [l for l in chain_lens], 0) == num_chains * chain_len
