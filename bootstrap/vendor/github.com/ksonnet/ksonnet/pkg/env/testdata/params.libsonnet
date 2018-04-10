local params = import "../../components/params.libsonnet";
params + {
  components +: {
    component1 +: {
      foo: "bar",
    },
  },
}
