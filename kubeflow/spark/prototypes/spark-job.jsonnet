// @apiVersion 0.1
// @name io.ksonnet.pkg.spark-job
// @param name string Name for the component
// @param applicationResource string jar or pyfile reference for spark-submit
// @optionalParam jobName string defaultjob Name for the job
// @optionalParam mainClass string null JVM Class name of driver entry point
// @optionalParam type string Scala Type of applicaiton (e.g. Scala, Python)
// @optionalParam driverCores number 2 number of cores for driver
// @optionalParam driverMemory string 2g Memory for the driver
// @optionalParam executorMemory string 2g Memory per executor
// @optionalParam executorCores number 1 Cores per executor
// @optionalParam numExecutors number 3 Number of executors
// @optionalParam sparkVersion string 2.3.1 Version of Spark
// @optionalParam image string gcr.io/spark-operator/spark:v2.3.1 Image to use
// @optionalParam jobArguments string null Comma-delimited arguments to pass to your Spark job on the driver.

local k = import "k.libsonnet";
local spark = import "kubeflow/spark/all.libsonnet";

std.prune(
  k.core.v1.list.new(spark.sparkJob(params, params.name, env))
)
