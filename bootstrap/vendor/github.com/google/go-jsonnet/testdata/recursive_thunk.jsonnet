local bar(th, x) = if x == 0 then error "xxx" else th;
local foo(x) = bar(foo(x - 1), x - 1);
foo(3)
