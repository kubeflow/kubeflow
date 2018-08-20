package app

import (
	"golang.org/x/net/context"
	iamadmin "cloud.google.com/go/iam/admin/apiv1"
	"google.golang.org/api/option"
	"golang.org/x/oauth2"
		"google.golang.org/genproto/googleapis/iam/admin/v1"
	"fmt"
	log "github.com/sirupsen/logrus"
	"k8s.io/api/core/v1"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	)


type InsertSaKeyRequest struct {
	Cluster string
	Namespace string
	Project string
	SecretKey string
	SecretName string
	ServiceAccount string
	Token string
	Zone string
}



func (s *ksServer) InsertSaKey(ctx context.Context, request InsertSaKeyRequest) error {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: request.Token,
	})
	k8sConfig, err := buildClusterConfig(ctx, request.Token, request.Project, request.Zone, request.Cluster)
	if err != nil {
		log.Errorf("Failed getting GKE cluster config: %v", err)
		return err
	}

	c, err := iamadmin.NewIamClient(ctx, option.WithTokenSource(ts))
	if err != nil {
		log.Errorf("Cannot create iam admin client: %v", err)
		return err
	}
	createServiceAccountKeyRequest := admin.CreateServiceAccountKeyRequest{
		Name: fmt.Sprintf("projects/%v/serviceAccounts/%v", request.Project, request.ServiceAccount),
	}

	s.iamMux.Lock()
	defer s.iamMux.Unlock()

	createdKey, err := c.CreateServiceAccountKey(ctx, &createServiceAccountKeyRequest)
	if err != nil {
		log.Errorf("Failed creating sa key: %v", err)
		return err
	}
	k8sClientset, err := clientset.NewForConfig(k8sConfig)
	secretData := make(map[string][]byte)
	secretData[request.SecretKey] = createdKey.PrivateKeyData
	_, err = k8sClientset.CoreV1().Secrets(request.Namespace).Create(
		&v1.Secret{
			ObjectMeta: meta_v1.ObjectMeta{
				Namespace: request.Namespace,
				Name:      request.SecretName,
			},
			Data: secretData,
		})
	if err != nil {
		log.Errorf("Failed creating secret in GKE cluster: %v", err)
		return err
	}
	return  nil
}