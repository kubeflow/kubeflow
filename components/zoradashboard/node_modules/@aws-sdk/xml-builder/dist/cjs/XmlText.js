"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlText = void 0;
const escape_element_1 = require("./escape-element");
/**
 * Represents an XML text value.
 */
class XmlText {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return escape_element_1.escapeElement("" + this.value);
    }
}
exports.XmlText = XmlText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWG1sVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9YbWxUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRDs7R0FFRztBQUNILE1BQWEsT0FBTztJQUNsQixZQUFvQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFHLENBQUM7SUFFckMsUUFBUTtRQUNOLE9BQU8sOEJBQWEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQU5ELDBCQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXNjYXBlRWxlbWVudCB9IGZyb20gXCIuL2VzY2FwZS1lbGVtZW50XCI7XG5pbXBvcnQgeyBTdHJpbmdhYmxlIH0gZnJvbSBcIi4vc3RyaW5nYWJsZVwiO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCB0ZXh0IHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgWG1sVGV4dCBpbXBsZW1lbnRzIFN0cmluZ2FibGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbHVlOiBzdHJpbmcpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXNjYXBlRWxlbWVudChcIlwiICsgdGhpcy52YWx1ZSk7XG4gIH1cbn1cbiJdfQ==