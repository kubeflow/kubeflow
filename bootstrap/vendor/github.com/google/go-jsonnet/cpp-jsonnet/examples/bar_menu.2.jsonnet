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

// bar_menu.2.jsonnet
{
  cocktails: {
    'Tom Collins': {
      ingredients: [
        { kind: 'Farmers Gin', qty: 1.5 },
        { kind: 'Lemon', qty: 1 },
        { kind: 'Simple Syrup', qty: 0.5 },
        { kind: 'Soda', qty: 2 },
        { kind: 'Angostura', qty: 'dash' },
      ],
      garnish: 'Maraschino Cherry',
      served: 'Tall',
    },
    Martini: {
      ingredients: [
        {
          // Evaluate a path to get the first ingredient of the Tom Collins.
          kind: $.cocktails['Tom Collins'].ingredients[0].kind,
          // or $["cocktails"]["Tom Collins"]["ingredients"][0]["kind"],
          qty: 1,
        },
        { kind: 'Dry White Vermouth', qty: 1 },
      ],
      garnish: 'Olive',
      served: 'Straight Up',
    },
    'Gin Martini': self.Martini,
  },
}
