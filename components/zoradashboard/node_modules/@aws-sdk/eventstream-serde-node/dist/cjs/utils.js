"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readabletoIterable = void 0;
/**
 * Convert object stream piped in into an async iterable. This
 * daptor should be deprecated when Node stream iterator is stable.
 * Caveat: this adaptor won't have backpressure to inwards stream
 *
 * Reference: https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_readable_symbol_asynciterator
 */
async function* readabletoIterable(readStream) {
    let streamEnded = false;
    let generationEnded = false;
    const records = new Array();
    readStream.on("error", (err) => {
        if (!streamEnded) {
            streamEnded = true;
        }
        if (err) {
            throw err;
        }
    });
    readStream.on("data", (data) => {
        records.push(data);
    });
    readStream.on("end", () => {
        streamEnded = true;
    });
    while (!generationEnded) {
        // @ts-ignore TS2345: Argument of type 'T | undefined' is not assignable to type 'T | PromiseLike<T>'.
        const value = await new Promise((resolve) => setTimeout(() => resolve(records.shift()), 0));
        if (value) {
            yield value;
        }
        generationEnded = streamEnded && records.length === 0;
    }
}
exports.readabletoIterable = readabletoIterable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUE7Ozs7OztHQU1HO0FBRUksS0FBSyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBSSxVQUFvQjtJQUMvRCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDeEIsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksS0FBSyxFQUFLLENBQUM7SUFFL0IsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLEdBQUcsRUFBRTtZQUNQLE1BQU0sR0FBRyxDQUFDO1NBQ1g7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtRQUN4QixXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLGVBQWUsRUFBRTtRQUN2QixzR0FBc0c7UUFDdEcsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9GLElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSxLQUFLLENBQUM7U0FDYjtRQUNELGVBQWUsR0FBRyxXQUFXLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7S0FDdkQ7QUFDSCxDQUFDO0FBOUJELGdEQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSBcInN0cmVhbVwiO1xuXG4vKipcbiAqIENvbnZlcnQgb2JqZWN0IHN0cmVhbSBwaXBlZCBpbiBpbnRvIGFuIGFzeW5jIGl0ZXJhYmxlLiBUaGlzXG4gKiBkYXB0b3Igc2hvdWxkIGJlIGRlcHJlY2F0ZWQgd2hlbiBOb2RlIHN0cmVhbSBpdGVyYXRvciBpcyBzdGFibGUuXG4gKiBDYXZlYXQ6IHRoaXMgYWRhcHRvciB3b24ndCBoYXZlIGJhY2twcmVzc3VyZSB0byBpbndhcmRzIHN0cmVhbVxuICpcbiAqIFJlZmVyZW5jZTogaHR0cHM6Ly9ub2RlanMub3JnL2RvY3MvbGF0ZXN0LXYxMS54L2FwaS9zdHJlYW0uaHRtbCNzdHJlYW1fcmVhZGFibGVfc3ltYm9sX2FzeW5jaXRlcmF0b3JcbiAqL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIHJlYWRhYmxldG9JdGVyYWJsZTxUPihyZWFkU3RyZWFtOiBSZWFkYWJsZSk6IEFzeW5jSXRlcmFibGU8VD4ge1xuICBsZXQgc3RyZWFtRW5kZWQgPSBmYWxzZTtcbiAgbGV0IGdlbmVyYXRpb25FbmRlZCA9IGZhbHNlO1xuICBjb25zdCByZWNvcmRzID0gbmV3IEFycmF5PFQ+KCk7XG5cbiAgcmVhZFN0cmVhbS5vbihcImVycm9yXCIsIChlcnIpID0+IHtcbiAgICBpZiAoIXN0cmVhbUVuZGVkKSB7XG4gICAgICBzdHJlYW1FbmRlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH0pO1xuXG4gIHJlYWRTdHJlYW0ub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XG4gICAgcmVjb3Jkcy5wdXNoKGRhdGEpO1xuICB9KTtcblxuICByZWFkU3RyZWFtLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICBzdHJlYW1FbmRlZCA9IHRydWU7XG4gIH0pO1xuXG4gIHdoaWxlICghZ2VuZXJhdGlvbkVuZGVkKSB7XG4gICAgLy8gQHRzLWlnbm9yZSBUUzIzNDU6IEFyZ3VtZW50IG9mIHR5cGUgJ1QgfCB1bmRlZmluZWQnIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHR5cGUgJ1QgfCBQcm9taXNlTGlrZTxUPicuXG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSkgPT4gc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKHJlY29yZHMuc2hpZnQoKSksIDApKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgICBnZW5lcmF0aW9uRW5kZWQgPSBzdHJlYW1FbmRlZCAmJiByZWNvcmRzLmxlbmd0aCA9PT0gMDtcbiAgfVxufVxuIl19