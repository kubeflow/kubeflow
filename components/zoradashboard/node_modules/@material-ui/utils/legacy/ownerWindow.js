import ownerDocument from './ownerDocument';
export default function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc.defaultView || window;
}