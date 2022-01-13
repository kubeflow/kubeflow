"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortController = void 0;
const AbortSignal_1 = require("./AbortSignal");
class AbortController {
    constructor() {
        this.signal = new AbortSignal_1.AbortSignal();
    }
    abort() {
        this.signal.abort();
    }
}
exports.AbortController = AbortController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJvcnRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0Fib3J0Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrQ0FBNEM7QUFFNUMsTUFBYSxlQUFlO0lBQTVCO1FBQ2tCLFdBQU0sR0FBZ0IsSUFBSSx5QkFBVyxFQUFFLENBQUM7SUFLMUQsQ0FBQztJQUhDLEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQU5ELDBDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJvcnRDb250cm9sbGVyIGFzIElBYm9ydENvbnRyb2xsZXIgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuaW1wb3J0IHsgQWJvcnRTaWduYWwgfSBmcm9tIFwiLi9BYm9ydFNpZ25hbFwiO1xuXG5leHBvcnQgY2xhc3MgQWJvcnRDb250cm9sbGVyIGltcGxlbWVudHMgSUFib3J0Q29udHJvbGxlciB7XG4gIHB1YmxpYyByZWFkb25seSBzaWduYWw6IEFib3J0U2lnbmFsID0gbmV3IEFib3J0U2lnbmFsKCk7XG5cbiAgYWJvcnQoKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYWwuYWJvcnQoKTtcbiAgfVxufVxuIl19