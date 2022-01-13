import { __assign, __awaiter, __generator } from "tslib";
import { runPolling } from "./poller";
import { validateWaiterOptions } from "./utils";
import { waiterServiceDefaults, WaiterState } from "./waiter";
var abortTimeout = function (abortSignal) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                abortSignal.onabort = function () { return resolve({ state: WaiterState.ABORTED }); };
            })];
    });
}); };
/**
 * Create a waiter promise that only resolves when:
 * 1. Abort controller is signaled
 * 2. Max wait time is reached
 * 3. `acceptorChecks` succeeds, or fails
 * Otherwise, it invokes `acceptorChecks` with exponential-backoff delay.
 *
 * @internal
 */
export var createWaiter = function (options, input, acceptorChecks) { return __awaiter(void 0, void 0, void 0, function () {
    var params, exitConditions;
    return __generator(this, function (_a) {
        params = __assign(__assign({}, waiterServiceDefaults), options);
        validateWaiterOptions(params);
        exitConditions = [runPolling(params, input, acceptorChecks)];
        if (options.abortController) {
            exitConditions.push(abortTimeout(options.abortController.signal));
        }
        return [2 /*return*/, Promise.race(exitConditions)];
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlV2FpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyZWF0ZVdhaXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN0QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEQsT0FBTyxFQUErQixxQkFBcUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFM0YsSUFBTSxZQUFZLEdBQUcsVUFBTyxXQUF3Qjs7UUFDbEQsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUN6QixXQUFXLENBQUMsT0FBTyxHQUFHLGNBQU0sT0FBQSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQXZDLENBQXVDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLEVBQUM7O0tBQ0osQ0FBQztBQUVGOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxDQUFDLElBQU0sWUFBWSxHQUFHLFVBQzFCLE9BQThCLEVBQzlCLEtBQVksRUFDWixjQUF1RTs7O1FBRWpFLE1BQU0seUJBQ1AscUJBQXFCLEdBQ3JCLE9BQU8sQ0FDWCxDQUFDO1FBQ0YscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEIsY0FBYyxHQUFHLENBQUMsVUFBVSxDQUFnQixNQUFNLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxPQUFPLENBQUMsZUFBZSxFQUFFO1lBQzNCLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNuRTtRQUNELHNCQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUM7O0tBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYm9ydFNpZ25hbCB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBydW5Qb2xsaW5nIH0gZnJvbSBcIi4vcG9sbGVyXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZVdhaXRlck9wdGlvbnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgV2FpdGVyT3B0aW9ucywgV2FpdGVyUmVzdWx0LCB3YWl0ZXJTZXJ2aWNlRGVmYXVsdHMsIFdhaXRlclN0YXRlIH0gZnJvbSBcIi4vd2FpdGVyXCI7XG5cbmNvbnN0IGFib3J0VGltZW91dCA9IGFzeW5jIChhYm9ydFNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFdhaXRlclJlc3VsdD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBhYm9ydFNpZ25hbC5vbmFib3J0ID0gKCkgPT4gcmVzb2x2ZSh7IHN0YXRlOiBXYWl0ZXJTdGF0ZS5BQk9SVEVEIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgd2FpdGVyIHByb21pc2UgdGhhdCBvbmx5IHJlc29sdmVzIHdoZW46XG4gKiAxLiBBYm9ydCBjb250cm9sbGVyIGlzIHNpZ25hbGVkXG4gKiAyLiBNYXggd2FpdCB0aW1lIGlzIHJlYWNoZWRcbiAqIDMuIGBhY2NlcHRvckNoZWNrc2Agc3VjY2VlZHMsIG9yIGZhaWxzXG4gKiBPdGhlcndpc2UsIGl0IGludm9rZXMgYGFjY2VwdG9yQ2hlY2tzYCB3aXRoIGV4cG9uZW50aWFsLWJhY2tvZmYgZGVsYXkuXG4gKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVXYWl0ZXIgPSBhc3luYyA8Q2xpZW50LCBJbnB1dD4oXG4gIG9wdGlvbnM6IFdhaXRlck9wdGlvbnM8Q2xpZW50PixcbiAgaW5wdXQ6IElucHV0LFxuICBhY2NlcHRvckNoZWNrczogKGNsaWVudDogQ2xpZW50LCBpbnB1dDogSW5wdXQpID0+IFByb21pc2U8V2FpdGVyUmVzdWx0PlxuKTogUHJvbWlzZTxXYWl0ZXJSZXN1bHQ+ID0+IHtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIC4uLndhaXRlclNlcnZpY2VEZWZhdWx0cyxcbiAgICAuLi5vcHRpb25zLFxuICB9O1xuICB2YWxpZGF0ZVdhaXRlck9wdGlvbnMocGFyYW1zKTtcblxuICBjb25zdCBleGl0Q29uZGl0aW9ucyA9IFtydW5Qb2xsaW5nPENsaWVudCwgSW5wdXQ+KHBhcmFtcywgaW5wdXQsIGFjY2VwdG9yQ2hlY2tzKV07XG4gIGlmIChvcHRpb25zLmFib3J0Q29udHJvbGxlcikge1xuICAgIGV4aXRDb25kaXRpb25zLnB1c2goYWJvcnRUaW1lb3V0KG9wdGlvbnMuYWJvcnRDb250cm9sbGVyLnNpZ25hbCkpO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJhY2UoZXhpdENvbmRpdGlvbnMpO1xufTtcbiJdfQ==