  {
    // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
    // doesn't support automatically piping in the namespace from the environment to prototypes.
    parts(namespace):: {  

    uiService: {
      "apiVersion": "v1", 
      "kind": "Service", 
      "metadata": {
        "labels": {
          "app": "argo-ui"
        }, 
        "name": "argo-ui",
        "namespace": namespace,
      }, 
      "spec": {
        "ports": [
          {
            "port": 80, 
            "targetPort": 8001
          }
        ], 
        "selector": {
          "app": "argo-ui"
        }, 
        "sessionAffinity": "None", 
        # TODO(jlewi): Add an option to provision a load balancer?
        # "type": "LoadBalancer"
      }
    },
  } // parts
}