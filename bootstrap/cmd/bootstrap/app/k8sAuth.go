package app

import (
	"golang.org/x/net/context"
	"cloud.google.com/go/container/apiv1"
	"google.golang.org/api/option"
	"golang.org/x/oauth2"
	containerpb "google.golang.org/genproto/googleapis/container/v1"
	"k8s.io/client-go/rest"
	"encoding/base64"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/api/rbac/v1"
	)

func buildClusterConfig(ctx context.Context, token string, project string, zone string,
	clusterId string) (*rest.Config, error) {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: token,
	})
	c, err := container.NewClusterManagerClient(ctx, option.WithTokenSource(ts))
	if err != nil {
		return nil, err
	}
	req := &containerpb.GetClusterRequest{
		ProjectId: project,
		Zone: zone,
		ClusterId: clusterId,
	}
	resp, err := c.GetCluster(ctx, req)
	if err != nil {
		return nil, err
	}
	caDec, _ := base64.StdEncoding.DecodeString(resp.MasterAuth.ClusterCaCertificate)
	return &rest.Config{
		Host: "https://" + resp.Endpoint,
		BearerToken: token,
		TLSClientConfig: rest.TLSClientConfig {
			CAData: []byte(string(caDec)),
		},
	}, nil
}

func createK8sRoleBing(config *rest.Config, roleBinding *v1.ClusterRoleBinding) error {
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
