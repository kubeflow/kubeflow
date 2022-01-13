'use strict';

/**
 * Create a method that will retrieve the given field from an object where that field has a function value
 * @param {string} field The field to consider
 * @returns {function(object):function} A method that gets functions from the given field
 */
function getFieldAsFn(field) {
  return function getFromValue(value) {
    return !!value && (typeof value === 'object') && (typeof value[field] === 'function') && value[field];
  };
}

module.exports = getFieldAsFn;