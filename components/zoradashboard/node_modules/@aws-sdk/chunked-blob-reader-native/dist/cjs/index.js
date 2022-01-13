"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobReader = void 0;
const util_base64_browser_1 = require("@aws-sdk/util-base64-browser");
function blobReader(blob, onChunk, chunkSize = 1024 * 1024) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onerror = reject;
        fileReader.onabort = reject;
        const size = blob.size;
        let totalBytesRead = 0;
        const read = () => {
            if (totalBytesRead >= size) {
                resolve();
                return;
            }
            fileReader.readAsDataURL(blob.slice(totalBytesRead, Math.min(size, totalBytesRead + chunkSize)));
        };
        fileReader.onload = (event) => {
            const result = event.target.result;
            // reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
            // response from readAsDataURL is always prepended with "data:*/*;base64,"
            const dataOffset = result.indexOf(",") + 1;
            const data = result.substring(dataOffset);
            const decoded = util_base64_browser_1.fromBase64(data);
            onChunk(decoded);
            totalBytesRead += decoded.byteLength;
            // read the next block
            read();
        };
        // kick off the read
        read();
    });
}
exports.blobReader = blobReader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0VBQTBEO0FBQzFELFNBQWdCLFVBQVUsQ0FDeEIsSUFBVSxFQUNWLE9BQW9DLEVBQ3BDLFlBQW9CLElBQUksR0FBRyxJQUFJO0lBRS9CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUVwQyxVQUFVLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM1QixVQUFVLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUU1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztRQUV2QixNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7WUFDaEIsSUFBSSxjQUFjLElBQUksSUFBSSxFQUFFO2dCQUMxQixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPO2FBQ1I7WUFDRCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkcsQ0FBQyxDQUFDO1FBRUYsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzVCLE1BQU0sTUFBTSxHQUFJLEtBQUssQ0FBQyxNQUFjLENBQUMsTUFBTSxDQUFDO1lBQzVDLHVGQUF1RjtZQUN2RiwwRUFBMEU7WUFDMUUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxQyxNQUFNLE9BQU8sR0FBRyxnQ0FBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQixjQUFjLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNyQyxzQkFBc0I7WUFDdEIsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUM7UUFFRixvQkFBb0I7UUFDcEIsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF0Q0QsZ0NBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbUJhc2U2NCB9IGZyb20gXCJAYXdzLXNkay91dGlsLWJhc2U2NC1icm93c2VyXCI7XG5leHBvcnQgZnVuY3Rpb24gYmxvYlJlYWRlcihcbiAgYmxvYjogQmxvYixcbiAgb25DaHVuazogKGNodW5rOiBVaW50OEFycmF5KSA9PiB2b2lkLFxuICBjaHVua1NpemU6IG51bWJlciA9IDEwMjQgKiAxMDI0XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgIGZpbGVSZWFkZXIub25lcnJvciA9IHJlamVjdDtcbiAgICBmaWxlUmVhZGVyLm9uYWJvcnQgPSByZWplY3Q7XG5cbiAgICBjb25zdCBzaXplID0gYmxvYi5zaXplO1xuICAgIGxldCB0b3RhbEJ5dGVzUmVhZCA9IDA7XG5cbiAgICBjb25zdCByZWFkID0gKCkgPT4ge1xuICAgICAgaWYgKHRvdGFsQnl0ZXNSZWFkID49IHNpemUpIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYi5zbGljZSh0b3RhbEJ5dGVzUmVhZCwgTWF0aC5taW4oc2l6ZSwgdG90YWxCeXRlc1JlYWQgKyBjaHVua1NpemUpKSk7XG4gICAgfTtcblxuICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSAoZXZlbnQudGFyZ2V0IGFzIGFueSkucmVzdWx0O1xuICAgICAgLy8gcmVmZXJlbmNlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmlsZVJlYWRlci9yZWFkQXNEYXRhVVJMXG4gICAgICAvLyByZXNwb25zZSBmcm9tIHJlYWRBc0RhdGFVUkwgaXMgYWx3YXlzIHByZXBlbmRlZCB3aXRoIFwiZGF0YToqLyo7YmFzZTY0LFwiXG4gICAgICBjb25zdCBkYXRhT2Zmc2V0ID0gcmVzdWx0LmluZGV4T2YoXCIsXCIpICsgMTtcbiAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuc3Vic3RyaW5nKGRhdGFPZmZzZXQpO1xuICAgICAgY29uc3QgZGVjb2RlZCA9IGZyb21CYXNlNjQoZGF0YSk7XG4gICAgICBvbkNodW5rKGRlY29kZWQpO1xuICAgICAgdG90YWxCeXRlc1JlYWQgKz0gZGVjb2RlZC5ieXRlTGVuZ3RoO1xuICAgICAgLy8gcmVhZCB0aGUgbmV4dCBibG9ja1xuICAgICAgcmVhZCgpO1xuICAgIH07XG5cbiAgICAvLyBraWNrIG9mZiB0aGUgcmVhZFxuICAgIHJlYWQoKTtcbiAgfSk7XG59XG4iXX0=