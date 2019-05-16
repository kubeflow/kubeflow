// @apiVersion 0.1
// @name io.ksonnet.pkg.istio-ingress
// @description Provides ingress prototypes for setting up ALB on AWS.
// @shortDescription Ingress for ALB on AWS and Istio Gateway and VirtualServices
// @param name string Name for the component
// @optionalParam namespace string kubeflow The namespace where Kubeflow is installed
// @optionalParam istioNamespace string istio-system The namespace where Istio is installed
// @optionalParam hostname string null The hostname associated with this ingress. Eg: mykubeflow.example.com
// @optionalParam issuer string letsencrypt-prod The cert-manager issuer name.
// @optionalParam enableCognito string false Enable Cognito authentication.
// @optionalParam CognitoAppClientId string null Cognito App client Id
// @optionalParam CognitoUserPoolId string null Cognito User Pool Id
// @optionalParam CognitoUserPoolArn string null Cognito User Pool Arn
// @optionalParam CognitoUserPoolDomain string null Cognito User Pool Domain
// @optionalParam enableJwtChecking string false Enable JWT checking.
// @optionalParam certArn string null AWS Certificate Manager certicate arn, if not given TLS will not be used.
// @optionalParam enableOidc string false Enable OIDC authentication.
// @optionalParam OidcIssuer string null OIDC Issuer
// @optionalParam OidcAuthorizationEndpoint string null OIDC Authorization Endpoint
// @optionalParam OidcTokenEndpoint string null OIDC Token endpoint
// @optionalParam OidcUserInfoEndpoint string null OIDC User Info endpoint
// @optionalParam OidcClientId string null OIDC Client id
// @optionalParam OidcClientSecret string null OIDC Client secret

local istioIngress = import "kubeflow/aws/istio-ingress.libsonnet";
local instance = istioIngress.new(env, params);
instance.list(instance.all)
