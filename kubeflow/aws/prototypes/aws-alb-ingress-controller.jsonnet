// @apiVersion 0.1
// @name io.ksonnet.pkg.aws-alb-ingress-controller
// @description Provides alb-ingress-controller prototypes for creating AWS Application Load Balancer.
// @shortDescription Application Load Balancer Ingress Controller.
// @param name string Name for the component
// @param clusterName string Kubernetes Cluster Name
// @optionalParam namespace string kube-system Namespace for the component
// @optionalParam albIngressControllerImage string docker.io/amazon/aws-alb-ingress-controller:v1.1.0 ALB Ingress Controller Image.

local albIngressController = import "kubeflow/aws/aws-alb-ingress-controller.libsonnet";
local instance = albIngressController.new(env, params);
instance.list(instance.all)
