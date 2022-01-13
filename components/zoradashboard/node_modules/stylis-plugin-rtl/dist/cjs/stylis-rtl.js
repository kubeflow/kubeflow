"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cssjanus_1 = __importDefault(require("cssjanus"));
var stylis_1 = require("stylis");
function stringifyPreserveComments(element, index, children) {
    switch (element.type) {
        case stylis_1.IMPORT:
        case stylis_1.DECLARATION:
        case stylis_1.COMMENT:
            return (element.return = element.return || element.value);
        case stylis_1.RULESET: {
            element.value = Array.isArray(element.props) ? element.props.join(',') : element.props;
            if (Array.isArray(element.children)) {
                element.children.forEach(function (x) {
                    if (x.type === stylis_1.COMMENT)
                        x.children = x.value;
                });
            }
        }
    }
    var serializedChildren = stylis_1.serialize(Array.prototype.concat(element.children), stringifyPreserveComments);
    return stylis_1.strlen(serializedChildren) ? (element.return = element.value + '{' + serializedChildren + '}') : '';
}
function stylisRTLPlugin(element, index, children, callback) {
    if (element.type === stylis_1.KEYFRAMES ||
        element.type === stylis_1.SUPPORTS ||
        (element.type === stylis_1.RULESET && (!element.parent || element.parent.type === stylis_1.MEDIA || element.parent.type === stylis_1.RULESET))) {
        var stringified = cssjanus_1.default.transform(stringifyPreserveComments(element, index, children));
        element.children = stringified ? stylis_1.compile(stringified)[0].children : [];
        element.return = '';
    }
}
// stable identifier that will not be dropped by minification unless the whole module
// is unused
Object.defineProperty(stylisRTLPlugin, 'name', { value: 'stylisRTLPlugin' });
exports.default = stylisRTLPlugin;
//# sourceMappingURL=stylis-rtl.js.map