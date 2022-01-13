/**
 * Lazy String holder for JSON typed contents.
 */
import { __extends, __read, __spread } from "tslib";
/**
 * Because of https://github.com/microsoft/tslib/issues/95,
 * TS 'extends' shim doesn't support extending native types like String.
 * So here we create StringWrapper that duplicate everything from String
 * class including its prototype chain. So we can extend from here.
 */
// @ts-ignore StringWrapper implementation is not a simple constructor
export var StringWrapper = function () {
    //@ts-ignore 'this' cannot be assigned to any, but Object.getPrototypeOf accepts any
    var Class = Object.getPrototypeOf(this).constructor;
    var Constructor = Function.bind.apply(String, __spread([null], arguments));
    //@ts-ignore Call wrapped String constructor directly, don't bother typing it.
    var instance = new Constructor();
    Object.setPrototypeOf(instance, Class.prototype);
    return instance;
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
var LazyJsonString = /** @class */ (function (_super) {
    __extends(LazyJsonString, _super);
    function LazyJsonString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyJsonString.prototype.deserializeJSON = function () {
        return JSON.parse(_super.prototype.toString.call(this));
    };
    LazyJsonString.prototype.toJSON = function () {
        return _super.prototype.toString.call(this);
    };
    LazyJsonString.fromObject = function (object) {
        if (object instanceof LazyJsonString) {
            return object;
        }
        else if (object instanceof String || typeof object === "string") {
            return new LazyJsonString(object);
        }
        return new LazyJsonString(JSON.stringify(object));
    };
    return LazyJsonString;
}(StringWrapper));
export { LazyJsonString };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1qc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xhenktanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFNSDs7Ozs7R0FLRztBQUNILHNFQUFzRTtBQUN0RSxNQUFNLENBQUMsSUFBTSxhQUFhLEdBQWtCO0lBQzFDLG9GQUFvRjtJQUNwRixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUN0RCxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLFlBQUcsSUFBVyxHQUFLLFNBQVMsRUFBRSxDQUFDO0lBQzdFLDhFQUE4RTtJQUM5RSxJQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxPQUFPLFFBQWtCLENBQUM7QUFDNUIsQ0FBQyxDQUFDO0FBQ0YsYUFBYSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7SUFDeEQsV0FBVyxFQUFFO1FBQ1gsS0FBSyxFQUFFLGFBQWE7UUFDcEIsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFLElBQUk7UUFDZCxZQUFZLEVBQUUsSUFBSTtLQUNuQjtDQUNGLENBQUMsQ0FBQztBQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRTdDO0lBQW9DLGtDQUFhO0lBQWpEOztJQWlCQSxDQUFDO0lBaEJDLHdDQUFlLEdBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQU0sUUFBUSxXQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLE9BQU8saUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLHlCQUFVLEdBQWpCLFVBQWtCLE1BQVc7UUFDM0IsSUFBSSxNQUFNLFlBQVksY0FBYyxFQUFFO1lBQ3BDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTSxJQUFJLE1BQU0sWUFBWSxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ2pFLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBakJELENBQW9DLGFBQWEsR0FpQmhEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMYXp5IFN0cmluZyBob2xkZXIgZm9yIEpTT04gdHlwZWQgY29udGVudHMuXG4gKi9cblxuaW50ZXJmYWNlIFN0cmluZ1dyYXBwZXIge1xuICBuZXcgKGFyZzogYW55KTogU3RyaW5nO1xufVxuXG4vKipcbiAqIEJlY2F1c2Ugb2YgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC90c2xpYi9pc3N1ZXMvOTUsXG4gKiBUUyAnZXh0ZW5kcycgc2hpbSBkb2Vzbid0IHN1cHBvcnQgZXh0ZW5kaW5nIG5hdGl2ZSB0eXBlcyBsaWtlIFN0cmluZy5cbiAqIFNvIGhlcmUgd2UgY3JlYXRlIFN0cmluZ1dyYXBwZXIgdGhhdCBkdXBsaWNhdGUgZXZlcnl0aGluZyBmcm9tIFN0cmluZ1xuICogY2xhc3MgaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUgY2hhaW4uIFNvIHdlIGNhbiBleHRlbmQgZnJvbSBoZXJlLlxuICovXG4vLyBAdHMtaWdub3JlIFN0cmluZ1dyYXBwZXIgaW1wbGVtZW50YXRpb24gaXMgbm90IGEgc2ltcGxlIGNvbnN0cnVjdG9yXG5leHBvcnQgY29uc3QgU3RyaW5nV3JhcHBlcjogU3RyaW5nV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgLy9AdHMtaWdub3JlICd0aGlzJyBjYW5ub3QgYmUgYXNzaWduZWQgdG8gYW55LCBidXQgT2JqZWN0LmdldFByb3RvdHlwZU9mIGFjY2VwdHMgYW55XG4gIGNvbnN0IENsYXNzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yO1xuICBjb25zdCBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoU3RyaW5nLCBbbnVsbCBhcyBhbnksIC4uLmFyZ3VtZW50c10pO1xuICAvL0B0cy1pZ25vcmUgQ2FsbCB3cmFwcGVkIFN0cmluZyBjb25zdHJ1Y3RvciBkaXJlY3RseSwgZG9uJ3QgYm90aGVyIHR5cGluZyBpdC5cbiAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpO1xuICByZXR1cm4gaW5zdGFuY2UgYXMgU3RyaW5nO1xufTtcblN0cmluZ1dyYXBwZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdHJpbmcucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7XG4gICAgdmFsdWU6IFN0cmluZ1dyYXBwZXIsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5PYmplY3Quc2V0UHJvdG90eXBlT2YoU3RyaW5nV3JhcHBlciwgU3RyaW5nKTtcblxuZXhwb3J0IGNsYXNzIExhenlKc29uU3RyaW5nIGV4dGVuZHMgU3RyaW5nV3JhcHBlciB7XG4gIGRlc2VyaWFsaXplSlNPTigpOiBhbnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHN1cGVyLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgdG9KU09OKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHN1cGVyLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU9iamVjdChvYmplY3Q6IGFueSk6IExhenlKc29uU3RyaW5nIHtcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgTGF6eUpzb25TdHJpbmcpIHtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBTdHJpbmcgfHwgdHlwZW9mIG9iamVjdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIG5ldyBMYXp5SnNvblN0cmluZyhvYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IExhenlKc29uU3RyaW5nKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuICB9XG59XG4iXX0=