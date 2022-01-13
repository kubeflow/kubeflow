var Parser = require('./parser');

module.exports = function(queries, options) {
  var result = {};

  Object.keys(queries).forEach(function(query) {
    if (Parser.parse(query).match(options)) {
      Object.assign(result, queries[query]);
    }
  });

  return result;
};
