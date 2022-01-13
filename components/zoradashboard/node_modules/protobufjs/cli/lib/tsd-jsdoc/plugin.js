"use strict";
exports.defineTags = function(dictionary) {

    dictionary.defineTag("template", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            (doclet.templates || (doclet.templates = [])).push(tag.text);
        }
    });

    dictionary.defineTag("tstype", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            doclet.tsType = tag.text;
        }
    });
};
