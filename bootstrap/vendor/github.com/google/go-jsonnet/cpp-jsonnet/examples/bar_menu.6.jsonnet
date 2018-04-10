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

// bar_menu.6.jsonnet
{
  cocktails: (import 'martinis.libsonnet') + {
    Manhattan: {
      ingredients: [
        { kind: 'Rye', qty: 2.5 },
        { kind: 'Sweet Red Vermouth', qty: 1 },
        { kind: 'Angostura', qty: 'dash' },
      ],
      garnish: importstr 'bar_menu.6.manhattan_garnish.txt',
      served: 'Straight Up',
    },
    Cosmopolitan: {
      ingredients: [
        { kind: 'Vodka', qty: 1.5 },
        { kind: 'Cointreau', qty: 1 },
        { kind: 'Cranberry Juice', qty: 2 },
        { kind: 'Lime Juice', qty: 1 },
      ],
      garnish: 'Lime Wheel',
      served: 'Straight Up',
    },
  },
}
