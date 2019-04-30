local params = std.extVar("__ksonnet/params").components.unit_tests;

local k = import "k.libsonnet";
local util = import "workflows.libsonnet";

// TODO(jlewi): Can we get namespace from the environment rather than
// params?
local namespace = params.namespace;

local name = params.name;

local prowEnv = util.parseEnv(params.prow_env);
local bucket = params.bucket;

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

local image = "gcr.io/kubeflow-ci/test-worker:latest";
local testing_image = "gcr.io/kubeflow-ci/kubeflow-testing";

// The name of the NFS volume claim to use for test files.
local nfsVolumeClaim = "nfs-external";
// The name to use for the volume to use to contain test data.
local dataVolume = "kubeflow-test-volume";
local kubeflowPy = srcDir;
// The directory within the kubeflow_testing submodule containing
// py scripts to use.
local kubeflowTestingPy = srcRootDir + "/kubeflow/testing/py";

local project = "kubeflow-ci";

// Build an Argo template to execute a particular command.
// step_name: Name for the template
// command: List to pass as the container command.
// We use separate kubeConfig files for separate clusters
local buildTemplate(step_name, command, working_dir=null, env_vars=[], sidecars=[]) = {
  name: step_name,
  activeDeadlineSeconds: 1800,  // Set 30 minute timeout for each template
  workingDir: working_dir,
  container+: {
    command: command,
    image: image,
    workingDir: working_dir,
    // TODO(jlewi): Change to IfNotPresent.
    imagePullPolicy: "Always",
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
    ] + prowEnv + env_vars,
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


// Create a list of dictionary.c
// Each item is a dictionary describing one step in the graph.
local dagTemplates = [
  {
    template: buildTemplate("checkout",
                            ["/usr/local/bin/checkout.sh", srcRootDir],
                            env_vars=[{
                              name: "EXTRA_REPOS",
                              value: "kubeflow/tf-operator@HEAD;kubeflow/testing@HEAD",
                            }]),
    dependencies: null,
  },
  {
    template: buildTemplate("create-pr-symlink", [
      "python",
      "-m",
      "kubeflow.testing.prow_artifacts",
      "--artifacts_dir=" + outputDir,
      "create_pr_symlink",
      "--bucket=" + bucket,
    ]),  // create-pr-symlink
    dependencies: ["checkout"],
  },  // create-pr-symlink
  {
    template: buildTemplate("flake8-test", [
      "python",
      "-m",
      "testing.test_flake8",
      "--test_files_dirs=" +
      srcDir + "/kubeflow" + "," +
      srcDir + "/testing",
    ]),  // flake8-test
    
    dependencies: ["checkout"],
  },
  {
    // Run the kfctl go unittests
    template: buildTemplate("go-kfctl-unit-tests", [      
      "make",
      "test-junit",
    ], working_dir=srcDir + "/bootstrap",
       env_vars=[{
          name: "JUNIT_FILE",
          value: artifactsDir + "/junit_go-kfctl-unit-tests.xml",
       }],
       ) + {
      someRandomField: "jeremy",
      container+:{
        image: "gcr.io/kubeflow-ci/kfctl/builder:v20190418-v0-30-g5e3bd23d-dirty-73d1fe",
      },
    },  // go-kfctl-unit-tests
    
    dependencies: ["checkout"],
  },
  {
    template: buildTemplate("jsonnet-test", [
      "python",
      "-m",
      "testing.test_jsonnet",
      "--artifacts_dir=" + artifactsDir,
      "--test_files_dirs=" +
      srcDir + "/kubeflow/application/tests" + "," +
      srcDir + "/kubeflow/common/tests" + "," +
      srcDir + "/kubeflow/gcp/tests" + "," +
      srcDir + "/kubeflow/jupyter/tests" + "," +
      srcDir + "/kubeflow/examples/tests" + "," +
      srcDir + "/kubeflow/openvino/tests" + "," +
      srcDir + "/kubeflow/metacontroller/tests" + "," +
      srcDir + "/kubeflow/profiles/tests" + "," +
      srcDir + "/kubeflow/tensorboard/tests" + "," +
      srcDir + "/kubeflow/argo/tests" + "," +
      srcDir + "/kubeflow/kubebench/tests" + "," +
      srcDir + "/kubeflow/tf-training/tests",
      "--jsonnet_path_dirs=" + srcDir + "," + srcRootDir + "/kubeflow/testing/workflows/lib/v1.7.0/",
      "--exclude_dirs=" + srcDir + "/kubeflow/jupyter/tests/test_app",
    ]),  // jsonnet-test

    dependencies: ["checkout"],
  },
  {
    template: buildTemplate("test-jsonnet-formatting", [
      "python",
      "-m",
      "kubeflow.testing.test_jsonnet_formatting",
      "--src_dir=" + srcDir,
      "--exclude_dirs=" + srcDir + "/bootstrap/vendor/," + srcDir + "/releasing/releaser/lib," + srcDir + "/releasing/releaser/vendor",
    ]),  // test-jsonnet-formatting

    dependencies: ["checkout"],
  },
];

// Each item is a dictionary describing one step in the graph
// to execute on exit
local exitTemplates = [
  {
    template: buildTemplate("copy-artifacts", [
      "python",
      "-m",
      "kubeflow.testing.prow_artifacts",
      "--artifacts_dir=" + outputDir,
      "copy_artifacts",
      "--bucket=" + bucket,
    ]),  // copy-artifacts,
    dependencies: null,
  },
  {
    template:
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
    dependencies: ["copy-artifacts"],
  },
];

// Dag defines the tasks in the graph
local dag = {
  name: "e2e",
  // Construct tasks from the templates
  // we will give the steps the same name as the template
  dag: {
    tasks: std.map(function(i) {
      name: i.template.name,
      template: i.template.name,
      dependencies: i.dependencies,
    }, dagTemplates),
  },
};  // dag

// The set of tasks in the exit handler dag.
local exitDag = {
  name: "exit-handler",
  // Construct tasks from the templates
  // we will give the steps the same name as the template
  dag: {
    tasks: std.map(function(i) {
      name: i.template.name,
      template: i.template.name,
      dependencies: i.dependencies,
    }, exitTemplates),
  },
};

// A list of templates for the actual steps
local stepTemplates = std.map(function(i) i.template
                              , dagTemplates) +
                      std.map(function(i) i.template
                              , exitTemplates);


// Add a task to a dag.
local workflow = {
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
    templates: [dag, exitDag] + stepTemplates,  // templates
  },  // spec
};  // workflow

std.prune(k.core.v1.list.new([workflow]))
