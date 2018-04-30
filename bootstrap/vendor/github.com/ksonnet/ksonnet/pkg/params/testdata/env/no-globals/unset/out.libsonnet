local params = import "../../components/params.libsonnet";

params + {
  components+: {
    guestbook+: {
      name: "guestbook-dev",
    },
  },
}