/*!
 * CSSJanus. https://github.com/cssjanus/cssjanus
 *
 * Copyright 2014 Trevor Parscal
 * Copyright 2010 Roan Kattouw
 * Copyright 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssjanus;

/**
 * Create a tokenizer object.
 *
 * This utility class is used by CSSJanus to protect strings by replacing them temporarily with
 * tokens and later transforming them back.
 *
 * @class
 * @constructor
 * @param {RegExp} regex Regular expression whose matches to replace by a token
 * @param {string} token Placeholder text
 */
function Tokenizer( regex, token ) {

	var matches = [],
		index = 0;

	/**
	 * Add a match.
	 *
	 * @private
	 * @param {string} match Matched string
	 * @return {string} Token to leave in the matched string's place
	 */
	function tokenizeCallback( match ) {
		matches.push( match );
		return token;
	}

	/**
	 * Get a match.
	 *
	 * @private
	 * @return {string} Original matched string to restore
	 */
	function detokenizeCallback() {
		return matches[ index++ ];
	}

	return {
		/**
		 * Replace matching strings with tokens.
		 *
		 * @param {string} str String to tokenize
		 * @return {string} Tokenized string
		 */
		tokenize: function ( str ) {
			return str.replace( regex, tokenizeCallback );
		},

		/**
		 * Restores tokens to their original values.
		 *
		 * @param {string} str String previously run through tokenize()
		 * @return {string} Original string
		 */
		detokenize: function ( str ) {
			return str.replace( new RegExp( '(' + token + ')', 'g' ), detokenizeCallback );
		}
	};
}

/**
 * Create a CSSJanus object.
 *
 * CSSJanus transforms CSS rules with horizontal relevance so that a left-to-right stylesheet can
 * become a right-to-left stylesheet automatically. Processing can be bypassed for an entire rule
 * or a single property by adding a / * @noflip * / comment above the rule or property.
 *
 * @class
 * @constructor
 */
function CSSJanus() {

	var
		// Tokens
		temporaryToken = '`TMP`',
		noFlipSingleToken = '`NOFLIP_SINGLE`',
		noFlipClassToken = '`NOFLIP_CLASS`',
		commentToken = '`COMMENT`',
		// Patterns
		nonAsciiPattern = '[^\\u0020-\\u007e]',
		unicodePattern = '(?:(?:\\\\[0-9a-f]{1,6})(?:\\r\\n|\\s)?)',
		numPattern = '(?:[0-9]*\\.[0-9]+|[0-9]+)',
		unitPattern = '(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)',
		directionPattern = 'direction\\s*:\\s*',
		urlSpecialCharsPattern = '[!#$%&*-~]',
		validAfterUriCharsPattern = '[\'"]?\\s*',
		nonLetterPattern = '(^|[^a-zA-Z])',
		charsWithinSelectorPattern = '[^\\}]*?',
		noFlipPattern = '\\/\\*\\!?\\s*@noflip\\s*\\*\\/',
		commentPattern = '\\/\\*[^*]*\\*+([^\\/*][^*]*\\*+)*\\/',
		escapePattern = '(?:' + unicodePattern + '|\\\\[^\\r\\n\\f0-9a-f])',
		nmstartPattern = '(?:[_a-z]|' + nonAsciiPattern + '|' + escapePattern + ')',
		nmcharPattern = '(?:[_a-z0-9-]|' + nonAsciiPattern + '|' + escapePattern + ')',
		identPattern = '-?' + nmstartPattern + nmcharPattern + '*',
		quantPattern = numPattern + '(?:\\s*' + unitPattern + '|' + identPattern + ')?',
		signedQuantPattern = '((?:-?' + quantPattern + ')|(?:inherit|auto))',
		fourNotationQuantPropsPattern = '((?:margin|padding|border-width)\\s*:\\s*)',
		fourNotationColorPropsPattern = '((?:-color|border-style)\\s*:\\s*)',
		colorPattern = '(#?' + nmcharPattern + '+|(?:rgba?|hsla?)\\([ \\d.,%-]+\\))',
		// The use of a lazy match ("*?") may cause a backtrack limit to be exceeded before finding
		// the intended match. This affects 'urlCharsPattern' and 'lookAheadNotOpenBracePattern'.
		// We have not yet found this problem on Node.js, but we have on PHP 7, where it was
		// mitigated by using a possessive quantifier ("*+"), which are not supported in JS.
		// See <https://github.com/cssjanus/php-cssjanus/issues/14> and <https://phabricator.wikimedia.org/T215746#4944830>.
		urlCharsPattern = '(?:' + urlSpecialCharsPattern + '|' + nonAsciiPattern + '|' + escapePattern + ')*?',
		lookAheadNotLetterPattern = '(?![a-zA-Z])',
		lookAheadNotOpenBracePattern = '(?!(' + nmcharPattern + '|\\r?\\n|\\s|#|\\:|\\.|\\,|\\+|>|~|\\(|\\)|\\[|\\]|=|\\*=|~=|\\^=|\'[^\']*\'|"[^"]*"|' + commentToken + ')*?{)',
		lookAheadNotClosingParenPattern = '(?!' + urlCharsPattern + validAfterUriCharsPattern + '\\))',
		lookAheadForClosingParenPattern = '(?=' + urlCharsPattern + validAfterUriCharsPattern + '\\))',
		suffixPattern = '(\\s*(?:!important\\s*)?[;}])',
		// Regular expressions
		temporaryTokenRegExp = /`TMP`/g,
		commentRegExp = new RegExp( commentPattern, 'gi' ),
		noFlipSingleRegExp = new RegExp( '(' + noFlipPattern + lookAheadNotOpenBracePattern + '[^;}]+;?)', 'gi' ),
		noFlipClassRegExp = new RegExp( '(' + noFlipPattern + charsWithinSelectorPattern + '})', 'gi' ),
		directionLtrRegExp = new RegExp( '(' + directionPattern + ')ltr', 'gi' ),
		directionRtlRegExp = new RegExp( '(' + directionPattern + ')rtl', 'gi' ),
		leftRegExp = new RegExp( nonLetterPattern + '(left)' + lookAheadNotLetterPattern + lookAheadNotClosingParenPattern + lookAheadNotOpenBracePattern, 'gi' ),
		rightRegExp = new RegExp( nonLetterPattern + '(right)' + lookAheadNotLetterPattern + lookAheadNotClosingParenPattern + lookAheadNotOpenBracePattern, 'gi' ),
		leftInUrlRegExp = new RegExp( nonLetterPattern + '(left)' + lookAheadForClosingParenPattern, 'gi' ),
		rightInUrlRegExp = new RegExp( nonLetterPattern + '(right)' + lookAheadForClosingParenPattern, 'gi' ),
		ltrInUrlRegExp = new RegExp( nonLetterPattern + '(ltr)' + lookAheadForClosingParenPattern, 'gi' ),
		rtlInUrlRegExp = new RegExp( nonLetterPattern + '(rtl)' + lookAheadForClosingParenPattern, 'gi' ),
		cursorEastRegExp = new RegExp( nonLetterPattern + '([ns]?)e-resize', 'gi' ),
		cursorWestRegExp = new RegExp( nonLetterPattern + '([ns]?)w-resize', 'gi' ),
		fourNotationQuantRegExp = new RegExp( fourNotationQuantPropsPattern + signedQuantPattern + '(\\s+)' + signedQuantPattern + '(\\s+)' + signedQuantPattern + '(\\s+)' + signedQuantPattern + suffixPattern, 'gi' ),
		fourNotationColorRegExp = new RegExp( fourNotationColorPropsPattern + colorPattern + '(\\s+)' + colorPattern + '(\\s+)' + colorPattern + '(\\s+)' + colorPattern + suffixPattern, 'gi' ),
		bgHorizontalPercentageRegExp = new RegExp( '(background(?:-position)?\\s*:\\s*(?:[^:;}\\s]+\\s+)*?)(' + quantPattern + ')', 'gi' ),
		bgHorizontalPercentageXRegExp = new RegExp( '(background-position-x\\s*:\\s*)(-?' + numPattern + '%)', 'gi' ),
		// border-radius: <length or percentage>{1,4} [optional: / <length or percentage>{1,4} ]
		borderRadiusRegExp = new RegExp( '(border-radius\\s*:\\s*)' + signedQuantPattern + '(?:(?:\\s+' + signedQuantPattern + ')(?:\\s+' + signedQuantPattern + ')?(?:\\s+' + signedQuantPattern + ')?)?' +
			'(?:(?:(?:\\s*\\/\\s*)' + signedQuantPattern + ')(?:\\s+' + signedQuantPattern + ')?(?:\\s+' + signedQuantPattern + ')?(?:\\s+' + signedQuantPattern + ')?)?' + suffixPattern, 'gi' ),
		boxShadowRegExp = new RegExp( '(box-shadow\\s*:\\s*(?:inset\\s*)?)' + signedQuantPattern, 'gi' ),
		textShadow1RegExp = new RegExp( '(text-shadow\\s*:\\s*)' + signedQuantPattern + '(\\s*)' + colorPattern, 'gi' ),
		textShadow2RegExp = new RegExp( '(text-shadow\\s*:\\s*)' + colorPattern + '(\\s*)' + signedQuantPattern, 'gi' ),
		textShadow3RegExp = new RegExp( '(text-shadow\\s*:\\s*)' + signedQuantPattern, 'gi' ),
		translateXRegExp = new RegExp( '(transform\\s*:[^;}]*)(translateX\\s*\\(\\s*)' + signedQuantPattern + '(\\s*\\))', 'gi' ),
		translateRegExp = new RegExp( '(transform\\s*:[^;}]*)(translate\\s*\\(\\s*)' + signedQuantPattern + '((?:\\s*,\\s*' + signedQuantPattern + '){0,2}\\s*\\))', 'gi' );

	/**
	 * Invert the horizontal value of a background position property.
	 *
	 * @private
	 * @param {string} match Matched property
	 * @param {string} pre Text before value
	 * @param {string} value Horizontal value
	 * @return {string} Inverted property
	 */
	function calculateNewBackgroundPosition( match, pre, value ) {
		var idx, len;
		if ( value.slice( -1 ) === '%' ) {
			idx = value.indexOf( '.' );
			if ( idx !== -1 ) {
				// Two off, one for the "%" at the end, one for the dot itself
				len = value.length - idx - 2;
				value = 100 - parseFloat( value );
				value = value.toFixed( len ) + '%';
			} else {
				value = 100 - parseFloat( value ) + '%';
			}
		}
		return pre + value;
	}

	/**
	 * Invert a set of border radius values.
	 *
	 * @private
	 * @param {Array} values Matched values
	 * @return {string} Inverted values
	 */
	function flipBorderRadiusValues( values ) {
		switch ( values.length ) {
			case 4:
				values = [ values[ 1 ], values[ 0 ], values[ 3 ], values[ 2 ] ];
				break;
			case 3:
				values = [ values[ 1 ], values[ 0 ], values[ 1 ], values[ 2 ] ];
				break;
			case 2:
				values = [ values[ 1 ], values[ 0 ] ];
				break;
			case 1:
				values = [ values[ 0 ] ];
				break;
		}

		return values.join( ' ' );
	}

	/**
	 * Invert a set of border radius values.
	 *
	 * @private
	 * @param {string} match Matched property
	 * @param {string} pre Text before value
	 * @param {string} [firstGroup1]
	 * @param {string} [firstGroup2]
	 * @param {string} [firstGroup3]
	 * @param {string} [firstGroup4]
	 * @param {string} [secondGroup1]
	 * @param {string} [secondGroup2]
	 * @param {string} [secondGroup3]
	 * @param {string} [secondGroup4]
	 * @param {string} [post] Text after value
	 * @return {string} Inverted property
	 */
	function calculateNewBorderRadius( match, pre ) {
		var values,
			args = [].slice.call( arguments ),
			firstGroup = args.slice( 2, 6 ).filter( function ( val ) { return val; } ),
			secondGroup = args.slice( 6, 10 ).filter( function ( val ) { return val; } ),
			post = args[ 10 ] || '';

		if ( secondGroup.length ) {
			values = flipBorderRadiusValues( firstGroup ) + ' / ' + flipBorderRadiusValues( secondGroup );
		} else {
			values = flipBorderRadiusValues( firstGroup );
		}

		return pre + values + post;
	}

	/**
	 * Flip the sign of a CSS value, possibly with a unit.
	 *
	 * We can't just negate the value with unary minus due to the units.
	 *
	 * @private
	 * @param {string} value
	 * @return {string}
	 */
	function flipSign( value ) {
		if ( parseFloat( value ) === 0 ) {
			// Don't mangle zeroes
			return value;
		}

		if ( value[ 0 ] === '-' ) {
			return value.slice( 1 );
		}

		return '-' + value;
	}

	/**
	 * @private
	 * @param {string} match
	 * @param {string} property
	 * @param {string} offset
	 * @return {string}
	 */
	function calculateNewShadow( match, property, offset ) {
		return property + flipSign( offset );
	}

	/**
	 * @private
	 * @param {string} match
	 * @param {string} property
	 * @param {string} prefix
	 * @param {string} offset
	 * @param {string} suffix
	 * @return {string}
	 */
	function calculateNewTranslate( match, property, prefix, offset, suffix ) {
		return property + prefix + flipSign( offset ) + suffix;
	}

	/**
	 * @private
	 * @param {string} match
	 * @param {string} property
	 * @param {string} color
	 * @param {string} space
	 * @param {string} offset
	 * @return {string}
	 */
	function calculateNewFourTextShadow( match, property, color, space, offset ) {
		return property + color + space + flipSign( offset );
	}

	return {
		/**
		 * Transform a left-to-right stylesheet to right-to-left.
		 *
		 * @param {string} css Stylesheet to transform
		 * @param {Object} options Options
		 * @param {boolean} [options.transformDirInUrl=false] Transform directions in URLs
		 * (e.g. 'ltr', 'rtl')
		 * @param {boolean} [options.transformEdgeInUrl=false] Transform edges in URLs
		 * (e.g. 'left', 'right')
		 * @return {string} Transformed stylesheet
		 */
		'transform': function ( css, options ) { // eslint-disable-line quote-props
			// Use single quotes in this object literal key for closure compiler.
			// Tokenizers
			var noFlipSingleTokenizer = new Tokenizer( noFlipSingleRegExp, noFlipSingleToken ),
				noFlipClassTokenizer = new Tokenizer( noFlipClassRegExp, noFlipClassToken ),
				commentTokenizer = new Tokenizer( commentRegExp, commentToken );

			// Tokenize
			css = commentTokenizer.tokenize(
				noFlipClassTokenizer.tokenize(
					noFlipSingleTokenizer.tokenize(
						// We wrap tokens in ` , not ~ like the original implementation does.
						// This was done because ` is not a legal character in CSS and can only
						// occur in URLs, where we escape it to %60 before inserting our tokens.
						css.replace( '`', '%60' )
					)
				)
			);

			// Transform URLs
			if ( options.transformDirInUrl ) {
				// Replace 'ltr' with 'rtl' and vice versa in background URLs
				css = css
					.replace( ltrInUrlRegExp, '$1' + temporaryToken )
					.replace( rtlInUrlRegExp, '$1ltr' )
					.replace( temporaryTokenRegExp, 'rtl' );
			}
			if ( options.transformEdgeInUrl ) {
				// Replace 'left' with 'right' and vice versa in background URLs
				css = css
					.replace( leftInUrlRegExp, '$1' + temporaryToken )
					.replace( rightInUrlRegExp, '$1left' )
					.replace( temporaryTokenRegExp, 'right' );
			}

			// Transform rules
			css = css
				// Replace direction: ltr; with direction: rtl; and vice versa.
				.replace( directionLtrRegExp, '$1' + temporaryToken )
				.replace( directionRtlRegExp, '$1ltr' )
				.replace( temporaryTokenRegExp, 'rtl' )
				// Flip rules like left: , padding-right: , etc.
				.replace( leftRegExp, '$1' + temporaryToken )
				.replace( rightRegExp, '$1left' )
				.replace( temporaryTokenRegExp, 'right' )
				// Flip East and West in rules like cursor: nw-resize;
				.replace( cursorEastRegExp, '$1$2' + temporaryToken )
				.replace( cursorWestRegExp, '$1$2e-resize' )
				.replace( temporaryTokenRegExp, 'w-resize' )
				// Border radius
				.replace( borderRadiusRegExp, calculateNewBorderRadius )
				// Shadows
				.replace( boxShadowRegExp, calculateNewShadow )
				.replace( textShadow1RegExp, calculateNewFourTextShadow )
				.replace( textShadow2RegExp, calculateNewFourTextShadow )
				.replace( textShadow3RegExp, calculateNewShadow )
				// Translate
				.replace( translateXRegExp, calculateNewTranslate )
				.replace( translateRegExp, calculateNewTranslate )
				// Swap the second and fourth parts in four-part notation rules
				// like padding: 1px 2px 3px 4px;
				.replace( fourNotationQuantRegExp, '$1$2$3$8$5$6$7$4$9' )
				.replace( fourNotationColorRegExp, '$1$2$3$8$5$6$7$4$9' )
				// Flip horizontal background percentages
				.replace( bgHorizontalPercentageRegExp, calculateNewBackgroundPosition )
				.replace( bgHorizontalPercentageXRegExp, calculateNewBackgroundPosition );

			// Detokenize
			css = noFlipSingleTokenizer.detokenize(
				noFlipClassTokenizer.detokenize(
					commentTokenizer.detokenize( css )
				)
			);

			return css;
		}
	};
}

/* Initialization */

cssjanus = new CSSJanus();

/* Exports */

if ( typeof module !== 'undefined' && module.exports ) {
	/**
	 * Transform a left-to-right stylesheet to right-to-left.
	 *
	 * This function is a static wrapper around the transform method of an instance of CSSJanus.
	 *
	 * @param {string} css Stylesheet to transform
	 * @param {Object|boolean} [options] Options object, or transformDirInUrl option (back-compat)
	 * @param {boolean} [options.transformDirInUrl=false] Transform directions in URLs
	 * (e.g. 'ltr', 'rtl')
	 * @param {boolean} [options.transformEdgeInUrl=false] Transform edges in URLs
	 * (e.g. 'left', 'right')
	 * @param {boolean} [transformEdgeInUrl] Back-compat parameter
	 * @return {string} Transformed stylesheet
	 */
	exports.transform = function ( css, options, transformEdgeInUrl ) {
		var norm;
		if ( typeof options === 'object' ) {
			norm = options;
		} else {
			norm = {};
			if ( typeof options === 'boolean' ) {
				norm.transformDirInUrl = options;
			}
			if ( typeof transformEdgeInUrl === 'boolean' ) {
				norm.transformEdgeInUrl = transformEdgeInUrl;
			}
		}
		return cssjanus.transform( css, norm );
	};
} else if ( typeof window !== 'undefined' ) {
	/* global window */
	// Allow cssjanus to be used in a browser.
	// eslint-disable-next-line dot-notation
	window[ 'cssjanus' ] = cssjanus;
}
