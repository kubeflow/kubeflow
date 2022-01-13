var fallbackWindow = {};
/**
 * Locates the global scope for a browser or browser-like environment. If
 * neither `window` nor `self` is defined by the environment, the same object
 * will be returned on each invocation.
 */
export function locateWindow() {
    if (typeof window !== "undefined") {
        return window;
    }
    else if (typeof self !== "undefined") {
        return self;
    }
    return fallbackWindow;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTSxjQUFjLEdBQUcsRUFBWSxDQUFDO0FBRXBDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsWUFBWTtJQUMxQixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUNqQyxPQUFPLE1BQU0sQ0FBQztLQUNmO1NBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7UUFDdEMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmYWxsYmFja1dpbmRvdyA9IHt9IGFzIFdpbmRvdztcblxuLyoqXG4gKiBMb2NhdGVzIHRoZSBnbG9iYWwgc2NvcGUgZm9yIGEgYnJvd3NlciBvciBicm93c2VyLWxpa2UgZW52aXJvbm1lbnQuIElmXG4gKiBuZWl0aGVyIGB3aW5kb3dgIG5vciBgc2VsZmAgaXMgZGVmaW5lZCBieSB0aGUgZW52aXJvbm1lbnQsIHRoZSBzYW1lIG9iamVjdFxuICogd2lsbCBiZSByZXR1cm5lZCBvbiBlYWNoIGludm9jYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGVXaW5kb3coKTogV2luZG93IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICByZXR1cm4gZmFsbGJhY2tXaW5kb3c7XG59XG4iXX0=