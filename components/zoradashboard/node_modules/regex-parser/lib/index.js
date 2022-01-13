"use strict";

/**
 * RegexParser
 * Parses a string input.
 *
 * @name RegexParser
 * @function
 * @param {String} input The string input that should be parsed as regular
 * expression.
 * @return {RegExp} The parsed regular expression.
 */
var RegexParser = module.exports = function (input) {

    // Validate input
    if (typeof input !== "string") {
        throw new Error("Invalid input. Input must be a string");
    }

    // Parse input
    var m = input.match(/(\/?)(.+)\1([a-z]*)/i);

    // Invalid flags
    if (m[3] && !/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(m[3])) {
        return RegExp(input);
    }

    // Create the regular expression
    return new RegExp(m[2], m[3]);
};