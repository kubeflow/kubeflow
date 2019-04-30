{
  util:: import "util.libsonnet",

  // Default parameters.
  // The defaults are suitable based on suitable values for our test cluster.
  defaultParams:: {
    bucket: "kubeflow-ci_temp",
    commit: "master",
    // Name of the secret containing GCP credentials.
    gcpCredentialsSecretName: "gcp-credentials",
    name: "kubeflow-postsubmit",
    namespace: "kubeflow-releasing",
    // The name of the NFS volume claim to use for test files.
    nfsVolumeClaim: "nfs-external",
    prowEnv: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
    // The default image to use for the steps in the Argo workflow.
    stepImage: "gcr.io/kubeflow-ci/test-worker/test-worker:v20190116-b7abb8d-e3b0c4",

    // The registry to use (should not include the image name or version tag)
    registry: "gcr.io/kubeflow-images-public",

    // The tag to use for the image.
    versionTag: "latest",
  },

  parts(namespace, name, overrides={}):: {
    // Workflow to run the e2e test.
    e2e::
      local params = $.defaultParams + overrides;

      local namespace = params.namespace;
      local name = params.name;

      local prowEnv = $.util.parseEnv(params.prowEnv);
      local bucket = params.bucket;

      local stepsNamespace = name;
      local stepImage = params.stepImage;
      local versionTag = params.versionTag;

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
      local pythonPath = kubeflowPy + ":" + kubeflowTestingPy;

      // Location of build_image.py
      local buildScript = srcRootDir + "/kubeflow/kubeflow/components/build_image.py";

      // Location where Dockerfiles and other sources are found.
      local notebookDir = srcRootDir + "/kubeflow/kubeflow/components/tensorflow-notebook-image/";

      local buildTFNotebookImageTemplate(name, tf_version, platform, tag) =
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
            "tf_notebook",
          ],
          stepImage,
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
                tasks: [
                  {
                    name: "checkout",
                    template: "checkout",
                  },
                  {
                    name: "build-1-4-1-gpu",
                    template: "build-1-4-1-gpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-4-1-cpu",
                    template: "build-1-4-1-cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-5-1-gpu",
                    template: "build-1-5-1-gpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-5-1-cpu",
                    template: "build-1-5-1-cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-6-0-gpu",
                    template: "build-1-6-0-gpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-6-0-cpu",
                    template: "build-1-6-0-cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-7-0-gpu",
                    template: "build-1-7-0-gpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-7-0-cpu",
                    template: "build-1-7-0-cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-8-0-gpu",
                    template: "build-1-8-0-gpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "build-1-8-0-cpu",
                    template: "build-1-8-0-cpu",
                    dependencies: ["checkout"],
                  },
                  {
                    name: "create-pr-symlink",
                    template: "create-pr-symlink",
                    dependencies: ["checkout"],
                  },
                ],
              },  //dag
            },
            buildTFNotebookImageTemplate("build-1-4-1-cpu", "1.4.1", "cpu", versionTag),
            buildTFNotebookImageTemplate("build-1-4-1-gpu", "1.4.1", "gpu", versionTag),
            buildTFNotebookImageTemplate("build-1-5-1-cpu", "1.5.1", "cpu", versionTag),
            buildTFNotebookImageTemplate("build-1-5-1-gpu", "1.5.1", "gpu", versionTag),
            buildTFNotebookImageTemplate("build-1-6-0-cpu", "1.6.0", "cpu", versionTag),
            buildTFNotebookImageTemplate("build-1-6-0-gpu", "1.6.0", "gpu", versionTag),
            buildTFNotebookImageTemplate("build-1-7-0-cpu", "1.7.0", "cpu", versionTag),
            buildTFNotebookImageTemplate("build-1-7-0-gpu", "1.7.0", "gpu", versionTag),
            buildTFNotebookImageTemplate("build-1-8-0-cpu", "1.8.0", "cpu", versionTag),
            buildTFNotebookImageTemplate("build-1-8-0-gpu", "1.8.0", "gpu", versionTag),
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
                image: params.stepImage,
                volumeMounts: [
                  {
                    name: dataVolume,
                    mountPath: mountPath,
                  },
                ],
              },
            },  // checkout
            $.util.buildTemplate("create-pr-symlink", [
              "python",
              "-m",
              "kubeflow.testing.prow_artifacts",
              "--artifacts_dir=" + outputDir,
              "create_pr_symlink",
              "--bucket=" + bucket,
            ], stepImage, pythonPath, prowEnv),  // create-pr-symlink
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
              stepImage,
              pythonPath,
              prowEnv
            ),  // copy-artifacts
          ],  // templates
        },
      },  // e2e
  },  // parts
}
