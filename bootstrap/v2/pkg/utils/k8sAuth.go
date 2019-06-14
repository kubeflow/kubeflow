package utils

import (
	"encoding/base64"

	"cloud.google.com/go/container/apiv1"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/option"
	containerpb "google.golang.org/genproto/googleapis/container/v1"
	"k8s.io/api/rbac/v1"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

func BuildClusterConfig(ctx context.Context, token string, project string, zone string,
	clusterID string) (*rest.Config, error) {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: token,
	})
	c, err := container.NewClusterManagerClient(ctx, option.WithTokenSource(ts))
	if err != nil {
		return nil, err
	}
	req := &containerpb.GetClusterRequest{
		ProjectId: project,
		Zone:      zone,
		ClusterId: clusterID,
	}
	resp, err := c.GetCluster(ctx, req)
	if err != nil {
		return nil, err
	}
	caDec, _ := base64.StdEncoding.DecodeString(resp.MasterAuth.ClusterCaCertificate)
	return &rest.Config{
		Host:        "https://" + resp.Endpoint,
		BearerToken: token,
		TLSClientConfig: rest.TLSClientConfig{
			CAData: []byte(string(caDec)),
		},
	}, nil
}

// BuildClientCmdAPI takeks k8s config and access token, build and return clientcmdapi.Config entry
func BuildClientCmdAPI(config *rest.Config, token string) *clientcmdapi.Config {
	return &clientcmdapi.Config{
		Kind:       "Config",
		APIVersion: "v1",
		Clusters: map[string]*clientcmdapi.Cluster{
			"activeCluster": {
				CertificateAuthorityData: config.TLSClientConfig.CAData,
				Server:                   config.Host,
			},
		},
		Contexts: map[string]*clientcmdapi.Context{
			"activeCluster": {
				Cluster:  "activeCluster",
				AuthInfo: "activeCluster",
			},
		},
		CurrentContext: "activeCluster",
		AuthInfos: map[string]*clientcmdapi.AuthInfo{
			"activeCluster": {
				Token: token,
			},
		},
	}
}

func CreateK8sRoleBing(config *rest.Config, roleBinding *v1.ClusterRoleBinding) error {
	kubeClient, err := clientset.NewForConfig(config)
	if err != nil {
		return err
	}
	_, err = kubeClient.RbacV1().ClusterRoleBindings().Create(roleBinding)
	if err != nil {
		return err
	}
	return nil
}
