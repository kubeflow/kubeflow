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

// bar_menu.5.jsonnet
{
  cocktails: {
    "Bee's Knees": {
      // Construct the ingredients by using 4/3 oz
      // of each element in the given list.
      ingredients: [  // Array comprehension.
        { kind: i, qty: 4 / 3 }
        for i in ['Honey Syrup', 'Lemon Juice', 'Farmers Gin']
      ],
      garnish: 'Lemon Twist',
      served: 'Straight Up',
    },
  } + {  // Object comprehension.
    [sd.name + 'Screwdriver']: {
      ingredients: [
        { kind: 'Vodka', qty: 1.5 },
        { kind: sd.fruit, qty: 3 },
      ],
      garnish: null,
      served: 'On The Rocks',
    }
    for sd in [
      { name: 'Yellow ', fruit: 'Lemonade' },
      { name: '', fruit: 'Orange Juice' },
    ]
  },
}
