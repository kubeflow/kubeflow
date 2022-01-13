import _typeof from "@babel/runtime/helpers/esm/typeof";
export function getTypeByValue(value) {
  var valueType = _typeof(value);

  switch (valueType) {
    case 'number':
      if (Number.isNaN(value)) {
        return 'NaN';
      }

      if (!Number.isFinite(value)) {
        return 'Infinity';
      }

      if (value !== Math.floor(value)) {
        return 'float';
      }

      return 'number';

    case 'object':
      if (value === null) {
        return 'null';
      }

      return value.constructor.name;

    default:
      return valueType;
  }
} // IE 11 support

function ponyfillIsInteger(x) {
  // eslint-disable-next-line no-restricted-globals
  return typeof x === 'number' && isFinite(x) && Math.floor(x) === x;
}

var isInteger = Number.isInteger || ponyfillIsInteger;

function requiredInteger(props, propName, componentName, location) {
  var propValue = props[propName];

  if (propValue == null || !isInteger(propValue)) {
    var propType = getTypeByValue(propValue);
    return new RangeError("Invalid ".concat(location, " `").concat(propName, "` of type `").concat(propType, "` supplied to `").concat(componentName, "`, expected `integer`."));
  }

  return null;
}

function validator(props, propName) {
  var propValue = props[propName];

  if (propValue === undefined) {
    return null;
  }

  for (var _len = arguments.length, other = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    other[_key - 2] = arguments[_key];
  }

  return requiredInteger.apply(void 0, [props, propName].concat(other));
}

function validatorNoop() {
  return null;
}

validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;
export default process.env.NODE_ENV === 'production' ? validatorNoop : validator;