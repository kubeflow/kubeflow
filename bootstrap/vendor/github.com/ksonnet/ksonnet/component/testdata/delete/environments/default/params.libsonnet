local params = import "../../components/params.libsonnet";
params {
  components +: {
    "guestbook-ui" +: {
       name: "guestbook-dev",
    },
  },
}
