"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStreamMarshaller = void 0;
const eventstream_marshaller_1 = require("@aws-sdk/eventstream-marshaller");
const eventstream_serde_universal_1 = require("@aws-sdk/eventstream-serde-universal");
const stream_1 = require("stream");
const utils_1 = require("./utils");
class EventStreamMarshaller {
    constructor({ utf8Encoder, utf8Decoder }) {
        this.eventMarshaller = new eventstream_marshaller_1.EventStreamMarshaller(utf8Encoder, utf8Decoder);
        this.universalMarshaller = new eventstream_serde_universal_1.EventStreamMarshaller({
            utf8Decoder,
            utf8Encoder,
        });
    }
    deserialize(body, deserializer) {
        //should use stream[Symbol.asyncIterable] when the api is stable
        //reference: https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_readable_symbol_asynciterator
        const bodyIterable = typeof body[Symbol.asyncIterator] === "function" ? body : utils_1.readabletoIterable(body);
        return this.universalMarshaller.deserialize(bodyIterable, deserializer);
    }
    serialize(input, serializer) {
        const serializedIterable = this.universalMarshaller.serialize(input, serializer);
        if (typeof stream_1.Readable.from === "function") {
            //reference: https://nodejs.org/dist/latest-v13.x/docs/api/stream.html#stream_new_stream_readable_options
            return stream_1.Readable.from(serializedIterable);
        }
        else {
            const iterator = serializedIterable[Symbol.asyncIterator]();
            const serializedStream = new stream_1.Readable({
                autoDestroy: true,
                objectMode: true,
                async read() {
                    iterator
                        .next()
                        .then(({ done, value }) => {
                        if (done) {
                            this.push(null);
                        }
                        else {
                            this.push(value);
                        }
                    })
                        .catch((err) => {
                        this.destroy(err);
                    });
                },
            });
            //TODO: use 'autoDestroy' when targeting Node 11
            serializedStream.on("error", () => {
                serializedStream.destroy();
            });
            serializedStream.on("end", () => {
                serializedStream.destroy();
            });
            return serializedStream;
        }
    }
}
exports.EventStreamMarshaller = EventStreamMarshaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRTdHJlYW1NYXJzaGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0V2ZW50U3RyZWFtTWFyc2hhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0RUFBMkY7QUFDM0Ysc0ZBQStHO0FBRS9HLG1DQUFrQztBQUVsQyxtQ0FBNkM7QUFTN0MsTUFBYSxxQkFBcUI7SUFHaEMsWUFBWSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQWdDO1FBQ3BFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSw4Q0FBZSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxtREFBOEIsQ0FBQztZQUM1RCxXQUFXO1lBQ1gsV0FBVztTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUksSUFBYyxFQUFFLFlBQWlFO1FBQzlGLGdFQUFnRTtRQUNoRSxzR0FBc0c7UUFDdEcsTUFBTSxZQUFZLEdBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMEJBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckYsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsU0FBUyxDQUFJLEtBQXVCLEVBQUUsVUFBaUM7UUFDckUsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRixJQUFJLE9BQU8saUJBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLHlHQUF5RztZQUN6RyxPQUFPLGlCQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNMLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQzVELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxpQkFBUSxDQUFDO2dCQUNwQyxXQUFXLEVBQUUsSUFBSTtnQkFDakIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLEtBQUssQ0FBQyxJQUFJO29CQUNSLFFBQVE7eUJBQ0wsSUFBSSxFQUFFO3lCQUNOLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7d0JBQ3hCLElBQUksSUFBSSxFQUFFOzRCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ2pCOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2xCO29CQUNILENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsZ0RBQWdEO1lBQ2hELGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNoQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUM5QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sZ0JBQWdCLENBQUM7U0FDekI7SUFDSCxDQUFDO0NBQ0Y7QUF0REQsc0RBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRTdHJlYW1NYXJzaGFsbGVyIGFzIEV2ZW50TWFyc2hhbGxlciB9IGZyb20gXCJAYXdzLXNkay9ldmVudHN0cmVhbS1tYXJzaGFsbGVyXCI7XG5pbXBvcnQgeyBFdmVudFN0cmVhbU1hcnNoYWxsZXIgYXMgVW5pdmVyc2FsRXZlbnRTdHJlYW1NYXJzaGFsbGVyIH0gZnJvbSBcIkBhd3Mtc2RrL2V2ZW50c3RyZWFtLXNlcmRlLXVuaXZlcnNhbFwiO1xuaW1wb3J0IHsgRGVjb2RlciwgRW5jb2RlciwgRXZlbnRTdHJlYW1NYXJzaGFsbGVyIGFzIElFdmVudFN0cmVhbU1hcnNoYWxsZXIsIE1lc3NhZ2UgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSBcInN0cmVhbVwiO1xuXG5pbXBvcnQgeyByZWFkYWJsZXRvSXRlcmFibGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50U3RyZWFtTWFyc2hhbGxlciBleHRlbmRzIElFdmVudFN0cmVhbU1hcnNoYWxsZXIge31cblxuZXhwb3J0IGludGVyZmFjZSBFdmVudFN0cmVhbU1hcnNoYWxsZXJPcHRpb25zIHtcbiAgdXRmOEVuY29kZXI6IEVuY29kZXI7XG4gIHV0ZjhEZWNvZGVyOiBEZWNvZGVyO1xufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRTdHJlYW1NYXJzaGFsbGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudE1hcnNoYWxsZXI6IEV2ZW50TWFyc2hhbGxlcjtcbiAgcHJpdmF0ZSByZWFkb25seSB1bml2ZXJzYWxNYXJzaGFsbGVyOiBVbml2ZXJzYWxFdmVudFN0cmVhbU1hcnNoYWxsZXI7XG4gIGNvbnN0cnVjdG9yKHsgdXRmOEVuY29kZXIsIHV0ZjhEZWNvZGVyIH06IEV2ZW50U3RyZWFtTWFyc2hhbGxlck9wdGlvbnMpIHtcbiAgICB0aGlzLmV2ZW50TWFyc2hhbGxlciA9IG5ldyBFdmVudE1hcnNoYWxsZXIodXRmOEVuY29kZXIsIHV0ZjhEZWNvZGVyKTtcbiAgICB0aGlzLnVuaXZlcnNhbE1hcnNoYWxsZXIgPSBuZXcgVW5pdmVyc2FsRXZlbnRTdHJlYW1NYXJzaGFsbGVyKHtcbiAgICAgIHV0ZjhEZWNvZGVyLFxuICAgICAgdXRmOEVuY29kZXIsXG4gICAgfSk7XG4gIH1cblxuICBkZXNlcmlhbGl6ZTxUPihib2R5OiBSZWFkYWJsZSwgZGVzZXJpYWxpemVyOiAoaW5wdXQ6IHsgW2V2ZW50OiBzdHJpbmddOiBNZXNzYWdlIH0pID0+IFByb21pc2U8VD4pOiBBc3luY0l0ZXJhYmxlPFQ+IHtcbiAgICAvL3Nob3VsZCB1c2Ugc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhYmxlXSB3aGVuIHRoZSBhcGkgaXMgc3RhYmxlXG4gICAgLy9yZWZlcmVuY2U6IGh0dHBzOi8vbm9kZWpzLm9yZy9kb2NzL2xhdGVzdC12MTEueC9hcGkvc3RyZWFtLmh0bWwjc3RyZWFtX3JlYWRhYmxlX3N5bWJvbF9hc3luY2l0ZXJhdG9yXG4gICAgY29uc3QgYm9keUl0ZXJhYmxlOiBBc3luY0l0ZXJhYmxlPFVpbnQ4QXJyYXk+ID1cbiAgICAgIHR5cGVvZiBib2R5W1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiID8gYm9keSA6IHJlYWRhYmxldG9JdGVyYWJsZShib2R5KTtcbiAgICByZXR1cm4gdGhpcy51bml2ZXJzYWxNYXJzaGFsbGVyLmRlc2VyaWFsaXplKGJvZHlJdGVyYWJsZSwgZGVzZXJpYWxpemVyKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZTxUPihpbnB1dDogQXN5bmNJdGVyYWJsZTxUPiwgc2VyaWFsaXplcjogKGV2ZW50OiBUKSA9PiBNZXNzYWdlKTogUmVhZGFibGUge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRJdGVyYWJsZSA9IHRoaXMudW5pdmVyc2FsTWFyc2hhbGxlci5zZXJpYWxpemUoaW5wdXQsIHNlcmlhbGl6ZXIpO1xuICAgIGlmICh0eXBlb2YgUmVhZGFibGUuZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvL3JlZmVyZW5jZTogaHR0cHM6Ly9ub2RlanMub3JnL2Rpc3QvbGF0ZXN0LXYxMy54L2RvY3MvYXBpL3N0cmVhbS5odG1sI3N0cmVhbV9uZXdfc3RyZWFtX3JlYWRhYmxlX29wdGlvbnNcbiAgICAgIHJldHVybiBSZWFkYWJsZS5mcm9tKHNlcmlhbGl6ZWRJdGVyYWJsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGl0ZXJhdG9yID0gc2VyaWFsaXplZEl0ZXJhYmxlW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpO1xuICAgICAgY29uc3Qgc2VyaWFsaXplZFN0cmVhbSA9IG5ldyBSZWFkYWJsZSh7XG4gICAgICAgIGF1dG9EZXN0cm95OiB0cnVlLFxuICAgICAgICBvYmplY3RNb2RlOiB0cnVlLFxuICAgICAgICBhc3luYyByZWFkKCkge1xuICAgICAgICAgIGl0ZXJhdG9yXG4gICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAudGhlbigoeyBkb25lLCB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKG51bGwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3koZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICAvL1RPRE86IHVzZSAnYXV0b0Rlc3Ryb3knIHdoZW4gdGFyZ2V0aW5nIE5vZGUgMTFcbiAgICAgIHNlcmlhbGl6ZWRTdHJlYW0ub24oXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICAgIHNlcmlhbGl6ZWRTdHJlYW0uZGVzdHJveSgpO1xuICAgICAgfSk7XG4gICAgICBzZXJpYWxpemVkU3RyZWFtLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICAgICAgc2VyaWFsaXplZFN0cmVhbS5kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzZXJpYWxpemVkU3RyZWFtO1xuICAgIH1cbiAgfVxufVxuIl19