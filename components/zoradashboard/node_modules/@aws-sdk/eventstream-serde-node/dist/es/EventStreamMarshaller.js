import { __awaiter, __generator } from "tslib";
import { EventStreamMarshaller as EventMarshaller } from "@aws-sdk/eventstream-marshaller";
import { EventStreamMarshaller as UniversalEventStreamMarshaller } from "@aws-sdk/eventstream-serde-universal";
import { Readable } from "stream";
import { readabletoIterable } from "./utils";
var EventStreamMarshaller = /** @class */ (function () {
    function EventStreamMarshaller(_a) {
        var utf8Encoder = _a.utf8Encoder, utf8Decoder = _a.utf8Decoder;
        this.eventMarshaller = new EventMarshaller(utf8Encoder, utf8Decoder);
        this.universalMarshaller = new UniversalEventStreamMarshaller({
            utf8Decoder: utf8Decoder,
            utf8Encoder: utf8Encoder,
        });
    }
    EventStreamMarshaller.prototype.deserialize = function (body, deserializer) {
        //should use stream[Symbol.asyncIterable] when the api is stable
        //reference: https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_readable_symbol_asynciterator
        var bodyIterable = typeof body[Symbol.asyncIterator] === "function" ? body : readabletoIterable(body);
        return this.universalMarshaller.deserialize(bodyIterable, deserializer);
    };
    EventStreamMarshaller.prototype.serialize = function (input, serializer) {
        var serializedIterable = this.universalMarshaller.serialize(input, serializer);
        if (typeof Readable.from === "function") {
            //reference: https://nodejs.org/dist/latest-v13.x/docs/api/stream.html#stream_new_stream_readable_options
            return Readable.from(serializedIterable);
        }
        else {
            var iterator_1 = serializedIterable[Symbol.asyncIterator]();
            var serializedStream_1 = new Readable({
                autoDestroy: true,
                objectMode: true,
                read: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            iterator_1
                                .next()
                                .then(function (_a) {
                                var done = _a.done, value = _a.value;
                                if (done) {
                                    _this.push(null);
                                }
                                else {
                                    _this.push(value);
                                }
                            })
                                .catch(function (err) {
                                _this.destroy(err);
                            });
                            return [2 /*return*/];
                        });
                    });
                },
            });
            //TODO: use 'autoDestroy' when targeting Node 11
            serializedStream_1.on("error", function () {
                serializedStream_1.destroy();
            });
            serializedStream_1.on("end", function () {
                serializedStream_1.destroy();
            });
            return serializedStream_1;
        }
    };
    return EventStreamMarshaller;
}());
export { EventStreamMarshaller };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRTdHJlYW1NYXJzaGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0V2ZW50U3RyZWFtTWFyc2hhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHFCQUFxQixJQUFJLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxxQkFBcUIsSUFBSSw4QkFBOEIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRS9HLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFbEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBUzdDO0lBR0UsK0JBQVksRUFBMEQ7WUFBeEQsV0FBVyxpQkFBQSxFQUFFLFdBQVcsaUJBQUE7UUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksOEJBQThCLENBQUM7WUFDNUQsV0FBVyxhQUFBO1lBQ1gsV0FBVyxhQUFBO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBZSxJQUFjLEVBQUUsWUFBaUU7UUFDOUYsZ0VBQWdFO1FBQ2hFLHNHQUFzRztRQUN0RyxJQUFNLFlBQVksR0FDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCx5Q0FBUyxHQUFULFVBQWEsS0FBdUIsRUFBRSxVQUFpQztRQUNyRSxJQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksT0FBTyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUN2Qyx5R0FBeUc7WUFDekcsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNMLElBQU0sVUFBUSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQzVELElBQU0sa0JBQWdCLEdBQUcsSUFBSSxRQUFRLENBQUM7Z0JBQ3BDLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixVQUFVLEVBQUUsSUFBSTtnQkFDVixJQUFJOzs7OzRCQUNSLFVBQVE7aUNBQ0wsSUFBSSxFQUFFO2lDQUNOLElBQUksQ0FBQyxVQUFDLEVBQWU7b0NBQWIsSUFBSSxVQUFBLEVBQUUsS0FBSyxXQUFBO2dDQUNsQixJQUFJLElBQUksRUFBRTtvQ0FDUixLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUNqQjtxQ0FBTTtvQ0FDTCxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lDQUNsQjs0QkFDSCxDQUFDLENBQUM7aUNBQ0QsS0FBSyxDQUFDLFVBQUMsR0FBRztnQ0FDVCxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNwQixDQUFDLENBQUMsQ0FBQzs7OztpQkFDTjthQUNGLENBQUMsQ0FBQztZQUNILGdEQUFnRDtZQUNoRCxrQkFBZ0IsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUMzQixrQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUNILGtCQUFnQixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3pCLGtCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxrQkFBZ0IsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUF0REQsSUFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudFN0cmVhbU1hcnNoYWxsZXIgYXMgRXZlbnRNYXJzaGFsbGVyIH0gZnJvbSBcIkBhd3Mtc2RrL2V2ZW50c3RyZWFtLW1hcnNoYWxsZXJcIjtcbmltcG9ydCB7IEV2ZW50U3RyZWFtTWFyc2hhbGxlciBhcyBVbml2ZXJzYWxFdmVudFN0cmVhbU1hcnNoYWxsZXIgfSBmcm9tIFwiQGF3cy1zZGsvZXZlbnRzdHJlYW0tc2VyZGUtdW5pdmVyc2FsXCI7XG5pbXBvcnQgeyBEZWNvZGVyLCBFbmNvZGVyLCBFdmVudFN0cmVhbU1hcnNoYWxsZXIgYXMgSUV2ZW50U3RyZWFtTWFyc2hhbGxlciwgTWVzc2FnZSB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tIFwic3RyZWFtXCI7XG5cbmltcG9ydCB7IHJlYWRhYmxldG9JdGVyYWJsZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXZlbnRTdHJlYW1NYXJzaGFsbGVyIGV4dGVuZHMgSUV2ZW50U3RyZWFtTWFyc2hhbGxlciB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50U3RyZWFtTWFyc2hhbGxlck9wdGlvbnMge1xuICB1dGY4RW5jb2RlcjogRW5jb2RlcjtcbiAgdXRmOERlY29kZXI6IERlY29kZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBFdmVudFN0cmVhbU1hcnNoYWxsZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TWFyc2hhbGxlcjogRXZlbnRNYXJzaGFsbGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IHVuaXZlcnNhbE1hcnNoYWxsZXI6IFVuaXZlcnNhbEV2ZW50U3RyZWFtTWFyc2hhbGxlcjtcbiAgY29uc3RydWN0b3IoeyB1dGY4RW5jb2RlciwgdXRmOERlY29kZXIgfTogRXZlbnRTdHJlYW1NYXJzaGFsbGVyT3B0aW9ucykge1xuICAgIHRoaXMuZXZlbnRNYXJzaGFsbGVyID0gbmV3IEV2ZW50TWFyc2hhbGxlcih1dGY4RW5jb2RlciwgdXRmOERlY29kZXIpO1xuICAgIHRoaXMudW5pdmVyc2FsTWFyc2hhbGxlciA9IG5ldyBVbml2ZXJzYWxFdmVudFN0cmVhbU1hcnNoYWxsZXIoe1xuICAgICAgdXRmOERlY29kZXIsXG4gICAgICB1dGY4RW5jb2RlcixcbiAgICB9KTtcbiAgfVxuXG4gIGRlc2VyaWFsaXplPFQ+KGJvZHk6IFJlYWRhYmxlLCBkZXNlcmlhbGl6ZXI6IChpbnB1dDogeyBbZXZlbnQ6IHN0cmluZ106IE1lc3NhZ2UgfSkgPT4gUHJvbWlzZTxUPik6IEFzeW5jSXRlcmFibGU8VD4ge1xuICAgIC8vc2hvdWxkIHVzZSBzdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmFibGVdIHdoZW4gdGhlIGFwaSBpcyBzdGFibGVcbiAgICAvL3JlZmVyZW5jZTogaHR0cHM6Ly9ub2RlanMub3JnL2RvY3MvbGF0ZXN0LXYxMS54L2FwaS9zdHJlYW0uaHRtbCNzdHJlYW1fcmVhZGFibGVfc3ltYm9sX2FzeW5jaXRlcmF0b3JcbiAgICBjb25zdCBib2R5SXRlcmFibGU6IEFzeW5jSXRlcmFibGU8VWludDhBcnJheT4gPVxuICAgICAgdHlwZW9mIGJvZHlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID09PSBcImZ1bmN0aW9uXCIgPyBib2R5IDogcmVhZGFibGV0b0l0ZXJhYmxlKGJvZHkpO1xuICAgIHJldHVybiB0aGlzLnVuaXZlcnNhbE1hcnNoYWxsZXIuZGVzZXJpYWxpemUoYm9keUl0ZXJhYmxlLCBkZXNlcmlhbGl6ZXIpO1xuICB9XG5cbiAgc2VyaWFsaXplPFQ+KGlucHV0OiBBc3luY0l0ZXJhYmxlPFQ+LCBzZXJpYWxpemVyOiAoZXZlbnQ6IFQpID0+IE1lc3NhZ2UpOiBSZWFkYWJsZSB7XG4gICAgY29uc3Qgc2VyaWFsaXplZEl0ZXJhYmxlID0gdGhpcy51bml2ZXJzYWxNYXJzaGFsbGVyLnNlcmlhbGl6ZShpbnB1dCwgc2VyaWFsaXplcik7XG4gICAgaWYgKHR5cGVvZiBSZWFkYWJsZS5mcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vcmVmZXJlbmNlOiBodHRwczovL25vZGVqcy5vcmcvZGlzdC9sYXRlc3QtdjEzLngvZG9jcy9hcGkvc3RyZWFtLmh0bWwjc3RyZWFtX25ld19zdHJlYW1fcmVhZGFibGVfb3B0aW9uc1xuICAgICAgcmV0dXJuIFJlYWRhYmxlLmZyb20oc2VyaWFsaXplZEl0ZXJhYmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaXRlcmF0b3IgPSBzZXJpYWxpemVkSXRlcmFibGVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG4gICAgICBjb25zdCBzZXJpYWxpemVkU3RyZWFtID0gbmV3IFJlYWRhYmxlKHtcbiAgICAgICAgYXV0b0Rlc3Ryb3k6IHRydWUsXG4gICAgICAgIG9iamVjdE1vZGU6IHRydWUsXG4gICAgICAgIGFzeW5jIHJlYWQoKSB7XG4gICAgICAgICAgaXRlcmF0b3JcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC50aGVuKCh7IGRvbmUsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2gobnVsbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZGVzdHJveShlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIC8vVE9ETzogdXNlICdhdXRvRGVzdHJveScgd2hlbiB0YXJnZXRpbmcgTm9kZSAxMVxuICAgICAgc2VyaWFsaXplZFN0cmVhbS5vbihcImVycm9yXCIsICgpID0+IHtcbiAgICAgICAgc2VyaWFsaXplZFN0cmVhbS5kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICAgIHNlcmlhbGl6ZWRTdHJlYW0ub24oXCJlbmRcIiwgKCkgPT4ge1xuICAgICAgICBzZXJpYWxpemVkU3RyZWFtLmRlc3Ryb3koKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHNlcmlhbGl6ZWRTdHJlYW07XG4gICAgfVxuICB9XG59XG4iXX0=