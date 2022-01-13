import { __asyncGenerator, __await, __generator } from "tslib";
export function getChunkedStream(source) {
    var _a;
    var currentMessageTotalLength = 0;
    var currentMessagePendingLength = 0;
    var currentMessage = null;
    var messageLengthBuffer = null;
    var allocateMessage = function (size) {
        if (typeof size !== "number") {
            throw new Error("Attempted to allocate an event message where size was not a number: " + size);
        }
        currentMessageTotalLength = size;
        currentMessagePendingLength = 4;
        currentMessage = new Uint8Array(size);
        var currentMessageView = new DataView(currentMessage.buffer);
        currentMessageView.setUint32(0, size, false); //set big-endian Uint32 to 0~3 bytes
    };
    var iterator = function () {
        return __asyncGenerator(this, arguments, function () {
            var sourceIterator, _a, value, done, chunkLength, currentOffset, bytesRemaining, numBytesForTotal, numBytesToWrite;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sourceIterator = source[Symbol.asyncIterator]();
                        _b.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 16];
                        return [4 /*yield*/, __await(sourceIterator.next())];
                    case 2:
                        _a = _b.sent(), value = _a.value, done = _a.done;
                        if (!done) return [3 /*break*/, 10];
                        if (!!currentMessageTotalLength) return [3 /*break*/, 4];
                        return [4 /*yield*/, __await(void 0)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!(currentMessageTotalLength === currentMessagePendingLength)) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await(currentMessage)];
                    case 5: return [4 /*yield*/, _b.sent()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7: throw new Error("Truncated event message received.");
                    case 8: return [4 /*yield*/, __await(void 0)];
                    case 9: return [2 /*return*/, _b.sent()];
                    case 10:
                        chunkLength = value.length;
                        currentOffset = 0;
                        _b.label = 11;
                    case 11:
                        if (!(currentOffset < chunkLength)) return [3 /*break*/, 15];
                        // create new message if necessary
                        if (!currentMessage) {
                            bytesRemaining = chunkLength - currentOffset;
                            // prevent edge case where total length spans 2 chunks
                            if (!messageLengthBuffer) {
                                messageLengthBuffer = new Uint8Array(4);
                            }
                            numBytesForTotal = Math.min(4 - currentMessagePendingLength, // remaining bytes to fill the messageLengthBuffer
                            bytesRemaining // bytes left in chunk
                            );
                            messageLengthBuffer.set(
                            // @ts-ignore error TS2532: Object is possibly 'undefined' for value
                            value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
                            currentMessagePendingLength += numBytesForTotal;
                            currentOffset += numBytesForTotal;
                            if (currentMessagePendingLength < 4) {
                                // not enough information to create the current message
                                return [3 /*break*/, 15];
                            }
                            allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
                            messageLengthBuffer = null;
                        }
                        numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, // number of bytes left to complete message
                        chunkLength - currentOffset // number of bytes left in the original chunk
                        );
                        currentMessage.set(
                        // @ts-ignore error TS2532: Object is possibly 'undefined' for value
                        value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
                        currentMessagePendingLength += numBytesToWrite;
                        currentOffset += numBytesToWrite;
                        if (!(currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength)) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(currentMessage)];
                    case 12: 
                    // push out the message
                    return [4 /*yield*/, _b.sent()];
                    case 13:
                        // push out the message
                        _b.sent();
                        // cleanup
                        currentMessage = null;
                        currentMessageTotalLength = 0;
                        currentMessagePendingLength = 0;
                        _b.label = 14;
                    case 14: return [3 /*break*/, 11];
                    case 15: return [3 /*break*/, 1];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    return _a = {},
        _a[Symbol.asyncIterator] = iterator,
        _a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q2h1bmtlZFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZXRDaHVua2VkU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBaUM7O0lBQ2hFLElBQUkseUJBQXlCLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQUksMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLElBQUksY0FBYyxHQUFzQixJQUFJLENBQUM7SUFDN0MsSUFBSSxtQkFBbUIsR0FBc0IsSUFBSSxDQUFDO0lBQ2xELElBQU0sZUFBZSxHQUFHLFVBQUMsSUFBWTtRQUNuQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLHNFQUFzRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ2hHO1FBQ0QseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLDJCQUEyQixHQUFHLENBQUMsQ0FBQztRQUNoQyxjQUFjLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0Qsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7SUFDcEYsQ0FBQyxDQUFDO0lBRUYsSUFBTSxRQUFRLEdBQUc7Ozs7Ozt3QkFDVCxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDOzs7NkJBQy9DLElBQUk7d0JBQ2UsNkJBQU0sY0FBYyxDQUFDLElBQUksRUFBRSxHQUFBOzt3QkFBN0MsS0FBa0IsU0FBMkIsRUFBM0MsS0FBSyxXQUFBLEVBQUUsSUFBSSxVQUFBOzZCQUNmLElBQUksRUFBSix5QkFBSTs2QkFDRixDQUFDLHlCQUF5QixFQUExQix3QkFBMEI7OzRCQUM1QixpQ0FBTzs7NkJBQ0UsQ0FBQSx5QkFBeUIsS0FBSywyQkFBMkIsQ0FBQSxFQUF6RCx3QkFBeUQ7cURBQzVELGNBQTRCOzRCQUFsQyxnQ0FBa0M7O3dCQUFsQyxTQUFrQyxDQUFDOzs0QkFFbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDOzs0QkFFdkQsaUNBQU87O3dCQUdILFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUM3QixhQUFhLEdBQUcsQ0FBQyxDQUFDOzs7NkJBRWYsQ0FBQSxhQUFhLEdBQUcsV0FBVyxDQUFBO3dCQUNoQyxrQ0FBa0M7d0JBQ2xDLElBQUksQ0FBQyxjQUFjLEVBQUU7NEJBRWIsY0FBYyxHQUFHLFdBQVcsR0FBRyxhQUFhLENBQUM7NEJBQ25ELHNEQUFzRDs0QkFDdEQsSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dDQUN4QixtQkFBbUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDekM7NEJBQ0ssZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDL0IsQ0FBQyxHQUFHLDJCQUEyQixFQUFFLGtEQUFrRDs0QkFDbkYsY0FBYyxDQUFDLHNCQUFzQjs2QkFDdEMsQ0FBQzs0QkFFRixtQkFBbUIsQ0FBQyxHQUFHOzRCQUNyQixvRUFBb0U7NEJBQ3BFLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxFQUM1RCwyQkFBMkIsQ0FDNUIsQ0FBQzs0QkFFRiwyQkFBMkIsSUFBSSxnQkFBZ0IsQ0FBQzs0QkFDaEQsYUFBYSxJQUFJLGdCQUFnQixDQUFDOzRCQUVsQyxJQUFJLDJCQUEyQixHQUFHLENBQUMsRUFBRTtnQ0FDbkMsdURBQXVEO2dDQUN2RCx5QkFBTTs2QkFDUDs0QkFDRCxlQUFlLENBQUMsSUFBSSxRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUM5RSxtQkFBbUIsR0FBRyxJQUFJLENBQUM7eUJBQzVCO3dCQUdLLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUM5Qix5QkFBeUIsR0FBRywyQkFBMkIsRUFBRSwyQ0FBMkM7d0JBQ3BHLFdBQVcsR0FBRyxhQUFhLENBQUMsNkNBQTZDO3lCQUMxRSxDQUFDO3dCQUNGLGNBQWUsQ0FBQyxHQUFHO3dCQUNqQixvRUFBb0U7d0JBQ3BFLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsR0FBRyxlQUFlLENBQUMsRUFDM0QsMkJBQTJCLENBQzVCLENBQUM7d0JBQ0YsMkJBQTJCLElBQUksZUFBZSxDQUFDO3dCQUMvQyxhQUFhLElBQUksZUFBZSxDQUFDOzZCQUc3QixDQUFBLHlCQUF5QixJQUFJLHlCQUF5QixLQUFLLDJCQUEyQixDQUFBLEVBQXRGLHlCQUFzRjtxREFFbEYsY0FBNEI7O29CQURsQyx1QkFBdUI7b0JBQ3ZCLGdDQUFrQzs7d0JBRGxDLHVCQUF1Qjt3QkFDdkIsU0FBa0MsQ0FBQzt3QkFDbkMsVUFBVTt3QkFDVixjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUN0Qix5QkFBeUIsR0FBRyxDQUFDLENBQUM7d0JBQzlCLDJCQUEyQixHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7S0FJdkMsQ0FBQztJQUVGO1FBQ0UsR0FBQyxNQUFNLENBQUMsYUFBYSxJQUFHLFFBQVE7V0FDaEM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldENodW5rZWRTdHJlYW0oc291cmNlOiBBc3luY0l0ZXJhYmxlPFVpbnQ4QXJyYXk+KTogQXN5bmNJdGVyYWJsZTxVaW50OEFycmF5PiB7XG4gIGxldCBjdXJyZW50TWVzc2FnZVRvdGFsTGVuZ3RoID0gMDtcbiAgbGV0IGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aCA9IDA7XG4gIGxldCBjdXJyZW50TWVzc2FnZTogVWludDhBcnJheSB8IG51bGwgPSBudWxsO1xuICBsZXQgbWVzc2FnZUxlbmd0aEJ1ZmZlcjogVWludDhBcnJheSB8IG51bGwgPSBudWxsO1xuICBjb25zdCBhbGxvY2F0ZU1lc3NhZ2UgPSAoc2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzaXplICE9PSBcIm51bWJlclwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdHRlbXB0ZWQgdG8gYWxsb2NhdGUgYW4gZXZlbnQgbWVzc2FnZSB3aGVyZSBzaXplIHdhcyBub3QgYSBudW1iZXI6IFwiICsgc2l6ZSk7XG4gICAgfVxuICAgIGN1cnJlbnRNZXNzYWdlVG90YWxMZW5ndGggPSBzaXplO1xuICAgIGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aCA9IDQ7XG4gICAgY3VycmVudE1lc3NhZ2UgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBjb25zdCBjdXJyZW50TWVzc2FnZVZpZXcgPSBuZXcgRGF0YVZpZXcoY3VycmVudE1lc3NhZ2UuYnVmZmVyKTtcbiAgICBjdXJyZW50TWVzc2FnZVZpZXcuc2V0VWludDMyKDAsIHNpemUsIGZhbHNlKTsgLy9zZXQgYmlnLWVuZGlhbiBVaW50MzIgdG8gMH4zIGJ5dGVzXG4gIH07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBhc3luYyBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHNvdXJjZUl0ZXJhdG9yID0gc291cmNlW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBkb25lIH0gPSBhd2FpdCBzb3VyY2VJdGVyYXRvci5uZXh0KCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBpZiAoIWN1cnJlbnRNZXNzYWdlVG90YWxMZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE1lc3NhZ2VUb3RhbExlbmd0aCA9PT0gY3VycmVudE1lc3NhZ2VQZW5kaW5nTGVuZ3RoKSB7XG4gICAgICAgICAgeWllbGQgY3VycmVudE1lc3NhZ2UgYXMgVWludDhBcnJheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUcnVuY2F0ZWQgZXZlbnQgbWVzc2FnZSByZWNlaXZlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaHVua0xlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgIGxldCBjdXJyZW50T2Zmc2V0ID0gMDtcblxuICAgICAgd2hpbGUgKGN1cnJlbnRPZmZzZXQgPCBjaHVua0xlbmd0aCkge1xuICAgICAgICAvLyBjcmVhdGUgbmV3IG1lc3NhZ2UgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmICghY3VycmVudE1lc3NhZ2UpIHtcbiAgICAgICAgICAvLyB3b3JraW5nIG9uIGEgbmV3IG1lc3NhZ2UsIGRldGVybWluZSB0b3RhbCBsZW5ndGhcbiAgICAgICAgICBjb25zdCBieXRlc1JlbWFpbmluZyA9IGNodW5rTGVuZ3RoIC0gY3VycmVudE9mZnNldDtcbiAgICAgICAgICAvLyBwcmV2ZW50IGVkZ2UgY2FzZSB3aGVyZSB0b3RhbCBsZW5ndGggc3BhbnMgMiBjaHVua3NcbiAgICAgICAgICBpZiAoIW1lc3NhZ2VMZW5ndGhCdWZmZXIpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VMZW5ndGhCdWZmZXIgPSBuZXcgVWludDhBcnJheSg0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbnVtQnl0ZXNGb3JUb3RhbCA9IE1hdGgubWluKFxuICAgICAgICAgICAgNCAtIGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aCwgLy8gcmVtYWluaW5nIGJ5dGVzIHRvIGZpbGwgdGhlIG1lc3NhZ2VMZW5ndGhCdWZmZXJcbiAgICAgICAgICAgIGJ5dGVzUmVtYWluaW5nIC8vIGJ5dGVzIGxlZnQgaW4gY2h1bmtcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbWVzc2FnZUxlbmd0aEJ1ZmZlci5zZXQoXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIGVycm9yIFRTMjUzMjogT2JqZWN0IGlzIHBvc3NpYmx5ICd1bmRlZmluZWQnIGZvciB2YWx1ZVxuICAgICAgICAgICAgdmFsdWUuc2xpY2UoY3VycmVudE9mZnNldCwgY3VycmVudE9mZnNldCArIG51bUJ5dGVzRm9yVG90YWwpLFxuICAgICAgICAgICAgY3VycmVudE1lc3NhZ2VQZW5kaW5nTGVuZ3RoXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aCArPSBudW1CeXRlc0ZvclRvdGFsO1xuICAgICAgICAgIGN1cnJlbnRPZmZzZXQgKz0gbnVtQnl0ZXNGb3JUb3RhbDtcblxuICAgICAgICAgIGlmIChjdXJyZW50TWVzc2FnZVBlbmRpbmdMZW5ndGggPCA0KSB7XG4gICAgICAgICAgICAvLyBub3QgZW5vdWdoIGluZm9ybWF0aW9uIHRvIGNyZWF0ZSB0aGUgY3VycmVudCBtZXNzYWdlXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYWxsb2NhdGVNZXNzYWdlKG5ldyBEYXRhVmlldyhtZXNzYWdlTGVuZ3RoQnVmZmVyLmJ1ZmZlcikuZ2V0VWludDMyKDAsIGZhbHNlKSk7XG4gICAgICAgICAgbWVzc2FnZUxlbmd0aEJ1ZmZlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3cml0ZSBkYXRhIGludG8gY3VycmVudCBtZXNzYWdlXG4gICAgICAgIGNvbnN0IG51bUJ5dGVzVG9Xcml0ZSA9IE1hdGgubWluKFxuICAgICAgICAgIGN1cnJlbnRNZXNzYWdlVG90YWxMZW5ndGggLSBjdXJyZW50TWVzc2FnZVBlbmRpbmdMZW5ndGgsIC8vIG51bWJlciBvZiBieXRlcyBsZWZ0IHRvIGNvbXBsZXRlIG1lc3NhZ2VcbiAgICAgICAgICBjaHVua0xlbmd0aCAtIGN1cnJlbnRPZmZzZXQgLy8gbnVtYmVyIG9mIGJ5dGVzIGxlZnQgaW4gdGhlIG9yaWdpbmFsIGNodW5rXG4gICAgICAgICk7XG4gICAgICAgIGN1cnJlbnRNZXNzYWdlIS5zZXQoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZSBlcnJvciBUUzI1MzI6IE9iamVjdCBpcyBwb3NzaWJseSAndW5kZWZpbmVkJyBmb3IgdmFsdWVcbiAgICAgICAgICB2YWx1ZS5zbGljZShjdXJyZW50T2Zmc2V0LCBjdXJyZW50T2Zmc2V0ICsgbnVtQnl0ZXNUb1dyaXRlKSxcbiAgICAgICAgICBjdXJyZW50TWVzc2FnZVBlbmRpbmdMZW5ndGhcbiAgICAgICAgKTtcbiAgICAgICAgY3VycmVudE1lc3NhZ2VQZW5kaW5nTGVuZ3RoICs9IG51bUJ5dGVzVG9Xcml0ZTtcbiAgICAgICAgY3VycmVudE9mZnNldCArPSBudW1CeXRlc1RvV3JpdGU7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYSBtZXNzYWdlIGlzIHJlYWR5IHRvIGJlIHB1c2hlZFxuICAgICAgICBpZiAoY3VycmVudE1lc3NhZ2VUb3RhbExlbmd0aCAmJiBjdXJyZW50TWVzc2FnZVRvdGFsTGVuZ3RoID09PSBjdXJyZW50TWVzc2FnZVBlbmRpbmdMZW5ndGgpIHtcbiAgICAgICAgICAvLyBwdXNoIG91dCB0aGUgbWVzc2FnZVxuICAgICAgICAgIHlpZWxkIGN1cnJlbnRNZXNzYWdlIGFzIFVpbnQ4QXJyYXk7XG4gICAgICAgICAgLy8gY2xlYW51cFxuICAgICAgICAgIGN1cnJlbnRNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICBjdXJyZW50TWVzc2FnZVRvdGFsTGVuZ3RoID0gMDtcbiAgICAgICAgICBjdXJyZW50TWVzc2FnZVBlbmRpbmdMZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTogaXRlcmF0b3IsXG4gIH07XG59XG4iXX0=