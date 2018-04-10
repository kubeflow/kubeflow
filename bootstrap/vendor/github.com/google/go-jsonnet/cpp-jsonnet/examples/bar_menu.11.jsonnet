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

// bar_menu.11.jsonnet
{
  local name = 'Gin Fizz',
  local brunch = true,
  cocktails: {
    [name]: {
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

    [if brunch then 'Bloody Mary']: {
      ingredients: [
        { kind: 'Vodka', qty: 1.5 },
        { kind: 'Tomato Juice', qty: 3 },
        { kind: 'Lemon Juice', qty: 1.5 },
        { kind: 'Worcestershire Sauce', qty: 0.25 },
        { kind: 'Tobasco Sauce', qty: 0.15 },
      ],
      garnish: 'Celery salt & pepper',
      served: 'Tall',
    },
  },
}
