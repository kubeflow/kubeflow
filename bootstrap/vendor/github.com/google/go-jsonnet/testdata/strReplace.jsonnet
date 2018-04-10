local n = 10000;
local text = std.join("", std.makeArray(n, function(x) "ab"));
std.strReplace(text, "a", "b")