local b = import 'b.jsonnet';
local a(x) = import 'a.jsonnet';  // Not a proper import!
true
