local obj = { [x]: if x == "a" then 42 else $.a + 1 for x in ["a", "b", "c"] };
{ obj: obj + {a: 1} }

