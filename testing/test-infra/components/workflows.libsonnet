{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // TODO(jlewi): Do we need to add parts corresponding to a service account and cluster binding role?
  // see https://github.com/argoproj/argo/blob/master/cmd/argo/commands/install.go

  parts(namespace, name):: {      
    // Workflow to run the e2e test.
    e2e: 
      local mountPath = "/mnt/" + name;
    {
      "apiVersion": "argoproj.io/v1alpha1", 
      "kind": "Workflow", 
      "metadata": {
        "name": name,
        "namespace": namespace,
      }, 
      // TODO(jlewi): Use OnExit to run cleanup steps.
      "spec": {
        "entrypoint": "e2e", 
        // TODO(jlewi): We should switch to using NFS so that we can mount the volume simultaneously on multiple 
        // pods.
        "volumeClaimTemplates":[{
          "metadata": {
              name: name,
              namespace: namespace,
          },            
          "spec": {
              accessModes: [ "ReadWriteOnce" ],
              resources: {
                requests: {
                  storage: "1Gi",
                },
              },
          }
        },], // volume claim templates
        "templates": [
          {
             "name": "e2e",
             "steps": [
               [{
                  "name": "checkout",
                  "template": "checkout",
                },
               ],
             ],
          },
          {
            "name": "checkout",
            "container": {              
              "command": [
                "ls",
                "-lR",
                mountPath,
              ], 
              "image": "busybox:latest",
              "volumeMounts": [
                {
                  "name": name,
                  "mountPath": mountPath,
                },
              ],
            }, 
            "inputs": {
              "artifacts": [
                # Check out the master branch of the repo and place it at /src
                # revision can be anything that git checkout accepts: branch, commit, tag, etc.
                #
                # TODO(jlewi): Need to parameterize this so we can test version of pre and post submits.
                # One option would be checkout the desired revision in a follow up step.
                { "name": "kubeflow-source",
                  "path": mountPath + "/kubeflow",
                  "git": {
                      "repo": "https://github.com/google/kubeflow.git",
                      "revision": "master",
                  },
                },
                { "name": "tensorflow-k8s-source",
                  "path": mountPath + "/tensorflow_k8s",
                  "git": {
                      "repo": "https://github.com/tensorflow/k8s.git",
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