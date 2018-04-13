{
  new(name="", nestedName="", nestedItem="", str="val", obj={key: "val"}, array=["val"], other="", foo=""):: apiVersion + kind + self.withArray(array).withName(name).withObj(obj).withStr(str) + self.foo.bar.baz.withItem(nestedItem).withName(nestedName) + self.last.path.withFoo(foo) + self.other.withArray(other),
}