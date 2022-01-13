import has from 'lodash/has'; // @ts-expect-error

import toposort from 'toposort';
import { split } from 'property-expr';
import Ref from '../Reference';
import isSchema from './isSchema';
export default function sortFields(fields, excludes = []) {
  let edges = [];
  let nodes = [];

  function addNode(depPath, key) {
    var node = split(depPath)[0];
    if (!~nodes.indexOf(node)) nodes.push(node);
    if (!~excludes.indexOf(`${key}-${node}`)) edges.push([key, node]);
  }

  for (const key in fields) if (has(fields, key)) {
    let value = fields[key];
    if (!~nodes.indexOf(key)) nodes.push(key);
    if (Ref.isRef(value) && value.isSibling) addNode(value.path, key);else if (isSchema(value) && 'deps' in value) value.deps.forEach(path => addNode(path, key));
  }

  return toposort.array(nodes, edges).reverse();
}