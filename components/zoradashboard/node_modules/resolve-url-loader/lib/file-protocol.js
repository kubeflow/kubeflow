/*
 * MIT License http://opensource.org/licenses/MIT
 * Author: Ben Holloway @bholloway
 */
'use strict';

/**
 * Prepend file:// protocol to source path string or source-map sources.
 */
function prepend(candidate) {
  if (typeof candidate === 'string') {
    return 'file://' + candidate;
  } else if (candidate && (typeof candidate === 'object') && Array.isArray(candidate.sources)) {
    return Object.assign({}, candidate, {
      sources: candidate.sources.map(prepend)
    });
  } else {
    throw new Error('expected string|object');
  }
}

exports.prepend = prepend;

/**
 * Remove file:// protocol from source path string or source-map sources.
 */
function remove(candidate) {
  if (typeof candidate === 'string') {
    return candidate.replace(/^file:\/{2}/, '');
  } else if (candidate && (typeof candidate === 'object') && Array.isArray(candidate.sources)) {
    return Object.assign({}, candidate, {
      sources: candidate.sources.map(remove)
    });
  } else {
    throw new Error('expected string|object');
  }
}

exports.remove = remove;
