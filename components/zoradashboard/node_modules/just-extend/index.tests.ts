import extend = require("./index");

// OK

// Pass single `object`.
extend({}); 
extend([]); 
extend(() => {}); 

// Pass single `object`, then `any`.
extend({}, 0); 
extend({}, ""); 
extend({}, false); 
extend({}, null); 
extend({}, undefined); 
extend({}, {}); 
extend({}, []); 
extend({}, () => {}); 

// Pass variadic args.
extend({}, 0, "", false, null, undefined, {}, [], () => {}); 

// Pass `boolean`, then single `object`.
extend(true, {}); 
extend(true, []); 
extend(true, () => {}); 

// Pass `boolean`, single `object`, then `any`.
extend(true, {}, 0); 
extend(true, {}, ""); 
extend(true, {}, false); 
extend(true, {}, null); 
extend(true, {}, undefined); 
extend(true, {}, {}); 
extend(true, {}, []); 
extend(true, {}, () => {}); 

// Pass `boolean`, then variadic args.
extend(true, {}, 0, "", false, null, undefined, {}, [], () => {}); 

// Not OK

// Incorrect extendee `object`.
// @ts-expect-error
extend();
// @ts-expect-error
extend(0);
// @ts-expect-error
extend("");
// @ts-expect-error
extend(false);
// @ts-expect-error
extend();

// @ts-expect-error
extend(true, 0);
// @ts-expect-error
extend(true, "");
// @ts-expect-error
extend(true, false);
// @ts-expect-error
extend(true);
