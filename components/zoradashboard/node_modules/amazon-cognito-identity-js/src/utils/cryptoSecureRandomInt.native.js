import getRandomValues from './getRandomValues';

/*
 * Cryptographically secure pseudorandom number generator
 * As Math.random() is cryptographically not safe to use
 */
export default function cryptoSecureRandomInt() {
	return getRandomValues(new Uint32Array(1))[0];
}
