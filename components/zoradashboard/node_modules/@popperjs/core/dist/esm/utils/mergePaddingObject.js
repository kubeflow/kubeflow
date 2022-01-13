import getFreshSideObject from "./getFreshSideObject.js";
export default function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}