"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBodyLength = void 0;
function calculateBodyLength(body) {
    if (typeof body === "string") {
        let len = body.length;
        for (let i = len - 1; i >= 0; i--) {
            const code = body.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff)
                len++;
            else if (code > 0x7ff && code <= 0xffff)
                len += 2;
        }
        return len;
    }
    else if (typeof body.byteLength === "number") {
        // handles Uint8Array, ArrayBuffer, Buffer, and ArrayBufferView
        return body.byteLength;
    }
    else if (typeof body.size === "number") {
        // handles browser File object
        return body.size;
    }
}
exports.calculateBodyLength = calculateBodyLength;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsbUJBQW1CLENBQUMsSUFBUztJQUMzQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXRCLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLO2dCQUFFLEdBQUcsRUFBRSxDQUFDO2lCQUNuQyxJQUFJLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxJQUFJLE1BQU07Z0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNuRDtRQUVELE9BQU8sR0FBRyxDQUFDO0tBQ1o7U0FBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDOUMsK0RBQStEO1FBQy9ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN4QjtTQUFNLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUN4Qyw4QkFBOEI7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQWxCRCxrREFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQm9keUxlbmd0aChib2R5OiBhbnkpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICBpZiAodHlwZW9mIGJvZHkgPT09IFwic3RyaW5nXCIpIHtcbiAgICBsZXQgbGVuID0gYm9keS5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGNvZGUgPSBib2R5LmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoY29kZSA+IDB4N2YgJiYgY29kZSA8PSAweDdmZikgbGVuKys7XG4gICAgICBlbHNlIGlmIChjb2RlID4gMHg3ZmYgJiYgY29kZSA8PSAweGZmZmYpIGxlbiArPSAyO1xuICAgIH1cblxuICAgIHJldHVybiBsZW47XG4gIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkuYnl0ZUxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgIC8vIGhhbmRsZXMgVWludDhBcnJheSwgQXJyYXlCdWZmZXIsIEJ1ZmZlciwgYW5kIEFycmF5QnVmZmVyVmlld1xuICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkuc2l6ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIC8vIGhhbmRsZXMgYnJvd3NlciBGaWxlIG9iamVjdFxuICAgIHJldHVybiBib2R5LnNpemU7XG4gIH1cbn1cbiJdfQ==