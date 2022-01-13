"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collector = void 0;
const stream_1 = require("stream");
class Collector extends stream_1.Writable {
    constructor() {
        super(...arguments);
        this.bufferedBytes = [];
    }
    _write(chunk, encoding, callback) {
        this.bufferedBytes.push(chunk);
        callback();
    }
}
exports.Collector = Collector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cmVhbS1jb2xsZWN0b3IvY29sbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFrQztBQUNsQyxNQUFhLFNBQVUsU0FBUSxpQkFBUTtJQUF2Qzs7UUFDa0Isa0JBQWEsR0FBYSxFQUFFLENBQUM7SUFLL0MsQ0FBQztJQUpDLE1BQU0sQ0FBQyxLQUFhLEVBQUUsUUFBZ0IsRUFBRSxRQUErQjtRQUNyRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUM7Q0FDRjtBQU5ELDhCQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV3JpdGFibGUgfSBmcm9tIFwic3RyZWFtXCI7XG5leHBvcnQgY2xhc3MgQ29sbGVjdG9yIGV4dGVuZHMgV3JpdGFibGUge1xuICBwdWJsaWMgcmVhZG9ubHkgYnVmZmVyZWRCeXRlczogQnVmZmVyW10gPSBbXTtcbiAgX3dyaXRlKGNodW5rOiBCdWZmZXIsIGVuY29kaW5nOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXJyPzogRXJyb3IpID0+IHZvaWQpIHtcbiAgICB0aGlzLmJ1ZmZlcmVkQnl0ZXMucHVzaChjaHVuayk7XG4gICAgY2FsbGJhY2soKTtcbiAgfVxufVxuIl19