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

// bar_menu.7.jsonnet
local utils = import 'bar_menu_utils.libsonnet';
{
  local my_gin = 'Farmers Gin',
  cocktails: {
    "Bee's Knees": {
      // Divide 4oz among the 3 ingredients.
      ingredients: utils.equal_parts(4, [
        'Honey Syrup',
        'Lemon Juice',
        my_gin,
      ]),
      garnish: 'Lemon Twist',
      served: 'Straight Up',
    },
    Negroni: {
      // Divide 3oz among the 3 ingredients.
      ingredients: utils.equal_parts(3, [
        my_gin,
        'Sweet Red Vermouth',
        'Campari',
      ]),
      garnish: 'Orange Peel',
      served: 'On The Rocks',
    },
  },
}
