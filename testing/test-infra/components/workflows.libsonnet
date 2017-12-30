{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // Construct the script to checkout the proper branch of the code
  checkoutScript(srcDir, ref, commit)::{
    commands:: [
      // TODO(jlewi): Maybe we should define a macro to generate the src directory for a particular repo.
      "git clone https://github.com/tensorflow/k8s.git " + srcDir + "/tensorflow_k8s",
      "git clone https://github.com/google/kubeflow.git " + srcDir + "/google_kubeflow",
      "cd " + srcDir + "/google_kubeflow",
      if ref != "" then
      "git fetch origin " + ref
      else null,
      "git checkout " + commit,
      // Print out the git version in the logs
      "git describe --tags --always --dirty",
      "git status",
    ],

    script: std.join(" && ", std.prune(self.commands)),
  },

  parts(namespace, name):: {          
    // Workflow to run the e2e test.
    e2e(ref, commit): 
      local mountPath = "/mnt/" + name;
      local srcDir = mountPath + "/src";
      local kubeflowSrc = srcDir + "/google_kubeflow";
      local image = "gcr.io/mlkube-testing/kubeflow-testing";
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
        "volumes": [
          {
            "name": "github-token",
            "secret": {
              "secretName": "github-token",
            },
          },
          {
            "name": "gcp-credentials",
            "secret": {
              "secretName": "kubeflow-testing-credentials",
            },
          },
        ], // volumes
        "templates": [
          {
             "name": "e2e",
             "steps": [
               [{
                  "name": "checkout",
                  "template": "checkout",
                },],
                [{
                  "name": "test-deploy",
                  "template": "test-deploy",
                },],
               ],
          },
          {
            "name": "checkout",
            "container": {              
              "command": [
                "bash"
              ], 
              "args": [
                "-x",
                "-c",
                $.checkoutScript(srcDir, ref, commit).script,
              ],
              "image": image,
              "volumeMounts": [
                {
                  "name": name,
                  "mountPath": mountPath,
                },
              ],
            }, 
          }, // checkout
          {
            "name": "test-deploy",
            "container": {              
              "command": [
                "python", 
                "-m", 
                "testing.test_deploy",
                "--project=mlkube-testing", 
                "--cluster=kubeflow-testing", 
                "--zone=us-east1-d",
                "--github_token=$(GIT_TOKEN)",
                "--test_dir=" + mountPath,
              ], 
              "image": image,
              "env": [{
                // Add the source directories to the python path.
                "name": "PYTHONPATH",
                "value": srcDir + "/tensorflow_k8s" + ":" + kubeflowSrc,
              },
              {
                "name": "GOOGLE_APPLICATION_CREDENTIALS",
                "value": "/secret/gcp-credentials/key.json",
              },
              {
                  "name": "GIT_TOKEN",
                  "valueFrom": {
                    "secretKeyRef": {
                      name: "github-token",
                      key: "github_token", 
                    },
                  },
              },],
              "volumeMounts": [
                {
                  "name": name,
                  "mountPath": mountPath,
                },                
                {
                  "name": "github-token",
                  "mountPath": "/secret/github-token",
                },                
                {
                  "name": "gcp-credentials",
                  "mountPath": "/secret/gcp-credentials",
                },
              ],
            }, 
          }, // test-deploy
        ],
      }
    },// e2e 
  } // parts
}