local arr = [function(x) x] + std.makeArray(600, function(i) (function(x) arr[i](x + 1) tailstrict));
arr[600](42)
