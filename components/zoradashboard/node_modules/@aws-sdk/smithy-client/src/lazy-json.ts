/**
 * Lazy String holder for JSON typed contents.
 */

interface StringWrapper {
  new (arg: any): String;
}

/**
 * Because of https://github.com/microsoft/tslib/issues/95,
 * TS 'extends' shim doesn't support extending native types like String.
 * So here we create StringWrapper that duplicate everything from String
 * class including its prototype chain. So we can extend from here.
 */
// @ts-ignore StringWrapper implementation is not a simple constructor
export const StringWrapper: StringWrapper = function () {
  //@ts-ignore 'this' cannot be assigned to any, but Object.getPrototypeOf accepts any
  const Class = Object.getPrototypeOf(this).constructor;
  const Constructor = Function.bind.apply(String, [null as any, ...arguments]);
  //@ts-ignore Call wrapped String constructor directly, don't bother typing it.
  const instance = new Constructor();
  Object.setPrototypeOf(instance, Class.prototype);
  return instance as String;
};
StringWrapper.prototype = Object.create(String.prototype, {
  constructor: {
    value: StringWrapper,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
Object.setPrototypeOf(StringWrapper, String);

export class LazyJsonString extends StringWrapper {
  deserializeJSON(): any {
    return JSON.parse(super.toString());
  }

  toJSON(): string {
    return super.toString();
  }

  static fromObject(object: any): LazyJsonString {
    if (object instanceof LazyJsonString) {
      return object;
    } else if (object instanceof String || typeof object === "string") {
      return new LazyJsonString(object);
    }
    return new LazyJsonString(JSON.stringify(object));
  }
}
