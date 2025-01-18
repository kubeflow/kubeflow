kubectl logs -n kubeflow $(kubectl get -n kubeflow pods -l app=jupyter-web-app --no-headers -o custom-columns=":metadata.name") --all-containers=true -f 
