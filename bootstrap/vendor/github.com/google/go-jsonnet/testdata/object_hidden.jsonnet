local progressive = {
	f1: 1,
	f2:: 2,
	f3::: 3
};
local all_inherit = {
	f1: 4,
	f2: 5,
	f3: 6
};
local all_hidden = {
	f1:: 7,
	f2:: 8,
	f3:: 9,
};
local all_visible = {
	f1::: 10,
	f2::: 11,
	f3::: 12
};
[
	progressive,
	all_inherit,
	all_hidden,
	all_visible,
	progressive + all_inherit,
	progressive + all_hidden,
	progressive + all_visible,
	all_hidden + all_visible,
	all_visible + all_hidden,
	all_hidden + all_inherit,
	all_visible + all_inherit,
	all_inherit + all_inherit,
	all_inherit + progressive,
	all_visible + progressive,
	all_hidden + progressive,
	progressive + (all_hidden + all_inherit)
]

