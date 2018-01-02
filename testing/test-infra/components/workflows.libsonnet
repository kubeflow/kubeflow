{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // Construct the script to checkout the proper branch of the code
  checkoutScript(srcDir, ref, commit)::{
    // TODO(jlewi): This is really hard to read. We should create a bash script using string literals
    // and take as arguments.
    commands:: [
      // Some git operations are really slow when using NFS.
      // We observed clone times increasing from O(30) seconds to O(4 minutes)
      // when we switched to NFS.
      // As a workaround we clone into a local directory and then move the files onto
      // NFS. Copying to NFS is still a bottleneck and increases the run time to O(1. 5 minutes).
      "git clone --recurse-submodules https://github.com/google/kubeflow.git /tmp/src",
      "cd /tmp/src" ,

      // We need to set the preloadindex option; to try to speedup git ops like describe
      // and status when using an NFS filesystem.
      // See: https://stackoverflow.com/questions/4994772/ways-to-improve-git-status-performance
      // unfortunately this doesn't seem to help with sub modules.
      "git config core.preloadindex true",
      
      "if [ ! -z \"${PULL_NUMBER}\" ]; then ",
      "  git fetch origin refs/pull/${PULL_NUMBER}/head:pr",
      "  git checkout ${PULL_PULL_SHA}",
      "fi",
            
      // Update submodules.
      "git submodule init",
      "git submodule update",
 
      // TODO(jlewi): As noted above git the operations below are really
      // slow when using NFS.
      // Print out the git version in the logs
      "git describe --tags --always --dirty",      
      "git status",

      // Move it to NFS
      "mkdir -p " + srcDir,

      // The period is needed because we want to copy the contents of the src directory
      // into srcDir not srcDir/src/.
      "cp -r /tmp/src/. " + srcDir,

      // Make the files world readable/writable.
      // This is a hack to make it easy to modify the files from jupyterhub which is using
      // a different user/group id.
      "chmod -R a+rwx " + srcDir,
    ],

    script: std.join(" && ", std.prune(self.commands)),
  },

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
    e2e(ref, commit, prow_env): 
      // mountPath is the directory where the volume to store the test data
      // should be mounted.
      local mountPath = "/mnt/" + "test-data-volume";
      // testDir is the root directory for all data for a particular test run.
      local testDir = mountPath + "/" + name;
      // artifactsDir is the directory to sync to GCS to contain the output for this job.
      local artifactsDir = testDir + "/output";
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
                  "name": "create-started",
                  "template": "create-started",
                },
                ],
                [{
                  "name": "create-finished",
                  "template": "create-finished",
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
                  "name": dataVolume,
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
                "--test_dir=" + testDir,
              ], 
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
              },],
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
          }, // test-deploy          
          $.parts(namespace, name).e2e(ref, commit, prow_env).buildTemplate("create-started", [
            "python",
            "-m",
            "testing.prow_artifacts",
            "--artifacts_dir=" + artifactsDir,
            "create_started",
          ]), // create-started
          $.parts(namespace, name).e2e(ref, commit, prow_env).buildTemplate("create-finished", [
            "python",
            "-m",
            "testing.prow_artifacts",
            "--artifacts_dir=" + artifactsDir,
            "create_finished",
          ]), // create-finished
        ], // templates
      }
    },// e2e 
  } // parts
}