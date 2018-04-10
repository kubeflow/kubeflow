{ local x = self, y:: x, z: 42, foo: "xxx" } { local x = super.y, foo: x.z, bar: x.foo, baz: super.foo }
