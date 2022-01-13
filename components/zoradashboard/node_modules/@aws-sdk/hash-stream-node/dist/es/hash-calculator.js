import { __extends } from "tslib";
import { Writable } from "stream";
var HashCalculator = /** @class */ (function (_super) {
    __extends(HashCalculator, _super);
    function HashCalculator(hash, options) {
        var _this = _super.call(this, options) || this;
        _this.hash = hash;
        return _this;
    }
    HashCalculator.prototype._write = function (chunk, encoding, callback) {
        try {
            this.hash.update(chunk);
        }
        catch (err) {
            return callback(err);
        }
        callback();
    };
    return HashCalculator;
}(Writable));
export { HashCalculator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC1jYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhc2gtY2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBbUIsTUFBTSxRQUFRLENBQUM7QUFFbkQ7SUFBb0Msa0NBQVE7SUFDMUMsd0JBQTRCLElBQVUsRUFBRSxPQUF5QjtRQUFqRSxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBRjJCLFVBQUksR0FBSixJQUFJLENBQU07O0lBRXRDLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLFFBQWdCLEVBQUUsUUFBK0I7UUFDckUsSUFBSTtZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELFFBQVEsRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQWJELENBQW9DLFFBQVEsR0FhM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYXNoIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBXcml0YWJsZSwgV3JpdGFibGVPcHRpb25zIH0gZnJvbSBcInN0cmVhbVwiO1xuXG5leHBvcnQgY2xhc3MgSGFzaENhbGN1bGF0b3IgZXh0ZW5kcyBXcml0YWJsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBoYXNoOiBIYXNoLCBvcHRpb25zPzogV3JpdGFibGVPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBfd3JpdGUoY2h1bms6IEJ1ZmZlciwgZW5jb2Rpbmc6IHN0cmluZywgY2FsbGJhY2s6IChlcnI/OiBFcnJvcikgPT4gdm9pZCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmhhc2gudXBkYXRlKGNodW5rKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgIH1cbiAgICBjYWxsYmFjaygpO1xuICB9XG59XG4iXX0=