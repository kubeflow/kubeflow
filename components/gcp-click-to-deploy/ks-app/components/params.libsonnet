{
  global: {},
  components: {
    ingress: {},
    webapp: {
      image: "gcr.io/kubeflow-images-public/gcp-click-to-deploy:v20190725-v0.4.0-rc.1-610-g41443e5e",
    },
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "serviceaccount-external-dns": {},
    "clusterrolebinding-external-dns-viewer": {},
    "deployment-external-dns": {},
    "clusterrole-external-dns": {},
  },
}
