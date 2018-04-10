local b = import 'b.jsonnet';
local a = import 'a.jsonnet';

// shadowing - the imports in this group are not reordered
local b = import 'b.jsonnet';
local a = import 'a.jsonnet';
local a = import 'a.jsonnet';

// shadowing (non-consecutive) - the imports in this group are not reordered
local b = import 'b.jsonnet';
local a = import 'a.jsonnet';
local b = import 'a.jsonnet';

// Shadowing of variables from previous groups doesn't affect it.
local b = import 'b.jsonnet';
local a = import 'a.jsonnet';

local z = import 'z.jsonnet';
local y = import 'x.jsonnet';
// This comment separates groups
local x = import 'z.jsonnet';
local w = import 'w.jsonnet';

true
