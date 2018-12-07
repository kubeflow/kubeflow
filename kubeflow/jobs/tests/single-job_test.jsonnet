local singlejob = import "kubeflow/jobs/single-job.libsonnet";

local params1 = {
  name: "job",
  jobName: "foo",
  jobImage: "golang/1.11.2",
  jobCommand: "go",
  jobArgs: "env",
};
local env = {
  namespace:: "test-kf-001",
};

local params2 = {
  name: "job",
  jobName: "foo",
  jobImage: "golang/1.11.2",
  jobCommand: "null",
  jobArgs: "null",
};

local instance1 = singlejob.new(env, params1);
local instance2 = singlejob.new(env, params2);

std.assertEqual(
  instance1.singleJob,
  {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      name: "foo",
      namespace: "test-kf-001",
    },
    spec: {
      backoffLimit: 2,
      template: {
        spec: {
          containers: [
            {
              command: [
                "go",
              ],
              image: "golang/1.11.2",
              name: "foo",
            },
          ],
          restartPolicy: "Never",
        },
      },
    },
  }
) &&

std.assertEqual(
  instance2.singleJob,
  {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      name: "foo",
      namespace: "test-kf-001",
    },
    spec: {
      backoffLimit: 2,
      template: {
        spec: {
          containers: [
            {
              image: "golang/1.11.2",
              name: "foo",
            },
          ],
          restartPolicy: "Never",
        },
      },
    },
  }
)
