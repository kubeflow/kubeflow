// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflow-openmpi
// @description Prototypes for running openmpi jobs.
// @shortDescription Prototypes for running openmpi jobs.
// @param name string Name to give to each of the components.
// @param image string Docker image with openmpi.
// @param secret string Name of secret containing ssh keys.
// @optionalParam workers number 4 Number of workers.
// @optionalParam init string null Command to bootstrap the containers. Defaults to init.sh.
// @optionalParam exec string null Command to execute in master after bootstrap is done. It sleeps indefinitely if not set.
// @optionalParam imagePullPolicy string IfNotPresent Image pull policy (either IfNotPresent or Always).
// @optionalParam imagePullSecrets string null Comma-delimited list of secret names to use credentials in pulling your docker images.
// @optionalParam gpu number 0 Number of GPUs per worker.
// @optionalParam cpu string null CPU limits per worker.
// @optionalParam memory string null Memory limits per worker.
// @optionalParam customResources string null Comma-delimited list of "resourceName=amount" pairs which you want to limit per worker.
// @optionalParam serviceAccountName string null the service account name to run pods. The service account should have clusterRoleBinding for "view" ClusterRole.  If it was not set, service account and its role binding will be created automatically.
// @optionalParam schedulerName string default-scheduler scheduler name to use for the components.
// @optionalParam controllerImage string jiez/openmpi-controller:0.0.3 Docker image of the openmpi-controller.
// @optionalParam initTimeout number 300 Timeout in seconds to abort the initialization.
// @optionalParam nodeSelector string null Comma-delimited list of "key=value" pairs to select the worker nodes. e.g. "cloud.google.com/gke-accelerator=nvidia-tesla-k80"
// @optionalParam s3Secret string null Name of secret containing s3 credentials (AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY).
// @optionalParam downloadDataFrom string null URI where data are downloaded from. Only S3 bucket is supported at the moment.
// @optionalParam downloadDataTo string null Local path where data are downloaded to.
// @optionalParam uploadDataFrom string null Local path where data are uploaded from.
// @optionalParam uploadDataTo string null URI where data are uploaded to. Namespace, name, and pod will be appended to the URI. Only S3 bucket is supported at the moment.
// @optionalParam runAsUser string null uid of the first process of containers in master/worker pods. If not set, this will be default value of your cluster configuration.
// @optionalParam runAsGroup string null Primary gid of the first process of containers in master/worker pods. If not set, this will be default value of your cluster configuration.
// @optionalParam supplementalGroups string null Comma-delimited list of supplemental group ids to put the user of the first process of containers in master/worker pods.
// @optionalParam volumes array [] 'volumes' to put master/workers pods.
// @optionalParam volumeMounts array [] 'volumes' to put job containers in master/workers pods.

local k = import "k.libsonnet";
local openmpi = import "kubeflow/openmpi/all.libsonnet";

std.prune(k.core.v1.list.new(openmpi.all(params, env)))
