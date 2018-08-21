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

  parts(namespace, name):: {
    // Workflow to run the e2e test.
    e2e(prow_env, bucket, platform="minikube"):
      // The name for the workspace to run the steps in
      local stepsNamespace = "kubeflow";
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
      local bootstrapDir = srcDir + "/bootstrap";
      local image = "gcr.io/kubeflow-ci/test-worker:latest";
      local testing_image = "gcr.io/kubeflow-ci/kubeflow-testing";
      local bootstrapperImage = "gcr.io/kubeflow-ci/bootstrapper:" + name;
      local deploymentName = "e2e-" + std.substr(name, std.length(name) - 4, 4);
      local v1alpha2Suffix = "-v1a2";

      // The name of the NFS volume claim to use for test files.
      local nfsVolumeClaim = "nfs-external";
      // The name to use for the volume to use to contain test data.
      local dataVolume = "kubeflow-test-volume";
      local kubeflowPy = srcDir;
      // The directory within the kubeflow_testing submodule containing
      // py scripts to use.
      local kubeflowTestingPy = srcRootDir + "/kubeflow/testing/py";
      local tfOperatorRoot = srcRootDir + "/kubeflow/tf-operator";
      local tfOperatorPy = tfOperatorRoot;

      // VM to use for minikube.
      local vmName =
        if platform == "minikube" then
          if std.length(name) > 61 then
            // We append a letter because it must start with a lowercase letter.
            // We use a suffix because the suffix contains the random salt.
            "z" + std.substr(name, std.length(name) - 60, 60)
          else
            name
        else
          "";
      local project = "kubeflow-ci";
      // GKE cluster to use
      local cluster =
        if platform == "gke" then
          deploymentName
        else
          "";
      local zone = "us-east1-d";
      // Build an Argo template to execute a particular command.
      // step_name: Name for the template
      // command: List to pass as the container command.
      // We use separate kubeConfig files for separate clusters
      local buildTemplate(step_name, command, env_vars=[], sidecars=[], kubeConfig="config") = {
        name: step_name,
        activeDeadlineSeconds: 900,  // Set 15 minute timeout for each template
        container: {
          command: command,
          image: image,
          imagePullPolicy: "Always",
          env: [
            {
              // Add the source directories to the python path.
              name: "PYTHONPATH",
              value: kubeflowPy + ":" + kubeflowTestingPy + ":" + tfOperatorPy,
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
              // We use a directory in our NFS share to store our kube config.
              // This way we can configure it on a single step and reuse it on subsequent steps.
              name: "KUBECONFIG",
              value: testDir + "/.kube/" + kubeConfig,
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
      {
        apiVersion: "argoproj.io/v1alpha1",
        kind: "Workflow",
        metadata: {
          name: name,
          namespace: namespace,
          labels: {
            org: "kubeflow",
            repo: "kubeflow",
            workflow: "e2e",
            // TODO(jlewi): Add labels for PR number and commit. Need to write a function
            // to convert list of environment variables to labels.
          },
        },
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
          // onExit specifies the template that should always run when the workflow completes.
          onExit: "exit-handler",
          templates: [
            {
              name: "e2e",
              dag: {
                tasks: std.prune([
                  {
                    name: "checkout",
                    template: "checkout",
                  },

                  {
                    local gkeSetup = {
                      name: "setup-gke",
                      template: "setup-gke",
                      dependencies: ["bootstrap-kf-gcp"],
                    },
                    local minikubeSetup = {
                      name: "setup-minikube",
                      template: "setup-minikube",
                      dependencies: ["checkout"],
                    },

                    result:: if platform == "minikube" then
                      minikubeSetup
                    else
                      gkeSetup,

                  }.result,
                  if platform == "gke" then {
                    name: "setup-gke" + v1alpha2Suffix,
                    template: "setup-gke" + v1alpha2Suffix,
                    dependencies: ["bootstrap-kf-gcp" + v1alpha2Suffix],
                  },
                  {
                    local bootstrapImageCreate = {
                      name: "bootstrap-image-create",
                      template: "bootstrap-image-create",
                      dependencies: ["checkout"],
                    },

                    result:: if platform == "gke" then
                      bootstrapImageCreate,
                  }.result,
                  {
                    name: "create-pr-symlink",
                    template: "create-pr-symlink",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "test-jsonnet-formatting",
                    template: "test-jsonnet-formatting",
                    dependencies: ["checkout"],
                  },
                  {
                    local bootstrapKubeflowGCP = {
                      name: "bootstrap-kf-gcp",
                      template: "bootstrap-kf-gcp",
                      dependencies: ["bootstrap-image-create"],
                    },
                    local deployKubeflow = {
                      name: "deploy-kubeflow",
                      template: "deploy-kubeflow",
                      dependencies: ["setup-minikube"],
                    },
                    result:: if platform == "minikube" then
                      deployKubeflow
                    else
                      bootstrapKubeflowGCP,
                  }.result,
                  if platform == "gke" then {
                    name: "bootstrap-kf-gcp" + v1alpha2Suffix,
                    template: "bootstrap-kf-gcp" + v1alpha2Suffix,
                    dependencies: ["bootstrap-image-create"],
                  },
                  {
                    name: "pytorchjob-deploy",
                    template: "pytorchjob-deploy",
                    dependencies: [
                      if platform == "minikube" then
                        "deploy-kubeflow"
                      else
                        "wait-for-kubeflow",
                    ],
                  },
                  // Don't run argo test for gke since
                  // it runs in the same cluster as the
                  // test cluster. For minikube, we have
                  // a separate cluster.
                  if platform == "minikube" then
                    {
                      name: "test-argo-deploy",
                      template: "test-argo-deploy",
                      dependencies: ["deploy-kubeflow"],
                    }
                  else
                    {},
                  {
                    name: "tfjob-test",
                    template: "tfjob-test",
                    dependencies: [
                      if platform == "minikube" then
                        "deploy-kubeflow"
                      else
                        "wait-for-kubeflow",
                    ],
                  },
                  {
                    name: "tfjob-simple-prototype-test",
                    template: "tfjob-simple-prototype-test",
                    dependencies: [
                      if platform == "minikube" then
                        "deploy-kubeflow"
                      else
                        "wait-for-kubeflow",
                    ],
                  },
                  if platform == "gke" then {
                    name: "tfjob-test" + v1alpha2Suffix,
                    // TODO(https://github.com/kubeflow/kubeflow/issues/974): Reneable this test once
                    // its fixed.
                    // template: "tfjob-test" + v1alpha2Suffix,
                    template: "skip-step",
                    dependencies: ["wait-for-kubeflow" + v1alpha2Suffix],
                  },
                  if platform == "gke" then {
                    name: "wait-for-kubeflow",
                    template: "wait-for-kubeflow",
                    dependencies: [
                      "setup-gke",
                    ],
                  } else {},
                  if platform == "gke" then {
                    name: "wait-for-kubeflow" + v1alpha2Suffix,
                    template: "wait-for-kubeflow" + v1alpha2Suffix,
                    dependencies: [
                      "setup-gke" + v1alpha2Suffix,
                    ],
                  } else {},
                  {
                    name: "jsonnet-test",
                    template: "jsonnet-test",
                    dependencies: ["checkout"],
                  },
                ]),  // tasks
              },  // dag
            },  // e2e template
            {
              name: "exit-handler",
              dag: {
                tasks: [
                  {
                    name: "teardown",
                    template:
                      if platform == "gke" then
                        "teardown-kubeflow-gcp"
                      else
                        if platform == "minikube" then
                          "teardown-minikube"
                        else
                          "",
                  },
                  if platform == "gke" then
                    {
                      name: "teardown-kubeflow-gcp" + v1alpha2Suffix,
                      template: "teardown-kubeflow-gcp" + v1alpha2Suffix,
                    },
                  if platform == "gke" then
                    {
                      name: "test-dir-delete",
                      template: "test-dir-delete",
                      dependencies: ["copy-artifacts"],
                    },
                  {
                    name: "copy-artifacts",
                    template: "copy-artifacts",
                    dependencies: ["teardown"],
                  },
                ],
              },  // dag
            },  // exit-handler
            buildTemplate(
              "checkout",
              ["/usr/local/bin/checkout.sh", srcRootDir],
              [{
                name: "EXTRA_REPOS",
                value: "kubeflow/tf-operator@HEAD;kubeflow/testing@HEAD",
              }],
              [],  // no sidecars
            ),
            buildTemplate("test-dir-delete", [
              "bash",
              "-c",
              "rm -rf " + testDir,
            ]),  // test-dir-delete

            // A simple step that can be used to replace a test that we want to temporarily
            // disable. Changing the template of the step to use this simplifies things
            // because then we don't need to mess with dependencies.
            buildTemplate("skip-step", [
              "echo",
              "skipping",
              "step",
            ]),  // skip step

            buildTemplate("wait-for-kubeflow", [
              "python",
              "-m",
              "testing.wait_for_deployment",
              "--cluster=" + cluster,
              "--project=" + project,
              "--zone=" + zone,
              "--timeout=5",
            ]),  // wait-for-kubeflow
            buildTemplate("wait-for-kubeflow" + v1alpha2Suffix, [
              "python",
              "-m",
              "testing.wait_for_deployment",
              "--cluster=" + cluster,
              "--project=" + project,
              "--zone=" + zone,
              "--timeout=5",
            ], kubeConfig="v1alpha2"),  // wait-for-kubeflow
            buildTemplate("test-jsonnet-formatting", [
              "python",
              "-m",
              "kubeflow.testing.test_jsonnet_formatting",
              "--project=" + project,
              "--artifacts_dir=" + artifactsDir,
              "--src_dir=" + srcDir,
              "--exclude_dirs=" + srcDir + "/bootstrap/vendor/",
            ]),  // test-jsonnet-formatting
            // Get GKE Credentials
            buildTemplate("setup-gke", [
              "python",
              "-m",
              "testing.get_gke_credentials",
              "--test_dir=" + testDir,
              "--project=" + project,
              "--cluster=" + cluster,
              "--zone=" + zone,
            ]),  // setup-gke
            buildTemplate("setup-gke" + v1alpha2Suffix, [
              "python",
              "-m",
              "testing.get_gke_credentials",
              "--test_dir=" + testDir,
              "--project=" + project,
              "--cluster=" + cluster + v1alpha2Suffix,
              "--zone=" + zone,
            ], kubeConfig="v1alpha2"),  // setup-gke
            // Setup and teardown using minikube
            buildTemplate("setup-minikube", [
              "python",
              "-m",
              "testing.test_deploy",
              "--project=" + project,
              "--namespace=" + stepsNamespace,
              "--test_dir=" + testDir,
              "--artifacts_dir=" + artifactsDir,
              "deploy_minikube",
              "--vm_name=" + vmName,
              "--zone=" + zone,
            ]),  // setup
            buildTemplate("teardown-minikube", [
              "python",
              "-m",
              "testing.test_deploy",
              "--project=" + project,
              "--namespace=" + stepsNamespace,
              "--test_dir=" + testDir,
              "--artifacts_dir=" + artifactsDir,
              "teardown_minikube",
              "--vm_name=" + vmName,
              "--zone=" + zone,
            ]),  // teardown

            buildTemplate(
              "deploy-kubeflow", [
                "python",
                "-m",
                "testing.deploy_kubeflow",
                "--test_dir=" + testDir,
                "--namespace=" + stepsNamespace,
              ]
            ),  // deploy-kubeflow
            buildTemplate("create-pr-symlink", [
              "python",
              "-m",
              "kubeflow.testing.prow_artifacts",
              "--artifacts_dir=" + outputDir,
              "create_pr_symlink",
              "--bucket=" + bucket,
            ]),  // create-pr-symlink
            buildTemplate("copy-artifacts", [
              "python",
              "-m",
              "kubeflow.testing.prow_artifacts",
              "--artifacts_dir=" + outputDir,
              "copy_artifacts",
              "--bucket=" + bucket,
            ]),  // copy-artifacts
            buildTemplate("jsonnet-test", [
              "python",
              "-m",
              "testing.test_jsonnet",
              "--artifacts_dir=" + artifactsDir,
              "--test_files_dirs=" + srcDir + "/kubeflow",
              "--jsonnet_path_dirs=" + srcDir,
            ]),  // jsonnet-test
            buildTemplate("tfjob-simple-prototype-test", [
              "python",
              "-m",
              "testing.tf_job_simple_test",
              "--src_dir=" + srcDir,
            ]),  // tfjob-simple-prototype-test
            buildTemplate("tfjob-test", [
              "python",
              "-m",
              "py.test_runner",
              "test",
              "--cluster=" + cluster,
              "--zone=" + zone,
              "--project=" + project,
              "--app_dir=" + tfOperatorRoot + "/test/workflows",
              "--tfjob_version=v1alpha1",
              "--component=simple_tfjob",
              // Name is used for the test case name so it should be unique across
              // all E2E tests.
              "--params=name=simple-tfjob-" + platform + ",namespace=" + stepsNamespace + ",apiVersion=kubeflow.org/" + "v1alpha1" + ",image=" + "gcr.io/tf-on-k8s-dogfood/tf_sample:dc944ff",
              "--junit_path=" + artifactsDir + "/junit_e2e-" + platform + ".xml",
            ]),  // run tests
            buildTemplate("tfjob-test" + v1alpha2Suffix, [
              "python",
              "-m",
              "py.test_runner",
              "test",
              "--cluster=" + cluster + v1alpha2Suffix,
              "--zone=" + zone,
              "--project=" + project,
              "--app_dir=" + tfOperatorRoot + "/test/workflows",
              "--tfjob_version=v1alpha2",
              "--component=simple_tfjob",
              // Name is used for the test case name so it should be unique across
              // all E2E tests.
              "--params=name=simple-tfjob-" + platform + ",namespace=" + stepsNamespace + ",apiVersion=kubeflow.org/" + "v1alpha2" + ",image=" + "gcr.io/kubeflow-ci/tf-dist-mnist-test:1.0",
              "--junit_path=" + artifactsDir + "/junit_e2e-" + platform + v1alpha2Suffix + ".xml",
            ], kubeConfig="v1alpha2"),  // run tests
            buildTemplate("pytorchjob-deploy", [
              "python",
              "-m",
              "testing.test_deploy",
              "--project=kubeflow-ci",
              "--github_token=$(GITHUB_TOKEN)",
              "--namespace=" + stepsNamespace,
              "--test_dir=" + testDir,
              "--artifacts_dir=" + artifactsDir,
              "--deploy_name=pytorch-job",
              "deploy_pytorchjob",
              "--params=image=pytorch/pytorch:v0.2,num_workers=1",
            ]),  // pytorchjob-deploy
            buildTemplate("test-argo-deploy", [
              "python",
              "-m",
              "testing.test_deploy",
              "--project=kubeflow-ci",
              "--github_token=$(GITHUB_TOKEN)",
              "--namespace=" + stepsNamespace,
              "--test_dir=" + testDir,
              "--artifacts_dir=" + artifactsDir,
              "--deploy_name=test-argo-deploy",
              "deploy_argo",
            ]),  // test-argo-deploy
            buildTemplate(
              "bootstrap-image-create",
              [
                // We need to explicitly specify bash because
                // build_image.sh is not in the container its a volume mounted file.
                "/bin/bash",
                "-c",
                bootstrapDir + "/build_image.sh "
                + bootstrapDir + "/Dockerfile "
                + "gcr.io/kubeflow-ci/bootstrapper" + " "
                + name + " "
                + "kubeflow:" + srcDir,
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
            ),  // bootstrap-image-create
            buildTemplate("bootstrap-kf-gcp", [
              "python",
              "-m",
              "testing.deploy_kubeflow_gcp",
              "--project=" + project,
              "--name=" + deploymentName,
              "--config=" + srcDir + "/testing/dm_configs/cluster-kubeflow.yaml",
              "--imports=" + srcDir + "/testing/dm_configs/cluster.jinja",
              "--bootstrapper_image=" + bootstrapperImage,
              "--tfjob_version=v1alpha1",
            ]),  // bootstrap-kf-gcp
            buildTemplate("bootstrap-kf-gcp" + v1alpha2Suffix, [
              "python",
              "-m",
              "testing.deploy_kubeflow_gcp",
              "--project=" + project,
              "--name=" + deploymentName + v1alpha2Suffix,
              "--config=" + srcDir + "/testing/dm_configs/cluster-kubeflow.yaml",
              "--imports=" + srcDir + "/testing/dm_configs/cluster.jinja",
              "--bootstrapper_image=" + bootstrapperImage,
              "--tfjob_version=v1alpha2",
            ]),  // bootstrap-kf-gcp
            buildTemplate("teardown-kubeflow-gcp", [
              "python",
              "-m",
              "testing.teardown_kubeflow_gcp",
              "--project=" + project,
              "--name=" + deploymentName,
            ]),  // teardown-kubeflow-gcp
            buildTemplate("teardown-kubeflow-gcp" + v1alpha2Suffix, [
              "python",
              "-m",
              "testing.teardown_kubeflow_gcp",
              "--project=" + project,
              "--name=" + deploymentName + v1alpha2Suffix,
            ]),  // teardown-kubeflow-gcp
          ],  // templates
        },
      },  // e2e
  },  // parts
}
