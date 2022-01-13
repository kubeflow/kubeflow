import { __awaiter, __generator } from "tslib";
import { blobReader } from "@aws-sdk/chunked-blob-reader";
export var blobHasher = function blobHasher(hashCtor, blob) {
    return __awaiter(this, void 0, void 0, function () {
        var hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hash = new hashCtor();
                    return [4 /*yield*/, blobReader(blob, function (chunk) {
                            hash.update(chunk);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, hash.digest()];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUcxRCxNQUFNLENBQUMsSUFBTSxVQUFVLEdBQXVCLFNBQWUsVUFBVSxDQUNyRSxRQUF5QixFQUN6QixJQUFVOzs7Ozs7b0JBRUosSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7b0JBRTVCLHFCQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBQyxLQUFLOzRCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQixDQUFDLENBQUMsRUFBQTs7b0JBRkYsU0FFRSxDQUFDO29CQUVILHNCQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQzs7OztDQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmxvYlJlYWRlciB9IGZyb20gXCJAYXdzLXNkay9jaHVua2VkLWJsb2ItcmVhZGVyXCI7XG5pbXBvcnQgeyBIYXNoQ29uc3RydWN0b3IsIFN0cmVhbUhhc2hlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgYmxvYkhhc2hlcjogU3RyZWFtSGFzaGVyPEJsb2I+ID0gYXN5bmMgZnVuY3Rpb24gYmxvYkhhc2hlcihcbiAgaGFzaEN0b3I6IEhhc2hDb25zdHJ1Y3RvcixcbiAgYmxvYjogQmxvYlxuKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gIGNvbnN0IGhhc2ggPSBuZXcgaGFzaEN0b3IoKTtcblxuICBhd2FpdCBibG9iUmVhZGVyKGJsb2IsIChjaHVuaykgPT4ge1xuICAgIGhhc2gudXBkYXRlKGNodW5rKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2guZGlnZXN0KCk7XG59O1xuIl19