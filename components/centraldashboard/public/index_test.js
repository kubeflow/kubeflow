/**
 * @fileoverview Entry point for unit tests. Requires all modules
 * ending in "_test.js" from the components directory
 */
/* eslint-disable no-undef*/
const testsContext = require.context('./components', true, /_test.js$/);
testsContext.keys().forEach(testsContext);

// Manually include the library_test file
import './library_test.js';
