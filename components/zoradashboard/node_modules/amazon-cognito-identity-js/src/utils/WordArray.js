import cryptoSecureRandomInt from './cryptoSecureRandomInt';

/**
 * Hex encoding strategy.
 * Converts a word array to a hex string.
 * @param {WordArray} wordArray The word array.
 * @return {string} The hex string.
 * @static
 */
function hexStringify(wordArray) {
	// Shortcuts
	var words = wordArray.words;
	var sigBytes = wordArray.sigBytes;

	// Convert
	var hexChars = [];
	for (var i = 0; i < sigBytes; i++) {
		var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		hexChars.push((bite >>> 4).toString(16));
		hexChars.push((bite & 0x0f).toString(16));
	}

	return hexChars.join('');
}

export default class WordArray {
	constructor(words, sigBytes) {
		words = this.words = words || [];

		if (sigBytes != undefined) {
			this.sigBytes = sigBytes;
		} else {
			this.sigBytes = words.length * 4;
		}
	}

	random(nBytes) {
		var words = [];

		for (var i = 0; i < nBytes; i += 4) {
			words.push(cryptoSecureRandomInt());
		}

		return new WordArray(words, nBytes);
	}

	toString() {
		return hexStringify(this);
	}
}
