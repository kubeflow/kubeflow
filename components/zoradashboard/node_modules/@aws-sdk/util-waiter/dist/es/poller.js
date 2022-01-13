import { __awaiter, __generator } from "tslib";
import { sleep } from "./utils/sleep";
import { WaiterState } from "./waiter";
/**
 * Reference: https://awslabs.github.io/smithy/1.0/spec/waiters.html#waiter-retries
 */
var exponentialBackoffWithJitter = function (minDelay, maxDelay, attemptCeiling, attempt) {
    if (attempt > attemptCeiling)
        return maxDelay;
    var delay = minDelay * Math.pow(2, (attempt - 1));
    return randomInRange(minDelay, delay);
};
var randomInRange = function (min, max) { return min + Math.random() * (max - min); };
/**
 * Function that runs polling as part of waiters. This will make one inital attempt and then
 * subsequent attempts with an increasing delay.
 * @param params options passed to the waiter.
 * @param client AWS SDK Client
 * @param input client input
 * @param stateChecker function that checks the acceptor states on each poll.
 */
export var runPolling = function (_a, input, acceptorChecks) {
    var minDelay = _a.minDelay, maxDelay = _a.maxDelay, maxWaitTime = _a.maxWaitTime, abortController = _a.abortController, client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var state, currentAttempt, waitUntil, attemptCeiling, delay, state_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, acceptorChecks(client, input)];
                case 1:
                    state = (_c.sent()).state;
                    if (state !== WaiterState.RETRY) {
                        return [2 /*return*/, { state: state }];
                    }
                    currentAttempt = 1;
                    waitUntil = Date.now() + maxWaitTime * 1000;
                    attemptCeiling = Math.log(maxDelay / minDelay) / Math.log(2) + 1;
                    _c.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 5];
                    if ((_b = abortController === null || abortController === void 0 ? void 0 : abortController.signal) === null || _b === void 0 ? void 0 : _b.aborted) {
                        return [2 /*return*/, { state: WaiterState.ABORTED }];
                    }
                    delay = exponentialBackoffWithJitter(minDelay, maxDelay, attemptCeiling, currentAttempt);
                    // Resolve the promise explicitly at timeout or aborted. Otherwise this while loop will keep making API call until
                    // `acceptorCheck` returns non-retry status, even with the Promise.race() outside.
                    if (Date.now() + delay * 1000 > waitUntil) {
                        return [2 /*return*/, { state: WaiterState.TIMEOUT }];
                    }
                    return [4 /*yield*/, sleep(delay)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, acceptorChecks(client, input)];
                case 4:
                    state_1 = (_c.sent()).state;
                    if (state_1 !== WaiterState.RETRY) {
                        return [2 /*return*/, { state: state_1 }];
                    }
                    currentAttempt += 1;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQStCLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVwRTs7R0FFRztBQUNILElBQU0sNEJBQTRCLEdBQUcsVUFBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsY0FBc0IsRUFBRSxPQUFlO0lBQy9HLElBQUksT0FBTyxHQUFHLGNBQWM7UUFBRSxPQUFPLFFBQVEsQ0FBQztJQUM5QyxJQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsU0FBQSxDQUFDLEVBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQztJQUM1QyxPQUFPLGFBQWEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDO0FBRUYsSUFBTSxhQUFhLEdBQUcsVUFBQyxHQUFXLEVBQUUsR0FBVyxJQUFLLE9BQUEsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBakMsQ0FBaUMsQ0FBQztBQUV0Rjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLFVBQ3hCLEVBQW1GLEVBQ25GLEtBQVksRUFDWixjQUF1RTtRQUZyRSxRQUFRLGNBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsZUFBZSxxQkFBQSxFQUFFLE1BQU0sWUFBQTs7Ozs7O3dCQUl4QyxxQkFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFBOztvQkFBN0MsS0FBSyxHQUFLLENBQUEsU0FBbUMsQ0FBQSxNQUF4QztvQkFDYixJQUFJLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxFQUFFO3dCQUMvQixzQkFBTyxFQUFFLEtBQUssT0FBQSxFQUFFLEVBQUM7cUJBQ2xCO29CQUVHLGNBQWMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQztvQkFHNUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7eUJBQ2hFLElBQUk7b0JBQ1QsVUFBSSxlQUFlLGFBQWYsZUFBZSx1QkFBZixlQUFlLENBQUUsTUFBTSwwQ0FBRSxPQUFPLEVBQUU7d0JBQ3BDLHNCQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBQztxQkFDdkM7b0JBQ0ssS0FBSyxHQUFHLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUMvRixrSEFBa0g7b0JBQ2xILGtGQUFrRjtvQkFDbEYsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEVBQUU7d0JBQ3pDLHNCQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBQztxQkFDdkM7b0JBQ0QscUJBQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFBOztvQkFBbEIsU0FBa0IsQ0FBQztvQkFDRCxxQkFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFBOztvQkFBN0MsVUFBVSxDQUFBLFNBQW1DLENBQUEsTUFBeEM7b0JBQ2IsSUFBSSxPQUFLLEtBQUssV0FBVyxDQUFDLEtBQUssRUFBRTt3QkFDL0Isc0JBQU8sRUFBRSxLQUFLLFNBQUEsRUFBRSxFQUFDO3FCQUNsQjtvQkFFRCxjQUFjLElBQUksQ0FBQyxDQUFDOzs7Ozs7Q0FFdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNsZWVwIH0gZnJvbSBcIi4vdXRpbHMvc2xlZXBcIjtcbmltcG9ydCB7IFdhaXRlck9wdGlvbnMsIFdhaXRlclJlc3VsdCwgV2FpdGVyU3RhdGUgfSBmcm9tIFwiLi93YWl0ZXJcIjtcblxuLyoqXG4gKiBSZWZlcmVuY2U6IGh0dHBzOi8vYXdzbGFicy5naXRodWIuaW8vc21pdGh5LzEuMC9zcGVjL3dhaXRlcnMuaHRtbCN3YWl0ZXItcmV0cmllc1xuICovXG5jb25zdCBleHBvbmVudGlhbEJhY2tvZmZXaXRoSml0dGVyID0gKG1pbkRlbGF5OiBudW1iZXIsIG1heERlbGF5OiBudW1iZXIsIGF0dGVtcHRDZWlsaW5nOiBudW1iZXIsIGF0dGVtcHQ6IG51bWJlcikgPT4ge1xuICBpZiAoYXR0ZW1wdCA+IGF0dGVtcHRDZWlsaW5nKSByZXR1cm4gbWF4RGVsYXk7XG4gIGNvbnN0IGRlbGF5ID0gbWluRGVsYXkgKiAyICoqIChhdHRlbXB0IC0gMSk7XG4gIHJldHVybiByYW5kb21JblJhbmdlKG1pbkRlbGF5LCBkZWxheSk7XG59O1xuXG5jb25zdCByYW5kb21JblJhbmdlID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pO1xuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgcnVucyBwb2xsaW5nIGFzIHBhcnQgb2Ygd2FpdGVycy4gVGhpcyB3aWxsIG1ha2Ugb25lIGluaXRhbCBhdHRlbXB0IGFuZCB0aGVuXG4gKiBzdWJzZXF1ZW50IGF0dGVtcHRzIHdpdGggYW4gaW5jcmVhc2luZyBkZWxheS5cbiAqIEBwYXJhbSBwYXJhbXMgb3B0aW9ucyBwYXNzZWQgdG8gdGhlIHdhaXRlci5cbiAqIEBwYXJhbSBjbGllbnQgQVdTIFNESyBDbGllbnRcbiAqIEBwYXJhbSBpbnB1dCBjbGllbnQgaW5wdXRcbiAqIEBwYXJhbSBzdGF0ZUNoZWNrZXIgZnVuY3Rpb24gdGhhdCBjaGVja3MgdGhlIGFjY2VwdG9yIHN0YXRlcyBvbiBlYWNoIHBvbGwuXG4gKi9cbmV4cG9ydCBjb25zdCBydW5Qb2xsaW5nID0gYXN5bmMgPENsaWVudCwgSW5wdXQ+KFxuICB7IG1pbkRlbGF5LCBtYXhEZWxheSwgbWF4V2FpdFRpbWUsIGFib3J0Q29udHJvbGxlciwgY2xpZW50IH06IFdhaXRlck9wdGlvbnM8Q2xpZW50PixcbiAgaW5wdXQ6IElucHV0LFxuICBhY2NlcHRvckNoZWNrczogKGNsaWVudDogQ2xpZW50LCBpbnB1dDogSW5wdXQpID0+IFByb21pc2U8V2FpdGVyUmVzdWx0PlxuKTogUHJvbWlzZTxXYWl0ZXJSZXN1bHQ+ID0+IHtcbiAgY29uc3QgeyBzdGF0ZSB9ID0gYXdhaXQgYWNjZXB0b3JDaGVja3MoY2xpZW50LCBpbnB1dCk7XG4gIGlmIChzdGF0ZSAhPT0gV2FpdGVyU3RhdGUuUkVUUlkpIHtcbiAgICByZXR1cm4geyBzdGF0ZSB9O1xuICB9XG5cbiAgbGV0IGN1cnJlbnRBdHRlbXB0ID0gMTtcbiAgY29uc3Qgd2FpdFVudGlsID0gRGF0ZS5ub3coKSArIG1heFdhaXRUaW1lICogMTAwMDtcbiAgLy8gVGhlIG1heCBhdHRlbXB0IG51bWJlciB0aGF0IHRoZSBkZXJpdmVkIGRlbGF5IHRpbWUgdGVuZCB0byBpbmNyZWFzZS5cbiAgLy8gUHJlLWNvbXB1dGUgdGhpcyBudW1iZXIgdG8gYXZvaWQgTnVtYmVyIHR5cGUgb3ZlcmZsb3cuXG4gIGNvbnN0IGF0dGVtcHRDZWlsaW5nID0gTWF0aC5sb2cobWF4RGVsYXkgLyBtaW5EZWxheSkgLyBNYXRoLmxvZygyKSArIDE7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKGFib3J0Q29udHJvbGxlcj8uc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICByZXR1cm4geyBzdGF0ZTogV2FpdGVyU3RhdGUuQUJPUlRFRCB9O1xuICAgIH1cbiAgICBjb25zdCBkZWxheSA9IGV4cG9uZW50aWFsQmFja29mZldpdGhKaXR0ZXIobWluRGVsYXksIG1heERlbGF5LCBhdHRlbXB0Q2VpbGluZywgY3VycmVudEF0dGVtcHQpO1xuICAgIC8vIFJlc29sdmUgdGhlIHByb21pc2UgZXhwbGljaXRseSBhdCB0aW1lb3V0IG9yIGFib3J0ZWQuIE90aGVyd2lzZSB0aGlzIHdoaWxlIGxvb3Agd2lsbCBrZWVwIG1ha2luZyBBUEkgY2FsbCB1bnRpbFxuICAgIC8vIGBhY2NlcHRvckNoZWNrYCByZXR1cm5zIG5vbi1yZXRyeSBzdGF0dXMsIGV2ZW4gd2l0aCB0aGUgUHJvbWlzZS5yYWNlKCkgb3V0c2lkZS5cbiAgICBpZiAoRGF0ZS5ub3coKSArIGRlbGF5ICogMTAwMCA+IHdhaXRVbnRpbCkge1xuICAgICAgcmV0dXJuIHsgc3RhdGU6IFdhaXRlclN0YXRlLlRJTUVPVVQgfTtcbiAgICB9XG4gICAgYXdhaXQgc2xlZXAoZGVsYXkpO1xuICAgIGNvbnN0IHsgc3RhdGUgfSA9IGF3YWl0IGFjY2VwdG9yQ2hlY2tzKGNsaWVudCwgaW5wdXQpO1xuICAgIGlmIChzdGF0ZSAhPT0gV2FpdGVyU3RhdGUuUkVUUlkpIHtcbiAgICAgIHJldHVybiB7IHN0YXRlIH07XG4gICAgfVxuXG4gICAgY3VycmVudEF0dGVtcHQgKz0gMTtcbiAgfVxufTtcbiJdfQ==