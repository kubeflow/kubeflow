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

  // Convert non-boolean types like string,number to a boolean.
  // This is primarily intended for dealing with parameters that should be booleans.
  toBool:: function(x) {
    result::
      if std.type(x) == "boolean" then
        x
      else if std.type(x) == "string" then
        std.asciiUpper(x) == "TRUE"
      else if std.type(x) == "number" then
        x != 0
      else
        false,
  }.result,

  // kfTests defines an Argo DAG for running job tests to validate a Kubeflow deployment.
  //
  // The dag is intended to be reused as a sub workflow by other workflows.
  // It is structured to allow late binding to be used to override values.
  //
  // Usage is as follows
  //
  // Define a variable and overwrite name and platform.
  //
  // local util = import "workflows.libsonnet";
  // local tests = util.kfTests + {
  //    name: "gke-tests",
  //    platform: "gke-latest"
  // }
  //
  // Tests contains the following variables which can be added to your argo workflow
  //   argoTemplates - This is a list of Argo templates. It includes an Argo template for a Dag representing the set of steps to run
  //                   as well as the templates for the individual tasks in the dag.
  //   name - This is the name of the Dag template.
  //
  // So to add a nested workflow to your Argo graph
  //
  // 1. In your Argo Dag add a step that uses template tests.name
  // 2. In your Argo Workflow add argoTemplates as templates.
  //
  kfTests:: {
    // name and platform should be given unique values.
    name: "somename",
    platform: "gke",
    workflowName: "",

    // In order to refer to objects between the current and outer-most object, we use a variable to create a name for that level:
    local tests = self,

    // The name for the workspace to run the steps in
    stepsNamespace: "kubeflow",
    // mountPath is the directory where the volume to store the test data
    // should be mounted.
    mountPath: "/mnt/" + "test-data-volume",

    // testDir is the root directory for all data for a particular test run.
    testDir: self.mountPath + "/" + self.name,
    // outputDir is the directory to sync to GCS to contain the output for this job.
    outputDir: self.testDir + "/output",
    artifactsDir: self.outputDir + "/artifacts",
    // Source directory where all repos should be checked out
    srcRootDir: self.testDir + "/src",
    // The directory containing the kubeflow/kubeflow repo
    srcDir: self.srcRootDir + "/kubeflow/kubeflow",
    image: "gcr.io/kubeflow-ci/test-worker:latest",

    // value of KUBECONFIG environment variable. This should be  a full path.
    kubeConfig: self.testDir + "/.kube/kubeconfig",

    // The name of the NFS volume claim to use for test files.
    nfsVolumeClaim: "nfs-external",
    // The name to use for the volume to use to contain test data.
    dataVolume: "kubeflow-test-volume",
    kubeflowPy: self.srcDir,
    // The directory within the kubeflow_testing submodule containing
    // py scripts to use.
    kubeflowTestingPy: self.srcRootDir + "/kubeflow/testing/py",
    tfOperatorRoot: self.srcRootDir + "/kubeflow/tf-operator",
    tfOperatorPy: self.tfOperatorRoot + "/py",

    // Build an Argo template to execute a particular command.
    // step_name: Name for the template
    // command: List to pass as the container command.
    // We use separate kubeConfig files for separate clusters
    buildTemplate: {
      // These variables should be overwritten for every test.
      // They are hidden because they shouldn't be included in the Argo template
      name: "",
      command:: "",
      env_vars:: [],
      side_cars: [],
      workingDir: null,

      activeDeadlineSeconds: 1800,  // Set 30 minute timeout for each template

      local template = self,

      pythonPath: tests.kubeflowPy + ":" + tests.kubeflowTestingPy,
      // Actual template for Argo
      argoTemplate: {
        name: template.name,
        container: {
          command: template.command,
          name: template.name,
          image: tests.image,
          imagePullPolicy: "Always",
          workingDir: template.workingDir,
          env: [
            {
              // Add the source directories to the python path.
              name: "PYTHONPATH",
              value: template.pythonPath,
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
              value: tests.kubeConfig,
            },
          ] + template.env_vars,
          volumeMounts: [
            {
              name: tests.dataVolume,
              mountPath: tests.mountPath,
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
      },
    },  // buildTemplate

    // Tasks is a dictionary from which we generate:
    //
    // 1. An Argo Dag
    // 2. A list of Argo templates for each task in the Dag.
    //
    // This dictionary is intended to be a "private" variable and not to be consumed externally
    // by the workflows that are trying to nest this dag.
    //
    // This variable reduces the boilerplate of writing Argo Dags.
    // We use tasks to construct argoTaskTemplates and argoDagTemplate
    // below.
    //
    // In Argo we construct a Dag as follows
    // 1. We define a Dag template (see argoDagTemplate below). A dag
    //    is a list of tasks which are triplets (name, template, dependencies)
    // 2. A list of templates (argoTaskTemplates) which define the work to be
    //    done for each task in the Dag (e.g. run a container, run a dag etc...)
    //
    // argoDagTemplate is constructed by iterating over tasks and inserting tasks
    // for each item. We use the same name as the template for the task.
    //
    // argoTaskTemplates is constructing from tasks as well.
    tasks:: [
      {

        // Wait for Kubeflow and run some basic tests such as checking
        // that various components started.
        template: tests.buildTemplate {
          name: "wait-for-kubeflow",
          command: [
            "python",
            "-m",
            "testing.wait_for_kubeflow",
            "--test_dir=" + tests.testDir,
            "--namespace=" + tests.stepsNamespace,
          ],
        },  // wait-for-kubeflow
        dependencies: null,
      },  // wait-for-kubeflow
      {
        local v1beta1Suffix = "-v1b1",
        template: tests.buildTemplate {
          name: "tfjob-test" + v1beta1Suffix,
          pythonPath: tests.kubeflowPy + ":" + tests.tfOperatorPy + ":" + tests.kubeflowTestingPy,
          command: [
            "python",
            "-m",
            "kubeflow.tf_operator.simple_tfjob_tests",
            "--app_dir=" + tests.tfOperatorRoot + "/test/workflows",
            "--tfjob_version=v1beta1",
            // Name is used for the test case name so it should be unique across
            // all E2E tests.
            "--params=name=smoke-tfjob-" + tests.platform + ",namespace=" + tests.stepsNamespace,
            "--artifacts_path=" + tests.artifactsDir,
            // Skip GPU tests
            "--skip_tests=test_simple_tfjob_gpu",
          ],
        },  // run tests
        dependencies: ["wait-for-kubeflow"],
      },  // tf-job-test-v1b1
      {
        local v1beta2Suffix = "-v1b2",
        template: tests.buildTemplate {
          name: "tfjob-test" + v1beta2Suffix,
          pythonPath: tests.kubeflowPy + ":" + tests.tfOperatorPy + ":" + tests.kubeflowTestingPy,
          command: [
            "python",
            "-m",
            "kubeflow.tf_operator.simple_tfjob_tests",
            "--app_dir=" + tests.tfOperatorRoot + "/test/workflows",
            "--tfjob_version=v1beta2",
            // Name is used for the test case name so it should be unique across
            // all E2E tests.
            "--params=name=smoke-tfjob-" + tests.platform + ",namespace=" + tests.stepsNamespace,
            "--artifacts_path=" + tests.artifactsDir,
            // Skip GPU tests
            "--skip_tests=test_simple_tfjob_gpu",
          ],
        },  // run tests
        dependencies: ["wait-for-kubeflow"],
      },  // tf-job-test-v1b2
      // TODO(https://github.com/kubeflow/kubeflow/issues/1407): argo-deploy is flaky so disable it.
      // {
      //
      //  template: tests.buildTemplate {
      //    name: "test-argo-deploy",
      //    command: [
      //      "python",
      //      "-m",
      //      "testing.test_deploy",
      //      "--project=kubeflow-ci",
      //      "--github_token=$(GITHUB_TOKEN)",
      //      "--namespace=" + tests.stepsNamespace,
      //      "--test_dir=" + tests.testDir,
      //      "--artifacts_dir=" + tests.artifactsDir,
      //      "--deploy_name=test-argo-deploy",
      //      "--workflow_name=" + tests.workflowName,
      //      "deploy_argo",
      //    ],
      //  },
      //  dependencies: ["wait-for-kubeflow"],
      //},  // test-argo-deploy
      {

        template: tests.buildTemplate {
          name: "test-katib-deploy",
          command: [
            "python",
            "-m",
            "testing.test_deploy",
            "--project=kubeflow-ci",
            "--github_token=$(GITHUB_TOKEN)",
            "--namespace=" + tests.stepsNamespace,
            "--test_dir=" + tests.testDir,
            "--artifacts_dir=" + tests.artifactsDir,
            "--deploy_name=test-katib",
            "--workflow_name=" + tests.workflowName,
            "test_katib",
          ],
        },
        dependencies: ["wait-for-kubeflow"],
      },  // test-katib
      {
        template: tests.buildTemplate {
          name: "pytorchjob-deploy",
          command: [
            "python",
            "-m",
            "testing.test_deploy",
            "--project=kubeflow-ci",
            "--github_token=$(GITHUB_TOKEN)",
            "--namespace=" + tests.stepsNamespace,
            "--test_dir=" + tests.testDir,
            "--artifacts_dir=" + tests.artifactsDir,
            "--deploy_name=pytorch-job",
            "--workflow_name=" + tests.workflowName,
            "deploy_pytorchjob",
            "--params=image=pytorch/pytorch:v0.2,num_workers=1",
          ],
          pythonPath: tests.kubeflowPy + ":" + tests.kubeflowTestingPy + ":" + tests.tfOperatorPy,
        },
        dependencies: ["wait-for-kubeflow"],
      },  // pytorchjob - deploy,
      {

        template: tests.buildTemplate {
          name: "tfjob-simple-prototype-test",
          command: [
            "python",
            "-m",
            "testing.tf_job_simple_test",
            "--src_dir=" + tests.srcDir,
            "--tf_job_version=v1beta1",
            "--test_dir=" + tests.testDir,
            "--artifacts_dir=" + tests.artifactsDir,
          ],
          pythonPath: tests.kubeflowPy + ":" + tests.tfOperatorPy + ":" + tests.kubeflowTestingPy,
        },

        dependencies: ["wait-for-kubeflow"],
      },  // tfjob-simple-prototype-test
      // The test is flaky so disable it see https://github.com/kubeflow/kubeflow/issues/2825.
      // TODO(jlewi). We probably don't need to run the test to verify katib is working correctly.
      // i.e. that the required resources are deployed.
      // {
      //  template: tests.buildTemplate {
      //    name: "katib-studyjob-test",
      //    command: [
      //      "python",
      //      "-m",
      //      "testing.katib_studyjob_test",
      //      "--src_dir=" + tests.srcDir,
      //      "--studyjob_version=v1alpha1",
      //    ],
      //  },
      //  dependencies: ["wait-for-kubeflow"],
      //},  // katib-studyjob-test
      {
        template: tests.buildTemplate {
          name: "notebooks-test",
          command: [
            "pytest",
            // I think -s mean stdout/stderr will print out to aid in debugging.
            // Failures still appear to be captured and stored in the junit file.
            "-s",
            "jupyter_test.py",
            // Test timeout in seconds.
            "--namespace=" + tests.stepsNamespace,
            "--timeout=500",
            "--junitxml=" + tests.artifactsDir + "/junit_jupyter-test.xml",
          ],
          workingDir: tests.srcDir + "/kubeflow/jupyter/tests",
        },
        dependencies: ["wait-for-kubeflow"],
      },  // notebooks-test
      {
        template: tests.buildTemplate {
          name: "profiles-test",
          command: [
            "pytest",
            "profiles_test.py",
            // I think -s mean stdout/stderr will print out to aid in debugging.
            // Failures still appear to be captured and stored in the junit file.
            "-s",
            // Test timeout in seconds.
            "--timeout=500",
            "--junitxml=" + tests.artifactsDir + "/junit_profile-test.xml",
          ],
          workingDir: tests.srcDir + "/kubeflow/profiles/tests",
        },
        dependencies: ["wait-for-kubeflow"],
      },  // profiles-test
    ],

    // An Argo template for the dag.
    argoDagTemplate: {
      name: tests.name,
      dag: {
        // Construct tasks from the templates
        // we will give the steps the same name as the template
        tasks: std.map(function(i) {
          name: i.template.name,
          template: i.template.name,
          dependencies: i.dependencies,
        }, tests.tasks),
      },
    },

    // A list of templates for tasks
    // doesn't include the argoDagTemplate
    argoTaskTemplates: std.map(function(i) i.template.argoTemplate
                               , self.tasks),

    argoTemplates: [self.argoDagTemplate] + self.argoTaskTemplates,
  },  // kfTests

  parts(namespace, name):: {
    // Workflow to run the e2e test.
    //
    // TODO(jlewi): This needs to be refactored. Its only used for running the minikube
    // tests. kfct_test.jsonnet is used for GKE and unit_tests is used for unittests.
    // We should make the following changes.
    //
    // Create a new .jsonnet file for minikube and define the workflow there.
    // Reuse kfTests above to add the actual tests to that file.
    e2e(prow_env, bucket, platform="minikube", workflowName="workflow"):
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
      local bootstrapperImage = "gcr.io/kubeflow-ci/bootstrapper:" + name;
      // The last 4 digits of the name should be a unique id.
      local deploymentName = "e2e-" + std.substr(name, std.length(name) - 4, 4);
      local v1alpha1Suffix = "-v1alpha1";
      local v1beta1Suffix = "-v1b1";
      local v1beta2Suffix = "-v1b2";

      // The name of the NFS volume claim to use for test files.
      local nfsVolumeClaim = "nfs-external";
      // The name to use for the volume to use to contain test data.
      local dataVolume = "kubeflow-test-volume";
      local kubeflowPy = srcDir;
      // The directory within the kubeflow_testing submodule containing
      // py scripts to use.
      local kubeflowTestingPy = srcRootDir + "/kubeflow/testing/py";
      local tfOperatorRoot = srcRootDir + "/kubeflow/tf-operator";
      local tfOperatorPy = tfOperatorRoot + "/py";

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
        activeDeadlineSeconds: 1800,  // Set 30 minute timeout for each template
        container: {
          command: command,
          image: image,
          imagePullPolicy: "Always",
          env: [
            {
              // Add the source directories to the python path.
              name: "PYTHONPATH",
              value: kubeflowPy + ":" + tfOperatorPy+ ":"+kubeflowTestingPy,
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
              // The deploy script doesn't need to setup the project; e.g. enable APIs; they should already
              // be enabled. This slows down setup and leads to test flakiness.
              // If need be we can have a separate test for the new project case.
              name: "SETUP_PROJECT",
              value: "false",
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
                  if platform == "minikube" then {
                    name: "setup-minikube",
                    template: "setup-minikube",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "create-pr-symlink",
                    template: "create-pr-symlink",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "deploy-kubeflow",
                    template: "deploy-kubeflow",
                    dependencies: ["setup-minikube"],
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
                  // TODO(jlewi): This is no longer true.
                  if platform == "minikube" then
                    {
                      name: "test-argo-deploy",
                      template: "test-argo-deploy",
                      dependencies: ["deploy-kubeflow"],
                    }
                  else
                    {},
                  {
                    name: "tfjob-test" + v1beta1Suffix,
                    template: "tfjob-test" + v1beta1Suffix,
                    dependencies: [
                      "deploy-kubeflow",
                    ],
                  },
                  {
                    name: "tfjob-test" + v1beta2Suffix,
                    template: "tfjob-test" + v1beta2Suffix,
                    dependencies: [
                      "deploy-kubeflow",
                    ],
                  },
                  {
                    name: "tfjob-simple-prototype-test",
                    template: "tfjob-simple-prototype-test",
                    dependencies: [
                      "deploy-kubeflow",
                    ],
                  },
                  {
                    name: "katib-studyjob-test",
                    template: "katib-studyjob-test" + v1alpha1Suffix,
                    dependencies: [
                      "deploy-kubeflow",
                    ],
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
                    template: "teardown-minikube",
                  },
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
              env_vars=[{
                name: "EXTRA_REPOS",
                value: "kubeflow/tf-operator@HEAD;kubeflow/testing@HEAD",
              }],
            ),
            buildTemplate("test-dir-delete", [
              "python",
              "-m",
              "testing.run_with_retry",
              "--retries=5",
              "--",
              "rm",
              "-rf",
              testDir,
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
            ]),  // wait-for-kubeflow
            // Setup and teardown using minikube
            buildTemplate("setup-minikube", [
              "python",
              "-m",
              "testing.test_deploy",
              "--project=" + project,
              "--namespace=" + stepsNamespace,
              "--test_dir=" + testDir,
              "--artifacts_dir=" + artifactsDir,
              "--workflow_name=" + workflowName,
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
              "--workflow_name=" + workflowName,
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
            buildTemplate("tfjob-simple-prototype-test", [
              "python",
              "-m",
              "testing.tf_job_simple_test",
              "--src_dir=" + srcDir,
              "--tf_job_version=v1beta1",
            ]),  // tfjob-simple-prototype-test
            buildTemplate("tfjob-test" + v1beta1Suffix, [
              "python",
              "-m",
              "kubeflow.tf_operator.simple_tfjob_tests",
              "--cluster=" + cluster,
              "--zone=" + zone,
              "--project=" + project,
              "--app_dir=" + tfOperatorRoot + "/test/workflows",
              "--tfjob_version=v1beta1",
              // Name is used for the test case name so it should be unique across
              // all E2E tests.
              "--params=name=simple-tfjob-" + platform + ",namespace=" + stepsNamespace,
              "--artifacts_path=" + artifactsDir,
              // Skip GPU tests
              "--skip_tests=test_simple_tfjob_gpu",
            ]),  // tfjob-test-v1beta1
            buildTemplate("tfjob-test" + v1beta2Suffix, [
              "python",
              "-m",
              "kubeflow.tf_operator.simple_tfjob_tests",
              "--cluster=" + cluster,
              "--zone=" + zone,
              "--project=" + project,
              "--app_dir=" + tfOperatorRoot + "/test/workflows",
              "--tfjob_version=v1beta2",
              // Name is used for the test case name so it should be unique across
              // all E2E tests.
              "--params=name=simple-tfjob-" + platform + ",namespace=" + stepsNamespace,
              "--artifacts_path=" + artifactsDir,
              // Skip GPU tests
              "--skip_tests=test_simple_tfjob_gpu",
            ]),  // tfjob-test-v1beta2
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
              "--workflow_name=" + workflowName,
              "deploy_pytorchjob",
              "--params=image=pytorch/pytorch:v0.2,num_workers=1",
            ]),  // pytorchjob-deploy
            buildTemplate("katib-studyjob-test" + v1alpha1Suffix, [
              "python",
              "-m",
              "testing.katib_studyjob_test",
              "--src_dir=" + srcDir,
              "--studyjob_version=v1alpha1",
            ]),  // katib-studyjob-test
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
              "--workflow_name=" + workflowName,
              "deploy_argo",
            ]),  // test-argo-deploy
          ],  // templates
        },
      },  // e2e
  },  // parts
}
