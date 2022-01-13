import { __awaiter, __generator } from "tslib";
/**
 * Default provider to the user agent in ReactNative. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and virsion
 */
export var defaultUserAgent = function (_a) {
    var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var sections;
        return __generator(this, function (_a) {
            sections = [
                // sdk-metadata
                ["aws-sdk-js", clientVersion],
                // os-metadata
                ["os/other"],
                // language-metadata
                // ECMAScript edition doesn't matter in JS.
                ["lang/js"],
                ["md/rn"],
            ];
            if (serviceId) {
                // api-metadata
                // service Id may not appear in non-AWS clients
                sections.push(["api/" + serviceId, clientVersion]);
            }
            return [2 /*return*/, sections];
        });
    }); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubmF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luZGV4Lm5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUE7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxFQUdQO1FBRnhCLFNBQVMsZUFBQSxFQUNULGFBQWEsbUJBQUE7SUFDcUMsT0FBQTs7O1lBQzVDLFFBQVEsR0FBYztnQkFDMUIsZUFBZTtnQkFDZixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7Z0JBQzdCLGNBQWM7Z0JBQ2QsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osb0JBQW9CO2dCQUNwQiwyQ0FBMkM7Z0JBQzNDLENBQUMsU0FBUyxDQUFDO2dCQUNYLENBQUMsT0FBTyxDQUFDO2FBQ1YsQ0FBQztZQUVGLElBQUksU0FBUyxFQUFFO2dCQUNiLGVBQWU7Z0JBQ2YsK0NBQStDO2dCQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBTyxTQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUNwRDtZQUVELHNCQUFPLFFBQVEsRUFBQzs7U0FDakI7QUFuQm1ELENBbUJuRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXIsIFVzZXJBZ2VudCB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb25zXCI7XG5cbi8qKlxuICogRGVmYXVsdCBwcm92aWRlciB0byB0aGUgdXNlciBhZ2VudCBpbiBSZWFjdE5hdGl2ZS4gSXQncyBhIGJlc3QgZWZmb3J0IHRvIGluZmVyXG4gKiB0aGUgZGV2aWNlIGluZm9ybWF0aW9uLiBJdCB1c2VzIGJvd3NlciBsaWJyYXJ5IHRvIGRldGVjdCB0aGUgYnJvd3NlciBhbmQgdmlyc2lvblxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFVzZXJBZ2VudCA9ICh7XG4gIHNlcnZpY2VJZCxcbiAgY2xpZW50VmVyc2lvbixcbn06IERlZmF1bHRVc2VyQWdlbnRPcHRpb25zKTogUHJvdmlkZXI8VXNlckFnZW50PiA9PiBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHNlY3Rpb25zOiBVc2VyQWdlbnQgPSBbXG4gICAgLy8gc2RrLW1ldGFkYXRhXG4gICAgW1wiYXdzLXNkay1qc1wiLCBjbGllbnRWZXJzaW9uXSxcbiAgICAvLyBvcy1tZXRhZGF0YVxuICAgIFtcIm9zL290aGVyXCJdLFxuICAgIC8vIGxhbmd1YWdlLW1ldGFkYXRhXG4gICAgLy8gRUNNQVNjcmlwdCBlZGl0aW9uIGRvZXNuJ3QgbWF0dGVyIGluIEpTLlxuICAgIFtcImxhbmcvanNcIl0sXG4gICAgW1wibWQvcm5cIl0sXG4gIF07XG5cbiAgaWYgKHNlcnZpY2VJZCkge1xuICAgIC8vIGFwaS1tZXRhZGF0YVxuICAgIC8vIHNlcnZpY2UgSWQgbWF5IG5vdCBhcHBlYXIgaW4gbm9uLUFXUyBjbGllbnRzXG4gICAgc2VjdGlvbnMucHVzaChbYGFwaS8ke3NlcnZpY2VJZH1gLCBjbGllbnRWZXJzaW9uXSk7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbnM7XG59O1xuIl19