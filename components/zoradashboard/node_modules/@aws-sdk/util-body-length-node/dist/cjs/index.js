"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBodyLength = void 0;
const fs_1 = require("fs");
function calculateBodyLength(body) {
    if (!body) {
        return 0;
    }
    if (typeof body === "string") {
        return Buffer.from(body).length;
    }
    else if (typeof body.byteLength === "number") {
        // handles Uint8Array, ArrayBuffer, Buffer, and ArrayBufferView
        return body.byteLength;
    }
    else if (typeof body.size === "number") {
        return body.size;
    }
    else if (typeof body.path === "string") {
        // handles fs readable streams
        return fs_1.lstatSync(body.path).size;
    }
}
exports.calculateBodyLength = calculateBodyLength;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQStCO0FBRS9CLFNBQWdCLG1CQUFtQixDQUFDLElBQVM7SUFDM0MsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7SUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ2pDO1NBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQzlDLCtEQUErRDtRQUMvRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDeEI7U0FBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDeEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3hDLDhCQUE4QjtRQUM5QixPQUFPLGNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQztBQWZELGtEQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbHN0YXRTeW5jIH0gZnJvbSBcImZzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVCb2R5TGVuZ3RoKGJvZHk6IGFueSk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gIGlmICghYm9keSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICh0eXBlb2YgYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShib2R5KS5sZW5ndGg7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkuYnl0ZUxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgIC8vIGhhbmRsZXMgVWludDhBcnJheSwgQXJyYXlCdWZmZXIsIEJ1ZmZlciwgYW5kIEFycmF5QnVmZmVyVmlld1xuICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkuc2l6ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiBib2R5LnNpemU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkucGF0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgIC8vIGhhbmRsZXMgZnMgcmVhZGFibGUgc3RyZWFtc1xuICAgIHJldHVybiBsc3RhdFN5bmMoYm9keS5wYXRoKS5zaXplO1xuICB9XG59XG4iXX0=