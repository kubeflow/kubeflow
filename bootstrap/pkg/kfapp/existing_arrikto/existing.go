package existing_arrikto

import (
	"bytes"
	"context"
	cryptorand "crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"fmt"
	kfapisv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"html/template"
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/rest"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"math/big"
	"math/rand"
	"net"
	"net/url"
	"os"
	"path"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"strings"
	"time"
)

const (
	KUBEFLOW_USER_EMAIL = "KUBEFLOW_USER_EMAIL"
	KUBEFLOW_ENDPOINT   = "KUBEFLOW_ENDPOINT"
	OIDC_ENDPOINT       = "OIDC_ENDPOINT"
)

type Existing struct {
	kfdefs.KfDef
	istioManifests    []manifest
	authOIDCManifests []manifest
}

type manifest struct {
	name string
	path string
}

func GetPlatform(kfdef *kfdefs.KfDef) (kftypesv3.Platform, error) {

	kfRepoDir := kfdef.Status.ReposCache[kftypesv3.KubeflowRepoName].LocalPath
	istioManifestsDir := path.Join(kfRepoDir, "deployment/existing/istio")
	istioManifests := []manifest{
		{
			name: "Istio CRDs",
			path: path.Join(istioManifestsDir, "crds.yaml"),
		},
		{
			name: "Istio Control Plane",
			path: path.Join(istioManifestsDir, "istio-noauth.yaml"),
		},
	}

	authOIDCManifestsDir := path.Join(kfRepoDir, "deployment/existing/auth_oidc")
	authOIDCManifests := []manifest{
		{
			name: "Istio Gateway",
			path: path.Join(authOIDCManifestsDir, "gateway.yaml"),
		},
		{
			name: "Istio Ext-Auth Envoy Filter",
			path: path.Join(authOIDCManifestsDir, "envoy-filter.yaml"),
		},
		{
			name: "Dex",
			path: path.Join(authOIDCManifestsDir, "dex.yaml"),
		},
		{
			name: "AuthService",
			path: path.Join(authOIDCManifestsDir, "authservice.yaml"),
		},
	}

	existing := &Existing{
		KfDef:             *kfdef,
		istioManifests:    istioManifests,
		authOIDCManifests: authOIDCManifests,
	}
	return existing, nil
}

func (existing *Existing) GetK8sConfig() (*rest.Config, *clientcmdapi.Config) {
	return nil, nil
}

func (existing *Existing) Init(resources kftypesv3.ResourceEnum) error {
	return nil
}

func (existing *Existing) Generate(resources kftypesv3.ResourceEnum) error {
	return nil
}

func (existing *Existing) Apply(resources kftypesv3.ResourceEnum) error {
	// Apply extra components
	config := kftypesv3.GetConfig()

	// Create namespace
	// Get a K8s client
	kubeclient, err := client.New(config, client.Options{})
	if err != nil {
		return internalError(errors.WithStack(err))
	}

	// Create KFApp's namespace
	ns := &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: existing.Namespace,
		},
	}
	log.Infof("Creating namespace: %v", ns.Name)

	err = kubeclient.Create(context.TODO(), ns)
	if err != nil && !apierrors.IsAlreadyExists(err) {
		log.Errorf("Error creating namespace %v", ns.Name)
		return internalError(errors.WithStack(err))
	}

	// Install Istio
	if err := applyManifests(existing.istioManifests); err != nil {
		return internalError(errors.WithStack(err))
	}

	// Get Kubeflow and Dex Endpoints
	kfEndpoint, oidcEndpoint, err := getEndpoints(kubeclient)
	if err != nil {
		return internalError(errors.WithStack(err))
	}
	log.Infof("Got Kubeflow Endpoint: %s.", kfEndpoint)
	log.Infof("Got OIDC Endpoint: %s", oidcEndpoint)

	log.Infof("Creating self-signed cert for %s", kfEndpoint)
	kfEndpointURL, err := url.Parse(kfEndpoint)
	if err != nil {
		return internalError(errors.WithStack(err))
	}
	if err := createSelfSignedCerts(kubeclient, kfEndpointURL.Hostname()); err != nil {
		return internalError(errors.WithStack(err))
	}

	// Get the kubeflow user to add
	// TODO(yanniszark): get this from a plugin struct eventually (https://github.com/kubeflow/kubeflow/issues/3529)
	log.Info("Getting the Kubeflow User")
	kubeflowUser, err := getKubeflowUser()
	if err != nil {
		return internalError(errors.WithStack(err))
	}

	data := struct {
		KubeflowEndpoint        string
		OIDCEndpoint            string
		AuthServiceClientSecret string
		KubeflowUser            *kfUser
	}{
		KubeflowEndpoint:        kfEndpoint,
		OIDCEndpoint:            oidcEndpoint,
		AuthServiceClientSecret: genRandomString(32),
		KubeflowUser:            kubeflowUser,
	}

	// Generate YAML from the dex, authservice templates
	kfRepoDir := existing.Status.ReposCache[kftypesv3.KubeflowRepo].LocalPath
	authOIDCManifestsDir := path.Join(kfRepoDir, "deployment/existing/auth_oidc")
	err = generateFromGoTemplate(
		path.Join(authOIDCManifestsDir, "authservice.tmpl"),
		path.Join(authOIDCManifestsDir, "authservice.yaml"),
		data,
	)
	if err != nil {
		return internalError(errors.WithStack(err))
	}

	err = generateFromGoTemplate(
		path.Join(authOIDCManifestsDir, "dex.tmpl"),
		path.Join(authOIDCManifestsDir, "dex.yaml"),
		data,
	)
	if err != nil {
		return internalError(errors.WithStack(err))
	}

	// Install OIDC Authentication
	if err := applyManifests(existing.authOIDCManifests); err != nil {
		return internalError(errors.WithStack(err))
	}

	return nil
}

func (existing *Existing) Delete(resources kftypesv3.ResourceEnum) error {

	config := kftypesv3.GetConfig()
	kubeclient, err := client.New(config, client.Options{})
	if err != nil {
		return internalError(errors.WithStack(err))
	}

	ns := &corev1.Namespace{}
	for {
		err := kubeclient.Get(context.TODO(), types.NamespacedName{Name: existing.Namespace}, ns)
		// If Namespace has been deleted, break
		if apierrors.IsNotFound(err) {
			break
		}
		// If an unknown error occured, return
		if err != nil {
			return internalError(errors.WithStack(err))
		}
		// If Namespace exists, delete it
		if ns.DeletionTimestamp == nil {
			if err := kubeclient.Delete(context.TODO(), ns); err != nil {
				return internalError(errors.WithStack(err))
			}
		}
		log.Info("Waiting for namespace deletion to finish...")
		time.Sleep(5 * time.Second)
	}

	rev := func(manifests []manifest) []manifest {
		r := []manifest{}
		max := len(manifests)
		for i := 0; i < max; i++ {
			r = append(r, manifests[max-1-i])
		}
		return r
	}

	if err := deleteManifests(rev(existing.authOIDCManifests)); err != nil {
		return internalError(errors.WithStack(err))
	}
	if err := deleteManifests(rev(existing.istioManifests)); err != nil {
		return internalError(errors.WithStack(err))
	}
	return nil
}

func internalError(err error) error {
	return &kfapisv3.KfError{
		Code:    int(kfapisv3.INTERNAL_ERROR),
		Message: fmt.Sprintf("%+v", err),
	}
}

type kfUser struct {
	UserEmail    string
	Username     string
	PasswordHash string
}

func getKubeflowUser() (*kfUser, error) {
	kfUserEmail := os.Getenv(KUBEFLOW_USER_EMAIL)
	kfPassword := os.Getenv(kftypesv3.KUBEFLOW_PASSWORD)
	kfUsername := ""

	if kfUserEmail == "" || kfPassword == "" {
		log.Warn("KUBEFLOW_USER_EMAIL or KUBEFLOW_PASSWORD not given. Starting without creating a user.")
		log.Warn("If you want to create a user, edit the dex ConfigMap.")
		return nil, nil
	} else if !strings.Contains(kfUserEmail, "@") {
		return nil, fmt.Errorf("KUBEFLOW_USER_EMAIL is not a valid email (does not contain '@')")
	}
	kfUsername = kfUserEmail[0:strings.Index(kfUserEmail, "@")]
	kfPasswordHash, err := bcrypt.GenerateFromPassword([]byte(kfPassword), 13)
	if err != nil {
		return nil, err
	}
	log.Infof("Kubeflow user with email %s will be created", kfUserEmail)
	return &kfUser{
		UserEmail:    kfUserEmail,
		Username:     kfUsername,
		PasswordHash: string(kfPasswordHash),
	}, nil
}

func getEndpoints(kubeclient client.Client) (string, string, error) {

	// Get Istio IngressGateway Service LoadBalancer IP
	kfEndpoint := os.Getenv(KUBEFLOW_ENDPOINT)
	if !strings.HasPrefix(kfEndpoint, "https") && kfEndpoint != "" {
		return "", "", errors.New("KUBEFLOW_ENDPOINT address must start with https:// scheme.")
	}
	oidcEndpoint := os.Getenv(OIDC_ENDPOINT)
	if !strings.HasPrefix(oidcEndpoint, "https") && oidcEndpoint != "" {
		return "", "", errors.New("OIDC_ENDPOINT address must start with https:// scheme.")
	}

	if kfEndpoint == "" {
		lbIP, err := getLBAddress(kubeclient)
		if err != nil {
			return "", "", errors.WithStack(err)
		}
		kfEndpoint = fmt.Sprintf("https://%s", lbIP)
		log.Infof("KUBEFLOW_ENDPOINT not set, using %s", kfEndpoint)
	}

	if oidcEndpoint == "" {
		oidcEndpoint = fmt.Sprintf("%s:5556/dex", kfEndpoint)
		log.Infof("OIDC_ENDPOINT not set, using %s", oidcEndpoint)
	}

	return kfEndpoint, oidcEndpoint, nil
}

func createSelfSignedCerts(kubeclient client.Client, addr string) error {

	cert, key, err := generateCert(addr)
	if err != nil {
		return errors.WithStack(err)
	}

	// Create secret from them
	secret := &corev1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "istio-ingressgateway-certs",
			Namespace: "istio-system",
		},
		Data: map[string][]byte{
			"tls.crt": cert,
			"tls.key": key,
		},
	}

	if err := kubeclient.Create(context.TODO(), secret); err != nil && !apierrors.IsAlreadyExists(err) {
		return errors.WithStack(err)
	}

	return nil
}

// generateCert returns the self-signed key and cert for
// a given address.
func generateCert(addr string) ([]byte, []byte, error) {
	// Generate private key
	key, err := rsa.GenerateKey(cryptorand.Reader, 2048)
	if err != nil {
		return nil, nil, errors.WithStack(err)
	}
	// Generate certificate
	now := time.Now()
	tmpl := x509.Certificate{
		SerialNumber: new(big.Int).SetInt64(seededRand.Int63()),
		Subject: pkix.Name{
			CommonName:   addr,
			Organization: []string{"kubeflow-self-signed"},
		},
		NotBefore:             now.UTC(),
		NotAfter:              now.Add(time.Second * 60 * 60 * 24 * 365).UTC(),
		KeyUsage:              x509.KeyUsageKeyEncipherment | x509.KeyUsageDigitalSignature | x509.KeyUsageCertSign,
		BasicConstraintsValid: true,
		IsCA:                  true,
	}

	if ip := net.ParseIP(addr); ip != nil {
		tmpl.IPAddresses = append(tmpl.IPAddresses, ip)
	} else {
		tmpl.DNSNames = append(tmpl.DNSNames, addr)
	}

	tmpl.DNSNames = append(tmpl.DNSNames, "localhost")

	certDERBytes, err := x509.CreateCertificate(cryptorand.Reader, &tmpl, &tmpl, key.Public(), key)
	if err != nil {
		return nil, nil, errors.WithStack(err)
	}
	certificate, err := x509.ParseCertificate(certDERBytes)
	if err != nil {
		return nil, nil, errors.WithStack(err)
	}

	// PEM Encode both
	certBuffer := bytes.Buffer{}
	if err := pem.Encode(&certBuffer, &pem.Block{
		Type:  "CERTIFICATE",
		Bytes: certificate.Raw,
	}); err != nil {
		return nil, nil, errors.WithStack(err)
	}

	keyBuffer := bytes.Buffer{}
	if err := pem.Encode(&keyBuffer, &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(key),
	}); err != nil {
		return nil, nil, errors.WithStack(err)
	}

	return certBuffer.Bytes(), keyBuffer.Bytes(), nil
}

func getLBAddress(kubeclient client.Client) (string, error) {
	// Get IngressGateway Service's address
	const maxRetries = 40
	var lbIngresses []corev1.LoadBalancerIngress
	svc := &corev1.Service{}
	lbServiceName := types.NamespacedName{Name: "istio-ingressgateway", Namespace: "istio-system"}

	for i := 0; ; i++ {
		log.Info("Trying to get istio-ingressgateway Service Address from its Status")

		err := kubeclient.Get(
			context.TODO(),
			lbServiceName,
			svc,
		)

		if err != nil {
			log.Errorf("Error trying to get istio-ingressgateway service")
			return "", err
		}
		if svc.Status.LoadBalancer.Ingress != nil {
			lbIngresses = svc.Status.LoadBalancer.Ingress
			break
		}
		if i == maxRetries {
			return "", errors.New("timed out while waiting to get istio-ingressgateway Service Address from its Status")
		}
		time.Sleep(10 * time.Second)
	}

	for _, lbIngress := range lbIngresses {
		// Hostname is preferred over IP
		if lbIngress.Hostname != "" {
			return lbIngress.Hostname, nil
		}
		if lbIngress.IP != "" {
			return lbIngress.IP, nil
		}
	}
	return "", errors.New(fmt.Sprintf("Couldn't find a LoadBalancer address in Service's %v Status.", lbServiceName))
}

func applyManifests(manifests []manifest) error {
	config := kftypesv3.GetConfig()
	for _, m := range manifests {
		log.Infof("Installing %s...", m.name)
		err := utils.CreateResourceFromFile(
			config,
			m.path,
		)
		if err != nil {
			log.Errorf("Failed to create %s: %v", m.name, err)
			return err
		}
	}
	return nil
}

func deleteManifests(manifests []manifest) error {
	config := kftypesv3.GetConfig()
	for _, m := range manifests {
		log.Infof("Deleting %s...", m.name)
		if _, err := os.Stat(m.path); os.IsNotExist(err) {
			log.Warnf("File %s not found", m.path)
			continue
		}
		err := utils.DeleteResourceFromFile(
			config,
			m.path,
		)
		if err != nil {
			log.Errorf("Failed to delete %s: %+v", m.name, err)
			return err
		}
	}
	return nil
}

func generateFromGoTemplate(tmplPath, outPath string, data interface{}) error {
	tmpl := template.Must(template.ParseFiles(tmplPath))
	f, err := os.Create(outPath)
	if err != nil {
		return err
	}
	err = tmpl.Execute(f, data)
	if err != nil {
		return err
	}
	return nil
}

var seededRand = rand.New(rand.NewSource(time.Now().UnixNano()))

func genRandomString(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}
