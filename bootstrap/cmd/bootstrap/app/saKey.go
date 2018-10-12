package app

import (
	iamadmin "cloud.google.com/go/iam/admin/apiv1"
	"fmt"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/option"
	"google.golang.org/genproto/googleapis/iam/admin/v1"
	"k8s.io/api/core/v1"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
)

type InsertSaKeyRequest struct {
	Cluster   string
	Namespace string
	Project   string
	Token     string
	Zone      string
}

func (s *ksServer) InsertSaKeys(ctx context.Context, req InsertSaKeyRequest) error {
	err := s.InsertSaKey(ctx, req, "admin-gcp-sa.json", "admin-gcp-sa",
		fmt.Sprintf("%v-admin@%v.iam.gserviceaccount.com", req.Cluster, req.Project))
	if err != nil {
		return err
	}
	err = s.InsertSaKey(ctx, req, "user-gcp-sa.json", "user-gcp-sa",
		fmt.Sprintf("%v-user@%v.iam.gserviceaccount.com", req.Cluster, req.Project))
	return err
}

func (s *ksServer) InsertSaKey(ctx context.Context, request InsertSaKeyRequest, secretKey string,
	secretName string, serviceAccount string) error {
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
		Name: fmt.Sprintf("projects/%v/serviceAccounts/%v", request.Project, serviceAccount),
	}

	s.serverMux.Lock()
	defer s.serverMux.Unlock()

	createdKey, err := c.CreateServiceAccountKey(ctx, &createServiceAccountKeyRequest)
	if err != nil {
		log.Errorf("Failed creating sa key: %v", err)
		return err
	}
	k8sClientset, err := clientset.NewForConfig(k8sConfig)
	secretData := make(map[string][]byte)
	secretData[secretKey] = createdKey.PrivateKeyData
	_, err = k8sClientset.CoreV1().Secrets(request.Namespace).Create(
		&v1.Secret{
			ObjectMeta: meta_v1.ObjectMeta{
				Namespace: request.Namespace,
				Name:      secretName,
			},
			Data: secretData,
		})
	if err != nil {
		log.Errorf("Failed creating secret in GKE cluster: %v", err)
		return err
	}
	return nil
}
