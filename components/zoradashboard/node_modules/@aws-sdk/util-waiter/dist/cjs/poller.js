"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPolling = void 0;
const sleep_1 = require("./utils/sleep");
const waiter_1 = require("./waiter");
/**
 * Reference: https://awslabs.github.io/smithy/1.0/spec/waiters.html#waiter-retries
 */
const exponentialBackoffWithJitter = (minDelay, maxDelay, attemptCeiling, attempt) => {
    if (attempt > attemptCeiling)
        return maxDelay;
    const delay = minDelay * 2 ** (attempt - 1);
    return randomInRange(minDelay, delay);
};
const randomInRange = (min, max) => min + Math.random() * (max - min);
/**
 * Function that runs polling as part of waiters. This will make one inital attempt and then
 * subsequent attempts with an increasing delay.
 * @param params options passed to the waiter.
 * @param client AWS SDK Client
 * @param input client input
 * @param stateChecker function that checks the acceptor states on each poll.
 */
const runPolling = async ({ minDelay, maxDelay, maxWaitTime, abortController, client }, input, acceptorChecks) => {
    var _a;
    const { state } = await acceptorChecks(client, input);
    if (state !== waiter_1.WaiterState.RETRY) {
        return { state };
    }
    let currentAttempt = 1;
    const waitUntil = Date.now() + maxWaitTime * 1000;
    // The max attempt number that the derived delay time tend to increase.
    // Pre-compute this number to avoid Number type overflow.
    const attemptCeiling = Math.log(maxDelay / minDelay) / Math.log(2) + 1;
    while (true) {
        if ((_a = abortController === null || abortController === void 0 ? void 0 : abortController.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
            return { state: waiter_1.WaiterState.ABORTED };
        }
        const delay = exponentialBackoffWithJitter(minDelay, maxDelay, attemptCeiling, currentAttempt);
        // Resolve the promise explicitly at timeout or aborted. Otherwise this while loop will keep making API call until
        // `acceptorCheck` returns non-retry status, even with the Promise.race() outside.
        if (Date.now() + delay * 1000 > waitUntil) {
            return { state: waiter_1.WaiterState.TIMEOUT };
        }
        await sleep_1.sleep(delay);
        const { state } = await acceptorChecks(client, input);
        if (state !== waiter_1.WaiterState.RETRY) {
            return { state };
        }
        currentAttempt += 1;
    }
};
exports.runPolling = runPolling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBc0M7QUFDdEMscUNBQW9FO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxjQUFzQixFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQ25ILElBQUksT0FBTyxHQUFHLGNBQWM7UUFBRSxPQUFPLFFBQVEsQ0FBQztJQUM5QyxNQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sYUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFFdEY7Ozs7Ozs7R0FPRztBQUNJLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFDN0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUF5QixFQUNuRixLQUFZLEVBQ1osY0FBdUUsRUFDaEQsRUFBRTs7SUFDekIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxJQUFJLEtBQUssS0FBSyxvQkFBVyxDQUFDLEtBQUssRUFBRTtRQUMvQixPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FDbEI7SUFFRCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDbEQsdUVBQXVFO0lBQ3ZFLHlEQUF5RDtJQUN6RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RSxPQUFPLElBQUksRUFBRTtRQUNYLFVBQUksZUFBZSxhQUFmLGVBQWUsdUJBQWYsZUFBZSxDQUFFLE1BQU0sMENBQUUsT0FBTyxFQUFFO1lBQ3BDLE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QztRQUNELE1BQU0sS0FBSyxHQUFHLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQy9GLGtIQUFrSDtRQUNsSCxrRkFBa0Y7UUFDbEYsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEVBQUU7WUFDekMsT0FBTyxFQUFFLEtBQUssRUFBRSxvQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsTUFBTSxhQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLEtBQUssS0FBSyxvQkFBVyxDQUFDLEtBQUssRUFBRTtZQUMvQixPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDbEI7UUFFRCxjQUFjLElBQUksQ0FBQyxDQUFDO0tBQ3JCO0FBQ0gsQ0FBQyxDQUFDO0FBakNXLFFBQUEsVUFBVSxjQWlDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzbGVlcCB9IGZyb20gXCIuL3V0aWxzL3NsZWVwXCI7XG5pbXBvcnQgeyBXYWl0ZXJPcHRpb25zLCBXYWl0ZXJSZXN1bHQsIFdhaXRlclN0YXRlIH0gZnJvbSBcIi4vd2FpdGVyXCI7XG5cbi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL2F3c2xhYnMuZ2l0aHViLmlvL3NtaXRoeS8xLjAvc3BlYy93YWl0ZXJzLmh0bWwjd2FpdGVyLXJldHJpZXNcbiAqL1xuY29uc3QgZXhwb25lbnRpYWxCYWNrb2ZmV2l0aEppdHRlciA9IChtaW5EZWxheTogbnVtYmVyLCBtYXhEZWxheTogbnVtYmVyLCBhdHRlbXB0Q2VpbGluZzogbnVtYmVyLCBhdHRlbXB0OiBudW1iZXIpID0+IHtcbiAgaWYgKGF0dGVtcHQgPiBhdHRlbXB0Q2VpbGluZykgcmV0dXJuIG1heERlbGF5O1xuICBjb25zdCBkZWxheSA9IG1pbkRlbGF5ICogMiAqKiAoYXR0ZW1wdCAtIDEpO1xuICByZXR1cm4gcmFuZG9tSW5SYW5nZShtaW5EZWxheSwgZGVsYXkpO1xufTtcblxuY29uc3QgcmFuZG9tSW5SYW5nZSA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IHJ1bnMgcG9sbGluZyBhcyBwYXJ0IG9mIHdhaXRlcnMuIFRoaXMgd2lsbCBtYWtlIG9uZSBpbml0YWwgYXR0ZW1wdCBhbmQgdGhlblxuICogc3Vic2VxdWVudCBhdHRlbXB0cyB3aXRoIGFuIGluY3JlYXNpbmcgZGVsYXkuXG4gKiBAcGFyYW0gcGFyYW1zIG9wdGlvbnMgcGFzc2VkIHRvIHRoZSB3YWl0ZXIuXG4gKiBAcGFyYW0gY2xpZW50IEFXUyBTREsgQ2xpZW50XG4gKiBAcGFyYW0gaW5wdXQgY2xpZW50IGlucHV0XG4gKiBAcGFyYW0gc3RhdGVDaGVja2VyIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIHRoZSBhY2NlcHRvciBzdGF0ZXMgb24gZWFjaCBwb2xsLlxuICovXG5leHBvcnQgY29uc3QgcnVuUG9sbGluZyA9IGFzeW5jIDxDbGllbnQsIElucHV0PihcbiAgeyBtaW5EZWxheSwgbWF4RGVsYXksIG1heFdhaXRUaW1lLCBhYm9ydENvbnRyb2xsZXIsIGNsaWVudCB9OiBXYWl0ZXJPcHRpb25zPENsaWVudD4sXG4gIGlucHV0OiBJbnB1dCxcbiAgYWNjZXB0b3JDaGVja3M6IChjbGllbnQ6IENsaWVudCwgaW5wdXQ6IElucHV0KSA9PiBQcm9taXNlPFdhaXRlclJlc3VsdD5cbik6IFByb21pc2U8V2FpdGVyUmVzdWx0PiA9PiB7XG4gIGNvbnN0IHsgc3RhdGUgfSA9IGF3YWl0IGFjY2VwdG9yQ2hlY2tzKGNsaWVudCwgaW5wdXQpO1xuICBpZiAoc3RhdGUgIT09IFdhaXRlclN0YXRlLlJFVFJZKSB7XG4gICAgcmV0dXJuIHsgc3RhdGUgfTtcbiAgfVxuXG4gIGxldCBjdXJyZW50QXR0ZW1wdCA9IDE7XG4gIGNvbnN0IHdhaXRVbnRpbCA9IERhdGUubm93KCkgKyBtYXhXYWl0VGltZSAqIDEwMDA7XG4gIC8vIFRoZSBtYXggYXR0ZW1wdCBudW1iZXIgdGhhdCB0aGUgZGVyaXZlZCBkZWxheSB0aW1lIHRlbmQgdG8gaW5jcmVhc2UuXG4gIC8vIFByZS1jb21wdXRlIHRoaXMgbnVtYmVyIHRvIGF2b2lkIE51bWJlciB0eXBlIG92ZXJmbG93LlxuICBjb25zdCBhdHRlbXB0Q2VpbGluZyA9IE1hdGgubG9nKG1heERlbGF5IC8gbWluRGVsYXkpIC8gTWF0aC5sb2coMikgKyAxO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChhYm9ydENvbnRyb2xsZXI/LnNpZ25hbD8uYWJvcnRlZCkge1xuICAgICAgcmV0dXJuIHsgc3RhdGU6IFdhaXRlclN0YXRlLkFCT1JURUQgfTtcbiAgICB9XG4gICAgY29uc3QgZGVsYXkgPSBleHBvbmVudGlhbEJhY2tvZmZXaXRoSml0dGVyKG1pbkRlbGF5LCBtYXhEZWxheSwgYXR0ZW1wdENlaWxpbmcsIGN1cnJlbnRBdHRlbXB0KTtcbiAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlIGV4cGxpY2l0bHkgYXQgdGltZW91dCBvciBhYm9ydGVkLiBPdGhlcndpc2UgdGhpcyB3aGlsZSBsb29wIHdpbGwga2VlcCBtYWtpbmcgQVBJIGNhbGwgdW50aWxcbiAgICAvLyBgYWNjZXB0b3JDaGVja2AgcmV0dXJucyBub24tcmV0cnkgc3RhdHVzLCBldmVuIHdpdGggdGhlIFByb21pc2UucmFjZSgpIG91dHNpZGUuXG4gICAgaWYgKERhdGUubm93KCkgKyBkZWxheSAqIDEwMDAgPiB3YWl0VW50aWwpIHtcbiAgICAgIHJldHVybiB7IHN0YXRlOiBXYWl0ZXJTdGF0ZS5USU1FT1VUIH07XG4gICAgfVxuICAgIGF3YWl0IHNsZWVwKGRlbGF5KTtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSBhd2FpdCBhY2NlcHRvckNoZWNrcyhjbGllbnQsIGlucHV0KTtcbiAgICBpZiAoc3RhdGUgIT09IFdhaXRlclN0YXRlLlJFVFJZKSB7XG4gICAgICByZXR1cm4geyBzdGF0ZSB9O1xuICAgIH1cblxuICAgIGN1cnJlbnRBdHRlbXB0ICs9IDE7XG4gIH1cbn07XG4iXX0=