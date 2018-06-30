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
    testing_image: "gcr.io/kubeflow-ci/kubeflow-testing",
    tf_testing_image: "gcr.io/kubeflow-ci/tf-test-worker:1.0",
    project: "kubeflow-ci",
    cluster: "kubeflow-testing",
    zone: "us-east1-d",
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
      local cmdDir = srcRootDir + "/kubeflow/katib/cmd"
      local vizierCoreImageDir = cmdDir + "/manager";
      local vizierCoreImage = params.registry + "/vizier-core" + ":" + params.versionTag;

      local SuggestRandomImageDir = cmdDir + "/suggesitoin/random";
      local SuggestRandomImage = params.registry + "/suggestion-random" + ":" + params.versionTag;
      
      local SuggestGridImageDir = cmdDir + "/suggesitoin/grid";
      local SuggestGridImage = params.registry + "/suggestion-grid" + ":" + params.versionTag;
      
      local SuggestHyperbandImageDir = cmdDir + "/suggesitoin/hyperband";
      local SuggestHyperbandImage = params.registry + "/suggestion-hyperband" + ":" + params.versionTag;
      
      local SuggestBOImageDir = cmdDir + "/suggesitoin/bayesianoptimization";
      local SuggestBOImage = params.registry + "/suggestion-bayesianoptimization" + ":" + params.versionTag;
      
      local ESMedianImageDir = cmdDir + "/earlystopping/medianstopping";
      local ESMedianImage = params.registry + "/earlystopping-medianstopping" + ":" + params.versionTag;

      local WebUIImageDir = srcRootDir + "/kubeflow/katib/modeldb";
      local WebUIImage = params.registry + "/katib-frontend" + ":" + params.versionTag;

      // build an argo template to execute a particular command.
      // step_name: name for the template
      // command: list to pass as the container command.
      local buildtemplate(step_name, command, env_vars=[], sidecars=[]) = {
        name: step_name,
        container: {
          command: command,
          image: testing_image,
          env: [
            {
              // add the source directories to the python path.
              name: "pythonpath",
              value: kubeflowpy + ":" + kubeflowtestingpy,
            },
            {
              name: "google_application_credentials",
              value: "/secret/gcp-credentials/key.json",
            },
            {
              name: "github_token",
              valuefrom: {
                secretkeyref: {
                  name: "github-token",
                  key: "github_token",
                },
              },
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
      {
        apiVersion: "argoproj.io/v1alpha1",
        kind: "Workflow",
        metadata: {
          name: name,
          namespace: namespace,
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
                tasks: [
                  {
                    name: "checkout",
                    template: "checkout",
                  },
                  {
                    name: "build-vizir-core",
                    template: "build-vizir-core",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-suggestion-random",
                    template: "build-suggestion-random",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-suggestion-grid",
                    template: "build-suggestion-grid",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-suggestion-hyperband",
                    template: "build-suggestion-hyperband",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-suggestion-bayesianoptimization",
                    template: "build-suggestion-bayesianoptimization",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-earlystopping-medianstopping",
                    template: "build-earlystopping-medianstopping",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-katib-frontend",
                    template: "build-katib-frontend",
                    dependencies: ["checkout"],
                  },
                ],  // tasks
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
                  value: "kubeflow/testing@HEAD",
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

            buildImageTemplate("build-vizier-core", vizierCoreImageDir, "Dockerfile", vizierCoreImage),
            buildImageTemplate("build-suggestion-random", SuggestRandomImageDir, "Dockerfile", SuggestRandomImage),
            buildImageTemplate("build-suggestion-grid", SuggestGridImageDir, "Dockerfile", SuggestGridImage),
            buildImageTemplate("build-suggestion-hyperband", SuggestHyperbandImageDir, "Dockerfile", SuggestHyperbandImage),
            buildImageTemplate("build-suggestion-bayesianoptimization", SuggestBOImageDir, "Dockerfile", SuggestBOImage),
            buildImageTemplate("build-earlystopping-medianstopping", ESMedianImageDir, "Dockerfile", ESMedianImage),
            buildImageTemplate("build-katib-frontend", WebUIIImageDir, "Dockerfile", WebUIIImage),
          ],  // templates
        },
      },  // e2e
  },  // parts
}
