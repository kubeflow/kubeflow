# privateAccess enable private access for your Amazon EKS cluster's Kubernetes API server endpoint
# and completely disable public access so that it's not accessible from the internet.
# More info: https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html
PRIVATE_ACCESS=false
ENDPOINT_PUBLIC_ACCESS=true
ENDPOINT_PRIVATE_ACCESS=true

# clusterLogging provides audit and diagnostic logs directly from the EKS control plane
# to CloudWatch Logs in your account. More info: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html
CONTROL_PLANE_LOGGING=false
CONTROL_PLANE_LOGGING_COMPONENTS=api,audit,authenticator,controllerManager,scheduler

# workerNodeGroupLogging provides audit and diagnostic logs from worker node groups to CloudWatch Logs in your account.
WORKER_NODE_GROUP_LOGGING=false