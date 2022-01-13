"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortSignal = void 0;
class AbortSignal {
    constructor() {
        this.onabort = null;
        this._aborted = false;
        Object.defineProperty(this, "_aborted", {
            value: false,
            writable: true,
        });
    }
    /**
     * Whether the associated operation has already been cancelled.
     */
    get aborted() {
        return this._aborted;
    }
    /**
     * @internal
     */
    abort() {
        this._aborted = true;
        if (this.onabort) {
            this.onabort(this);
            this.onabort = null;
        }
    }
}
exports.AbortSignal = AbortSignal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJvcnRTaWduYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQWJvcnRTaWduYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBYSxXQUFXO0lBSXRCO1FBSE8sWUFBTyxHQUF3QixJQUFJLENBQUM7UUFDbkMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUd2QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDdEMsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDckI7SUFDSCxDQUFDO0NBQ0Y7QUE1QkQsa0NBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJvcnRIYW5kbGVyLCBBYm9ydFNpZ25hbCBhcyBJQWJvcnRTaWduYWwgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEFib3J0U2lnbmFsIGltcGxlbWVudHMgSUFib3J0U2lnbmFsIHtcbiAgcHVibGljIG9uYWJvcnQ6IEFib3J0SGFuZGxlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9hYm9ydGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2Fib3J0ZWRcIiwge1xuICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgYXNzb2NpYXRlZCBvcGVyYXRpb24gaGFzIGFscmVhZHkgYmVlbiBjYW5jZWxsZWQuXG4gICAqL1xuICBnZXQgYWJvcnRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWJvcnRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGFib3J0KCk6IHZvaWQge1xuICAgIHRoaXMuX2Fib3J0ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLm9uYWJvcnQpIHtcbiAgICAgIHRoaXMub25hYm9ydCh0aGlzKTtcbiAgICAgIHRoaXMub25hYm9ydCA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=