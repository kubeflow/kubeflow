{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "tfjob-crd": {    
      image: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171129-f8ec762",
      name: "tfjob-crd",
    },
    "jupyterhub": {    
      image: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171129-f8ec762",
      name: "tfjob-crd",
    },
  },
}
