import { AbortSignal } from "./AbortSignal";
var AbortController = /** @class */ (function () {
    function AbortController() {
        this.signal = new AbortSignal();
    }
    AbortController.prototype.abort = function () {
        this.signal.abort();
    };
    return AbortController;
}());
export { AbortController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJvcnRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0Fib3J0Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDO0lBQUE7UUFDa0IsV0FBTSxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO0lBSzFELENBQUM7SUFIQywrQkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFib3J0Q29udHJvbGxlciBhcyBJQWJvcnRDb250cm9sbGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmltcG9ydCB7IEFib3J0U2lnbmFsIH0gZnJvbSBcIi4vQWJvcnRTaWduYWxcIjtcblxuZXhwb3J0IGNsYXNzIEFib3J0Q29udHJvbGxlciBpbXBsZW1lbnRzIElBYm9ydENvbnRyb2xsZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgc2lnbmFsOiBBYm9ydFNpZ25hbCA9IG5ldyBBYm9ydFNpZ25hbCgpO1xuXG4gIGFib3J0KCk6IHZvaWQge1xuICAgIHRoaXMuc2lnbmFsLmFib3J0KCk7XG4gIH1cbn1cbiJdfQ==