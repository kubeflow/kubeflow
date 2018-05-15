local f(a, b) = 42; // useful for further tests
local x = [
    // ---------------------- local

    local y = "blah",
        z = "blah";

    local y = "blah", z = "blah";

    local y = "blah", z = "blah",
        x = "blah";

    local
        y = "blah",
        z = "blah";

    // ---------------------- arrays

    [],

    [
    ],

    [ 1, 2, 3],

    [
        1, 2, 3],

    [ 1, 2,
    3],

    [ 1, 2, 3
    ],

    [ 1, 2 // before comma
    , 3],


    // ---------------------- objects

    {},

    {
    },

    { 'a': 'b', 'c': 'd'},

    // make sure it stays a string
    {
        'a  ': 'b', 'c': 'd'},

    {
        ['a' + ' ']: 'b', 'c': 'd'},

    {
        ['a' + ' ']: 'b', 'c': 'd'},

    {
        assert 42 == 42, 'a': 'b', 'c': 'd'},

    {
        'a':: 'b', 'c': 'd'},

    { 'a': 'b',
    'c': 'd'},

    { 'a': 'b', 'c': 'd'
    },

    { 'a':
        'b', 'c': 'd'},

    { 'a': 'b' // before comma
    , 'c': 'd'},


    // ---------------------- array comprehensions

    [ 42 for x in [1] if x == 1],

    [ 42 for x in [1] if x == 1],

    [ 42
        for x in [1] if x == 1],

    [ 42
        for x in [1]
        if x == 1],

    [ 42
        for x in [1] if x == 1
        if x == 1],

    [ 42 for x in [1] if x == 1
    ],

    [ 42 for x in [1] if
    x == 1],

    // ---------------------- object comprehensions

    { [x]: 42 for x in [1] if x == 1},

    {
        [x]: 42 for x in [1] if x == 1},

    { [x]: 42
        for x in [1] if x == 1},

    { [x]: 42 for x in [1]
        if x == 1},

    { [x]: 42 for x in [1] if x == 1
    },

    { [x]: 42 for x in [1] if
    x == 1},

    // ---------------------- functions

    function(x, y) 42,
    function(x,
        y) 42,
    function(
        x, y) 42,
    function(x, y
        ) 42,
    function(x, y)
        42,
    function(x, y) 42,

    local f(x, y) = 42;

    // TODO(sbarzowski) some weird lining up going on here
    local f(x, y
        ) = 42;
    local f(
        x, y) = 42;

    local f(x,
    y) = 42;

    local f(x // before comma
    , y) = 42;

    local f(x, y) =
        42;

    local f(x, y)
        = 42;

    { f(x, y, z)::42 },

    { f(x, y,
        z)::42 },

    // ---------------------- function calls

    f(1, 2),

    f(
        1, 2),

    f
    (1, 2),

    f(1,
    2),

    f(1, 2
    ),

    f(1 # before comma
    , 2),

    // ---------------------- parens

    (1 + 2 + 3),

    (1 + 2 +
    3),

    (1 + 2 + 3
    ),

    (
        1 + 2 + 3),

    ( if 42 == 42 then 42 else 1337 ),

    ( if 42 == 42
        then 42 else 1337 )

    (
        if 42 == 42 then 42 else 1337 )

    ( if 42 == 42 then 42 else 1337
    )

    (
        if 42 == 42
        then 42
        else 1337
    )

    // ---------------------- indexing & slicing

    {}.a,

    {}.
    a,

    {}
    .a,

    {}['a '],

    {}[
        'a '],

    {}['a '
    ],

    {}
    ['a '],

    {}['a '],

    [][::],

    [][
        ::],

    [][::
    ],

    [][1:2:3],

    [][
        1:2:3],

    [][1:
        2:3],

    [][1:2
        :3],

    [][1:2:
        3],

    [][1:2:3
        ],

    [][1:2],

    [][42 +
    42:2],

    [][
        1:2],

    [][1
        :2],

    [][1:
        2],

    [][1:2
        ],

    // ---------------------- various content combinations

    [{}, {}],

    [ {
        'a': 'b'
    }, {
        'a': 'b'
    }, {
        'a': 'b'
    }],

    [ {'a': 'b'}, {
        'a': 'b'
    }, {
        'a': 'b'
    }],

    [ {
        'a': 'b'
    }, {
        'a': 'b'
    }, {
        'a': 'b'
    }, if 42==42 then
        {'a': 'b'}
    else
        {'b': 'a'}],

    [ {
        'a': 'b'
    }, {
        'a': 'b'
    }, {
        'a': 'b'
    },
    if 42==42 then
        {'a': 'b'}
    else
        {'b': 'a'}],

    [ {
        'a': 'b'
    }, {
        'a': 'b'
    }, {
        'a': 'b'
    }, if 42==42 then
        {'a': 'b'}
    else
        {'b': 'a'}
    ],

    [ {'a': 'b'}, {
        'a': 'b'
    }, {
        'a': 'b'
    }],

    [ {'a': 'b'}, {'a': 'b'}, {'a': 'b'} ],

    [ {'a': 'b'}, {'a': 'b'}, {'a': 'b'}, if 42==42 then {'a': 'b'} else {'b': 'a'}],

    [ {'this':
        'is', 'a':
                'really', complex: 'expression'} for x in [1] ],

    [ { 'a': 'b' }, 1, if 42 == 42 then 42 else 1337, 17],

    [ { 'a': 'b' }, 1, if 42 == 42 then 42 else 1337 # before comma
        , 17],

    [ { 'a': 'b' }, 1, if 42 == 42 then 42 else 1337, # after comma
        17],

    { 'a': [ 'b', 'c' ]},

    { 'a': [ 'b', 'c'
    ]},
];
true
