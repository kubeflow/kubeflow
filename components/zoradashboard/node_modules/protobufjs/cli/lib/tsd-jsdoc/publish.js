"use strict";

var fs = require("fs");

// output stream
var out = null;

// documentation data
var data = null;

// already handled objects, by name
var seen = {};

// indentation level
var indent = 0;

// whether indent has been written for the current line yet
var indentWritten = false;

// provided options
var options = {};

// queued interfaces
var queuedInterfaces = [];

// whether writing the first line
var firstLine = true;

// JSDoc hook
exports.publish = function publish(taffy, opts) {
    options = opts || {};

    // query overrides options
    if (options.query)
        Object.keys(options.query).forEach(function(key) {
            if (key !== "query")
                switch (options[key] = options.query[key]) {
                    case "true":
                        options[key] = true;
                        break;
                    case "false":
                        options[key] = false;
                        break;
                    case "null":
                        options[key] = null;
                        break;
                }
        });

    // remove undocumented
    taffy({ undocumented: true }).remove();
    taffy({ ignore: true }).remove();
    taffy({ inherited: true }).remove();

    // remove private
    if (!options.private)
        taffy({ access: "private" }).remove();

    // setup output
    out = options.destination
        ? fs.createWriteStream(options.destination)
        : process.stdout;

    try {
        // setup environment
        data = taffy().get();
        indent = 0;
        indentWritten = false;
        firstLine = true;

        // wrap everything in a module if configured
        if (options.module) {
            writeln("export = ", options.module, ";");
            writeln();
            writeln("declare namespace ", options.module, " {");
            writeln();
            ++indent;
        }

        // handle all
        getChildrenOf(undefined).forEach(function(child) {
            handleElement(child, null);
        });

        // process queued
        while (queuedInterfaces.length) {
            var element = queuedInterfaces.shift();
            begin(element);
            writeInterface(element);
            writeln(";");
        }

        // end wrap
        if (options.module) {
            --indent;
            writeln("}");
        }

        // close file output
        if (out !== process.stdout)
            out.end();

    } finally {
        // gc environment objects
        out = data = null;
        seen = options = {};
        queuedInterfaces = [];
    }
};

//
// Utility
//

// writes one or multiple strings
function write() {
    var s = Array.prototype.slice.call(arguments).join("");
    if (!indentWritten) {
        for (var i = 0; i < indent; ++i)
            s = "    " + s;
        indentWritten = true;
    }
    out.write(s);
    firstLine = false;
}

// writes zero or multiple strings, followed by a new line
function writeln() {
    var s = Array.prototype.slice.call(arguments).join("");
    if (s.length)
        write(s, "\n");
    else if (!firstLine)
        out.write("\n");
    indentWritten = false;
}

var keepTags = [
    "param",
    "returns",
    "throws",
    "see"
];

// parses a comment into text and tags
function parseComment(comment) {
    var lines = comment.replace(/^ *\/\*\* *|^ *\*\/| *\*\/ *$|^ *\* */mg, "").trim().split(/\r?\n|\r/g); // property.description has just "\r" ?!
    var desc;
    var text = [];
    var tags = null;
    for (var i = 0; i < lines.length; ++i) {
        var match = /^@(\w+)\b/.exec(lines[i]);
        if (match) {
            if (!tags) {
                tags = [];
                desc = text;
            }
            text = [];
            tags.push({ name: match[1], text: text });
            lines[i] = lines[i].substring(match[1].length + 1).trim();
        }
        if (lines[i].length || text.length)
            text.push(lines[i]);
    }
    return {
        text: desc || text,
        tags: tags || []
    };
}

// writes a comment
function writeComment(comment, otherwiseNewline) {
    if (!comment || options.comments === false) {
        if (otherwiseNewline)
            writeln();
        return;
    }
    if (typeof comment !== "object")
        comment = parseComment(comment);
    comment.tags = comment.tags.filter(function(tag) {
        return keepTags.indexOf(tag.name) > -1 && (tag.name !== "returns" || tag.text[0] !== "{undefined}");
    });
    writeln();
    if (!comment.tags.length && comment.text.length < 2) {
        writeln("/** " + comment.text[0] + " */");
        return;
    }
    writeln("/**");
    comment.text.forEach(function(line) {
        if (line.length)
            writeln(" * ", line);
        else
            writeln(" *");
    });
    comment.tags.forEach(function(tag) {
        var started = false;
        if (tag.text.length) {
            tag.text.forEach(function(line, i) {
                if (i > 0)
                    write(" * ");
                else if (tag.name !== "throws")
                    line = line.replace(/^\{[^\s]*} ?/, "");
                if (!line.length)
                    return;
                if (!started) {
                    write(" * @", tag.name, " ");
                    started = true;
                }
                writeln(line);
            });
        }
    });
    writeln(" */");
}

// recursively replaces all occurencies of re's match
function replaceRecursive(name, re, fn) {
    var found;

    function replacer() {
        found = true;
        return fn.apply(null, arguments);
    }

    do {
        found = false;
        name = name.replace(re, replacer);
    } while (found);
    return name;
}

// tests if an element is considered to be a class or class-like
function isClassLike(element) {
    return isClass(element) || isInterface(element);
}

// tests if an element is considered to be a class
function isClass(element) {
    return element && element.kind === "class";
}

// tests if an element is considered to be an interface
function isInterface(element) {
    return element && (element.kind === "interface" || element.kind === "mixin");
}

// tests if an element is considered to be a namespace
function isNamespace(element) {
    return element && (element.kind === "namespace" || element.kind === "module");
}

// gets all children of the specified parent
function getChildrenOf(parent) {
    var memberof = parent ? parent.longname : undefined;
    return data.filter(function(element) {
        return element.memberof === memberof;
    });
}

// gets the literal type of an element
function getTypeOf(element) {
    if (element.tsType)
        return element.tsType.replace(/\r?\n|\r/g, "\n");
    var name = "any";
    var type = element.type;
    if (type && type.names && type.names.length) {
        if (type.names.length === 1)
            name = element.type.names[0].trim();
        else
            name = "(" + element.type.names.join("|") + ")";
    } else
        return name;

    // Replace catchalls with any
    name = name.replace(/\*|\bmixed\b/g, "any");

    // Ensure upper case Object for map expressions below
    name = name.replace(/\bobject\b/g, "Object");

    // Correct Something.<Something> to Something<Something>
    name = replaceRecursive(name, /\b(?!Object|Array)([\w$]+)\.<([^>]*)>/gi, function($0, $1, $2) {
        return $1 + "<" + $2 + ">";
    });

    // Replace Array.<string> with string[]
    name = replaceRecursive(name, /\bArray\.?<([^>]*)>/gi, function($0, $1) {
        return $1 + "[]";
    });

    // Replace Object.<string,number> with { [k: string]: number }
    name = replaceRecursive(name, /\bObject\.?<([^,]*), *([^>]*)>/gi, function($0, $1, $2) {
        return "{ [k: " + $1 + "]: " + $2 + " }";
    });

    // Replace functions (there are no signatures) with Function
    name = name.replace(/\bfunction(?:\(\))?\b/g, "Function");

    // Convert plain Object back to just object
    name = name.replace(/\b(Object\b(?!\.))/g, function($0, $1) {
        return $1.toLowerCase();
    });

    return name;
}

// begins writing the definition of the specified element
function begin(element, is_interface) {
    if (!seen[element.longname]) {
        if (isClass(element)) {
            var comment = parseComment(element.comment);
            var classdesc = comment.tags.find(function(tag) { return tag.name === "classdesc"; });
            if (classdesc) {
                comment.text = classdesc.text;
                comment.tags = [];
            }
            writeComment(comment, true);
        } else
            writeComment(element.comment, is_interface || isClassLike(element) || isNamespace(element) || element.isEnum || element.scope === "global");
        seen[element.longname] = element;
    } else
        writeln();
    // ????: something changed in JSDoc 3.6.0? so that @exports + @enum does
    // no longer yield a 'global' scope, but is some sort of unscoped module
    // element now. The additional condition added below works around this.
    if ((element.scope === "global" || element.isEnum && element.scope === undefined) && !options.module)
        write("export ");
}

// writes the function signature describing element
function writeFunctionSignature(element, isConstructor, isTypeDef) {
    write("(");

    var params = {};

    // this type
    if (element.this)
        params["this"] = {
            type: element.this.replace(/^{|}$/g, ""),
            optional: false
        };

    // parameter types
    if (element.params)
        element.params.forEach(function(param) {
            var path = param.name.split(/\./g);
            if (path.length === 1)
                params[param.name] = {
                    type: getTypeOf(param),
                    variable: param.variable === true,
                    optional: param.optional === true,
                    defaultValue: param.defaultvalue // Not used yet (TODO)
                };
            else // Property syntax (TODO)
                params[path[0]].type = "{ [k: string]: any }";
        });

    var paramNames = Object.keys(params);
    paramNames.forEach(function(name, i) {
        var param = params[name];
        var type = param.type;
        if (param.variable) {
            name = "..." + name;
            type = param.type.charAt(0) === "(" ? "any[]" : param.type + "[]";
        }
        write(name, !param.variable && param.optional ? "?: " : ": ", type);
        if (i < paramNames.length - 1)
            write(", ");
    });

    write(")");

    // return type
    if (!isConstructor) {
        write(isTypeDef ? " => " : ": ");
        var typeName;
        if (element.returns && element.returns.length && (typeName = getTypeOf(element.returns[0])) !== "undefined")
            write(typeName);
        else
            write("void");
    }
}

// writes (a typedef as) an interface
function writeInterface(element) {
    write("interface ", element.name);
    writeInterfaceBody(element);
    writeln();
}

function writeInterfaceBody(element) {
    writeln("{");
    ++indent;
    if (element.tsType)
        writeln(element.tsType.replace(/\r?\n|\r/g, "\n"));
    else if (element.properties && element.properties.length)
        element.properties.forEach(writeProperty);
    --indent;
    write("}");
}

function writeProperty(property, declare) {
    writeComment(property.description);
    if (declare)
        write("let ");
    write(property.name);
    if (property.optional)
        write("?");
    writeln(": ", getTypeOf(property), ";");
}

//
// Handlers
//

// handles a single element of any understood type
function handleElement(element, parent) {
    if (element.scope === "inner")
        return false;

    if (element.optional !== true && element.type && element.type.names && element.type.names.length) {
        for (var i = 0; i < element.type.names.length; i++) {
            if (element.type.names[i].toLowerCase() === "undefined") {
                // This element is actually optional. Set optional to true and
                // remove the 'undefined' type
                element.optional = true;
                element.type.names.splice(i, 1);
                i--;
            }
        }
    }

    if (seen[element.longname])
        return true;
    if (isClassLike(element))
        handleClass(element, parent);
    else switch (element.kind) {
        case "module":
            if (element.isEnum) {
                handleEnum(element, parent);
                break;
            }
            // eslint-disable-line no-fallthrough
        case "namespace":
            handleNamespace(element, parent);
            break;
        case "constant":
        case "member":
            handleMember(element, parent);
            break;
        case "function":
            handleFunction(element, parent);
            break;
        case "typedef":
            handleTypeDef(element, parent);
            break;
        case "package":
            break;
    }
    seen[element.longname] = element;
    return true;
}

// handles (just) a namespace
function handleNamespace(element/*, parent*/) {
    var children = getChildrenOf(element);
    if (!children.length)
        return;
    var first = true;
    if (element.properties)
        element.properties.forEach(function(property) {
            if (!/^[$\w]+$/.test(property.name)) // incompatible in namespace
                return;
            if (first) {
                begin(element);
                writeln("namespace ", element.name, " {");
                ++indent;
                first = false;
            }
            writeProperty(property, true);
        });
    children.forEach(function(child) {
        if (child.scope === "inner" || seen[child.longname])
            return;
        if (first) {
            begin(element);
            writeln("namespace ", element.name, " {");
            ++indent;
            first = false;
        }
        handleElement(child, element);
    });
    if (!first) {
        --indent;
        writeln("}");
    }
}

// a filter function to remove any module references
function notAModuleReference(ref) {
    return ref.indexOf("module:") === -1;
}

// handles a class or class-like
function handleClass(element, parent) {
    var is_interface = isInterface(element);
    begin(element, is_interface);
    if (is_interface)
        write("interface ");
    else {
        if (element.virtual)
            write("abstract ");
        write("class ");
    }
    write(element.name);
    if (element.templates && element.templates.length)
        write("<", element.templates.join(", "), ">");
    write(" ");

    // extended classes
    if (element.augments) {
        var augments = element.augments.filter(notAModuleReference);
        if (augments.length)
            write("extends ", augments[0], " ");
    }

    // implemented interfaces
    var impls = [];
    if (element.implements)
        Array.prototype.push.apply(impls, element.implements);
    if (element.mixes)
        Array.prototype.push.apply(impls, element.mixes);
    impls = impls.filter(notAModuleReference);
    if (impls.length)
        write("implements ", impls.join(", "), " ");

    writeln("{");
    ++indent;

    if (element.tsType)
        writeln(element.tsType.replace(/\r?\n|\r/g, "\n"));

    // constructor
    if (!is_interface && !element.virtual)
        handleFunction(element, parent, true);

    // properties
    if (is_interface && element.properties)
        element.properties.forEach(function(property) {
            writeProperty(property);
        });

    // class-compatible members
    var incompatible = [];
    getChildrenOf(element).forEach(function(child) {
        if (isClassLike(child) || child.kind === "module" || child.kind === "typedef" || child.isEnum) {
            incompatible.push(child);
            return;
        }
        handleElement(child, element);
    });

    --indent;
    writeln("}");

    // class-incompatible members
    if (incompatible.length) {
        writeln();
        if (element.scope === "global" && !options.module)
            write("export ");
        writeln("namespace ", element.name, " {");
        ++indent;
        incompatible.forEach(function(child) {
            handleElement(child, element);
        });
        --indent;
        writeln("}");
    }
}

// handles an enum
function handleEnum(element) {
    begin(element);

    var stringEnum = false;
    element.properties.forEach(function(property) {
        if (isNaN(property.defaultvalue)) {
            stringEnum = true;
        }
    });
    if (stringEnum) {
        writeln("type ", element.name, " =");
        ++indent;
        element.properties.forEach(function(property, i) {
            write(i === 0 ? "" : "| ", JSON.stringify(property.defaultvalue));
        });
        --indent;
        writeln(";");
    } else {
        writeln("enum ", element.name, " {");
        ++indent;
        element.properties.forEach(function(property, i) {
            write(property.name);
            if (property.defaultvalue !== undefined)
                write(" = ", JSON.stringify(property.defaultvalue));
            if (i < element.properties.length - 1)
                writeln(",");
            else
                writeln();
        });
        --indent;
        writeln("}");
    }
}

// handles a namespace or class member
function handleMember(element, parent) {
    if (element.isEnum) {
        handleEnum(element);
        return;
    }
    begin(element);

    var inClass = isClassLike(parent);
    if (inClass) {
        write(element.access || "public", " ");
        if (element.scope === "static")
            write("static ");
        if (element.readonly)
            write("readonly ");
    } else
        write(element.kind === "constant" ? "const " : "let ");

    write(element.name);
    if (element.optional)
        write("?");
    write(": ");

    if (element.type && element.type.names && /^Object\b/i.test(element.type.names[0]) && element.properties) {
        writeln("{");
        ++indent;
        element.properties.forEach(function(property, i) {
            writeln(JSON.stringify(property.name), ": ", getTypeOf(property), i < element.properties.length - 1 ? "," : "");
        });
        --indent;
        writeln("};");
    } else
        writeln(getTypeOf(element), ";");
}

// handles a function or method
function handleFunction(element, parent, isConstructor) {
    var insideClass = true;
    if (isConstructor) {
        writeComment(element.comment);
        write("constructor");
    } else {
        begin(element);
        insideClass = isClassLike(parent);
        if (insideClass) {
            write(element.access || "public", " ");
            if (element.scope === "static")
                write("static ");
        } else
            write("function ");
        write(element.name);
        if (element.templates && element.templates.length)
            write("<", element.templates.join(", "), ">");
    }
    writeFunctionSignature(element, isConstructor, false);
    writeln(";");
    if (!insideClass)
        handleNamespace(element);
}

// handles a type definition (not a real type)
function handleTypeDef(element, parent) {
    if (isInterface(element)) {
        if (isClassLike(parent))
            queuedInterfaces.push(element);
        else {
            begin(element);
            writeInterface(element);
        }
    } else {
        writeComment(element.comment, true);
        write("type ", element.name);
        if (element.templates && element.templates.length)
            write("<", element.templates.join(", "), ">");
        write(" = ");
        if (element.tsType)
            write(element.tsType.replace(/\r?\n|\r/g, "\n"));
        else {
            var type = getTypeOf(element);
            if (element.type && element.type.names.length === 1 && element.type.names[0] === "function")
                writeFunctionSignature(element, false, true);
            else if (type === "object") {
                if (element.properties && element.properties.length)
                    writeInterfaceBody(element);
                else
                    write("{}");
            } else
                write(type);
        }
        writeln(";");
    }
}
