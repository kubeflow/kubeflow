"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStreamHasher = void 0;
const fs_1 = require("fs");
const hash_calculator_1 = require("./hash-calculator");
const fileStreamHasher = function fileStreamHasher(hashCtor, fileStream) {
    return new Promise((resolve, reject) => {
        if (!isReadStream(fileStream)) {
            reject(new Error("Unable to calculate hash for non-file streams."));
            return;
        }
        const fileStreamTee = fs_1.createReadStream(fileStream.path, {
            start: fileStream.start,
            end: fileStream.end,
        });
        const hash = new hashCtor();
        const hashCalculator = new hash_calculator_1.HashCalculator(hash);
        fileStreamTee.pipe(hashCalculator);
        fileStreamTee.on("error", (err) => {
            // if the source errors, the destination stream needs to manually end
            hashCalculator.end();
            reject(err);
        });
        hashCalculator.on("error", reject);
        hashCalculator.on("finish", function () {
            hash.digest().then(resolve).catch(reject);
        });
    });
};
exports.fileStreamHasher = fileStreamHasher;
function isReadStream(stream) {
    return typeof stream.path === "string";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkJBQWtEO0FBR2xELHVEQUFtRDtBQUU1QyxNQUFNLGdCQUFnQixHQUEyQixTQUFTLGdCQUFnQixDQUMvRSxRQUF5QixFQUN6QixVQUFvQjtJQUVwQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUMsQ0FBQztZQUNwRSxPQUFPO1NBQ1I7UUFFRCxNQUFNLGFBQWEsR0FBRyxxQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3RELEtBQUssRUFBRyxVQUFrQixDQUFDLEtBQUs7WUFDaEMsR0FBRyxFQUFHLFVBQWtCLENBQUMsR0FBRztTQUM3QixDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzVCLE1BQU0sY0FBYyxHQUFHLElBQUksZ0NBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25DLGFBQWEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDckMscUVBQXFFO1lBQ3JFLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUNILGNBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLGNBQWMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUE3QlcsUUFBQSxnQkFBZ0Isb0JBNkIzQjtBQUVGLFNBQVMsWUFBWSxDQUFDLE1BQWdCO0lBQ3BDLE9BQU8sT0FBUSxNQUFxQixDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7QUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhc2hDb25zdHJ1Y3RvciwgU3RyZWFtSGFzaGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtLCBSZWFkU3RyZWFtIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gXCJzdHJlYW1cIjtcblxuaW1wb3J0IHsgSGFzaENhbGN1bGF0b3IgfSBmcm9tIFwiLi9oYXNoLWNhbGN1bGF0b3JcIjtcblxuZXhwb3J0IGNvbnN0IGZpbGVTdHJlYW1IYXNoZXI6IFN0cmVhbUhhc2hlcjxSZWFkYWJsZT4gPSBmdW5jdGlvbiBmaWxlU3RyZWFtSGFzaGVyKFxuICBoYXNoQ3RvcjogSGFzaENvbnN0cnVjdG9yLFxuICBmaWxlU3RyZWFtOiBSZWFkYWJsZVxuKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKCFpc1JlYWRTdHJlYW0oZmlsZVN0cmVhbSkpIHtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJVbmFibGUgdG8gY2FsY3VsYXRlIGhhc2ggZm9yIG5vbi1maWxlIHN0cmVhbXMuXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlU3RyZWFtVGVlID0gY3JlYXRlUmVhZFN0cmVhbShmaWxlU3RyZWFtLnBhdGgsIHtcbiAgICAgIHN0YXJ0OiAoZmlsZVN0cmVhbSBhcyBhbnkpLnN0YXJ0LFxuICAgICAgZW5kOiAoZmlsZVN0cmVhbSBhcyBhbnkpLmVuZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhc2ggPSBuZXcgaGFzaEN0b3IoKTtcbiAgICBjb25zdCBoYXNoQ2FsY3VsYXRvciA9IG5ldyBIYXNoQ2FsY3VsYXRvcihoYXNoKTtcblxuICAgIGZpbGVTdHJlYW1UZWUucGlwZShoYXNoQ2FsY3VsYXRvcik7XG4gICAgZmlsZVN0cmVhbVRlZS5vbihcImVycm9yXCIsIChlcnI6IGFueSkgPT4ge1xuICAgICAgLy8gaWYgdGhlIHNvdXJjZSBlcnJvcnMsIHRoZSBkZXN0aW5hdGlvbiBzdHJlYW0gbmVlZHMgdG8gbWFudWFsbHkgZW5kXG4gICAgICBoYXNoQ2FsY3VsYXRvci5lbmQoKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIGhhc2hDYWxjdWxhdG9yLm9uKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgICBoYXNoQ2FsY3VsYXRvci5vbihcImZpbmlzaFwiLCBmdW5jdGlvbiAodGhpczogSGFzaENhbGN1bGF0b3IpIHtcbiAgICAgIGhhc2guZGlnZXN0KCkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGlzUmVhZFN0cmVhbShzdHJlYW06IFJlYWRhYmxlKTogc3RyZWFtIGlzIFJlYWRTdHJlYW0ge1xuICByZXR1cm4gdHlwZW9mIChzdHJlYW0gYXMgUmVhZFN0cmVhbSkucGF0aCA9PT0gXCJzdHJpbmdcIjtcbn1cbiJdfQ==