{
  global: {},
  components: {
    ingress: {},
    webapp: {
      image: "gcr.io/kubeflow-images-public/gcp-click-to-deploy:v20180720-5a864c2c-dirty-f1a621",
    },
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "serviceaccount-external-dns": {},
    "clusterrolebinding-external-dns-viewer": {},
    "deployment-external-dns": {},
    "clusterrole-external-dns": {},
  },
}
