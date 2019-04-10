{
  util:: import "util.libsonnet",

  // Default parameters.
  defaultParams:: {
    bucket: "kubeflow-ci_temp",
    commit: "master",
    // Name of the secret containing GCP credentials.
    gcpCredentialsSecretName: "gcp-credentials",
    name: "new9",
    namespace: "kubeflow-releasing",
    // The name of the NFS volume claim to use for test files.
    nfsVolumeClaim: "nfs-external",
    prowEnv: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
    registry: "gcr.io/kubeflow-images-public",
    versionTag: "latest",
    // The default image to use for the steps in the Argo workflow.
    testingImage: "gcr.io/kubeflow-ci/test-worker/test-worker:v20190116-b7abb8d-e3b0c4",
    project: "kubeflow-ci",
    cluster: "kubeflow-testing",
    zone: "us-east1-d",
  },

  parts(namespace, name, overrides={}):: {
    // Workflow to run the e2e test.
    e2e::
      local params = $.defaultParams + overrides;

      local namespace = params.namespace;
      local testingImage = params.testingImage;
      local project = params.project;
      local cluster = params.cluster;
      local zone = params.zone;
      local name = params.name;
      local versionTag = params.versionTag;

      local prowEnv = $.util.parseEnv(params.prowEnv);
      local bucket = params.bucket;

      // mountPath is the directory where the volume to store the test data
      // should be mounted.
      local mountPath = "/mnt/test-data-volume";
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
      // The directory within the kubeflow repos containing
      // py scripts to use.
      local kubeflowPy = srcDir;
      local kubeflowTestingPy = srcRootDir + "/kubeflow/testing/py";
      local pythonPath = kubeflowPy + ":" + kubeflowTestingPy;

      // Location of build_image.py
      local buildScript = srcRootDir + "/kubeflow/kubeflow/components/build_image.py";

      local buildTFServingImageTemplate(name, tf_version, platform, tag) =
        $.util.buildImageTemplate(
          name,
          [
            "python",
            buildScript,
            "--tf_version=" + tf_version,
            "--platform=" + platform,
            "--tag=" + tag,
            "--push_gcr",
            "--registry=" + params.registry,
            "tf_serving",
          ],
          testingImage,
          pythonPath,
          prowEnv
        );

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
                    name: "build-tf-serving-1-4cpu",
                    template: "build-tf-serving-1-4cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-tf-serving-1-5cpu",
                    template: "build-tf-serving-1-5cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-tf-serving-1-6cpu",
                    template: "build-tf-serving-1-6cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-tf-serving-1-6gpu",
                    template: "build-tf-serving-1-6gpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-tf-serving-1-7cpu",
                    template: "build-tf-serving-1-7cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-tf-serving-1-7gpu",
                    template: "build-tf-serving-1-7gpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "create-pr-symlink",
                    template: "create-pr-symlink",
                    dependencies: ["checkout"],
                  },
                ],  // tasks
              },  //dag
            },  // e2e
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
                env: prowEnv + [{
                  name: "EXTRA_REPOS",
                  value: "kubeflow/testing@HEAD",
                }],
                image: testingImage,
                volumeMounts: [
                  {
                    name: dataVolume,
                    mountPath: mountPath,
                  },
                ],
              },
            },  // checkout

            buildTFServingImageTemplate("build-tf-serving-1-4cpu", "1.4", "cpu", versionTag),
            buildTFServingImageTemplate("build-tf-serving-1-5cpu", "1.5", "cpu", versionTag),
            buildTFServingImageTemplate("build-tf-serving-1-6cpu", "1.6", "cpu", versionTag),
            buildTFServingImageTemplate("build-tf-serving-1-6gpu", "1.6", "gpu", versionTag),
            buildTFServingImageTemplate("build-tf-serving-1-7cpu", "1.7", "cpu", versionTag),
            buildTFServingImageTemplate("build-tf-serving-1-7gpu", "1.7", "gpu", versionTag),

            $.util.buildTemplate("create-pr-symlink", [
              "python",
              "-m",
              "kubeflow.testing.prow_artifacts",
              "--artifacts_dir=" + outputDir,
              "create_pr_symlink",
              "--bucket=" + bucket,
            ], testingImage, pythonPath, prowEnv),  // create-pr-symlink
            $.util.buildTemplate(
              "copy-artifacts",
              [
                "python",
                "-m",
                "kubeflow.testing.prow_artifacts",
                "--artifacts_dir=" + outputDir,
                "copy_artifacts",
                "--bucket=" + bucket,
              ],
              testingImage,
              pythonPath,
              prowEnv
            ),  // copy-artifacts
          ],  // templates
        },
      },  // e2e
  },  // parts
}
