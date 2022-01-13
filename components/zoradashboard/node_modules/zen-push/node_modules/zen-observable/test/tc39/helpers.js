function testLength(test, value, length) {

    if (typeof value !== "function" || typeof length !== "number")
        return;

    test._("Function length is " + length)
    .equals(value.length, length);
}

export function testMethodProperty(test, object, key, options) {

    let desc = Object.getOwnPropertyDescriptor(object, key);

    test._(`Property ${ key.toString() } exists on the object`)
    .equals(Boolean(desc), true);

    if (!desc)
        return;

    if (options.get || options.set) {

        test._(`Property ${ options.get ? "has" : "does not have" } a getter`)
        .equals(typeof desc.get, options.get ? "function" : "undefined");

        testLength(test, desc.get, 0);

        test._(`Property ${ options.set ? "has" : "does not have" } a setter`)
        .equals(typeof desc.set, options.set ? "function" : "undefined");

        testLength(test, desc.set, 1);

    } else {

        test._("Property has a function value")
        .equals(typeof desc.value, "function");

        testLength(test, desc.value, options.length);

        test._(`Property is ${ options.writable ? "" : "non-" }writable`)
        .equals(desc.writable, Boolean(options.writable));
    }


    test
    ._(`Property is ${ options.enumerable ? "" : "non-" }enumerable`)
    .equals(desc.enumerable, Boolean(options.enumerable))
    ._(`Property is ${ options.configurable ? "" : "non-" }configurable`)
    .equals(desc.configurable, Boolean(options.configurable))
    ;

}

export function hasSymbol(name) {

    return typeof Symbol === "function" && Boolean(Symbol[name]);
}

export function getSymbol(name) {

    return hasSymbol(name) ? Symbol[name] : "@@" + name;
}
