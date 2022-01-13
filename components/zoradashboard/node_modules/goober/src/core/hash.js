import { toHash } from './to-hash';
import { update } from './update';
import { astish } from './astish';
import { parse } from './parse';

/**
 * In-memory cache.
 */
let cache = {};

/**
 * Stringifies a object structure
 * @param {Object} data
 * @returns {String}
 */
let stringify = (data) => {
    let out = '';

    for (let p in data) {
        let val = data[p];
        out += p + (typeof val == 'object' ? stringify(data[p]) : data[p]);
    }

    return out;
};

/**
 * Generates the needed className
 * @param {String|Object} compiled
 * @param {Object} sheet StyleSheet target
 * @param {Object} global Global flag
 * @param {Boolean} append Append or not
 * @param {Boolean} keyframes Keyframes mode. The input is the keyframes body that needs to be wrapped.
 * @returns {String}
 */
export let hash = (compiled, sheet, global, append, keyframes) => {
    // Get a string representation of the object or the value that is called 'compiled'
    let stringifiedCompiled = typeof compiled == 'object' ? stringify(compiled) : compiled;

    // Retrieve the className from cache or hash it in place
    let className =
        cache[stringifiedCompiled] || (cache[stringifiedCompiled] = toHash(stringifiedCompiled));

    // If there's no entry for the current className
    if (!cache[className]) {
        // Build the _ast_-ish structure if needed
        let ast = typeof compiled == 'object' ? compiled : astish(compiled);

        // Parse it
        cache[className] = parse(
            // For keyframes
            keyframes ? { ['@keyframes ' + className]: ast } : ast,
            global ? '' : '.' + className
        );
    }

    // add or update
    update(cache[className], sheet, append);

    // return hash
    return className;
};
