"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChunkedStream = void 0;
function getChunkedStream(source) {
    let currentMessageTotalLength = 0;
    let currentMessagePendingLength = 0;
    let currentMessage = null;
    let messageLengthBuffer = null;
    const allocateMessage = (size) => {
        if (typeof size !== "number") {
            throw new Error("Attempted to allocate an event message where size was not a number: " + size);
        }
        currentMessageTotalLength = size;
        currentMessagePendingLength = 4;
        currentMessage = new Uint8Array(size);
        const currentMessageView = new DataView(currentMessage.buffer);
        currentMessageView.setUint32(0, size, false); //set big-endian Uint32 to 0~3 bytes
    };
    const iterator = async function* () {
        const sourceIterator = source[Symbol.asyncIterator]();
        while (true) {
            const { value, done } = await sourceIterator.next();
            if (done) {
                if (!currentMessageTotalLength) {
                    return;
                }
                else if (currentMessageTotalLength === currentMessagePendingLength) {
                    yield currentMessage;
                }
                else {
                    throw new Error("Truncated event message received.");
                }
                return;
            }
            const chunkLength = value.length;
            let currentOffset = 0;
            while (currentOffset < chunkLength) {
                // create new message if necessary
                if (!currentMessage) {
                    // working on a new message, determine total length
                    const bytesRemaining = chunkLength - currentOffset;
                    // prevent edge case where total length spans 2 chunks
                    if (!messageLengthBuffer) {
                        messageLengthBuffer = new Uint8Array(4);
                    }
                    const numBytesForTotal = Math.min(4 - currentMessagePendingLength, // remaining bytes to fill the messageLengthBuffer
                    bytesRemaining // bytes left in chunk
                    );
                    messageLengthBuffer.set(
                    // @ts-ignore error TS2532: Object is possibly 'undefined' for value
                    value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
                    currentMessagePendingLength += numBytesForTotal;
                    currentOffset += numBytesForTotal;
                    if (currentMessagePendingLength < 4) {
                        // not enough information to create the current message
                        break;
                    }
                    allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
                    messageLengthBuffer = null;
                }
                // write data into current message
                const numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, // number of bytes left to complete message
                chunkLength - currentOffset // number of bytes left in the original chunk
                );
                currentMessage.set(
                // @ts-ignore error TS2532: Object is possibly 'undefined' for value
                value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
                currentMessagePendingLength += numBytesToWrite;
                currentOffset += numBytesToWrite;
                // check if a message is ready to be pushed
                if (currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength) {
                    // push out the message
                    yield currentMessage;
                    // cleanup
                    currentMessage = null;
                    currentMessageTotalLength = 0;
                    currentMessagePendingLength = 0;
                }
            }
        }
    };
    return {
        [Symbol.asyncIterator]: iterator,
    };
}
exports.getChunkedStream = getChunkedStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q2h1bmtlZFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZXRDaHVua2VkU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLGdCQUFnQixDQUFDLE1BQWlDO0lBQ2hFLElBQUkseUJBQXlCLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQUksMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLElBQUksY0FBYyxHQUFzQixJQUFJLENBQUM7SUFDN0MsSUFBSSxtQkFBbUIsR0FBc0IsSUFBSSxDQUFDO0lBQ2xELE1BQU0sZUFBZSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRUFBc0UsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNoRztRQUNELHlCQUF5QixHQUFHLElBQUksQ0FBQztRQUNqQywyQkFBMkIsR0FBRyxDQUFDLENBQUM7UUFDaEMsY0FBYyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsb0NBQW9DO0lBQ3BGLENBQUMsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLEtBQUssU0FBUyxDQUFDO1FBQzlCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUN0RCxPQUFPLElBQUksRUFBRTtZQUNYLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEQsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLHlCQUF5QixFQUFFO29CQUM5QixPQUFPO2lCQUNSO3FCQUFNLElBQUkseUJBQXlCLEtBQUssMkJBQTJCLEVBQUU7b0JBQ3BFLE1BQU0sY0FBNEIsQ0FBQztpQkFDcEM7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2lCQUN0RDtnQkFDRCxPQUFPO2FBQ1I7WUFFRCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ2pDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztZQUV0QixPQUFPLGFBQWEsR0FBRyxXQUFXLEVBQUU7Z0JBQ2xDLGtDQUFrQztnQkFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDbkIsbURBQW1EO29CQUNuRCxNQUFNLGNBQWMsR0FBRyxXQUFXLEdBQUcsYUFBYSxDQUFDO29CQUNuRCxzREFBc0Q7b0JBQ3RELElBQUksQ0FBQyxtQkFBbUIsRUFBRTt3QkFDeEIsbUJBQW1CLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3pDO29CQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDL0IsQ0FBQyxHQUFHLDJCQUEyQixFQUFFLGtEQUFrRDtvQkFDbkYsY0FBYyxDQUFDLHNCQUFzQjtxQkFDdEMsQ0FBQztvQkFFRixtQkFBbUIsQ0FBQyxHQUFHO29CQUNyQixvRUFBb0U7b0JBQ3BFLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxFQUM1RCwyQkFBMkIsQ0FDNUIsQ0FBQztvQkFFRiwyQkFBMkIsSUFBSSxnQkFBZ0IsQ0FBQztvQkFDaEQsYUFBYSxJQUFJLGdCQUFnQixDQUFDO29CQUVsQyxJQUFJLDJCQUEyQixHQUFHLENBQUMsRUFBRTt3QkFDbkMsdURBQXVEO3dCQUN2RCxNQUFNO3FCQUNQO29CQUNELGVBQWUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzlFLG1CQUFtQixHQUFHLElBQUksQ0FBQztpQkFDNUI7Z0JBRUQsa0NBQWtDO2dCQUNsQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUM5Qix5QkFBeUIsR0FBRywyQkFBMkIsRUFBRSwyQ0FBMkM7Z0JBQ3BHLFdBQVcsR0FBRyxhQUFhLENBQUMsNkNBQTZDO2lCQUMxRSxDQUFDO2dCQUNGLGNBQWUsQ0FBQyxHQUFHO2dCQUNqQixvRUFBb0U7Z0JBQ3BFLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsR0FBRyxlQUFlLENBQUMsRUFDM0QsMkJBQTJCLENBQzVCLENBQUM7Z0JBQ0YsMkJBQTJCLElBQUksZUFBZSxDQUFDO2dCQUMvQyxhQUFhLElBQUksZUFBZSxDQUFDO2dCQUVqQywyQ0FBMkM7Z0JBQzNDLElBQUkseUJBQXlCLElBQUkseUJBQXlCLEtBQUssMkJBQTJCLEVBQUU7b0JBQzFGLHVCQUF1QjtvQkFDdkIsTUFBTSxjQUE0QixDQUFDO29CQUNuQyxVQUFVO29CQUNWLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLHlCQUF5QixHQUFHLENBQUMsQ0FBQztvQkFDOUIsMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQzthQUNGO1NBQ0Y7SUFDSCxDQUFDLENBQUM7SUFFRixPQUFPO1FBQ0wsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsUUFBUTtLQUNqQyxDQUFDO0FBQ0osQ0FBQztBQTlGRCw0Q0E4RkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0Q2h1bmtlZFN0cmVhbShzb3VyY2U6IEFzeW5jSXRlcmFibGU8VWludDhBcnJheT4pOiBBc3luY0l0ZXJhYmxlPFVpbnQ4QXJyYXk+IHtcbiAgbGV0IGN1cnJlbnRNZXNzYWdlVG90YWxMZW5ndGggPSAwO1xuICBsZXQgY3VycmVudE1lc3NhZ2VQZW5kaW5nTGVuZ3RoID0gMDtcbiAgbGV0IGN1cnJlbnRNZXNzYWdlOiBVaW50OEFycmF5IHwgbnVsbCA9IG51bGw7XG4gIGxldCBtZXNzYWdlTGVuZ3RoQnVmZmVyOiBVaW50OEFycmF5IHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0IGFsbG9jYXRlTWVzc2FnZSA9IChzaXplOiBudW1iZXIpID0+IHtcbiAgICBpZiAodHlwZW9mIHNpemUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF0dGVtcHRlZCB0byBhbGxvY2F0ZSBhbiBldmVudCBtZXNzYWdlIHdoZXJlIHNpemUgd2FzIG5vdCBhIG51bWJlcjogXCIgKyBzaXplKTtcbiAgICB9XG4gICAgY3VycmVudE1lc3NhZ2VUb3RhbExlbmd0aCA9IHNpemU7XG4gICAgY3VycmVudE1lc3NhZ2VQZW5kaW5nTGVuZ3RoID0gNDtcbiAgICBjdXJyZW50TWVzc2FnZSA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlVmlldyA9IG5ldyBEYXRhVmlldyhjdXJyZW50TWVzc2FnZS5idWZmZXIpO1xuICAgIGN1cnJlbnRNZXNzYWdlVmlldy5zZXRVaW50MzIoMCwgc2l6ZSwgZmFsc2UpOyAvL3NldCBiaWctZW5kaWFuIFVpbnQzMiB0byAwfjMgYnl0ZXNcbiAgfTtcblxuICBjb25zdCBpdGVyYXRvciA9IGFzeW5jIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3Qgc291cmNlSXRlcmF0b3IgPSBzb3VyY2VbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGF3YWl0IHNvdXJjZUl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIGlmICghY3VycmVudE1lc3NhZ2VUb3RhbExlbmd0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50TWVzc2FnZVRvdGFsTGVuZ3RoID09PSBjdXJyZW50TWVzc2FnZVBlbmRpbmdMZW5ndGgpIHtcbiAgICAgICAgICB5aWVsZCBjdXJyZW50TWVzc2FnZSBhcyBVaW50OEFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRydW5jYXRlZCBldmVudCBtZXNzYWdlIHJlY2VpdmVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNodW5rTGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgICAgbGV0IGN1cnJlbnRPZmZzZXQgPSAwO1xuXG4gICAgICB3aGlsZSAoY3VycmVudE9mZnNldCA8IGNodW5rTGVuZ3RoKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgbWVzc2FnZSBpZiBuZWNlc3NhcnlcbiAgICAgICAgaWYgKCFjdXJyZW50TWVzc2FnZSkge1xuICAgICAgICAgIC8vIHdvcmtpbmcgb24gYSBuZXcgbWVzc2FnZSwgZGV0ZXJtaW5lIHRvdGFsIGxlbmd0aFxuICAgICAgICAgIGNvbnN0IGJ5dGVzUmVtYWluaW5nID0gY2h1bmtMZW5ndGggLSBjdXJyZW50T2Zmc2V0O1xuICAgICAgICAgIC8vIHByZXZlbnQgZWRnZSBjYXNlIHdoZXJlIHRvdGFsIGxlbmd0aCBzcGFucyAyIGNodW5rc1xuICAgICAgICAgIGlmICghbWVzc2FnZUxlbmd0aEJ1ZmZlcikge1xuICAgICAgICAgICAgbWVzc2FnZUxlbmd0aEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBudW1CeXRlc0ZvclRvdGFsID0gTWF0aC5taW4oXG4gICAgICAgICAgICA0IC0gY3VycmVudE1lc3NhZ2VQZW5kaW5nTGVuZ3RoLCAvLyByZW1haW5pbmcgYnl0ZXMgdG8gZmlsbCB0aGUgbWVzc2FnZUxlbmd0aEJ1ZmZlclxuICAgICAgICAgICAgYnl0ZXNSZW1haW5pbmcgLy8gYnl0ZXMgbGVmdCBpbiBjaHVua1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBtZXNzYWdlTGVuZ3RoQnVmZmVyLnNldChcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgZXJyb3IgVFMyNTMyOiBPYmplY3QgaXMgcG9zc2libHkgJ3VuZGVmaW5lZCcgZm9yIHZhbHVlXG4gICAgICAgICAgICB2YWx1ZS5zbGljZShjdXJyZW50T2Zmc2V0LCBjdXJyZW50T2Zmc2V0ICsgbnVtQnl0ZXNGb3JUb3RhbCksXG4gICAgICAgICAgICBjdXJyZW50TWVzc2FnZVBlbmRpbmdMZW5ndGhcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY3VycmVudE1lc3NhZ2VQZW5kaW5nTGVuZ3RoICs9IG51bUJ5dGVzRm9yVG90YWw7XG4gICAgICAgICAgY3VycmVudE9mZnNldCArPSBudW1CeXRlc0ZvclRvdGFsO1xuXG4gICAgICAgICAgaWYgKGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIC8vIG5vdCBlbm91Z2ggaW5mb3JtYXRpb24gdG8gY3JlYXRlIHRoZSBjdXJyZW50IG1lc3NhZ2VcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbGxvY2F0ZU1lc3NhZ2UobmV3IERhdGFWaWV3KG1lc3NhZ2VMZW5ndGhCdWZmZXIuYnVmZmVyKS5nZXRVaW50MzIoMCwgZmFsc2UpKTtcbiAgICAgICAgICBtZXNzYWdlTGVuZ3RoQnVmZmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdyaXRlIGRhdGEgaW50byBjdXJyZW50IG1lc3NhZ2VcbiAgICAgICAgY29uc3QgbnVtQnl0ZXNUb1dyaXRlID0gTWF0aC5taW4oXG4gICAgICAgICAgY3VycmVudE1lc3NhZ2VUb3RhbExlbmd0aCAtIGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aCwgLy8gbnVtYmVyIG9mIGJ5dGVzIGxlZnQgdG8gY29tcGxldGUgbWVzc2FnZVxuICAgICAgICAgIGNodW5rTGVuZ3RoIC0gY3VycmVudE9mZnNldCAvLyBudW1iZXIgb2YgYnl0ZXMgbGVmdCBpbiB0aGUgb3JpZ2luYWwgY2h1bmtcbiAgICAgICAgKTtcbiAgICAgICAgY3VycmVudE1lc3NhZ2UhLnNldChcbiAgICAgICAgICAvLyBAdHMtaWdub3JlIGVycm9yIFRTMjUzMjogT2JqZWN0IGlzIHBvc3NpYmx5ICd1bmRlZmluZWQnIGZvciB2YWx1ZVxuICAgICAgICAgIHZhbHVlLnNsaWNlKGN1cnJlbnRPZmZzZXQsIGN1cnJlbnRPZmZzZXQgKyBudW1CeXRlc1RvV3JpdGUpLFxuICAgICAgICAgIGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aFxuICAgICAgICApO1xuICAgICAgICBjdXJyZW50TWVzc2FnZVBlbmRpbmdMZW5ndGggKz0gbnVtQnl0ZXNUb1dyaXRlO1xuICAgICAgICBjdXJyZW50T2Zmc2V0ICs9IG51bUJ5dGVzVG9Xcml0ZTtcblxuICAgICAgICAvLyBjaGVjayBpZiBhIG1lc3NhZ2UgaXMgcmVhZHkgdG8gYmUgcHVzaGVkXG4gICAgICAgIGlmIChjdXJyZW50TWVzc2FnZVRvdGFsTGVuZ3RoICYmIGN1cnJlbnRNZXNzYWdlVG90YWxMZW5ndGggPT09IGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aCkge1xuICAgICAgICAgIC8vIHB1c2ggb3V0IHRoZSBtZXNzYWdlXG4gICAgICAgICAgeWllbGQgY3VycmVudE1lc3NhZ2UgYXMgVWludDhBcnJheTtcbiAgICAgICAgICAvLyBjbGVhbnVwXG4gICAgICAgICAgY3VycmVudE1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgIGN1cnJlbnRNZXNzYWdlVG90YWxMZW5ndGggPSAwO1xuICAgICAgICAgIGN1cnJlbnRNZXNzYWdlUGVuZGluZ0xlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdOiBpdGVyYXRvcixcbiAgfTtcbn1cbiJdfQ==