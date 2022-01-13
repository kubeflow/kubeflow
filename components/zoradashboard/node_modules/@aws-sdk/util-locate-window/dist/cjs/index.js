Object.defineProperty(exports, "__esModule", { value: true });
exports.locateWindow = void 0;
const fallbackWindow = {};
/**
 * Locates the global scope for a browser or browser-like environment. If
 * neither `window` nor `self` is defined by the environment, the same object
 * will be returned on each invocation.
 */
function locateWindow() {
    if (typeof window !== "undefined") {
        return window;
    }
    else if (typeof self !== "undefined") {
        return self;
    }
    return fallbackWindow;
}
exports.locateWindow = locateWindow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLGNBQWMsR0FBRyxFQUFZLENBQUM7QUFFcEM7Ozs7R0FJRztBQUNILFNBQWdCLFlBQVk7SUFDMUIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsT0FBTyxNQUFNLENBQUM7S0FDZjtTQUFNLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxFQUFFO1FBQ3RDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDO0FBUkQsb0NBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmYWxsYmFja1dpbmRvdyA9IHt9IGFzIFdpbmRvdztcblxuLyoqXG4gKiBMb2NhdGVzIHRoZSBnbG9iYWwgc2NvcGUgZm9yIGEgYnJvd3NlciBvciBicm93c2VyLWxpa2UgZW52aXJvbm1lbnQuIElmXG4gKiBuZWl0aGVyIGB3aW5kb3dgIG5vciBgc2VsZmAgaXMgZGVmaW5lZCBieSB0aGUgZW52aXJvbm1lbnQsIHRoZSBzYW1lIG9iamVjdFxuICogd2lsbCBiZSByZXR1cm5lZCBvbiBlYWNoIGludm9jYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGVXaW5kb3coKTogV2luZG93IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICByZXR1cm4gZmFsbGJhY2tXaW5kb3c7XG59XG4iXX0=