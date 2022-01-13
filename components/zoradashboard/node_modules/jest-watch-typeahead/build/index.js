"use strict";

throw new Error(`
jest-watch-typeahead includes two watch plugins: The filename plugin and the testname plugin.
Please configure Jest as follows:
"watchPlugins": [
  "jest-watch-typeahead/filename",
  "jest-watch-typeahead/testname"
]
`);