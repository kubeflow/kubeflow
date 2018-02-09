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
    e2e(prow_env, bucket, serving_image, testing_image):
      // mountPath is the directory where the volume to store the test data
      // should be mounted.
      local mountPath = "/mnt/" + "test-data-volume";
      // testDir is the root directory for all data for a particular test run.
      local testDir = mountPath + "/" + name;
      // outputDir is the directory to sync to GCS to contain the output for this job.
      local outputDir = testDir + "/output";
      local artifactsDir = outputDir + "/artifacts";
      // Source directory where all repos should be checked out
      local srcRootDir = testDir + "/src";
      // The directory containing the kubeflow/kubeflow repo
      local srcDir = srcRootDir + "/kubeflow/kubeflow";
      // The name of the NFS volume claim to use for test files.
      local nfsVolumeClaim = "kubeflow-testing";
      // The name to use for the volume to use to contain test data.
      local dataVolume = "kubeflow-test-volume";
      local kubeflowPy = srcDir;
      // The directory within the kubeflow_testing submodule containing
      // py scripts to use.      
      local kubeflowTestingPy = srcRootDir + "/kubeflow/testing/py";
      {
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
                [{
                  name: "build-tf-serving-image",
                  template: "build-tf-serving-image",
                }],
                [{
                  name: "deploy-tf-serving",
                  template: "deploy-tf-serving",
                }]
              ],
            },
            {
              name: "checkout",
              container: {
                command: [
                  "/usr/local/bin/checkout.sh",
                ],
                args: [
                  srcRootDir,
                ],
                env: prow_env + [{
                  "name": "EXTRA_REPOS",
                  "value": "tensorflow/k8s@HEAD;kubeflow/testing@HEAD:12",
                }],
                image: testing_image,
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
                  "IMAGE=" + serving_image + "-${JOB_TYPE}-${PULL_BASE_SHA};" +
                  "until docker ps; do sleep 3; done; " +
                  "docker build --pull -t ${IMAGE} " +
                      srcRootDir + "/kubeflow/kubeflow/components/k8s-model-server/docker/; "
                  //"gcloud docker -- push ${IMAGE}"
                ],
                env: [
                  {
                    name: "DOCKER_HOST",
                    value: "127.0.0.1", 
                  },
                ] + prow_env,
                image: testing_image,
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
            {
              name: "deploy-tf-serving",
              container: {
                command: [
                  "python",
                  "-m",
                  "testing.test_deploy",
                  // "--project=mlkube-testing",
                  // "--cluster=kubeflow-testing",
                  // "--zone=us-east1-d",
                  "--project=kai-test2",
                  "--cluster=kai-kubeflow-testing",
                  "--zone=us-central1-a",
                  "--github_token=$(GIT_TOKEN)",
                  "--test_dir=" + testDir,
                  "--artifacts_dir=" + artifactsDir,
                  "--deploy_core=False",
                  "--deploy_tf_serving=true",
                  "--model_server_image=" + serving_image + "-${JOB_TYPE}-${PULL_BASE_SHA}",
                  "--test_inception=true",
                  // TODO: use kubeflow image
                  "--inception_client_image=gcr.io/kai-test2/incpetion-client:1.0",
                ],
                env: [
                  {
                    name: "DOCKER_HOST",
                    value: "127.0.0.1", 
                  },
                  {
                    name: "PYTHONPATH",
                    value: kubeflowPy + ":" + kubeflowTestingPy,
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
                image: testing_image,
                volumeMounts: [
                  {
                    name: dataVolume,
                    mountPath: mountPath,
                  },
                  {
                    name: "gcp-credentials",
                    mountPath: "/secret/gcp-credentials",
                  },
                  {
                    name: "github-token",
                    mountPath: "/secret/github-token",
                  }
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
            },  // deploy-tf-serving

          ],  // templates
        },
      },  // e2e
  },  // parts
}
