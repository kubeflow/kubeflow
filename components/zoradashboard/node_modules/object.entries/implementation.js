'use strict';

var RequireObjectCoercible = require('es-abstract/2020/RequireObjectCoercible');
var callBound = require('call-bind/callBound');
var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

module.exports = function entries(O) {
	var obj = RequireObjectCoercible(O);
	var entrys = [];
	for (var key in obj) {
		if ($isEnumerable(obj, key)) { // checks own-ness as well
			entrys.push([key, obj[key]]);
		}
	}
	return entrys;
};
