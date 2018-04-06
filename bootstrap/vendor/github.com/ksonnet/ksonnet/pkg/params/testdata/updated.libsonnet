{
  global: {
    "restart": false,
  },
  // Component-level parameters, defined initially from 'ks prototype use ...'
  // Each object below should correspond to a component in the components/ directory
  components: {
    "guestbook-ui": {
      containerPort: 80,
      image: "gcr.io/heptio-images/ks-guestbook-demo:0.2",
      name: "guestbook-ui",
      replicas: 5,
      servicePort: 80,
      type: "NodePort",
    },
  },
}