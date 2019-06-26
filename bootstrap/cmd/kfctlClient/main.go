package kfctlClient

import (
	"flag"
	"github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/app/options"
	"github.com/onrik/logrus/filename"
	log "github.com/sirupsen/logrus"
)

func init() {
	// Add filename as one of the fields of the structured log message
	filenameHook := filename.NewHook()
	filenameHook.Field = "filename"
	log.AddHook(filenameHook)
}

// ServerOption is the main context object for the controller manager.
type ServerOption struct {
	Apply                bool
	PrintVersion         bool
	JsonLogFormat        bool
	InCluster            bool
	KeepAlive            bool
	InstallIstio         bool
	Port                 int
	AppName              string
	AppDir               string
	Config               string
	Email                string
	GkeVersionOverride   string
	Mode                 string
	NameSpace            string
	RegistriesConfigFile string
	KfctlAppsNamespace   string
}

// NewServerOption creates a new CMServer with a default config.
func NewServerOption() *ServerOption {
	s := ServerOption{}
	return &s
}

// AddFlags adds flags for a specific Server to the specified FlagSet
func (s *ServerOption) AddFlags(fs *flag.FlagSet) {

	fs.StringVar(&s.Config, "config", "", "Path to a YAML file describing an app to create on startup.")
	// Whether to install istio. Remove after we always install it.
	fs.BoolVar(&s.InstallIstio, "install-istio", false, "Whether to install istio.")

	// Options below are related to the new API and router + backend design
	fs.StringVar(&s.Mode, "mode", "router", "What mode to start the binary in. Options are router and kfctl.")
	fs.StringVar(&s.KfctlAppsNamespace, "kfctl-apps-namespace", "", "The namespace where the kfctl apps will be created.")
}

func main() {
	s := options.NewServerOption()
	s.AddFlags(flag.CommandLine)

	flag.Parse()

}
