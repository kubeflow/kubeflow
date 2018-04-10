local foo(x) = local bar(y=x) = [x, y]; bar;
[foo(42)(), foo(42)(17)]
