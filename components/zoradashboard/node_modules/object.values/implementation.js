'use strict';

var RequireObjectCoercible = require('es-abstract/2020/RequireObjectCoercible');
var callBound = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

module.exports = function values(O) {
	var obj = RequireObjectCoercible(O);
	var vals = [];
	for (var key in obj) {
		if ($isEnumerable(obj, key)) { // checks own-ness as well
			vals.push(obj[key]);
		}
	}
	return vals;
};
