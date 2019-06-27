package kfctlClient

import (
	"context"
	"flag"
	"github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/app"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/onrik/logrus/filename"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2/google"
	dm "google.golang.org/api/deploymentmanager/v2"
)

func init() {
	// Add filename as one of the fields of the structured log message
	filenameHook := filename.NewHook()
	filenameHook.Field = "filename"
	log.AddHook(filenameHook)
}

// ServerOption is the main context object for the controller manager.
type ServerOption struct {
	Project  string
	Name     string
	Config   string
	Endpoint string
}

// NewServerOption creates a new CMServer with a default config.
func NewServerOption() *ServerOption {
	s := ServerOption{}
	return &s
}

// AddFlags adds flags for a specific Server to the specified FlagSet
func (s *ServerOption) AddFlags(fs *flag.FlagSet) {

	fs.StringVar(&s.Config, "config", "", "Path to a YAML file describing an app to create on startup.")
	fs.StringVar(&s.Name, "name", "", "Name for the deployment.")
	fs.StringVar(&s.Project, "project", "", "Project.")

}

func run(opt *ServerOption) error {

	d, err := kfdefsv2.LoadKFDefFromURI(opt.Config)

	if err != nil {
		return errors.WithStack(err)
	}

	d.Spec.Project = opt.Project
	d.Name = opt.Name

	pKfDef, _ := Pformat(d)

	log.Infof("Spec to create:\n%v", pKfDef)

	log.Infof("Connecting to server: %v", opt.Endpoint)
	c, err := app.NewKfctlClient(opt.Endpoint)

	if err != nil {
		log.Errorf("There was a problem connecting to the server %+v", err)
		return err
	}

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

	cts := context.Background()
	res, err := c.CreateDeployment(ctx, d)

	if err != nil {
		log.Errorf("CreateDeployment failed; error %v", err)
		return err
	}

	pResult, _ := Pformat(res)
	log.Infof("Create succedeed. Result:\n%v", pResult)
	return nil
}

// Pformat returns a pretty format output of any value.
func Pformat(value interface{}) (string, error) {
	if s, ok := value.(string); ok {
		return s, nil
	}
	valueJson, err := json.MarshalIndent(value, "", "  ")
	if err != nil {
		return "", err
	}
	return string(valueJson), nil
}

func main() {
	s := NewServerOption()
	s.AddFlags(flag.CommandLine)

	flag.Parse()

	run(s)
}
