local foo(x, y=error "xxx")=x;
foo(42, y=5) tailstrict
