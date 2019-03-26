/*
Copyright The Kubeflow Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package utils

import (
	"cloud.google.com/go/container/apiv1"
	"encoding/base64"
	"fmt"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iam/v1"
	"google.golang.org/api/option"
	containerpb "google.golang.org/genproto/googleapis/container/v1"
	"k8s.io/client-go/rest"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"os/exec"
)

// Use default token source and retrieve cluster information with given project/location/cluster
// information.
func GetClusterInfo(ctx context.Context, project string, loc string, cluster string) (*containerpb.Cluster, error) {
	ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
	if err != nil {
		return nil, fmt.Errorf("Get token error: %v", err)
	}
	c, err := container.NewClusterManagerClient(ctx, option.WithTokenSource(ts))
	if err != nil {
		return nil, err
	}
	getClusterReq := &containerpb.GetClusterRequest{
		ProjectId: project,
		Zone:      loc,
		ClusterId: cluster,
	}
	return c.GetCluster(ctx, getClusterReq)
}

// BuildConfigFromClusterInfo returns k8s config using gcloud Application Default Credentials
// typically $HOME/.config/gcloud/application_default_credentials.json
func BuildConfigFromClusterInfo(ctx context.Context, cluster *containerpb.Cluster) (*rest.Config, error) {
	ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
	if err != nil {
		return nil, fmt.Errorf("Get token error: %v", err)
	}
	t, err := ts.Token()
	if err != nil {
		return nil, fmt.Errorf("Token retrieval error: %v", err)
	}
	caDec, _ := base64.StdEncoding.DecodeString(cluster.MasterAuth.ClusterCaCertificate)
	config := &rest.Config{
		Host:        "https://" + cluster.Endpoint,
		BearerToken: t.AccessToken,
		TLSClientConfig: rest.TLSClientConfig{
			CAData: []byte(string(caDec)),
		},
	}
	return config, nil
}

// Helper function for the rest.Config retrieval.
func BuildConfigForGcp(ctx context.Context, project string, loc string, cluster string) (*rest.Config, error) {
	log.Infof("Getting rest.Config with GCP for %v/%v/%v", project, loc, cluster)
	clusterpb, err := GetClusterInfo(ctx, project, loc, cluster)
	if err != nil {
		return nil, err
	}
	return BuildConfigFromClusterInfo(ctx, clusterpb)
}

// Create a config that serves as kubeconfig.
func CreateKubeconfig(ctx context.Context, project string, loc string, cluster string,
	namespace string) (*clientcmdapi.Config, error) {
	clusterInfo, err := GetClusterInfo(ctx, project, loc, cluster)
	if err != nil {
		return nil, err
	}

	config := clientcmdapi.NewConfig()
	config.Kind = "Config"
	ts, err := google.DefaultTokenSource(ctx, iam.CloudPlatformScope)
	if err != nil {
		return nil, fmt.Errorf("Get token error: %v", err)
	}
	t, err := ts.Token()
	if err != nil {
		return nil, fmt.Errorf("Token retrieval error: %v", err)
	}
	caDec, _ := base64.StdEncoding.DecodeString(clusterInfo.MasterAuth.ClusterCaCertificate)
	gcloudPath, err := exec.LookPath("gcloud")
	if err != nil {
		return nil, fmt.Errorf("Not able to find gcloud: %v", err)
	}

	config.Contexts[cluster] = &clientcmdapi.Context{
		Cluster:   cluster,
		AuthInfo:  cluster,
		Namespace: namespace,
	}
	config.Clusters[cluster] = &clientcmdapi.Cluster{
		Server:                   "https://" + clusterInfo.Endpoint,
		InsecureSkipTLSVerify:    false,
		CertificateAuthorityData: []byte(string(caDec)),
	}
	config.AuthInfos[cluster] = &clientcmdapi.AuthInfo{
		Token: t.AccessToken,
		AuthProvider: &clientcmdapi.AuthProviderConfig{
			Name: "gcp",
			Config: map[string]string{
				"cmd-path":   gcloudPath,
				"cmd-args":   "config config-helper --format=json",
				"token-key":  "{.credential.access_token}",
				"expiry-key": "{.credential.token_expiry}",
			},
		},
	}
	config.CurrentContext = cluster

	return config, nil
}
