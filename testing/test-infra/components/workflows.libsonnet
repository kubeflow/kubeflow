{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // TODO(jlewi): Do we need to add parts corresponding to a service account and cluster binding role?
  // see https://github.com/argoproj/argo/blob/master/cmd/argo/commands/install.go

  parts(namespace, name):: {  
    // Workflow to run the e2e test.
    e2e:  {
      "apiVersion": "argoproj.io/v1alpha1", 
      "kind": "Workflow", 
      "metadata": {
        "name": name,
        "namespace": namespace,
      }, 
      "spec": {
        "entrypoint": "checkout", 
        "templates": [
          {
            "name": "checkout",
            "container": {              
              "command": [
                "ls",
                "-lR",
                "/src",
              ], 
              "image": "busybox:latest"
            }, 
            "inputs": {
              "artifacts": [
                # Check out the master branch of the repo and place it at /src
                # revision can be anything that git checkout accepts: branch, commit, tag, etc.
                #
                # TODO(jlewi): Need to parameterize this so we can test version of pre and post submits.
                { "name": "kubeflow-source",
                  "path": "/src/kubeflow",
                   "git": {
                      "repo": "https://github.com/google/kubeflow.git",
                      "revision": "master",
                    },
                },
              ],
            }, // inputs
          }, // checkout
        ],
      }
    },// e2e 
  } // parts
}