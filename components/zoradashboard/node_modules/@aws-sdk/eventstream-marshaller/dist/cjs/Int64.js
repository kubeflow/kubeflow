"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Int64 = void 0;
const util_hex_encoding_1 = require("@aws-sdk/util-hex-encoding");
/**
 * A lossless representation of a signed, 64-bit integer. Instances of this
 * class may be used in arithmetic expressions as if they were numeric
 * primitives, but the binary representation will be preserved unchanged as the
 * `bytes` property of the object. The bytes should be encoded as big-endian,
 * two's complement integers.
 */
class Int64 {
    constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
            throw new Error("Int64 buffers must be exactly 8 bytes");
        }
    }
    static fromNumber(number) {
        if (number > 9223372036854775807 || number < -9223372036854775808) {
            throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
            bytes[i] = remaining;
        }
        if (number < 0) {
            negate(bytes);
        }
        return new Int64(bytes);
    }
    /**
     * Called implicitly by infix arithmetic operators.
     */
    valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 0b10000000;
        if (negative) {
            negate(bytes);
        }
        return parseInt(util_hex_encoding_1.toHex(bytes), 16) * (negative ? -1 : 1);
    }
    toString() {
        return String(this.valueOf());
    }
}
exports.Int64 = Int64;
function negate(bytes) {
    for (let i = 0; i < 8; i++) {
        bytes[i] ^= 0xff;
    }
    for (let i = 7; i > -1; i--) {
        bytes[i]++;
        if (bytes[i] !== 0)
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50NjQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvSW50NjQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esa0VBQW1EO0FBSW5EOzs7Ozs7R0FNRztBQUNILE1BQWEsS0FBSztJQUNoQixZQUFxQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ3BDLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBYztRQUM5QixJQUFJLE1BQU0sR0FBRyxtQkFBbUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRTtZQUNqRSxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsTUFBTSxxRUFBcUUsQ0FBQyxDQUFDO1NBQ2pHO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsSUFBSSxHQUFHLEVBQUU7WUFDeEcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztTQUN0QjtRQUVELElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO1FBRUQsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0wsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUN2QyxJQUFJLFFBQVEsRUFBRTtZQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO1FBRUQsT0FBTyxRQUFRLENBQUMseUJBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBeENELHNCQXdDQztBQUVELFNBQVMsTUFBTSxDQUFDLEtBQWlCO0lBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztLQUNsQjtJQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNYLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBRSxNQUFNO0tBQzNCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEludDY0IGFzIElJbnQ2NCB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgdG9IZXggfSBmcm9tIFwiQGF3cy1zZGsvdXRpbC1oZXgtZW5jb2RpbmdcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJbnQ2NCBleHRlbmRzIElJbnQ2NCB7fVxuXG4vKipcbiAqIEEgbG9zc2xlc3MgcmVwcmVzZW50YXRpb24gb2YgYSBzaWduZWQsIDY0LWJpdCBpbnRlZ2VyLiBJbnN0YW5jZXMgb2YgdGhpc1xuICogY2xhc3MgbWF5IGJlIHVzZWQgaW4gYXJpdGhtZXRpYyBleHByZXNzaW9ucyBhcyBpZiB0aGV5IHdlcmUgbnVtZXJpY1xuICogcHJpbWl0aXZlcywgYnV0IHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gd2lsbCBiZSBwcmVzZXJ2ZWQgdW5jaGFuZ2VkIGFzIHRoZVxuICogYGJ5dGVzYCBwcm9wZXJ0eSBvZiB0aGUgb2JqZWN0LiBUaGUgYnl0ZXMgc2hvdWxkIGJlIGVuY29kZWQgYXMgYmlnLWVuZGlhbixcbiAqIHR3bydzIGNvbXBsZW1lbnQgaW50ZWdlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnQ2NCB7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGJ5dGVzOiBVaW50OEFycmF5KSB7XG4gICAgaWYgKGJ5dGVzLmJ5dGVMZW5ndGggIT09IDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludDY0IGJ1ZmZlcnMgbXVzdCBiZSBleGFjdGx5IDggYnl0ZXNcIik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21OdW1iZXIobnVtYmVyOiBudW1iZXIpOiBJbnQ2NCB7XG4gICAgaWYgKG51bWJlciA+IDkyMjMzNzIwMzY4NTQ3NzU4MDcgfHwgbnVtYmVyIDwgLTkyMjMzNzIwMzY4NTQ3NzU4MDgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtudW1iZXJ9IGlzIHRvbyBsYXJnZSAob3IsIGlmIG5lZ2F0aXZlLCB0b28gc21hbGwpIHRvIHJlcHJlc2VudCBhcyBhbiBJbnQ2NGApO1xuICAgIH1cblxuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoOCk7XG4gICAgZm9yIChsZXQgaSA9IDcsIHJlbWFpbmluZyA9IE1hdGguYWJzKE1hdGgucm91bmQobnVtYmVyKSk7IGkgPiAtMSAmJiByZW1haW5pbmcgPiAwOyBpLS0sIHJlbWFpbmluZyAvPSAyNTYpIHtcbiAgICAgIGJ5dGVzW2ldID0gcmVtYWluaW5nO1xuICAgIH1cblxuICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICBuZWdhdGUoYnl0ZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSW50NjQoYnl0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBpbXBsaWNpdGx5IGJ5IGluZml4IGFyaXRobWV0aWMgb3BlcmF0b3JzLlxuICAgKi9cbiAgdmFsdWVPZigpOiBudW1iZXIge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy5ieXRlcy5zbGljZSgwKTtcbiAgICBjb25zdCBuZWdhdGl2ZSA9IGJ5dGVzWzBdICYgMGIxMDAwMDAwMDtcbiAgICBpZiAobmVnYXRpdmUpIHtcbiAgICAgIG5lZ2F0ZShieXRlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlSW50KHRvSGV4KGJ5dGVzKSwgMTYpICogKG5lZ2F0aXZlID8gLTEgOiAxKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy52YWx1ZU9mKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5lZ2F0ZShieXRlczogVWludDhBcnJheSk6IHZvaWQge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGJ5dGVzW2ldIF49IDB4ZmY7XG4gIH1cblxuICBmb3IgKGxldCBpID0gNzsgaSA+IC0xOyBpLS0pIHtcbiAgICBieXRlc1tpXSsrO1xuICAgIGlmIChieXRlc1tpXSAhPT0gMCkgYnJlYWs7XG4gIH1cbn1cbiJdfQ==