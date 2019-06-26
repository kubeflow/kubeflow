package kfctlClient

import (
	"flag"
	"github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/app/options"
	"github.com/onrik/logrus/filename"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
)

func init() {
	// Add filename as one of the fields of the structured log message
	filenameHook := filename.NewHook()
	filenameHook.Field = "filename"
	log.AddHook(filenameHook)
}

// ServerOption is the main context object for the controller manager.
type ServerOption struct {
	Project              string
	Name                 string
	Config               string
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


}

func main() {
	s := options.NewServerOption()
	s.AddFlags(flag.CommandLine)

	flag.Parse()

	run(opt)

}
