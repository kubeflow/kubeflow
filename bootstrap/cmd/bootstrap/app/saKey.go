package app

import (
	iamadmin "cloud.google.com/go/iam/admin/apiv1"
	"encoding/base64"
	"fmt"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/option"
	"google.golang.org/genproto/googleapis/iam/admin/v1"
	"k8s.io/api/core/v1"
	rbac_v1 "k8s.io/api/rbac/v1"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
)

const OauthSecretName = "kubeflow-oauth"
const LoginSecretName = "kubeflow-login"

func (s *ksServer) ConfigCluster(ctx context.Context, req CreateRequest) error {
	k8sConfig, err := utils.BuildClusterConfig(ctx, req.Token, req.Project, req.Zone, req.Cluster)
	if err != nil {
		log.Errorf("Failed getting GKE cluster config: %v", err)
		return err
	}
	k8sClientset, err := clientset.NewForConfig(k8sConfig)
	if err != nil {
		return err
	}
	log.Info("Creating namespace")
	if err := CreateNamespace(&req, k8sClientset); err != nil {
		log.Errorf("Failed to create namespace: %v", err)
		return err
	}
	log.Info("Inserting oauth credentails")
	if err := InsertOauthCredentails(&req, k8sClientset); err != nil {
		return err
	}
	log.Info("Inserting login credentails")
	if err := InsertLoginCredentails(&req, k8sClientset); err != nil {
		return err
	}
	log.Infof("Inserting sa keys...")
	if err := s.InsertSaKeys(ctx, &req, k8sClientset); err != nil {
		log.Errorf("Failed to insert service account key: %v", err)
		return err
	}
	log.Infof("Creating cluster admin role binding...")
	bindAccount := req.Email
	if req.SAClientID != "" {
		bindAccount = req.SAClientID
	}
	roleBinding := rbac_v1.ClusterRoleBinding{
		TypeMeta: meta_v1.TypeMeta{
			APIVersion: "rbac.authorization.k8s.io/v1beta1",
			Kind:       "ClusterRoleBinding",
		},
		ObjectMeta: meta_v1.ObjectMeta{
			Name: "default-admin",
		},
		RoleRef: rbac_v1.RoleRef{
			APIGroup: "rbac.authorization.k8s.io",
			Kind:     "ClusterRole",
			Name:     "cluster-admin",
		},
		Subjects: []rbac_v1.Subject{
			{
				Kind: rbac_v1.UserKind,
				Name: bindAccount,
			},
		},
	}
	err = utils.CreateK8sRoleBing(k8sConfig, &roleBinding)
	return err
}

func CreateNamespace(req *CreateRequest, k8sClientset *clientset.Clientset) error {
	_, err := k8sClientset.CoreV1().Namespaces().Create(
		&v1.Namespace{
			ObjectMeta: meta_v1.ObjectMeta{
				Name: req.Namespace,
			},
		},
	)
	return err
}

func InsertOauthCredentails(req *CreateRequest, k8sClientset *clientset.Clientset) error {
	secretData := make(map[string][]byte)
	ClientIdData, err := base64.StdEncoding.DecodeString(req.ClientID)
	if err != nil {
		log.Errorf("Failed decoding client id: %v", err)
		return err
	}
	ClientSecretData, err := base64.StdEncoding.DecodeString(req.ClientSecret)
	if err != nil {
		log.Errorf("Failed decoding client secret: %v", err)
		return err
	}
	secretData["client_id"] = ClientIdData
	secretData["client_secret"] = ClientSecretData
	_, err = k8sClientset.CoreV1().Secrets(req.Namespace).Create(
		&v1.Secret{
			ObjectMeta: meta_v1.ObjectMeta{
				Namespace: req.Namespace,
				Name:      OauthSecretName,
			},
			Data: secretData,
		})
	if err != nil {
		log.Errorf("Failed creating oauth credentails in GKE cluster: %v", err)
		return err
	}
	return nil
}

func InsertLoginCredentails(req *CreateRequest, k8sClientset *clientset.Clientset) error {
	if req.Username == "" || req.PasswordHash == "" {
		return nil
	}
	secretData := make(map[string][]byte)
	UsernameData, err := base64.StdEncoding.DecodeString(req.Username)
	if err != nil {
		log.Errorf("Failed decoding username: %v", err)
		return err
	}
	secretData["username"] = UsernameData
	secretData["passwordhash"] = []byte(req.PasswordHash)
	_, err = k8sClientset.CoreV1().Secrets(req.Namespace).Create(
		&v1.Secret{
			ObjectMeta: meta_v1.ObjectMeta{
				Namespace: req.Namespace,
				Name:      LoginSecretName,
			},
			Data: secretData,
		})
	if err != nil {
		log.Errorf("Failed creating login credentails in GKE cluster: %v", err)
		return err
	}
	return nil
}

func (s *ksServer) InsertSaKeys(ctx context.Context, req *CreateRequest, k8sClientset *clientset.Clientset) error {
	err := s.InsertSaKey(ctx, req, "admin-gcp-sa.json", "admin-gcp-sa",
		fmt.Sprintf("%v-admin@%v.iam.gserviceaccount.com", req.Cluster, req.Project), k8sClientset)
	if err != nil {
		return err
	}
	err = s.InsertSaKey(ctx, req, "user-gcp-sa.json", "user-gcp-sa",
		fmt.Sprintf("%v-user@%v.iam.gserviceaccount.com", req.Cluster, req.Project), k8sClientset)
	return err
}

func (s *ksServer) InsertSaKey(ctx context.Context, request *CreateRequest, secretKey string,
	secretName string, serviceAccount string, k8sClientset *clientset.Clientset) error {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: request.Token,
	})

	c, err := iamadmin.NewIamClient(ctx, option.WithTokenSource(ts))
	if err != nil {
		log.Errorf("Cannot create iam admin client: %v", err)
		return err
	}
	createServiceAccountKeyRequest := admin.CreateServiceAccountKeyRequest{
		Name: fmt.Sprintf("projects/%v/serviceAccounts/%v", request.Project, serviceAccount),
	}

	projLock := s.GetProjectLock(request.Project)
	projLock.Lock()
	defer projLock.Unlock()

	createdKey, err := c.CreateServiceAccountKey(ctx, &createServiceAccountKeyRequest)
	if err != nil {
		log.Errorf("Failed creating sa key: %v", err)
		return err
	}
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
