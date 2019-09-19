// E2E test for the new go based version of kfctl.
local params = std.extVar("__ksonnet/params").components.kfctl_go_test;

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
local kfCtlPath = srcDir + "/bootstrap/bin/kfctl";
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
  activeDeadlineSeconds: 3000,  // Set 50 minute timeout for each template
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
        name: "GOPATH",
        value: testDir,
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
    resources: {
      requests: {
        memory: "1.5Gi",
        cpu: "1",
      },
      limits: {
        memory: "4Gi",
        cpu: "4",
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

// We need to make the XML files and test suite names unique based on the parameters.
local nameSuffix1 = if util.toBool(params.useBasicAuth) then
  "basic-auth"
  else
  "iap";
local nameSuffix = if util.toBool(params.useIstio) then
  nameSuffix1 + "-istio"
  else
  nameSuffix1;

// Create a list of dictionary.c
// Each item is a dictionary describing one step in the graph.
local dagTemplates = [
  {
    template: buildTemplate("checkout",
                            ["/usr/local/bin/checkout.sh", srcRootDir],
                            env_vars=[{
                              name: "EXTRA_REPOS",
                              // TODO(jlewi): Stop pinning to 341 once its submitted.
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
      "kfctl-build-deploy",
      [        
        "pytest",
        "kfctl_go_test.py",
        // I think -s mean stdout/stderr will print out to aid in debugging.
        // Failures still appear to be captured and stored in the junit file.
        "-s",
        "--use_basic_auth=" + params.useBasicAuth,
        "--use_istio=" + params.useIstio,
        "--config_path=" + params.configPath,
        // Increase the log level so that info level log statements show up.
        "--log-cli-level=info",        
        "--junitxml=" + artifactsDir + "/junit_kfctl-build-test" + nameSuffix + ".xml",
        // Test suite name needs to be unique based on parameters
        "-o", "junit_suite_name=test_kfctl_go_deploy_" + nameSuffix, 
        "--app_path=" + appDir,
      ],
      working_dir=srcDir+ "/testing/kfctl",
    ),
    dependencies: ["checkout"],
  },
  // Verify Kubeflow is deployed successfully.
  {
    template: buildTemplate(
      "kfctl-is-ready",
      [        
        "pytest",
        "kf_is_ready_test.py",
        // I think -s mean stdout/stderr will print out to aid in debugging.
        // Failures still appear to be captured and stored in the junit file.
        "-s",
        "--use_basic_auth=" + params.useBasicAuth,
        "--use_istio=" + params.useIstio,
        // Increase the log level so that info level log statements show up.
        "--log-cli-level=info",
        "--junitxml=" + artifactsDir + "/junit_kfctl-is-ready-test-" + nameSuffix + ".xml",
        // Test suite name needs to be unique based on parameters
        "-o", "junit_suite_name=test_kf_is_ready_" + nameSuffix,         
        "--app_path=" + appDir,
      ],
      working_dir=srcDir+ "/testing/kfctl",
    ),
    dependencies: ["kfctl-build-deploy"],
  },
 // Run the nested tests.
  {
    template: componentTests.argoDagTemplate,
    dependencies: ["kfctl-is-ready"],
  },
] + (
  if util.toBool(params.testEndpoint) then [
    {
      template: buildTemplate(
        "endpoint-is-ready",
        [
          "pytest",
          "endpoint_ready_test.py",
          // I think -s mean stdout/stderr will print out to aid in debugging.
          // Failures still appear to be captured and stored in the junit file.
          "-s",
          // Increase the log level so that info level log statements show up.
          "--log-cli-level=info",
          "--junitxml=" + artifactsDir + "/junit_endpoint-is-ready-test-" + nameSuffix + ".xml",
          // Test suite name needs to be unique based on parameters
          "-o", "junit_suite_name=test_endpoint_is_ready_" + nameSuffix,         
          "--app_path=" + appDir,
          "--app_name=" + appName,
        ],
        working_dir=srcDir+ "/testing/kfctl",
      ),
      dependencies: ["kfctl-is-ready"],
    },
  ] else []
);

// Each item is a dictionary describing one step in the graph
// to execute on exit
local deleteKubeflow = util.toBool(params.deleteKubeflow);

local deleteStep = if deleteKubeflow then
  [{
    template: buildTemplate(
      "kfctl-delete",
      [
        "pytest",
        "kfctl_delete_test.py",
        // I think -s mean stdout/stderr will print out to aid in debugging.
        // Failures still appear to be captured and stored in the junit file.
        "-s",
        // Increase the log level so that info level log statements show up.
        "--log-cli-level=info",
        // Test timeout in seconds.
        "--timeout=1000",
        "--junitxml=" + artifactsDir + "/junit_kfctl-go-delete-test.xml",
        "--app_path=" + appDir,
        "--kfctl_path=" + kfCtlPath,
      ],
      working_dir=srcDir+ "/testing/kfctl",
    ),
    dependencies: null,
  }]
else [];

local testDirDeleteStep = {
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
    };

local exitTemplates =
  deleteStep +
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

      // TODO(jlewi): Uncomment when we actually set up Kubeflow.
      dependencies: if deleteKubeflow then
         ["kfctl-delete"]
      else null,
    },
    testDirDeleteStep,
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
//
local stepTemplates = std.map(function(i) i.template
                              , dagTemplates)  +
                      std.map(function(i) i.template
                              , exitTemplates) +componentTests.argoTaskTemplates;


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
