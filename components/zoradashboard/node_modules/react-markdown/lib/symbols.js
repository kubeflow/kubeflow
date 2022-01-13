"use strict";

var HtmlParser = '__RMD_HTML_PARSER__';
/* istanbul ignore next - Fallback for `Symbol`. */

exports.HtmlParser = typeof Symbol === 'undefined' ? HtmlParser : Symbol(HtmlParser);