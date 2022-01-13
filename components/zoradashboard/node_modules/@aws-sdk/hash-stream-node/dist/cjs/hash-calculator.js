"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashCalculator = void 0;
const stream_1 = require("stream");
class HashCalculator extends stream_1.Writable {
    constructor(hash, options) {
        super(options);
        this.hash = hash;
    }
    _write(chunk, encoding, callback) {
        try {
            this.hash.update(chunk);
        }
        catch (err) {
            return callback(err);
        }
        callback();
    }
}
exports.HashCalculator = HashCalculator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC1jYWxjdWxhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhc2gtY2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBbUQ7QUFFbkQsTUFBYSxjQUFlLFNBQVEsaUJBQVE7SUFDMUMsWUFBNEIsSUFBVSxFQUFFLE9BQXlCO1FBQy9ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURXLFNBQUksR0FBSixJQUFJLENBQU07SUFFdEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFhLEVBQUUsUUFBZ0IsRUFBRSxRQUErQjtRQUNyRSxJQUFJO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsUUFBUSxFQUFFLENBQUM7SUFDYixDQUFDO0NBQ0Y7QUFiRCx3Q0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhc2ggfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IFdyaXRhYmxlLCBXcml0YWJsZU9wdGlvbnMgfSBmcm9tIFwic3RyZWFtXCI7XG5cbmV4cG9ydCBjbGFzcyBIYXNoQ2FsY3VsYXRvciBleHRlbmRzIFdyaXRhYmxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGhhc2g6IEhhc2gsIG9wdGlvbnM/OiBXcml0YWJsZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIF93cml0ZShjaHVuazogQnVmZmVyLCBlbmNvZGluZzogc3RyaW5nLCBjYWxsYmFjazogKGVycj86IEVycm9yKSA9PiB2b2lkKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaGFzaC51cGRhdGUoY2h1bmspO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgfVxuICAgIGNhbGxiYWNrKCk7XG4gIH1cbn1cbiJdfQ==