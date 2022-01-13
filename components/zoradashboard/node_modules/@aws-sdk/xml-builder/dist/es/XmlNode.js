import { __values } from "tslib";
import { escapeAttribute } from "./escape-attribute";
/**
 * Represents an XML node.
 */
var XmlNode = /** @class */ (function () {
    function XmlNode(name, children) {
        if (children === void 0) { children = []; }
        this.name = name;
        this.children = children;
        this.attributes = {};
    }
    XmlNode.prototype.withName = function (name) {
        this.name = name;
        return this;
    };
    XmlNode.prototype.addAttribute = function (name, value) {
        this.attributes[name] = value;
        return this;
    };
    XmlNode.prototype.addChildNode = function (child) {
        this.children.push(child);
        return this;
    };
    XmlNode.prototype.removeAttribute = function (name) {
        delete this.attributes[name];
        return this;
    };
    XmlNode.prototype.toString = function () {
        var e_1, _a;
        var hasChildren = Boolean(this.children.length);
        var xmlText = "<" + this.name;
        // add attributes
        var attributes = this.attributes;
        try {
            for (var _b = __values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var attributeName = _c.value;
                var attribute = attributes[attributeName];
                if (typeof attribute !== "undefined" && attribute !== null) {
                    xmlText += " " + attributeName + "=\"" + escapeAttribute("" + attribute) + "\"";
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return (xmlText += !hasChildren ? "/>" : ">" + this.children.map(function (c) { return c.toString(); }).join("") + "</" + this.name + ">");
    };
    return XmlNode;
}());
export { XmlNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWG1sTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9YbWxOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHckQ7O0dBRUc7QUFDSDtJQUdFLGlCQUFvQixJQUFZLEVBQWtCLFFBQTJCO1FBQTNCLHlCQUFBLEVBQUEsYUFBMkI7UUFBekQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFrQixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUZyRSxlQUFVLEdBQTRCLEVBQUUsQ0FBQztJQUUrQixDQUFDO0lBRWpGLDBCQUFRLEdBQVIsVUFBUyxJQUFZO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxJQUFZLEVBQUUsS0FBVTtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCw4QkFBWSxHQUFaLFVBQWEsS0FBaUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsaUNBQWUsR0FBZixVQUFnQixJQUFZO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwwQkFBUSxHQUFSOztRQUNFLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksT0FBTyxHQUFHLE1BQUksSUFBSSxDQUFDLElBQU0sQ0FBQztRQUM5QixpQkFBaUI7UUFDakIsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7WUFDbkMsS0FBNEIsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBaEQsSUFBTSxhQUFhLFdBQUE7Z0JBQ3RCLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtvQkFDMUQsT0FBTyxJQUFJLE1BQUksYUFBYSxXQUFLLGVBQWUsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLE9BQUcsQ0FBQztpQkFDckU7YUFDRjs7Ozs7Ozs7O1FBRUQsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBSyxJQUFJLENBQUMsSUFBSSxNQUFHLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlc2NhcGVBdHRyaWJ1dGUgfSBmcm9tIFwiLi9lc2NhcGUtYXR0cmlidXRlXCI7XG5pbXBvcnQgeyBTdHJpbmdhYmxlIH0gZnJvbSBcIi4vc3RyaW5nYWJsZVwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIG5vZGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBYbWxOb2RlIHtcbiAgcHJpdmF0ZSBhdHRyaWJ1dGVzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmFtZTogc3RyaW5nLCBwdWJsaWMgcmVhZG9ubHkgY2hpbGRyZW46IFN0cmluZ2FibGVbXSA9IFtdKSB7fVxuXG4gIHdpdGhOYW1lKG5hbWU6IHN0cmluZyk6IFhtbE5vZGUge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogWG1sTm9kZSB7XG4gICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRDaGlsZE5vZGUoY2hpbGQ6IFN0cmluZ2FibGUpOiBYbWxOb2RlIHtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWU6IHN0cmluZyk6IFhtbE5vZGUge1xuICAgIGRlbGV0ZSB0aGlzLmF0dHJpYnV0ZXNbbmFtZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IGhhc0NoaWxkcmVuID0gQm9vbGVhbih0aGlzLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgbGV0IHhtbFRleHQgPSBgPCR7dGhpcy5uYW1lfWA7XG4gICAgLy8gYWRkIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzO1xuICAgIGZvciAoY29uc3QgYXR0cmlidXRlTmFtZSBvZiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSkge1xuICAgICAgY29uc3QgYXR0cmlidXRlID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmIGF0dHJpYnV0ZSAhPT0gbnVsbCkge1xuICAgICAgICB4bWxUZXh0ICs9IGAgJHthdHRyaWJ1dGVOYW1lfT1cIiR7ZXNjYXBlQXR0cmlidXRlKFwiXCIgKyBhdHRyaWJ1dGUpfVwiYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKHhtbFRleHQgKz0gIWhhc0NoaWxkcmVuID8gXCIvPlwiIDogYD4ke3RoaXMuY2hpbGRyZW4ubWFwKChjKSA9PiBjLnRvU3RyaW5nKCkpLmpvaW4oXCJcIil9PC8ke3RoaXMubmFtZX0+YCk7XG4gIH1cbn1cbiJdfQ==