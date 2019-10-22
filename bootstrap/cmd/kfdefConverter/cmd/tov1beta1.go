package cmd

import (
	"fmt"
	"path/filepath"
	"strings"

	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/configconverters"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var tov1beta1Cfg = viper.New()

var (
	OutPathFlag = "out"
)

var tov1beta1Cmd = &cobra.Command{
	Use:   "tov1beta1 <kfdef-v1alpha1-filename>",
	Short: "Convert a KfDef config in v1alpha1 into v1beta1 format.",
	Long:  "Convert a KfDef config in v1alpha1 into v1beta1 format.",

	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)

		if len(args) > 1 {
			return fmt.Errorf("Unknown args: %v", args[1:])
		} else if len(args) < 1 {
			return fmt.Errorf("Filename to converting KfDef is required.")
		}

		config, err := configconverters.LoadConfigFromURI(args[0])
		if err != nil {
			return fmt.Errorf("Error when loading KfDef: %v", err)
		}

		log.Infof("KfDef loaded for %v, converting.", args[0])
		outPath := tov1beta1Cfg.GetString(OutPathFlag)
		if outPath == "" {
			outPath = args[0]
		}
		config.Spec.AppDir = filepath.Dir(outPath)
		config.Spec.ConfigFileName = filepath.Base(outPath)

		// A hack to force converter to output KfDef in v1beta1.
		apiVersion := strings.Split(config.APIVersion, "/")
		if len(apiVersion) != 2 {
			return fmt.Errorf("Unknown format of API version: %v", config.APIVersion)
		}
		apiVersion[1] = "v1beta1"
		config.APIVersion = strings.Join(apiVersion, "/")
		return configconverters.WriteConfigToFile(*config)
	},
}

func init() {
	rootCmd.AddCommand(tov1beta1Cmd)

	tov1beta1Cfg.SetConfigName("conversion")
	tov1beta1Cfg.SetConfigType("yaml")

	tov1beta1Cmd.Flags().StringP(OutPathFlag, "o", "",
		"Path to write converted KfDef. If not set, the original file will be overriden.")
	if err := tov1beta1Cfg.BindPFlag(OutPathFlag, tov1beta1Cmd.Flags().Lookup(OutPathFlag)); err != nil {
		log.Errorf("couldn't set flag --%v: %v", OutPathFlag, err)
		return
	}
}
