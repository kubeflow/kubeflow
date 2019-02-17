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

  // Default parameters.
  //
  // TODO(jlewi): Use camelCase consistently.
  defaultParams:: {
    bucket: "kubeflow-ci_temp",
    commit: "master",
    // Name of the secret containing GCP credentials.
    gcpCredentialsSecretName: "kubeflow-testing-credentials",
    name: "new9",
    namespace: "kubeflow-test-infra",
    // The name of the NFS volume claim to use for test files.
    nfsVolumeClaim: "nfs-external",
    prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
    registry: "gcr.io/kubeflow-ci",
    versionTag: "latest",
    // The default image to use for the steps in the Argo workflow.
    testing_image: "gcr.io/kubeflow-ci/test-worker/test-worker:v20190116-b7abb8d-e3b0c4",
    tf_testing_image: "gcr.io/kubeflow-ci/tf-test-worker:1.0",
    project: "kubeflow-ci",
    cluster: "kubeflow-testing",
    zone: "us-east1-d",
    build_image: false,
  },

  parts(namespace, name, overrides={}):: {
    // Workflow to run the e2e test.
    e2e::
      local params = $.defaultParams + overrides;

      local namespace = params.namespace;
      local testing_image = params.testing_image;
      local tf_testing_image = params.tf_testing_image;
      local project = params.project;
      local cluster = params.cluster;
      local zone = params.zone;
      local name = params.name;
      local build_image = params.build_image;

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
      local imageDir = srcRootDir + "/kubeflow/kubeflow/components/k8s-model-server/images";

      local cpuImage = params.registry + "/tf-model-server-cpu" + ":" + params.versionTag;
      local gpuImage = params.registry + "/tf-model-server-gpu" + ":" + params.versionTag;

      // Parameters to set on the modelServer component
      local deployParams = {
        name: "mnist-cpu",
        modelName: "mnist",
        namespace: stepsNamespace,
        modelPath: "gs://kubeflow-examples-data/mnist",
        deployHttpProxy: true,
      } + if build_image then
        {
          modelServerImage: cpuImage,
        } else {};
      local deployGpuParams = {
        name: "mnist-gpu",
        modelName: "mnist",
        namespace: stepsNamespace,
        modelPath: "gs://kubeflow-examples-data/mnist",
        deployHttpProxy: true,
        numGpus: 1,
      };

      local toPair = function(k, v) k + "=" + v;
      local deployParamsList = std.join(",", [toPair(k, deployParams[k]) for k in std.objectFields(deployParams)]);
      local deployGpuParamsList = std.join(",", [toPair(k, deployGpuParams[k]) for k in std.objectFields(deployGpuParams)]);

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
            // We use a directory in our NFS share to store our kube config.
            // This way we can configure it on a single step and reuse it on subsequent steps.
            {
              name: "KUBECONFIG",
              value: testDir + "/.kube/config",
            },
          ] + prow_env + env_vars,
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

      local buildImageTemplate(step_name, dockerfile, image) =
        buildTemplate(
          step_name,
          [
            // We need to explicitly specify bash because
            // build_image.sh is not in the container its a volume mounted file.
            "/bin/bash",
            "-c",
            imageDir + "/build_image.sh "
            + imageDir + "/" + dockerfile + " "
            + image,
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
            mirrorVolumeMounts: true,
          }],
        );  // buildImageTemplate
      local buildTestTfImageTemplate(stepName, serviceName) = {
        name: stepName,
        container: {
          command: [
            "python",
            "-m",
            "testing.test_tf_serving",
            "--namespace=" + stepsNamespace,
            "--artifacts_dir=" + artifactsDir,
            "--service_name=" + serviceName,
            "--input_path=" + srcDir + "/components/k8s-model-server/test-data/mnist_input.json",
            "--result_path=" + srcDir + "/components/k8s-model-server/test-data/mnist_result.json",
          ],
          env: prow_env + [
            {
              name: "EXTRA_REPOS",
              value: "tensorflow/k8s@HEAD;kubeflow/testing@HEAD",
            },
            {
              name: "PYTHONPATH",
              value: kubeflowPy + ":" + kubeflowTestingPy,
            },
            {
              name: "KUBECONFIG",
              value: testDir + "/.kube/config",
            },
          ],
          image: tf_testing_image,
          volumeMounts: [
            {
              name: dataVolume,
              mountPath: mountPath,
            },
          ],
        },
      };  // buildTestTfImageTemplate

      local e2e_tasks_base = [
        {
          name: "checkout",
          template: "checkout",
        },
        {
          name: "create-pr-symlink",
          template: "create-pr-symlink",
          dependencies: ["checkout"],
        },

        {
          name: "setup",
          template: "setup",
          dependencies: ["checkout"],
        },
        {
          name: "test-tf-serving",
          template: "test-tf-serving",
          dependencies: ["deploy-tf-serving"],
        },
        {
          name: "deploy-tf-serving-gpu",
          template: "deploy-tf-serving-gpu",
          dependencies: ["setup"],
        },
        {
          name: "test-tf-serving-gpu",
          template: "test-tf-serving-gpu",
          dependencies: ["deploy-tf-serving-gpu"],
        },
      ];
      local e2e_tasks = e2e_tasks_base + if build_image then [
        {
          name: "build-tf-serving-cpu",
          template: "build-tf-serving-cpu",
          dependencies: ["checkout"],
        },
        {
          name: "deploy-tf-serving",
          template: "deploy-tf-serving",
          dependencies: ["build-tf-serving-cpu", "setup"],
        },
      ] else [
        {
          name: "deploy-tf-serving",
          template: "deploy-tf-serving",
          dependencies: ["setup"],
        },
      ];
      local deploy_tf_serving_command_base = [
        "python",
        "-m",
        "testing.test_deploy",
        "--project=" + project,
        "--github_token=$(GITHUB_TOKEN)",
        // TODO(jlewi): This is duplicative with params. We should probably get
        // rid of this and just treat namespace as another parameter.
        "--namespace=" + stepsNamespace,
        "--test_dir=" + testDir,
        "--artifacts_dir=" + artifactsDir,
      ];
      local deploy_tf_serving_command = deploy_tf_serving_command_base + [
        "--deploy_name=mnist-cpu",
        "deploy_model",
        "--params=" + deployParamsList,
      ];
      local deploy_tf_serving_gpu_command = deploy_tf_serving_command_base + [
        "--deploy_name=mnist-gpu",
        "deploy_model",
        "--params=" + deployGpuParamsList,
      ];

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
              name: "e2e",
              dag: {
                tasks: e2e_tasks,
              },  //dag
            },  // e2e
            {
              name: "exit-handler",
              steps: [
                [
                  {
                    name: "teardown",
                    template: "teardown",
                  },
                ],
                [{
                  name: "copy-artifacts",
                  template: "copy-artifacts",
                }],
              ],
            },
            buildTemplate(
              "checkout",
              ["/usr/local/bin/checkout.sh", srcRootDir],
              [{
                name: "EXTRA_REPOS",
                value: "kubeflow/testing@HEAD",
              }],
              [],  // no sidecars
            ),

            buildImageTemplate("build-tf-serving-cpu", "Dockerfile.cpu", cpuImage),

            // Setup configures a kubeconfig file for GKE.
            buildTemplate("setup", [
              "python",
              "-m",
              "testing.get_gke_credentials",
              "--test_dir=" + testDir,
              "--project=" + project,
              "--cluster=" + cluster,
              "--zone=" + zone,
            ]),  // setup

            buildTemplate(
              "deploy-tf-serving",
              deploy_tf_serving_command,
            ),
            buildTemplate(
              "deploy-tf-serving-gpu",
              deploy_tf_serving_gpu_command,
            ),

            buildTestTfImageTemplate("test-tf-serving",
                                     "mnist-cpu"),
            buildTestTfImageTemplate("test-tf-serving-gpu",
                                     "mnist-gpu"),

            buildTemplate("create-pr-symlink", [
              "python",
              "-m",
              "kubeflow.testing.prow_artifacts",
              "--artifacts_dir=" + outputDir,
              "create_pr_symlink",
              "--bucket=" + bucket,
            ]),  // create-pr-symlink
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
            buildTemplate(
              "teardown",
              [
                "python",
                "-m",
                "testing.test_deploy",
                "--project=" + project,
                "--namespace=" + stepsNamespace,
                "--test_dir=" + testDir,
                "--artifacts_dir=" + artifactsDir,
                "teardown",
              ]
            ),  // teardown
          ],  // templates
        },
      },  // e2e
  },  // parts
}
