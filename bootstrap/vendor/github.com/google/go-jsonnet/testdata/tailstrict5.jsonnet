local sum(x, v) =
    if x <= 0 then
        v
    else
        sum(x - 1, x + v) tailstrict;

sum(1000, 0)
