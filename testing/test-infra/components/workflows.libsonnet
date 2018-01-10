{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // convert a list of two items into a map representing an environment variable
  listToMap:: function(v) 
      {
        "name": v[0],
        "value": v[1],
      },
  
  // Function to turn comma separated list of prow environment variables into a dictionary.
  parseEnv:: function(v) 
    local pieces = std.split(v, ",");
    if v != "" && std.length(pieces) > 0 then
    std.map(
      function(i) $.listToMap(std.split(i, "=")), 
      std.split(v, ","))
    else [],

  parts(namespace, name):: {          
    // Workflow to run the e2e test.
    e2e(prow_env, bucket): 
      // mountPath is the directory where the volume to store the test data
      // should be mounted.
      local mountPath = "/mnt/" + "test-data-volume";
      // testDir is the root directory for all data for a particular test run.
      local testDir = mountPath + "/" + name;
      // outputDir is the directory to sync to GCS to contain the output for this job.
      local outputDir = testDir + "/output";
      local artifactsDir = outputDir + "/artifacts";
      local srcDir = testDir + "/src";      
      local image = "gcr.io/mlkube-testing/kubeflow-testing";
      // The name of the NFS volume claim to use for test files.
      local nfsVolumeClaim = "kubeflow-testing";
      // The name to use for the volume to use to contain test data.
      local dataVolume = "kubeflow-test-volume";
    {
      // Build an Argo template to execute a particular command.
      // step_name: Name for the template
      // command: List to pass as the container command.
      buildTemplate(step_name, command):: {
            "name": step_name,
            "container": {              
              "command": command,
              "image": image,
              "env": [{
                // Add the source directories to the python path.
                "name": "PYTHONPATH",
                "value": srcDir + ":" + srcDir + "/tensorflow_k8s",
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
              },] + prow_env,
              "volumeMounts": [
                {
                  "name": dataVolume,
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
      }, // buildTemplate

      "apiVersion": "argoproj.io/v1alpha1", 
      "kind": "Workflow", 
      "metadata": {
        "name": name,
        "namespace": namespace,
      }, 
      // TODO(jlewi): Use OnExit to run cleanup steps.
      "spec": {
        "entrypoint": "e2e", 
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
          {
            "name": dataVolume,
            "persistentVolumeClaim": {
              "claimName": nfsVolumeClaim,
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
                },              
                {
                  "name": "create-pr-symlink",
                  "template": "create-pr-symlink",
                },],
                [{
                  "name": "copy-artifacts",
                  "template": "copy-artifacts",
                },],
               ],
          },
          {
            "name": "checkout",
            "container": {              
              "command": [
                "/usr/local/bin/checkout.sh"
              ], 
              "args": [
                srcDir,
              ],
              "env": prow_env,
              "image": image,
              "volumeMounts": [
                {
                  "name": dataVolume,
                  "mountPath": mountPath,
                },
              ],
            }, 
          }, // checkout
          $.parts(namespace, name).e2e(prow_env, bucket).buildTemplate("test-deploy", [
            "python", 
            "-m", 
            "testing.test_deploy",
            "--project=mlkube-testing", 
            "--cluster=kubeflow-testing", 
            "--zone=us-east1-d",
            "--github_token=$(GIT_TOKEN)",
            "--test_dir=" + testDir,
            "--artifacts_dir=" + artifactsDir,
          ]), // test-deploy
          $.parts(namespace, name).e2e(prow_env, bucket).buildTemplate("create-pr-symlink", [
            "python",
            "-m",
            "testing.prow_artifacts",
            "--artifacts_dir=" + outputDir,
            "create_pr_symlink",
            "--bucket=" + bucket,
          ]), // create-pr-symlink
          $.parts(namespace, name).e2e(prow_env, bucket).buildTemplate("copy-artifacts", [
            "python",
            "-m",
            "testing.prow_artifacts",
            "--artifacts_dir=" + outputDir,
            "copy_artifacts",
            "--bucket=" + bucket,
          ]), // copy-artifacts
        ], // templates
      }
    },// e2e 
  } // parts
}