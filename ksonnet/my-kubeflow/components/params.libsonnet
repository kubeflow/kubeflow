{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,    
  },

  components: {
    // We use the kubeflow component to define parameters that we want to apply to a lot of components.
    // We don't use global because those are not customizable per environment.    
    "kubeflow": {
      namespace: "default",
      // Configure Kubeflow for a specific cloud.
      cloud: "",
    },

    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "tfjob-crd": {    
      image: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171129-f8ec762",
      name: "tfjob-crd",
      cloud: "",
    },
    "jupyterhub": {    
      image: "gcr.io/kubeflow/jupyterhub:1.0",
      name: "tfjob-crd",
    },
    "nfs": {  
      name: "nfs",
      // Comma separated list of GCP persistent disks to mount as NFS volumes.            
      disks: "",
    },
    "mymodel3": {
      name: "mymodel3",
    },
    "model4": {
      name: "model4",
    },
    "mymodel1": {
      modelPath: "gs://mymodel",
      name: "inception",
    },
    "inception1": {
      modelPath: "gs://mymodel",
      name: "inception",
    },
    "inception2": {
      modelPath: "gs://cloud-ml-dev_jlewi/tmp/inception",
      name: "inception2",
      namespace: "default",
    },
    serveInception: {
      modelPath: "gs://cloud-ml-dev_jlewi/tmp/inception",
      name: "inception",
      namespace: "ks-test2",
    },
    "core1": {
      name: "core",
      namespace: "default",
    },
    "core2": {
      name: "core",
      namespace: "default",
    },
    "core3": {
      disks: "Comma",
      name: "core",
      namespace: "default",
    },
    "core10": {
      disks: "null",
      name: "core",
      namespace: "default",
    },
    "core11": {
      disks: "null",
      name: "core",
      namespace: "default",
    },
    "core12": {
      disks: "disk1,disk2",
      name: "core",
      namespace: "default",
    },
  },
}
