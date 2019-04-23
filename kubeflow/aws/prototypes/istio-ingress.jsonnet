// @apiVersion 0.1
// @name io.ksonnet.pkg.istio-ingress
// @description Provides ingress prototypes for setting up ALB on AWS.
// @shortDescription Ingress for ALB on AWS and Istio Gateway and VirtualServices
// @param name string Name for the component
// @optionalParam namespace string kubeflow The namespace where Kubeflow is installed
// @optionalParam istioNamespace string istio-system The namespace where Istio is installed
// @optionalParam hostname string null The hostname associated with this ingress. Eg: mykubeflow.example.com
// @optionalParam issuer string letsencrypt-prod The cert-manager issuer name.
// @optionalParam enableCognito string false Enabel enableCognito authentication.
// @optionalParam enableJwtChecking string false Enable JWT checking.
// @optionalParam certArn string acm-cert AWS Certificate Manager certicate arn.
// @optionalParam CognitoAppClientId string null Cognito App client Id
// @optionalParam CognitoUserPoolId string null Cognito User Pool Id
// @optionalParam CognitoUserPoolArn string null Cognito User Pool Arn
// @optionalParam CognitoUserPoolDomain string null Cognito User Pool Domain

local istioIngress = import "kubeflow/aws/istio-ingress.libsonnet";
local instance = istioIngress.new(env, params);
instance.list(instance.all)
