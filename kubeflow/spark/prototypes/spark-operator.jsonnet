// @apiVersion 0.1
// @name io.ksonnet.pkg.spark-operator
// @param name string Name for the component
// @optionalParam image string gcr.io/spark-operator/spark-operator:v2.3.1-v1alpha1-latest Image to use for spark operator
// @optionalParam sparkVersion string 2.3.1 Version of Spark


local k = import "k.libsonnet";
local spark = import "kubeflow/spark/all.libsonnet";

std.prune(
  k.core.v1.list.new(spark.all(params, params.name, env))
)
