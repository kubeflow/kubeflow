// @apiVersion 0.1
// @name io.ksonnet.pkg.spark-job
// @param name string Name for the component
// @param applicationResource string jar or pyfile reference for spark-submit
// @optionalParam jobname string defaultJob Name for the component
// @optionalParam mainClass string "" JVM Class name of driver entry point
// @optionalParam type string Scala Type of applicaiton (e.g. Scala, Python)
// @optionalParam driverCores number 2 number of cores for driver
// @optionalParam driverMemory string 2gb Memory for the driver
// @optionalParam executorMemory string 2gb Memory per executor
// @optionalParam numExecutors number 3 Number of executors
// @optionalParam sparkversion string 2.3.1 Version of Spark
// @optionalParam image string gcr.io/spark-operator/spark:v2.3.1 Image to use

local k = import "k.libsonnet";
local namespace = if std.objectHas(params, "namespace") then params.namespace else env.namespace,

local sparkJob = {
  "apiVersion": "sparkoperator.k8s.io/v1alpha1",
  "kind": "SparkApplication",
  "metadata": {
    "name": jobname + "-" + name,
    "namespace": namespace
  },
  "spec": {
    "type": params.type,
    "mode": "cluster",
    "image": params.Image,
    "imagePullPolicy": "Always",
    "mainClass": params.mainClass,
    "mainApplicationFile": params.applicationResource,
    "volumes": [
      {
        "name": "test-volume",
        "hostPath": {
          "path": "/tmp",
          "type": "Directory"
        }
      }
    ],
    "driver": {
      "cores": params.driverCores,
      "coreLimit": "200m",
      "memory": params.driverMemory,
      "labels": {
        "version": params.sparkVersion
      },
      "serviceAccount": name + "-spark",
      "volumeMounts": [
        {
          "name": "test-volume",
          "mountPath": "/tmp"
        }
      ]
    },
    "executor": {
      "cores": 1,
      "instances": 1,
      "memory": "512m",
      "labels": {
        "version": "2.3.1"
      },
      "volumeMounts": [
        {
          "name": "test-volume",
          "mountPath": "/tmp"
        }
      ]
    },
    "restartPolicy": "Never"
  }
}

std.prune(k.core.v1.list.new([
  operator.job(params, params.name, env),
]))

