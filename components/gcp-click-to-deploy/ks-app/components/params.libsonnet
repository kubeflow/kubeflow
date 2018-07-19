{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    ingress: {},
    webapp: {},
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "serviceaccount-external-dns": {

    },
    "clusterrolebinding-external-dns-viewer": {

    },
    "deployment-external-dns": {

    },

    "clusterrole-external-dns": {

    },
  },
}
