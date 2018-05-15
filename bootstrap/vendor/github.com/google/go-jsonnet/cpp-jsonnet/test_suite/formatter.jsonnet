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
    local test_local = {
        f: 1,
    },

    local test_local2 =
        {
            g: 2,
        },

    local test_local3(x,
                      y) =
        {
            g: 2,
        },

    local test_local4(
        x, y) = {
        g: 2,
    },

    local test_local5 = {
        x:
            true
        ,
    },

    local test_local_default1(x=100, y=200) = {
        g: 2,
    },

    local test_local_default2(
        x=100,
        y=200)
    = {
        g: 2,
    },

    local f(a, b) = null,
    func: /*0*/ f/*1*/(/*2*/ "x"/*3*/, /*4*/"y"/*5*/,/*6*/)/*7*/,

    test_field0A: {
        g: 1,
    },

    test_field1A:
        {
            g: 1,
        },

    test_field0B: { f: 1,
                    g: 1,
    },

    test_field1B:
        { f: 1,
          g: 1,
        },

    test_field2: if true then
        100
    else
        200,

    test_field2b: if true
                     && true
    then
        100
    else
        200,

    test_field2c: if
        true
    then
        100
    else
        200,

    test_field2d: if true
    then 100
    else 200,

    test_field3:
        if true then
            100
        else
            200,

    test_field4: 1000
                 + 2000,

    test_field4b: 1000 +
                  2000,

    test_field4c: 1000 + 2000 + 3000
                  + 4000 + 5000,

    test_field5:
        1000
        + 2000,

    local A = {},

    test_field6: A {
        g: 1,
    },

    test_field7: A
                 {
        f: 3,
    },

    test_field7f: f
                  (
        1,
        2,
    ),

    test_field7f2: /* hello */ f
                   (1,
                    2)
    tailstrict,

    local g(a) = null,
    test_field8: g({
        f: 3,
    }),

    test_field8b: f(10, {
        f: 3,
    }),

    test_field9a: g(
        {
            f: 3,
        }),

    test_field9b: g(
        {
            f: 3,
        }
    ),

    test_field9c: f(10,
                    {
                        f: 3,
                    }),

    test_field9d: f(10,
                    {
                        f: 3,
                    }
    ),

    test_field9e: f(local x = 10;
                    x + 20, {
        f: 3,
    }),

    test_field9g: f(local x = 10;
                    x + 20,
                    {
                        f: 3,
                    }),

    local h(a, b, c) = null,
    test_field9h: h("blah",
                    {
                        f: 3,
                    },
                    "blah"),

    test_field10: if true then [
        null,
    ],

    test_field11: (
        "lol"
    ),

    test_field11b: (1
                    + 2) + (
        3
    ),

    test_field11c: ([
                        "foo",
                    ]),

    test_field12: [
        1,
    ],

    test_field13: [1,
                   2,
    ],

    test_field14(obj):: if 10000 == 10000 then "wheeeeeeeee"
    else if 10000 == 1000 then "whoooooo"
    else "nah",

    test_field14b(obj):: if 10000 == 10000
    then "wheeeeeeeee"
    else if 10000 == 1000 then "whoooooo"
    else "nah",

    test_field14c(obj):: if 10000 == 10000
    then
        "wheeeeeeeee"
    else
        if 10000 == 1000
        then "whoooooo"
        else
            "nah",

    test_field15: [
        { f: 2 }
        for i in []
    ],

    test_field16:
        if true then
            null
        else [
            null,
        ],

    test_field16b:
        if true then [
            null,
        ] else
            null,

    test_field17: if true then
        null
    else [
        null,
    ],

    test_field17b: if true then [
        null,
    ] else
        null,

    test_field18: if true
    then
        null
    else [
        null,
    ],

    test_field18b: if true
    then [
        null,
    ] else
        null,

    test_field19:: [1, 2, 3][/*foo*/ 1/*bar*/:],
    test_field20:: [1, 2, 3][/*foo*/ 1/*bar*/:/*baz*/:],

    prettyFields: {
        'identifier': true,
        "not identifier": true,
        "function": true,  // Test keyword.
    },

    field: 1,

    dollarUnary: - $.field,

    objects1():: ['something']
                 + if true then ['something']
                 else [],

    objects2():: ['something']
                 + if true then
                     ['something']
                 else [],

    objects3():: ['something'] + if true then
        ['something']
    else [],

    strongIndent:: {
        foo: ["foo"]
             + if true then [
                 "baz"
             ] else [],

        bar: ["foo"]
             + if true then
                 ["baz"]
             else [],

        fow: ["foo"] +
             if true then [
                 "baz"
             ] else [],

        baw: ["foo"] +
             if true then
                 ["baz"]
             else [],

        fox: std.equals(["foo"],
                         if true then [
                             "baz"
                         ] else [],
             ),

        bax: std.equals(["foo"],
                         if true then
                             ["baz"]
                         else [],
             ),

        foy: [["foo"],
              if true then [
                  "baz"
              ] else [],
             ],

        bay: [["foo"],
              if true then
                  ["baz"]
              else [],
             ],

        foz: (["foo"]
              + if true then [
                  "baz"
              ] else []),

        baz: (["foo"]
              + if true then
                  ["baz"]
              else []),
    },

    user4: std.toString(
        a='value1',
    ),
}

