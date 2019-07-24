{
  global: {},
  components: {
    ingress: {},
    webapp: {
      image: 'gcr.io/kubeflow-deployment-staging/gcp-click-to-deploy:v20190723-v0.4.0-rc.1-597-g8da1e470-dirty-13f482',
    },
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "serviceaccount-external-dns": {},
    "clusterrolebinding-external-dns-viewer": {},
    "deployment-external-dns": {},
    "clusterrole-external-dns": {},
  },
}