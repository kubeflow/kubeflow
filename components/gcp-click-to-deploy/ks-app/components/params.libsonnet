{
  global: {},
  components: {
    ingress: {},
    webapp: {
      image: 'gcr.io/gabrielwen-learning/gcp-click-to-deploy:v20190724-v0.4.0-rc.1-598-gd0f4627f',
    },
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "serviceaccount-external-dns": {},
    "clusterrolebinding-external-dns-viewer": {},
    "deployment-external-dns": {},
    "clusterrole-external-dns": {},
  },
}
