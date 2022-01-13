"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlNode = void 0;
const escape_attribute_1 = require("./escape-attribute");
/**
 * Represents an XML node.
 */
class XmlNode {
    constructor(name, children = []) {
        this.name = name;
        this.children = children;
        this.attributes = {};
    }
    withName(name) {
        this.name = name;
        return this;
    }
    addAttribute(name, value) {
        this.attributes[name] = value;
        return this;
    }
    addChildNode(child) {
        this.children.push(child);
        return this;
    }
    removeAttribute(name) {
        delete this.attributes[name];
        return this;
    }
    toString() {
        const hasChildren = Boolean(this.children.length);
        let xmlText = `<${this.name}`;
        // add attributes
        const attributes = this.attributes;
        for (const attributeName of Object.keys(attributes)) {
            const attribute = attributes[attributeName];
            if (typeof attribute !== "undefined" && attribute !== null) {
                xmlText += ` ${attributeName}="${escape_attribute_1.escapeAttribute("" + attribute)}"`;
            }
        }
        return (xmlText += !hasChildren ? "/>" : `>${this.children.map((c) => c.toString()).join("")}</${this.name}>`);
    }
}
exports.XmlNode = XmlNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWG1sTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9YbWxOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUFxRDtBQUdyRDs7R0FFRztBQUNILE1BQWEsT0FBTztJQUdsQixZQUFvQixJQUFZLEVBQWtCLFdBQXlCLEVBQUU7UUFBekQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFrQixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUZyRSxlQUFVLEdBQTRCLEVBQUUsQ0FBQztJQUUrQixDQUFDO0lBRWpGLFFBQVEsQ0FBQyxJQUFZO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFZLEVBQUUsS0FBVTtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBaUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsZUFBZSxDQUFDLElBQVk7UUFDMUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixpQkFBaUI7UUFDakIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxLQUFLLE1BQU0sYUFBYSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbkQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVDLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7Z0JBQzFELE9BQU8sSUFBSSxJQUFJLGFBQWEsS0FBSyxrQ0FBZSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO2FBQ3JFO1NBQ0Y7UUFFRCxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNqSCxDQUFDO0NBQ0Y7QUF2Q0QsMEJBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXNjYXBlQXR0cmlidXRlIH0gZnJvbSBcIi4vZXNjYXBlLWF0dHJpYnV0ZVwiO1xuaW1wb3J0IHsgU3RyaW5nYWJsZSB9IGZyb20gXCIuL3N0cmluZ2FibGVcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBub2RlLlxuICovXG5leHBvcnQgY2xhc3MgWG1sTm9kZSB7XG4gIHByaXZhdGUgYXR0cmlidXRlczogeyBbbmFtZTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5hbWU6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IGNoaWxkcmVuOiBTdHJpbmdhYmxlW10gPSBbXSkge31cblxuICB3aXRoTmFtZShuYW1lOiBzdHJpbmcpOiBYbWxOb2RlIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkQXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IFhtbE5vZGUge1xuICAgIHRoaXMuYXR0cmlidXRlc1tuYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkQ2hpbGROb2RlKGNoaWxkOiBTdHJpbmdhYmxlKTogWG1sTm9kZSB7XG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiBYbWxOb2RlIHtcbiAgICBkZWxldGUgdGhpcy5hdHRyaWJ1dGVzW25hbWVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBjb25zdCBoYXNDaGlsZHJlbiA9IEJvb2xlYW4odGhpcy5jaGlsZHJlbi5sZW5ndGgpO1xuICAgIGxldCB4bWxUZXh0ID0gYDwke3RoaXMubmFtZX1gO1xuICAgIC8vIGFkZCBhdHRyaWJ1dGVzXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcztcbiAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZU5hbWUgb2YgT2JqZWN0LmtleXMoYXR0cmlidXRlcykpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XG4gICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhdHRyaWJ1dGUgIT09IG51bGwpIHtcbiAgICAgICAgeG1sVGV4dCArPSBgICR7YXR0cmlidXRlTmFtZX09XCIke2VzY2FwZUF0dHJpYnV0ZShcIlwiICsgYXR0cmlidXRlKX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICh4bWxUZXh0ICs9ICFoYXNDaGlsZHJlbiA/IFwiLz5cIiA6IGA+JHt0aGlzLmNoaWxkcmVuLm1hcCgoYykgPT4gYy50b1N0cmluZygpKS5qb2luKFwiXCIpfTwvJHt0aGlzLm5hbWV9PmApO1xuICB9XG59XG4iXX0=