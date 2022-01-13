import { __awaiter, __generator } from "tslib";
import { fromStatic as convertToProvider } from "@aws-sdk/property-provider";
import { fromStatic } from "./fromStatic";
jest.mock("@aws-sdk/property-provider", function () { return ({
    fromStatic: jest.fn(),
}); });
describe("fromStatic", function () {
    var value = "default";
    it("should convert static values to provider", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            convertToProvider.mockReturnValue(value);
            fromStatic(value);
            expect(convertToProvider).toHaveBeenCalledWith(value);
            return [2 /*return*/];
        });
    }); });
    it("should call the getter function", function () { return __awaiter(void 0, void 0, void 0, function () {
        var getter, config, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    getter = jest.fn().mockReturnValue(value);
                    config = fromStatic(getter);
                    _a = expect;
                    return [4 /*yield*/, config()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(value);
                    expect(getter).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVN0YXRpYy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zyb21TdGF0aWMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsSUFBSSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFMUMsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxjQUFNLE9BQUEsQ0FBQztJQUM3QyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtDQUN0QixDQUFDLEVBRjRDLENBRTVDLENBQUMsQ0FBQztBQUVKLFFBQVEsQ0FBQyxZQUFZLEVBQUU7SUFDckIsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3hCLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRTs7WUFDNUMsaUJBQStCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsaUJBQThCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O1NBQ3BFLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTs7Ozs7b0JBQzlCLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsQyxLQUFBLE1BQU0sQ0FBQTtvQkFBQyxxQkFBTSxNQUFNLEVBQUUsRUFBQTs7b0JBQXJCLGtCQUFPLFNBQWMsRUFBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7U0FDbkMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tU3RhdGljIGFzIGNvbnZlcnRUb1Byb3ZpZGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5cbmltcG9ydCB7IGZyb21TdGF0aWMgfSBmcm9tIFwiLi9mcm9tU3RhdGljXCI7XG5cbmplc3QubW9jayhcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCIsICgpID0+ICh7XG4gIGZyb21TdGF0aWM6IGplc3QuZm4oKSxcbn0pKTtcblxuZGVzY3JpYmUoXCJmcm9tU3RhdGljXCIsICgpID0+IHtcbiAgY29uc3QgdmFsdWUgPSBcImRlZmF1bHRcIjtcbiAgaXQoXCJzaG91bGQgY29udmVydCBzdGF0aWMgdmFsdWVzIHRvIHByb3ZpZGVyXCIsIGFzeW5jICgpID0+IHtcbiAgICAoY29udmVydFRvUHJvdmlkZXIgYXMgamVzdC5Nb2NrKS5tb2NrUmV0dXJuVmFsdWUodmFsdWUpO1xuICAgIGZyb21TdGF0aWModmFsdWUpO1xuICAgIGV4cGVjdChjb252ZXJ0VG9Qcm92aWRlciBhcyBqZXN0Lk1vY2spLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHZhbHVlKTtcbiAgfSk7XG5cbiAgaXQoXCJzaG91bGQgY2FsbCB0aGUgZ2V0dGVyIGZ1bmN0aW9uXCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBnZXR0ZXIgPSBqZXN0LmZuKCkubW9ja1JldHVyblZhbHVlKHZhbHVlKTtcbiAgICBjb25zdCBjb25maWcgPSBmcm9tU3RhdGljKGdldHRlcik7XG4gICAgZXhwZWN0KGF3YWl0IGNvbmZpZygpKS50b0JlKHZhbHVlKTtcbiAgICBleHBlY3QoZ2V0dGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gIH0pO1xufSk7XG4iXX0=