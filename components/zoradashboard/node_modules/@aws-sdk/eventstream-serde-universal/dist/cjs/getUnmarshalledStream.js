"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnmarshalledStream = void 0;
function getUnmarshalledStream(source, options) {
    return {
        [Symbol.asyncIterator]: async function* () {
            for await (const chunk of source) {
                const message = options.eventMarshaller.unmarshall(chunk);
                const { value: messageType } = message.headers[":message-type"];
                if (messageType === "error") {
                    // Unmodeled exception in event
                    const unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
                    unmodeledError.name = message.headers[":error-code"].value;
                    throw unmodeledError;
                }
                else if (messageType === "exception") {
                    // For modeled exception, push it to deserializer and throw after deserializing
                    const code = message.headers[":exception-type"].value;
                    const exception = { [code]: message };
                    // Get parsed exception event in key(error code) value(structured error) pair.
                    const deserializedException = await options.deserializer(exception);
                    if (deserializedException.$unknown) {
                        //this is an unmodeled exception then try parsing it with best effort
                        const error = new Error(options.toUtf8(message.body));
                        error.name = code;
                        throw error;
                    }
                    throw deserializedException[code];
                }
                else if (messageType === "event") {
                    const event = {
                        [message.headers[":event-type"].value]: message,
                    };
                    const deserialized = await options.deserializer(event);
                    if (deserialized.$unknown)
                        continue;
                    yield deserialized;
                }
                else {
                    throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
                }
            }
        },
    };
}
exports.getUnmarshalledStream = getUnmarshalledStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5tYXJzaGFsbGVkU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2dldFVubWFyc2hhbGxlZFN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTQSxTQUFnQixxQkFBcUIsQ0FDbkMsTUFBaUMsRUFDakMsT0FBcUM7SUFFckMsT0FBTztRQUNMLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDO1lBQ3JDLElBQUksS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDaEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFELE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxXQUFXLEtBQUssT0FBTyxFQUFFO29CQUMzQiwrQkFBK0I7b0JBQy9CLE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFnQixJQUFJLGNBQWMsQ0FBQyxDQUFDO29CQUN4RyxjQUFjLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBZSxDQUFDO29CQUNyRSxNQUFNLGNBQWMsQ0FBQztpQkFDdEI7cUJBQU0sSUFBSSxXQUFXLEtBQUssV0FBVyxFQUFFO29CQUN0QywrRUFBK0U7b0JBQy9FLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFlLENBQUM7b0JBQ2hFLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQztvQkFDdEMsOEVBQThFO29CQUM5RSxNQUFNLHFCQUFxQixHQUFHLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUU7d0JBQ2xDLHFFQUFxRTt3QkFDckUsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ2xCLE1BQU0sS0FBSyxDQUFDO3FCQUNiO29CQUNELE1BQU0scUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ25DO3FCQUFNLElBQUksV0FBVyxLQUFLLE9BQU8sRUFBRTtvQkFDbEMsTUFBTSxLQUFLLEdBQUc7d0JBQ1osQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQWUsQ0FBQyxFQUFFLE9BQU87cUJBQzFELENBQUM7b0JBQ0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2RCxJQUFJLFlBQVksQ0FBQyxRQUFRO3dCQUFFLFNBQVM7b0JBQ3BDLE1BQU0sWUFBWSxDQUFDO2lCQUNwQjtxQkFBTTtvQkFDTCxNQUFNLEtBQUssQ0FBQyw4QkFBOEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUNuRjthQUNGO1FBQ0gsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBeENELHNEQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50U3RyZWFtTWFyc2hhbGxlciBhcyBFdmVudE1hcnNoYWxsZXIgfSBmcm9tIFwiQGF3cy1zZGsvZXZlbnRzdHJlYW0tbWFyc2hhbGxlclwiO1xuaW1wb3J0IHsgRW5jb2RlciwgTWVzc2FnZSB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgdHlwZSBVbm1hcnNoYWxsZWRTdHJlYW1PcHRpb25zPFQ+ID0ge1xuICBldmVudE1hcnNoYWxsZXI6IEV2ZW50TWFyc2hhbGxlcjtcbiAgZGVzZXJpYWxpemVyOiAoaW5wdXQ6IHsgW25hbWU6IHN0cmluZ106IE1lc3NhZ2UgfSkgPT4gUHJvbWlzZTxUPjtcbiAgdG9VdGY4OiBFbmNvZGVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVubWFyc2hhbGxlZFN0cmVhbTxUIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBhbnkgfT4oXG4gIHNvdXJjZTogQXN5bmNJdGVyYWJsZTxVaW50OEFycmF5PixcbiAgb3B0aW9uczogVW5tYXJzaGFsbGVkU3RyZWFtT3B0aW9uczxUPlxuKTogQXN5bmNJdGVyYWJsZTxUPiB7XG4gIHJldHVybiB7XG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTogYXN5bmMgZnVuY3Rpb24qICgpIHtcbiAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc291cmNlKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBvcHRpb25zLmV2ZW50TWFyc2hhbGxlci51bm1hcnNoYWxsKGNodW5rKTtcbiAgICAgICAgY29uc3QgeyB2YWx1ZTogbWVzc2FnZVR5cGUgfSA9IG1lc3NhZ2UuaGVhZGVyc1tcIjptZXNzYWdlLXR5cGVcIl07XG4gICAgICAgIGlmIChtZXNzYWdlVHlwZSA9PT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgLy8gVW5tb2RlbGVkIGV4Y2VwdGlvbiBpbiBldmVudFxuICAgICAgICAgIGNvbnN0IHVubW9kZWxlZEVycm9yID0gbmV3IEVycm9yKChtZXNzYWdlLmhlYWRlcnNbXCI6ZXJyb3ItbWVzc2FnZVwiXS52YWx1ZSBhcyBzdHJpbmcpIHx8IFwiVW5rbm93bkVycm9yXCIpO1xuICAgICAgICAgIHVubW9kZWxlZEVycm9yLm5hbWUgPSBtZXNzYWdlLmhlYWRlcnNbXCI6ZXJyb3ItY29kZVwiXS52YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgICAgdGhyb3cgdW5tb2RlbGVkRXJyb3I7XG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZVR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcbiAgICAgICAgICAvLyBGb3IgbW9kZWxlZCBleGNlcHRpb24sIHB1c2ggaXQgdG8gZGVzZXJpYWxpemVyIGFuZCB0aHJvdyBhZnRlciBkZXNlcmlhbGl6aW5nXG4gICAgICAgICAgY29uc3QgY29kZSA9IG1lc3NhZ2UuaGVhZGVyc1tcIjpleGNlcHRpb24tdHlwZVwiXS52YWx1ZSBhcyBzdHJpbmc7XG4gICAgICAgICAgY29uc3QgZXhjZXB0aW9uID0geyBbY29kZV06IG1lc3NhZ2UgfTtcbiAgICAgICAgICAvLyBHZXQgcGFyc2VkIGV4Y2VwdGlvbiBldmVudCBpbiBrZXkoZXJyb3IgY29kZSkgdmFsdWUoc3RydWN0dXJlZCBlcnJvcikgcGFpci5cbiAgICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZWRFeGNlcHRpb24gPSBhd2FpdCBvcHRpb25zLmRlc2VyaWFsaXplcihleGNlcHRpb24pO1xuICAgICAgICAgIGlmIChkZXNlcmlhbGl6ZWRFeGNlcHRpb24uJHVua25vd24pIHtcbiAgICAgICAgICAgIC8vdGhpcyBpcyBhbiB1bm1vZGVsZWQgZXhjZXB0aW9uIHRoZW4gdHJ5IHBhcnNpbmcgaXQgd2l0aCBiZXN0IGVmZm9ydFxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3Iob3B0aW9ucy50b1V0ZjgobWVzc2FnZS5ib2R5KSk7XG4gICAgICAgICAgICBlcnJvci5uYW1lID0gY29kZTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBkZXNlcmlhbGl6ZWRFeGNlcHRpb25bY29kZV07XG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZVR5cGUgPT09IFwiZXZlbnRcIikge1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0ge1xuICAgICAgICAgICAgW21lc3NhZ2UuaGVhZGVyc1tcIjpldmVudC10eXBlXCJdLnZhbHVlIGFzIHN0cmluZ106IG1lc3NhZ2UsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZWQgPSBhd2FpdCBvcHRpb25zLmRlc2VyaWFsaXplcihldmVudCk7XG4gICAgICAgICAgaWYgKGRlc2VyaWFsaXplZC4kdW5rbm93bikgY29udGludWU7XG4gICAgICAgICAgeWllbGQgZGVzZXJpYWxpemVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IEVycm9yKGBVbnJlY29nbml6YWJsZSBldmVudCB0eXBlOiAke21lc3NhZ2UuaGVhZGVyc1tcIjpldmVudC10eXBlXCJdLnZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==