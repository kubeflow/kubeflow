"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterableToReadableStream = exports.readableStreamtoIterable = void 0;
/**
 * A util function converting ReadableStream into an async iterable.
 * Reference: https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate
 */
const readableStreamtoIterable = (readableStream) => ({
    [Symbol.asyncIterator]: async function* () {
        const reader = readableStream.getReader();
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    return;
                yield value;
            }
        }
        finally {
            reader.releaseLock();
        }
    },
});
exports.readableStreamtoIterable = readableStreamtoIterable;
/**
 * A util function converting async iterable to a ReadableStream.
 */
const iterableToReadableStream = (asyncIterable) => {
    const iterator = asyncIterable[Symbol.asyncIterator]();
    return new ReadableStream({
        async pull(controller) {
            const { done, value } = await iterator.next();
            if (done) {
                return controller.close();
            }
            controller.enqueue(value);
        },
    });
};
exports.iterableToReadableStream = iterableToReadableStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7OztHQUdHO0FBQ0ksTUFBTSx3QkFBd0IsR0FBRyxDQUFJLGNBQWlDLEVBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ25HLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxJQUFJO1lBQ0YsT0FBTyxJQUFJLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDNUMsSUFBSSxJQUFJO29CQUFFLE9BQU87Z0JBQ2pCLE1BQU0sS0FBVSxDQUFDO2FBQ2xCO1NBQ0Y7Z0JBQVM7WUFDUixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBYlUsUUFBQSx3QkFBd0IsNEJBYWxDO0FBRUg7O0dBRUc7QUFDSSxNQUFNLHdCQUF3QixHQUFHLENBQUksYUFBK0IsRUFBcUIsRUFBRTtJQUNoRyxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7SUFDdkQsT0FBTyxJQUFJLGNBQWMsQ0FBQztRQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVU7WUFDbkIsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM5QyxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUMzQjtZQUNELFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQVhXLFFBQUEsd0JBQXdCLDRCQVduQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSB1dGlsIGZ1bmN0aW9uIGNvbnZlcnRpbmcgUmVhZGFibGVTdHJlYW0gaW50byBhbiBhc3luYyBpdGVyYWJsZS5cbiAqIFJlZmVyZW5jZTogaHR0cHM6Ly9qYWtlYXJjaGliYWxkLmNvbS8yMDE3L2FzeW5jLWl0ZXJhdG9ycy1hbmQtZ2VuZXJhdG9ycy8jbWFraW5nLXN0cmVhbXMtaXRlcmF0ZVxuICovXG5leHBvcnQgY29uc3QgcmVhZGFibGVTdHJlYW10b0l0ZXJhYmxlID0gPFQ+KHJlYWRhYmxlU3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxUPik6IEFzeW5jSXRlcmFibGU8VD4gPT4gKHtcbiAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTogYXN5bmMgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCByZWFkZXIgPSByZWFkYWJsZVN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgICB0cnkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgeWllbGQgdmFsdWUgYXMgVDtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gICAgfVxuICB9LFxufSk7XG5cbi8qKlxuICogQSB1dGlsIGZ1bmN0aW9uIGNvbnZlcnRpbmcgYXN5bmMgaXRlcmFibGUgdG8gYSBSZWFkYWJsZVN0cmVhbS5cbiAqL1xuZXhwb3J0IGNvbnN0IGl0ZXJhYmxlVG9SZWFkYWJsZVN0cmVhbSA9IDxUPihhc3luY0l0ZXJhYmxlOiBBc3luY0l0ZXJhYmxlPFQ+KTogUmVhZGFibGVTdHJlYW08VD4gPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IGFzeW5jSXRlcmFibGVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZSh2YWx1ZSk7XG4gICAgfSxcbiAgfSk7XG59O1xuIl19