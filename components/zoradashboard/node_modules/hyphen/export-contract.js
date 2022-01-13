var createHyphenator = require("./hyphen.js");

module.exports = function (patterns) {
  return {
    hyphenate: createHyphenator(patterns, { async: true }),
    hyphenateHTML: createHyphenator(patterns, { async: true, html: true }),
    hyphenateHTMLSync: createHyphenator(patterns, { html: true }),
    hyphenateSync: createHyphenator(patterns),
    patterns: patterns
  };
};
