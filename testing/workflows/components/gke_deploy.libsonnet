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
        pieces
      )
    else [],

  listToDict:: function(v)
    {
      local name = v[0],
      // v[0]: v[1],
      [v[0]]: v[1],
    },

  // parseEnvToMap takes a string "key1=value1,key2=value2,..."
  // and turns it into an object with keys key1, key2, ... and values value1,...,value2
  parseEnvToMap:: function(v)
    local pieces = std.split(v, ",");
    if v != "" && std.length(pieces) > 0 then
      std.foldl(
        function(a, b) a + $.listToDict(std.split(b, "=")),
        pieces,
        {}
      )
    else {},


  parts(params):: {
    local namespace = params.namespace,
    local name = params.name,

    // We append a letter because it must start with a lowercase letter.
    // We use a suffix because the suffix contains the random salt.
    // Resource names in deployment manager need to be 61 characters at most.
    // The deployment name is used as a prefix for various resources so we truncate it
    // to 20 characters to make room for the other parts added by the schema.
    local deployName = if std.length(name) > 20 then
      "z" + std.substr(name, std.length(name) - 20, 20)
    else
      name,

    local prowEnv = $.parseEnvToMap(params.prow_env),

    // Workflow to run the e2e test.
    e2e(prow_env, bucket, platform="minikube"):
      // The name for the workflow to run the steps in
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
      local srcDir = srcRootDir + "/" + prowEnv.REPO_OWNER + "/kubeflow";

      // The directory containing the deployment manager configs.
      local configDir = srcDir + "/docs/gke/configs";
      local image = "gcr.io/kubeflow-ci/test-worker:latest";

      // The name of the NFS volume claim to use for test files.
      local nfsVolumeClaim = "nfs-external";
      // The name to use for the volume to use to contain test data.
      local dataVolume = "kubeflow-test-volume";
      local kubeflowPy = srcDir;
      // The directory within the kubeflow_testing submodule containing
      // py scripts to use.
      local kubeflowTestingPy = srcRootDir + "/kubeflow/testing/py";

      local project = "kubeflow-ci";
      local zone = "us-east1-d";

      // Build an Argo template to execute a particular command.
      // step_name: Name for the template
      // command: List to pass as the container command.
      local buildTemplate(step_name, command, env_vars=[], sidecars=[]) = {
        name: step_name,
        container: {
          command: command,
          image: image,
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
                    name: "create-pr-symlink",
                    template: "create-pr-symlink",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "create-deployment",
                    template: "create-deployment",
                    dependencies: [
                      "checkout",
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
                    template: "delete-deployment",
                  },
                  {
                    name: "copy-artifacts",
                    template: "copy-artifacts",
                    dependencies: ["teardown"],
                  },
                ],
              },  // dag
            },  // exit-handler
            // TODO(jlewi): We need to modify cluster-kubeflow.yaml to set things like the project
            // and cluster name.
            buildTemplate(
              "checkout",
              ["/usr/local/bin/checkout.sh", srcRootDir],
              [{
                name: "EXTRA_REPOS",
                value: "kubeflow/tf-operator@v0.1.0;kubeflow/testing@HEAD",
              }],
              [],  // no sidecars
            ),
            buildTemplate("create-deployment", [
              "python",
              "-m",
              "testing.deploy_kubeflow_gcp",
              "--project=" + project,
              "--name=" + deployName,
              "--config=" + configDir + "/cluster-kubeflow.yaml",
              "--imports=" + configDir + "/cluster.jinja",
            ]),  // create-deployment
            // Setup and teardown using GKE.
            buildTemplate("delete-deployment", [
              "python",
              "-m",
              "testing.teardown_kubeflow_gcp",
              "--project=" + project,
              "--name=" + deployName,
            ]),  // delete-deployment
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
          ],  // templates
        },
      },  // e2e
  },  // parts
}
