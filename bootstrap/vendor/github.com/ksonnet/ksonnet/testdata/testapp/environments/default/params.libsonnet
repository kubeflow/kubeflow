local params = import "/Users/alex/src/go/src/github.com/ksonnet/ksonnet/testdata/test-app/components/params.libsonnet";
params + {
  components +: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
  },
}
