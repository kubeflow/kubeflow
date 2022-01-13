import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { unstable_capitalize as capitalize } from '@material-ui/utils';

function isEmpty(string) {
  return string.length === 0;
}
/**
 * Generates string classKey based on the properties provided. It starts with the
 * variant if defined, and then it appends all other properties in alphabetical order.
 * @param {object} props - the properties for which the classKey should be created.
 */


export default function propsToClassKey(props) {
  var variant = props.variant,
      other = _objectWithoutProperties(props, ["variant"]);

  var classKey = variant || '';
  Object.keys(other).sort().forEach(function (key) {
    if (key === 'color') {
      classKey += isEmpty(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += "".concat(isEmpty(classKey) ? key : capitalize(key)).concat(capitalize(props[key].toString()));
    }
  });
  return classKey;
}