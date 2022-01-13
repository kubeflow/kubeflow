import { __extends } from "tslib";
import { Writable } from "stream";
var Collector = /** @class */ (function (_super) {
    __extends(Collector, _super);
    function Collector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bufferedBytes = [];
        return _this;
    }
    Collector.prototype._write = function (chunk, encoding, callback) {
        this.bufferedBytes.push(chunk);
        callback();
    };
    return Collector;
}(Writable));
export { Collector };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cmVhbS1jb2xsZWN0b3IvY29sbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDO0lBQStCLDZCQUFRO0lBQXZDO1FBQUEscUVBTUM7UUFMaUIsbUJBQWEsR0FBYSxFQUFFLENBQUM7O0lBSy9DLENBQUM7SUFKQywwQkFBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLFFBQWdCLEVBQUUsUUFBK0I7UUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsUUFBUSxFQUFFLENBQUM7SUFDYixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBK0IsUUFBUSxHQU10QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdyaXRhYmxlIH0gZnJvbSBcInN0cmVhbVwiO1xuZXhwb3J0IGNsYXNzIENvbGxlY3RvciBleHRlbmRzIFdyaXRhYmxlIHtcbiAgcHVibGljIHJlYWRvbmx5IGJ1ZmZlcmVkQnl0ZXM6IEJ1ZmZlcltdID0gW107XG4gIF93cml0ZShjaHVuazogQnVmZmVyLCBlbmNvZGluZzogc3RyaW5nLCBjYWxsYmFjazogKGVycj86IEVycm9yKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5idWZmZXJlZEJ5dGVzLnB1c2goY2h1bmspO1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cbn1cbiJdfQ==