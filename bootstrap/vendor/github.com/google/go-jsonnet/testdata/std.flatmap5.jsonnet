local failWith(x) = error x;
std.type(std.flatMap(failWith, ["a", "b", "c"]))
