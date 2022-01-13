"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
/**
 * @internal
 */
const retry = (toRetry, maxRetries) => {
    let promise = toRetry();
    for (let i = 0; i < maxRetries; i++) {
        promise = promise.catch(toRetry);
    }
    return promise;
};
exports.retry = retry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVtb3RlUHJvdmlkZXIvcmV0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUE7O0dBRUc7QUFDSSxNQUFNLEtBQUssR0FBRyxDQUFJLE9BQTZCLEVBQUUsVUFBa0IsRUFBYyxFQUFFO0lBQ3hGLElBQUksT0FBTyxHQUFHLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEM7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFQVyxRQUFBLEtBQUssU0FPaEIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFJldHJ5YWJsZVByb3ZpZGVyPFQ+IHtcbiAgKCk6IFByb21pc2U8VD47XG59XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCByZXRyeSA9IDxUPih0b1JldHJ5OiBSZXRyeWFibGVQcm92aWRlcjxUPiwgbWF4UmV0cmllczogbnVtYmVyKTogUHJvbWlzZTxUPiA9PiB7XG4gIGxldCBwcm9taXNlID0gdG9SZXRyeSgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1heFJldHJpZXM7IGkrKykge1xuICAgIHByb21pc2UgPSBwcm9taXNlLmNhdGNoKHRvUmV0cnkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuIl19