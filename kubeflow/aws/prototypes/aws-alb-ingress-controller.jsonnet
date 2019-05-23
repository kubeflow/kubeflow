// @apiVersion 0.1
// @name io.ksonnet.pkg.aws-alb-ingress-controller
// @description Provides alb-ingress-controller prototypes for creating AWS Application Load Balancer.
// @shortDescription Application Load Balancer Ingress Controller.
// @param name string Name for the component
// @param clusterName string Kubernetes Cluster Name
// @optionalParam albIngressControllerImage string docker.io/amazon/aws-alb-ingress-controller:v1.1.0 ALB Ingress Controller Image.
// @optionalParam awsVpcId string null VPC ID of the cluster in case ec2metadata is not available from the controller pod
// @optionalParam awsRegion string null AWS region of the cluster in case ec2metadata is not available from the controller pod

local albIngressController = import "kubeflow/aws/aws-alb-ingress-controller.libsonnet";
local instance = albIngressController.new(env, params);
instance.list(instance.all)
