#!/bin/bash
set -e
set -x
set -o pipefail

mkdir kf_test
pushd kf_test

ks init coffee_is_amazing
pushd coffee_is_amazing
#export KUBEFLOW_VERSION=v0.2.0-rc.1
#ks registry add kubeflow github.com/kubeflow/kubeflow/tree/${KUBEFLOW_VERSION}/kubeflow
ks registry add kubeflow ~/repos/kubeflow/kubeflow
ks pkg install kubeflow/common
ks pkg install kubeflow/spark
ks env add gke
ks param set --env gke kubeflow-common \
  cloud "gke"
ks param set --env gke kubeflow-common \
   tfAmbassadorServiceType "LoadBalancer"
# I forgot to generate and that's why it was rough
# ks generate core kubeflow-core --name=kubeflow-core --cloud=gke
ks generate spark-operator spark-operator --name=spark-operator
# Not to self KS doesn't give any error when the component doesn't exist
ks apply gke -c spark-operator --verbose

# Hack to wait 5 seconds for the operator to show up
sleep 5

ks generate spark-job spark-pi --name=spark-operator --applicationResource="local:///opt/spark/examples/jars/spark-examples_2.11-2.3.1.jar" --mainClass=org.apache.spark.examples.SparkPi

ks generate spark-job spark-wc --name=spark-operator --applicationResource="local:///opt/spark/examples/jars/spark-examples_2.11-2.3.1.jar" --mainClass=org.apache.spark.examples.DFSReadWriteTest --jobArguments="/opt/spark/README.md,gs://boo-stuff/temp_out_abc"

ks apply gke -c spark-pi -c spark-wc


#popd
#popd
