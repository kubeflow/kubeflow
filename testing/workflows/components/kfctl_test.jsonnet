local params = std.extVar("__ksonnet/params").components.kfctl_test;

local k = import "k.libsonnet";
local util = import "workflows.libsonnet";
local newUtil = import "util.libsonnet";

// TODO(jlewi): Can we get namespace from the environment rather than
// params?
local namespace = params.namespace;

local name = params.name;

local prowEnv = util.parseEnv(params.prow_env);
local bucket = params.bucket;

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

local runPath = srcDir + "/testing/workflows/run.sh";
local kfCtlPath = srcDir + "/scripts/kfctl.sh";

local kubeConfig = testDir + "/kfctl_test/.kube/kubeconfig";

// Name for the Kubeflow app.
// This needs to be unique for each test run because it is
// used to name GCP resources
// We take the suffix of the name because it should provide some random salt.
local appName = "kfctl-" + std.substr(name, std.length(name) - 4, 4);

// Directory containing the app. This is the directory
// we execute kfctl commands from
local appDir = testDir + "/" + appName;

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

// Workflow template is the name of the workflow template; typically the name of the ks component.
// This is used as a label to make it easy to identify all Argo workflows created from a given
// template.
local workflow_template = "kctl_test";

// Create a dictionary of the different prow variables so we can refer to them in the workflow.
//
// Important: We want to initialize all variables we reference to some value. If we don't
// and we reference a variable which doesn't get set then we get very hard to debug failure messages.
// In particular, we've seen problems where if we add a new environment and evaluate one component eg. "workflows"
// and another component e.g "code_search.jsonnet" doesn't have a default value for BUILD_ID then ksonnet
// fails because BUILD_ID is undefined.
local prowDict = {
  BUILD_ID: "notset",
  BUILD_NUMBER: "notset",
  REPO_OWNER: "notset",
  REPO_NAME: "notset",
  JOB_NAME: "notset",
  JOB_TYPE: "notset",
  PULL_NUMBER: "notset",
} + newUtil.listOfDictToMap(prowEnv);

// Build an Argo template to execute a particular command.
// step_name: Name for the template
// command: List to pass as the container command.
// We use separate kubeConfig files for separate clusters
local buildTemplate(step_name, command, working_dir=null, env_vars=[], sidecars=[]) = {
  name: step_name,
  activeDeadlineSeconds: 1800,  // Set 30 minute timeout for each template
  workingDir: working_dir,
  container: {
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
        // The directory should be unique for each workflow so that multiple workflows don't collide.
        name: "KUBECONFIG",
        value: kubeConfig,
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
  metadata: {
      labels: prowDict {
        workflow: params.name,
        workflow_template: workflow_template,
        step_name: step_name,
      },
  },
  sidecars: sidecars,
};  // buildTemplate

local componentTests = util.kfTests {
  name: "gke-tests",
  platform: "gke",
  testDir: testDir,
  kubeConfig: kubeConfig,
  image: image,
  workflowName: params.workflowName,
  buildTemplate+: {
    argoTemplate+: {
      container+: {
        metadata+: {
          labels: prowDict {
            workflow: params.name,
            workflow_template: workflow_template,
          },
        },
      },
    },
  },
};

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
  },  // checkout
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
    template: buildTemplate(
      "kfctl-init",
      [
        runPath,
        kfCtlPath,
        "init",
        appName,
        "--platform",
        "gcp",
        "--project",
        project,
        "--zone",
        "us-east1-d",
        // Temporary fix for https://github.com/kubeflow/kubeflow/issues/1562
        "--skipInitProject",
        "--gkeApiVersion",
        params.gkeApiVersion,
      ],
      working_dir=testDir,
    ),
    dependencies: ["checkout"],
  },
  {
    template: buildTemplate(
      "kfctl-generate-gcp",
      [
        runPath,
        kfCtlPath,
        "generate",
        "platform",
      ],
      working_dir=appDir
    ),
    dependencies: ["kfctl-init"],
  },
  {
    template: buildTemplate(
      "kfctl-apply-gcp",
      [
        runPath,
        kfCtlPath,
        "apply",
        "platform",
      ],
      env_vars=[
        {
          name: "CLIENT_ID",
          value: "dummy",
        },
        {
          name: "CLIENT_SECRET",
          value: "dummy",
        },
      ],
      working_dir=appDir
    ),
    dependencies: ["kfctl-generate-gcp"],
  },
  // We can't generate the ksonnet app
  // until we create the GKE cluster because we need
  // a KubeConfig file
  {
    template: buildTemplate(
      "kfctl-generate-k8s",
      [
        runPath,
        kfCtlPath,
        "generate",
        "k8s",
        // Disable spartakus metrics so CI clusters won't be counted.
        "&&",
        "cd",
        "ks_app",
        "ks",
        "param",
        "set",
        "spartakus",
        "reportUsage",
        "false",
      ],
      working_dir=appDir
    ),
    dependencies: ["kfctl-apply-gcp"],
  },
  {
    template: buildTemplate(
      "install-spark-operator",
      [
        // Install the operator
        "ks",
        "pkg",
        "install",
        "kubeflow/spark",
      ],
      working_dir=appDir + "/ks_app"
    ),
    dependencies: ["kfctl-generate-k8s"],
  },  // install-spark-operator
  {
    template: buildTemplate(
      "generate-spark-operator",
      [
        // Generate the operator
        "ks",
        "generate",
        "spark-operator",
        "spark-operator",
        "--name=spark-operator",
      ],
      working_dir=appDir + "/ks_app"
    ),
    // Need to wait on kfctl-apply-k8s because that step creates
    // the ksonnet environment.
    dependencies: ["install-spark-operator", "kfctl-apply-k8s"],
  },  // generate-spark-operator
  {
    template: buildTemplate(
      "apply-spark-operator",
      [
        runPath,
        // Apply the operator
        "ks",
        "apply",
        "default",
        "-c",
        "spark-operator",
      ],
      working_dir=appDir + "/ks_app"
    ),
    dependencies: ["generate-spark-operator"],
  },  //apply-spark-operator
  {
    template: buildTemplate(
      "kfctl-apply-k8s",
      [
        runPath,
        kfCtlPath,
        "apply",
        "k8s",
      ],
      working_dir=appDir
    ),
    dependencies: ["kfctl-generate-k8s"],
  },
  // Run the nested tests.
  {
    template: componentTests.argoDagTemplate,
    dependencies: ["apply-spark-operator", "kfctl-apply-k8s"],
  },
];

// Each item is a dictionary describing one step in the graph
// to execute on exit
local deleteKubeflow = util.toBool(params.deleteKubeflow);

local deleteStep = if deleteKubeflow then
  [{
    template: buildTemplate(
      "kfctl-delete",
      [
        runPath,
        kfCtlPath,
        "delete",
        "all",
      ],
      working_dir=appDir
    ),
    dependencies: null,
  }]
else [];

// Clean up all the permanent storages to avoid accumulated resource
// consumption in the test project
local deleteStorageStep = if deleteKubeflow then
  [{
    template: buildTemplate(
      "kfctl-delete-storage",
      [
        runPath,
        "gcloud",
        "deployment-manager",
        "--project=" + project,
        "deployments",
        "delete",
        appName + "-storage",
        "--quiet",
      ],
      working_dir=appDir
    ),
    dependencies: ["kfctl-delete"],
  }]
else [];

local exitTemplates =
  deleteStep + deleteStorageStep +
  [
    {
      template: buildTemplate("copy-artifacts", [
        "python",
        "-m",
        "kubeflow.testing.prow_artifacts",
        "--artifacts_dir=" + outputDir,
        "copy_artifacts",
        "--bucket=" + bucket,
      ]),  // copy-artifacts,

      dependencies: if deleteKubeflow then
        ["kfctl-delete"] + ["kfctl-delete-storage"]
      else null,
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
                              , exitTemplates) + componentTests.argoTaskTemplates;


// Add a task to a dag.
local workflow = {
  apiVersion: "argoproj.io/v1alpha1",
  kind: "Workflow",
  metadata: {
    name: name,
    namespace: namespace,
    labels: prowDict {
      workflow: params.name,
      workflow_template: workflow_template,
    },
  },
  spec: {
    entrypoint: "e2e",
    // Have argo garbage collect old workflows otherwise we overload the API server.
    ttlSecondsAfterFinished: 7 * 24 * 60 * 60,
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
