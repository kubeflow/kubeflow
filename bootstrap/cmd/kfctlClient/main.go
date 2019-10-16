package main

import (
	"context"
	"flag"
	"fmt"
	log "github.com/golang/glog"
	"github.com/kubeflow/kubeflow/bootstrap/v3/cmd/bootstrap/app"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"github.com/pkg/errors"
	"golang.org/x/oauth2"
	"os"

	// log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2/google"
	dm "google.golang.org/api/deploymentmanager/v2"
)

// ServerOption is the main context object for the controller manager.
type ServerOption struct {
	Project  string
	Name     string
	Config   string
	Endpoint string
	Zone     string
}

// NewServerOption creates a new CMServer with a default config.
func NewServerOption() *ServerOption {
	s := ServerOption{}
	return &s
}

// AddFlags adds flags for a specific Server to the specified FlagSet
func (s *ServerOption) AddFlags(fs *flag.FlagSet) {

	fs.StringVar(&s.Config, "config", "https://raw.githubusercontent.com/kubeflow/kubeflow/master/bootstrap/config/kfctl_gcp_iap.yaml", "URI of a YAML file containing a KfDef object.")
	fs.StringVar(&s.Name, "name", "", "Name for the deployment.")
	fs.StringVar(&s.Project, "project", "", "Project.")
	fs.StringVar(&s.Endpoint, "endpoint", "", "The endpoint e.g. http://localhost:8080.")
	fs.StringVar(&s.Zone, "zone", "", "Zone.")

}

func checkAccess(project string, token string) {
	// Verify that user has access. We shouldn't do any processing until verifying access.
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: token,
	})

	isValid, err := app.CheckProjectAccess(project, ts)

	if err != nil || !isValid {
		log.Fatalf("CheckProjectAccess failed; error %v", err)
	}

	log.Infof("You have access to project %v", project)
}
func run(opt *ServerOption) error {
	if opt.Name == "" {
		return fmt.Errorf("--name is required.")
	}

	if opt.Project == "" {
		return fmt.Errorf("--project is required.")
	}

	d, err := kfdefsv2.LoadKFDefFromURI(opt.Config)

	if err != nil {
		return errors.WithStack(err)
	}

	d.Spec.Project = opt.Project
	d.Name = opt.Name

	email, err := gcp.GetGcloudDefaultAccount()

	if err != nil {
		log.Errorf("Couldn't get default email; error %v", err)
	}

	log.Infof("Setting email to %v", email)
	d.Spec.Email = email

	fmt.Printf("Connecting to server: %v", opt.Endpoint)
	c, err := app.NewKfctlClient(opt.Endpoint)

	if err != nil {
		log.Errorf("There was a problem connecting to the server %+v", err)
		return err
	}

	if os.Getenv(gcp.CLIENT_ID) == "" {
		log.Errorf("Environment variable CLIENT_ID must be set for IAP")
		return fmt.Errorf("Must set environment variable CLIENT_ID for IAP")
	}

	if os.Getenv(gcp.CLIENT_SECRET) == "" {
		log.Errorf("Environment variable CLIENT_SECRET must be set for IAP")
		return fmt.Errorf("Must set environment variable CLIENT_SECRET for IAP")
	}

	// Set the GCPPluginSpec.
	pluginSpec := &gcp.GcpPluginSpec{}
	if err := d.GetPluginSpec(gcp.GcpPluginName, pluginSpec); err != nil && !kfdefsv2.IsPluginNotFound(err) {
		return err
	}

	pluginSpec.Auth = &gcp.Auth{
		IAP: &gcp.IAP{
			OAuthClientId: os.Getenv(gcp.CLIENT_ID),
			OAuthClientSecret: &kfdefsv2.SecretRef{
				Name: gcp.KUBEFLOW_OAUTH,
			},
		},
	}

	if err := d.SetPluginSpec(gcp.GcpPluginName, pluginSpec); err != nil {
		return err
	}

	d.SetSecret(kfdefsv2.Secret{
		Name: gcp.KUBEFLOW_OAUTH,
		SecretSource: &kfdefsv2.SecretSource{
			LiteralSource: &kfdefsv2.LiteralSource{
				Value: os.Getenv(gcp.CLIENT_SECRET),
			},
		},
	})

	ts, err := google.DefaultTokenSource(context.Background(), dm.CloudPlatformScope)

	if err != nil {
		return err
	}

	token, err := ts.Token()

	if err != nil {
		return err
	}

	d.SetSecret(kfdefsv2.Secret{
		Name: gcp.GcpAccessTokenName,
		SecretSource: &kfdefsv2.SecretSource{
			LiteralSource: &kfdefsv2.LiteralSource{
				Value: token.AccessToken,
			},
		},
	})

	d.Spec.Zone = opt.Zone

	fmt.Printf("Spec to create:\n%v", utils.PrettyPrint(d))

	checkAccess(opt.Project, token.AccessToken)

	// TODO(jlewi) continually retry and wait for success or failure
	ctx := context.Background()
	res, err := c.CreateDeployment(ctx, *d)

	if err != nil {
		log.Errorf("CreateDeployment failed; error %v", err)
		return err
	}

	log.Infof("Create succedeed. Result:\n%v", utils.PrettyPrint(res))
	return nil
}

func main() {
	s := NewServerOption()
	s.AddFlags(flag.CommandLine)

	flag.Parse()

	err := run(s)

	if err != nil {
		log.Errorf("Create deployment failed; error %v", err)
	}
}
