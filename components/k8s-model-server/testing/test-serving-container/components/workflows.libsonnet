{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // convert a list of two items into a map representing an environment variable
  listToMap:: function(v)
    {
      name: v[0],
      value: v[1],
    },

  // Function to turn comma separated list of prow environment variables into a dictionary.
  parseEnv:: function(v)
    local pieces = std.split(v, ",");
    if v != "" && std.length(pieces) > 0 then
      std.map(
        function(i) $.listToMap(std.split(i, "=")),
        std.split(v, ",")
      )
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
      // local image = "gcr.io/mlkube-testing/kubeflow-testing";
      local image = "gcr.io/kai-test2/kubeflow-testing:1.0";
      // The name of the NFS volume claim to use for test files.
      local nfsVolumeClaim = "kubeflow-testing";
      // The name to use for the volume to use to contain test data.
      local dataVolume = "kubeflow-test-volume";
      {
        buildTemplate(step_name, command):: {
          name: step_name,
          container: {
            command: command,
            image: image,
            env: [
              {
                // Add the source directories to the python path.
                name: "PYTHONPATH",
                value: srcDir + ":" + srcDir + "/tensorflow_k8s",
              },
              {
                name: "GOOGLE_APPLICATION_CREDENTIALS",
                value: "/secret/gcp-credentials/key.json",
              },
              {
                name: "GIT_TOKEN",
                valueFrom: {
                  secretKeyRef: {
                    name: "github-token",
                    key: "github_token",
                  },
                },
              },
            ] + prow_env,
            volumeMounts: [
              {
                name: dataVolume,
                mountPath: mountPath,
              },
              {
                name: "github-token",
                mountPath: "/secret/github-token",
              },
              {
                name: "gcp-credentials",
                mountPath: "/secret/gcp-credentials",
              },
            ],
          },
        },  // buildTemplate

        apiVersion: "argoproj.io/v1alpha1",
        kind: "Workflow",
        metadata: {
          name: name,
          namespace: namespace,
        },
        // TODO(jlewi): Use OnExit to run cleanup steps.
        spec: {
          entrypoint: "e2e",
          volumes: [
            {
              name: "github-token",
              secret: {
                secretName: "github-token",
              },
            },
            {
              name: "gcp-credentials",
              secret: {
                secretName: "kubeflow-testing-credentials",
              },
            },
            {
              name: dataVolume,
              persistentVolumeClaim: {
                claimName: nfsVolumeClaim,
              },
            },
          ],  // volumes
          templates: [
            {
              name: "e2e",
              steps: [
                [{
                  name: "checkout",
                  template: "checkout",
                }],
                [
                  {
                    name: "build-tf-serving-image",
                    template: "build-tf-serving-image",
                  },
                  {
                    name: "create-pr-symlink",
                    template: "create-pr-symlink",
                  },
                ],
              ],
            },
            {
              name: "checkout",
              container: {
                command: [
                  "/usr/local/bin/checkout.sh",
                ],
                args: [
                  srcDir,
                ],
                env: prow_env,
                image: image,
                volumeMounts: [
                  {
                    name: dataVolume,
                    mountPath: mountPath,
                  },
                ],
              },
            },  // checkout
            {
              name: "build-tf-serving-image",
              container: {
                command: [
                  "sh", "-c"
                ],
                args: [
                  "until docker ps; do sleep 3; done; " +
                      "docker build --pull -t gcr.io/kai-test2/model-server:1.0 " +
                      srcDir +
                      "/components/k8s-model-server/docker/; " +
                      "gcloud docker -- push gcr.io/kai-test2/model-server:1.0;"
                ],
                env: [
                  {
                    name: "DOCKER_HOST",
                    value: "127.0.0.1", 
                  },
                ] + prow_env,
                image: image,
                volumeMounts: [
                  {
                    name: dataVolume,
                    mountPath: mountPath,
                  },
                ],
              },
              sidecars: [
                {
                  name: "dind",
                  image: "docker:17.10-dind",
                  securityContext: {
                    privileged: true,
                  },
                  mirrorVolumeMounts: true,
                },
              ],
            },  // build-tf-serving-image
            $.parts(namespace, name).e2e(prow_env, bucket).buildTemplate("create-pr-symlink", [
              "python",
              "-m",
              "testing.prow_artifacts",
              "--artifacts_dir=" + outputDir,
              "create_pr_symlink",
              "--bucket=" + bucket,
            ]),  // create-pr-symlink
          ],  // templates
        },
      },  // e2e
  },  // parts
}

