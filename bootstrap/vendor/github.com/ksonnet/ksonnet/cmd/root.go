// Copyright 2017 The kubecfg authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package cmd

import (
	"bytes"
	"encoding/json"
	goflag "flag"
	"fmt"
	"io"
	"os"
	"path"
	"path/filepath"
	"strings"

	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"

	"github.com/ksonnet/ksonnet/metadata"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/pkg/env"
	"github.com/ksonnet/ksonnet/pkg/pipeline"
	"github.com/ksonnet/ksonnet/plugin"
	str "github.com/ksonnet/ksonnet/strings"
	"github.com/ksonnet/ksonnet/template"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"golang.org/x/crypto/ssh/terminal"

	// Register auth plugins
	_ "k8s.io/client-go/plugin/pkg/client/auth"
)

var (
	appFs = afero.NewOsFs()
	ka    app.App
)

func init() {
	RootCmd.PersistentFlags().CountP(flagVerbose, "v", "Increase verbosity. May be given multiple times.")
	RootCmd.PersistentFlags().Set("logtostderr", "true")
}

func bindJsonnetFlags(cmd *cobra.Command) {
	cmd.PersistentFlags().StringSliceP(flagJpath, "J", nil, "Additional jsonnet library search path")
	cmd.PersistentFlags().StringSliceP(flagExtVar, "V", nil, "Values of external variables")
	cmd.PersistentFlags().StringSlice(flagExtVarFile, nil, "Read external variable from a file")
	cmd.PersistentFlags().StringSliceP(flagTlaVar, "A", nil, "Values of top level arguments")
	cmd.PersistentFlags().StringSlice(flagTlaVarFile, nil, "Read top level argument from a file")
	cmd.PersistentFlags().String(flagResolver, "noop", "Change implementation of resolveImage native function. One of: noop, registry")
	cmd.PersistentFlags().String(flagResolvFail, "warn", "Action when resolveImage fails. One of ignore,warn,error")
}

// RootCmd is the root of cobra subcommand tree
var RootCmd = &cobra.Command{
	Use:   "ks",
	Short: `Configure your application to deploy to a Kubernetes cluster`,
	Long: `
You can use the ` + "`ks`" + ` commands to write, share, and deploy your Kubernetes
application configuration to remote clusters.

----
`,
	SilenceErrors: true,
	SilenceUsage:  true,
	PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
		goflag.CommandLine.Parse([]string{})
		flags := cmd.Flags()
		out := cmd.OutOrStderr()
		log.SetOutput(out)

		logFmt := NewLogFormatter(out)
		log.SetFormatter(logFmt)

		verbosity, err := flags.GetCount(flagVerbose)
		if err != nil {
			return err
		}
		log.SetLevel(logLevel(verbosity))

		wd, err := os.Getwd()
		if err != nil {
			return err
		}

		var isInit bool
		if len(args) == 2 && args[0] == "init" {
			isInit = true
		}

		ka, err = app.Load(appFs, wd, false)
		if err != nil && isInit {
			return err
		}

		return nil
	},
	Args: func(cmd *cobra.Command, args []string) error {
		if len(args) == 0 {
			return cobra.NoArgs(cmd, args)
		}

		pluginName := args[0]
		_, err := plugin.Find(appFs, pluginName)
		if err != nil {
			return cobra.NoArgs(cmd, args)
		}

		return nil
	},
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) == 0 {
			return cmd.Help()
		}
		pluginName, args := args[0], args[1:]
		p, err := plugin.Find(appFs, pluginName)
		if err != nil {
			return err
		}

		return runPlugin(p, args)
	},
}

func runPlugin(p plugin.Plugin, args []string) error {
	env := []string{
		fmt.Sprintf("KS_PLUGIN_DIR=%s", p.RootDir),
		fmt.Sprintf("KS_PLUGIN_NAME=%s", p.Config.Name),
		fmt.Sprintf("HOME=%s", os.Getenv("HOME")),
	}

	root, err := appRoot()
	if err != nil {
		return err
	}

	appConfig := filepath.Join(root, "app.yaml")
	exists, err := afero.Exists(appFs, appConfig)
	if err != nil {
		return err
	}

	if exists {
		env = append(env, fmt.Sprintf("KS_APP_DIR=%s", root))
		// TODO: make kube context or something similar available to the plugin
	}

	cmd := p.BuildRunCmd(env, args)
	return cmd.Run()
}

func logLevel(verbosity int) log.Level {
	switch verbosity {
	case 0:
		return log.InfoLevel
	default:
		return log.DebugLevel
	}
}

type logFormatter struct {
	escapes  *terminal.EscapeCodes
	colorise bool
}

// NewLogFormatter creates a new log.Formatter customised for writer
func NewLogFormatter(out io.Writer) log.Formatter {
	var ret = logFormatter{}
	if f, ok := out.(*os.File); ok {
		ret.colorise = terminal.IsTerminal(int(f.Fd()))
		ret.escapes = terminal.NewTerminal(f, "").Escape
	}
	return &ret
}

func (f *logFormatter) levelEsc(level log.Level) []byte {
	switch level {
	case log.DebugLevel:
		return []byte{}
	case log.WarnLevel:
		return f.escapes.Yellow
	case log.ErrorLevel, log.FatalLevel, log.PanicLevel:
		return f.escapes.Red
	default:
		return f.escapes.Blue
	}
}

func (f *logFormatter) Format(e *log.Entry) ([]byte, error) {
	buf := bytes.Buffer{}
	if f.colorise {
		buf.Write(f.levelEsc(e.Level))
		fmt.Fprintf(&buf, "%-5s ", strings.ToUpper(e.Level.String()))
		buf.Write(f.escapes.Reset)
	}

	buf.WriteString(strings.TrimSpace(e.Message))
	buf.WriteString("\n")

	return buf.Bytes(), nil
}

func newExpander(fs afero.Fs, cmd *cobra.Command) (*template.Expander, error) {
	flags := cmd.Flags()
	spec := template.NewExpander(fs)
	var err error

	spec.EnvJPath = filepath.SplitList(os.Getenv("KUBECFG_JPATH"))

	spec.FlagJpath, err = flags.GetStringSlice(flagJpath)
	if err != nil {
		return nil, err
	}

	spec.ExtVars, err = flags.GetStringSlice(flagExtVar)
	if err != nil {
		return nil, err
	}

	spec.ExtVarFiles, err = flags.GetStringSlice(flagExtVarFile)
	if err != nil {
		return nil, err
	}

	spec.TlaVars, err = flags.GetStringSlice(flagTlaVar)
	if err != nil {
		return nil, err
	}

	spec.TlaVarFiles, err = flags.GetStringSlice(flagTlaVarFile)
	if err != nil {
		return nil, err
	}

	spec.Resolver, err = flags.GetString(flagResolver)
	if err != nil {
		return nil, err
	}
	spec.FailAction, err = flags.GetString(flagResolvFail)
	if err != nil {
		return nil, err
	}

	return &spec, nil
}

// For debugging
func dumpJSON(v interface{}) string {
	buf := bytes.NewBuffer(nil)
	enc := json.NewEncoder(buf)
	enc.SetIndent("", "  ")
	if err := enc.Encode(v); err != nil {
		return err.Error()
	}
	return string(buf.Bytes())
}

// addEnvCmdFlags adds the flags that are common to the family of commands
// whose form is `[<env>|-f <file-name>]`, e.g., `apply` and `delete`.
func addEnvCmdFlags(cmd *cobra.Command) {
	cmd.PersistentFlags().StringSliceP(flagComponent, shortComponent, nil, "Name of a specific component (multiple -c flags accepted, allows YAML, JSON, and Jsonnet)")
}

type cmdObjExpanderConfig struct {
	fs         afero.Fs
	cmd        *cobra.Command
	env        string
	components []string
	cwd        string
}

// cmdObjExpander finds and expands templates for the family of commands of
// the form `[<env>|-f <file-name>]`, e.g., `apply` and `delete`. That is, if
// the user passes a list of files, we will expand all templates in those files,
// while if a user passes an environment name, we will expand all component
// files using that environment.
type cmdObjExpander struct {
	config             cmdObjExpanderConfig
	templateExpanderFn func(afero.Fs, *cobra.Command) (*template.Expander, error)
}

func newCmdObjExpander(c cmdObjExpanderConfig) *cmdObjExpander {
	if c.fs == nil {
		c.fs = appFs
	}

	return &cmdObjExpander{
		config:             c,
		templateExpanderFn: newExpander,
	}
}

// Expands expands the templates.
func (te *cmdObjExpander) Expand() ([]*unstructured.Unstructured, error) {
	// expander, err := te.templateExpanderFn(te.config.fs, te.config.cmd)
	// if err != nil {
	// 	return nil, errors.Wrap(err, "template expander")
	// }

	manager, err := metadata.Find(te.config.cwd)
	if err != nil {
		return nil, errors.Wrap(err, "find metadata")
	}

	ksApp, err := manager.App()
	if err != nil {
		return nil, err
	}

	p := pipeline.New(ksApp, te.config.env)
	return p.Objects(te.config.components)
}

// constructBaseObj constructs the base Jsonnet object that represents k-v
// pairs of component name -> component imports. For example,
//
//   {
//      foo: import "components/foo.jsonnet"
//      "foo-bar": import "components/foo-bar.jsonnet"
//   }
func constructBaseObj(componentPaths, componentNames []string) (string, error) {
	// IMPLEMENTATION NOTE: If one or more `componentNames` exist, it is
	// sufficient to simply omit every name that does not appear in the list. This
	// is because we know every field of the base object will contain _only_ an
	// `import` node (see example object in the function-heading comment). This
	// would not be true in cases where one field can reference another field; in
	// this case, one would need to generate the entire object, and filter that.
	//
	// Hence, a word of caution: if the base object ever becomes more complex, you
	// will need to change the way this function performs filtering, as it will
	// lead to very confusing bugs.

	shouldFilter := len(componentNames) > 0
	filter := map[string]string{}
	for _, name := range componentNames {
		filter[name] = ""
	}

	// Add every component we know about to the base object.
	var obj bytes.Buffer
	obj.WriteString("{\n")
	for _, p := range componentPaths {
		ext := path.Ext(p)
		componentName := strings.TrimSuffix(path.Base(p), ext)

		// Filter! If the filter has more than 1 element and the component name is
		// not in the filter, skip.
		if _, exists := filter[componentName]; shouldFilter && !exists {
			continue
		} else if shouldFilter && exists {
			delete(filter, componentName)
		}

		// Generate import statement.
		var importExpr string
		switch ext {
		case ".jsonnet":
			importExpr = fmt.Sprintf(`import "%s"`, p)

		// TODO: Pull in YAML and JSON when we build the base object.
		//
		// case ".yaml", ".yml":
		// 	importExpr = fmt.Sprintf(`util.parseYaml("%s")`, p)
		// case ".json":
		// 	importExpr = fmt.Sprintf(`util.parseJson("%s")`, p)
		default:
			continue
		}

		// Emit object field. Sanitize the name to guarantee we generate valid
		// Jsonnet.
		componentName = str.QuoteNonASCII(componentName)
		fmt.Fprintf(&obj, "  %s: %s,\n", componentName, importExpr)
	}

	// Check that we found all the components the user asked for.
	if shouldFilter && len(filter) != 0 {
		names := []string{}
		for name := range filter {
			names = append(names, "'"+name+"'")
		}
		return "", fmt.Errorf("Failed to filter components; the following components don't exist: [ %s ]", strings.Join(names, ","))
	}

	// Terminate object.
	fmt.Fprintf(&obj, "}\n")

	// Emit `base.libsonnet`.
	return fmt.Sprintf("%s=%s", metadata.ComponentsExtCodeKey, obj.String()), nil
}

func importParams(path string) string {
	return fmt.Sprintf(`%s=import "%s"`, metadata.ParamsExtCodeKey, path)
}

func importEnv(manager metadata.Manager, envName string) (string, error) {
	app, err := manager.App()
	if err != nil {
		return "", err
	}

	spec, err := app.Environment(envName)
	if err != nil {
		return "", fmt.Errorf("Environment '%s' does not exist in app.yaml", envName)
	}

	destination := env.NewDestination(spec.Destination.Server, spec.Destination.Namespace)

	marshalled, err := json.Marshal(&destination)
	if err != nil {
		return "", err
	}

	return fmt.Sprintf(`%s=%s`, metadata.EnvExtCodeKey, string(marshalled)), nil
}

func appRoot() (string, error) {
	return os.Getwd()
}
