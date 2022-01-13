import cssjanus from 'cssjanus';
import { COMMENT, compile, DECLARATION, IMPORT, RULESET, serialize, strlen, KEYFRAMES, MEDIA, SUPPORTS, } from 'stylis';
function stringifyPreserveComments(element, index, children) {
    switch (element.type) {
        case IMPORT:
        case DECLARATION:
        case COMMENT:
            return (element.return = element.return || element.value);
        case RULESET: {
            element.value = Array.isArray(element.props) ? element.props.join(',') : element.props;
            if (Array.isArray(element.children)) {
                element.children.forEach(function (x) {
                    if (x.type === COMMENT)
                        x.children = x.value;
                });
            }
        }
    }
    var serializedChildren = serialize(Array.prototype.concat(element.children), stringifyPreserveComments);
    return strlen(serializedChildren) ? (element.return = element.value + '{' + serializedChildren + '}') : '';
}
function stylisRTLPlugin(element, index, children, callback) {
    if (element.type === KEYFRAMES ||
        element.type === SUPPORTS ||
        (element.type === RULESET && (!element.parent || element.parent.type === MEDIA || element.parent.type === RULESET))) {
        var stringified = cssjanus.transform(stringifyPreserveComments(element, index, children));
        element.children = stringified ? compile(stringified)[0].children : [];
        element.return = '';
    }
}
// stable identifier that will not be dropped by minification unless the whole module
// is unused
Object.defineProperty(stylisRTLPlugin, 'name', { value: 'stylisRTLPlugin' });
export default stylisRTLPlugin;
//# sourceMappingURL=stylis-rtl.js.map