{
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


  // Default parameters.
  defaultParams:: {
    bucket: "kubeflow-releasing-artifacts",
    commit: "master",
    // Name of the secret containing GCP credentials.
    gcpCredentialsSecretName: "kubeflow-testing-credentials",
    name: "placeholder",
    namespace: "kubeflow-releasing",
    // The name of the NFS volume claim to use for test files.
    nfsVolumeClaim: "nfs-external",
    prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
    registry: "gcr.io/kubeflow-images-public",
    versionTag: "latest",
    // The default image to use for the steps in the Argo workflow.
    testing_image: "gcr.io/kubeflow-ci/worker:latest",
    project: "kubeflow-releasing",
    cluster: "kubeflow-releasing",
    zone: "us-central1-a",
    image: "default-should-not-exist",
    dockerfile: "Dockerfile",
    extra_repos: "kubeflow/testing@HEAD",
    extra_args: "",
  },

  parts(namespace, name, overrides={}):: {
    // Workflow to release image.
    release::
      local params = $.defaultParams + overrides;

      local namespace = params.namespace;
      local testing_image = params.testing_image;
      local project = params.project;
      local cluster = params.cluster;
      local zone = params.zone;
      local name = params.name;

      local prow_env = $.parseEnv(params.prow_env);
      local bucket = params.bucket;

      local stepsNamespace = name;
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
      // The name to use for the volume to use to contain test data.
      local dataVolume = "kubeflow-test-volume";
      local kubeflowPy = srcDir;
      // The directory within the kubeflow_testing submodule containing
      // py scripts to use.
      local kubeflowTestingPy = srcRootDir + "/kubeflow/testing/py";

      // Location where build_image.sh
      local imageDir = srcRootDir + "/" + params.dockerfileDir;

      local releaseImage = params.registry + "/" + params.image;

      // Build an Argo template to execute a particular command.
      // step_name: Name for the template
      // command: List to pass as the container command.
      local buildTemplate(step_name, command, env_vars=[], sidecars=[]) = {
        name: step_name,
        container: {
          command: command,
          image: testing_image,
          env: [
            {
              // Add the source directories to the python path.
              name: "PYTHONPATH",
              value: kubeflowPy + ":" + kubeflowTestingPy,
            },
            {
              name: "GOOGLE_APPLICATION_CREDENTIALS",
              value: "/secret/gcp-credentials/key.json",
            },
            {
              name: "GITHUB_TOKEN",
              valueFrom: {
                secretKeyRef: {
                  name: "github-token",
                  key: "github_token",
                },
              },
            },
            {
              name: "GCP_PROJECT",
              value: project,
            },
            {
              name: "GCP_REGISTRY",
              value: params.registry,
            },
          ] + prow_env + env_vars,
          resources: {
            requests: {
              memory: "2Gi",
              cpu: "2",
            },
            limits: {
              memory: "32Gi",
              cpu: "16",
            },
          },
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
        sidecars: sidecars,
      };  // buildTemplate


      local buildImageTemplate(step_name, imageDir, dockerfile, image) =
        buildTemplate(
          step_name,
          [
            // We need to explicitly specify bash because
            // build_image.sh is not in the container its a volume mounted file.
            "/bin/bash",
            "-c",
            imageDir + "/build_image.sh "
            + imageDir + "/" + dockerfile + " "
            + image + " "
            + params.versionTag
            + params.extra_args,
          ],
          [
            {
              name: "DOCKER_HOST",
              value: "127.0.0.1",
            },
          ],
          [{
            name: "dind",
            image: "docker:17.10-dind",
            securityContext: {
              privileged: true,
            },
            resources: {
              requests: {
                memory: "2Gi",
                cpu: "2",
              },
              limits: {
                memory: "32Gi",
                cpu: "16",
              },
            },
            mirrorVolumeMounts: true,
          }],
        );  // buildImageTemplate
      {
        apiVersion: "argoproj.io/v1alpha1",
        kind: "Workflow",
        metadata: {
          name: name,
          namespace: namespace,
        },
        spec: {
          entrypoint: "release",
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
                secretName: params.gcpCredentialsSecretName,
              },
            },
            {
              name: dataVolume,
              persistentVolumeClaim: {
                claimName: params.nfsVolumeClaim,
              },
            },
          ],  // volumes

          // onExit specifies the template that should always run when the workflow completes.
          onExit: "exit-handler",

          templates: [
            {
              name: "release",
              dag: {
                tasks: [
                  {
                    name: "checkout",
                    template: "checkout",
                  },
                  {
                    name: "image-build-release",
                    template: "image-build-release",
                    dependencies: ["checkout"],
                  },
                ],  // tasks
              },  //dag
            },  // release
            {
              name: "exit-handler",
              steps: [
                [{
                  name: "copy-artifacts",
                  template: "copy-artifacts",
                }],
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
                  name: "EXTRA_REPOS",
                  value: params.extra_repos,
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

            buildImageTemplate("image-build-release", imageDir, params.dockerfile, releaseImage),

            buildTemplate(
              "copy-artifacts",
              [
                "python",
                "-m",
                "kubeflow.testing.prow_artifacts",
                "--artifacts_dir=" + outputDir,
                "copy_artifacts",
                "--bucket=" + bucket,
              ]
            ),  // copy-artifacts
          ],  // templates
        },
      },  // release
  },  // parts
}
