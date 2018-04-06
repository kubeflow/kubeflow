local x = 1;
local foo(x=2, y=3, z=x) = {x: x, y: y, z: z};
local x = 4;
foo(y=x)
