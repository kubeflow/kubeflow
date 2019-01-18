// @apiVersion 0.1
// @name io.ksonnet.pkg.katib-studyjob-test-v1alpha1
// @description katib-studyjob-test
// @shortDescription A Katib StudyJob using random suggestion
// @param name string Name for the job.

local k = import "k.libsonnet";

local name = params.name;
local namespace = env.namespace;

local studyjob = {
  apiVersion: "kubeflow.org/v1alpha1",
  kind: "StudyJob",
  metadata: {
    name: name,
    namespace: namespace,
  },
  spec: {
    studyName: name,
    owner: "crd",
    optimizationtype: "maximize",
    objectivevaluename: "Validation-accuracy",
    optimizationgoal: 0.99,
    requestcount: 1,
    metricsnames: ["accuracy"],
    parameterconfigs: [
      {
        name: "--lr",
        parametertype: "double",
        feasible: {
          min: "0.01",
          max: "0.03",
        },
      },
      {
        name: "--num-layers",
        parametertype: "int",
        feasible: {
          min: "2",
          max: "5",
        },
      },
      {
        name: "--optimizer",
        parametertype: "categorical",
        feasible: {
          list: ["sgd", "adam", "ftrl"],
        },
      },
    ],
    workerSpec: {
      goTemplate: {
        rawTemplate: |||
          apiVersion: batch/v1
          kind: Job
          metadata:
            name: {{.WorkerID}}
            namespace: {{.NameSpace}}
          spec:
            template:
              spec:
                containers:
                - name: {{.WorkerID}}
                  image: katib/mxnet-mnist-example
                  command:
                  - "python"
                  - "/mxnet/example/image-classification/train_mnist.py"
                  - "--batch-size=64"
                  {{- with .HyperParameters}}
                  {{- range .}}
                  - "{{.Name}}={{.Value}}"
                  {{- end}}
                  {{- end}}
                restartPolicy: Never
        |||,
      },
    },
    suggestionSpec: {
      suggestionAlgorithm: "random",
      requestNumber: 1,
    },
  },
};

k.core.v1.list.new([
  studyjob,
])
