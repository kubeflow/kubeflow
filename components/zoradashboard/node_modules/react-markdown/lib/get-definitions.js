'use strict';

var visit = require('unist-util-visit');

module.exports = function getDefinitions(tree) {
  var definitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  visit(tree, 'definition', function (node) {
    var identifier = node.identifier.toUpperCase();
    if (identifier in definitions) return;
    definitions[identifier] = {
      href: node.url,
      title: node.title
    };
  });
  return definitions;
};