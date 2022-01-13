import { escapeElement } from "./escape-element";
/**
 * Represents an XML text value.
 */
var XmlText = /** @class */ (function () {
    function XmlText(value) {
        this.value = value;
    }
    XmlText.prototype.toString = function () {
        return escapeElement("" + this.value);
    };
    return XmlText;
}());
export { XmlText };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWG1sVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9YbWxUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRDs7R0FFRztBQUNIO0lBQ0UsaUJBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUVyQywwQkFBUSxHQUFSO1FBQ0UsT0FBTyxhQUFhLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUFORCxJQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXNjYXBlRWxlbWVudCB9IGZyb20gXCIuL2VzY2FwZS1lbGVtZW50XCI7XG5pbXBvcnQgeyBTdHJpbmdhYmxlIH0gZnJvbSBcIi4vc3RyaW5nYWJsZVwiO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCB0ZXh0IHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgWG1sVGV4dCBpbXBsZW1lbnRzIFN0cmluZ2FibGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbHVlOiBzdHJpbmcpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXNjYXBlRWxlbWVudChcIlwiICsgdGhpcy52YWx1ZSk7XG4gIH1cbn1cbiJdfQ==