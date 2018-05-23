{ [x]: { a: 1, b: if x == "a" then 42 else $.a.b + 1 } for x in ["a", "b", "c"] }
