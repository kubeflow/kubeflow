local arr = [{v: -1}] + std.makeArray(150, function(x) { v: x, assert arr[x].v == self.v - 1 });
arr
