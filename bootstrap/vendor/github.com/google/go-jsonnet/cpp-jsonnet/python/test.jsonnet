std.assertEqual(({ x: 1, y: self.x } { x: 2 }).y, 2) &&
std.assertEqual(std.native("concat")("foo", "bar"), "foobar") &&
std.assertEqual(std.native("return_types")(), {a: [1, 2, 3, null, []], b: 1, c: true, d: null, e: {x: 1, y: 2, z: ["foo"]}}) &&
true

