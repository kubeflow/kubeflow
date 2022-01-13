"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUserAgent = void 0;
/**
 * Default provider to the user agent in ReactNative. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and virsion
 */
const defaultUserAgent = ({ serviceId, clientVersion, }) => async () => {
    const sections = [
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
        sections.push([`api/${serviceId}`, clientVersion]);
    }
    return sections;
};
exports.defaultUserAgent = defaultUserAgent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubmF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luZGV4Lm5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQTs7O0dBR0c7QUFDSSxNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFDL0IsU0FBUyxFQUNULGFBQWEsR0FDVyxFQUF1QixFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDN0QsTUFBTSxRQUFRLEdBQWM7UUFDMUIsZUFBZTtRQUNmLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztRQUM3QixjQUFjO1FBQ2QsQ0FBQyxVQUFVLENBQUM7UUFDWixvQkFBb0I7UUFDcEIsMkNBQTJDO1FBQzNDLENBQUMsU0FBUyxDQUFDO1FBQ1gsQ0FBQyxPQUFPLENBQUM7S0FDVixDQUFDO0lBRUYsSUFBSSxTQUFTLEVBQUU7UUFDYixlQUFlO1FBQ2YsK0NBQStDO1FBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLFNBQVMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7S0FDcEQ7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUF0QlcsUUFBQSxnQkFBZ0Isb0JBc0IzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyLCBVc2VyQWdlbnQgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuaW1wb3J0IHsgRGVmYXVsdFVzZXJBZ2VudE9wdGlvbnMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uc1wiO1xuXG4vKipcbiAqIERlZmF1bHQgcHJvdmlkZXIgdG8gdGhlIHVzZXIgYWdlbnQgaW4gUmVhY3ROYXRpdmUuIEl0J3MgYSBiZXN0IGVmZm9ydCB0byBpbmZlclxuICogdGhlIGRldmljZSBpbmZvcm1hdGlvbi4gSXQgdXNlcyBib3dzZXIgbGlicmFyeSB0byBkZXRlY3QgdGhlIGJyb3dzZXIgYW5kIHZpcnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRVc2VyQWdlbnQgPSAoe1xuICBzZXJ2aWNlSWQsXG4gIGNsaWVudFZlcnNpb24sXG59OiBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyk6IFByb3ZpZGVyPFVzZXJBZ2VudD4gPT4gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzZWN0aW9uczogVXNlckFnZW50ID0gW1xuICAgIC8vIHNkay1tZXRhZGF0YVxuICAgIFtcImF3cy1zZGstanNcIiwgY2xpZW50VmVyc2lvbl0sXG4gICAgLy8gb3MtbWV0YWRhdGFcbiAgICBbXCJvcy9vdGhlclwiXSxcbiAgICAvLyBsYW5ndWFnZS1tZXRhZGF0YVxuICAgIC8vIEVDTUFTY3JpcHQgZWRpdGlvbiBkb2Vzbid0IG1hdHRlciBpbiBKUy5cbiAgICBbXCJsYW5nL2pzXCJdLFxuICAgIFtcIm1kL3JuXCJdLFxuICBdO1xuXG4gIGlmIChzZXJ2aWNlSWQpIHtcbiAgICAvLyBhcGktbWV0YWRhdGFcbiAgICAvLyBzZXJ2aWNlIElkIG1heSBub3QgYXBwZWFyIGluIG5vbi1BV1MgY2xpZW50c1xuICAgIHNlY3Rpb25zLnB1c2goW2BhcGkvJHtzZXJ2aWNlSWR9YCwgY2xpZW50VmVyc2lvbl0pO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb25zO1xufTtcbiJdfQ==