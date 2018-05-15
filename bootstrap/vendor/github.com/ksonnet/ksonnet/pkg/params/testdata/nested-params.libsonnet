{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  // Component-level parameters, defined initially from 'ks prototype use ...'
  // Each object below should correspond to a component in the components/ directory
  components: {
    "guestbook-ui": {
      int: 80,
      float: 0.1,
      string: "string",
      "string-key": "string-key",
      m: {
        a: "a",
        b: {
          c: "c",
        },
      },
      list: ["one", "two", "three"],
    },
    "name": "name",
  },
}
