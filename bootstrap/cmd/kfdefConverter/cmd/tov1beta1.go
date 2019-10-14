package cmd

import (
	"fmt"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var tov1beta1Cfg = viper.New()

var tov1beta1Cmd = &cobra.Command{
	Use:   "tov1beta1 <kfdef-v1alpha1-filename>",
	Short: "Convert a KfDef config in v1alpha1 into v1beta1 format.",
	Long:  "Convert a KfDef config in v1alpha1 into v1beta1 format.",

	RunE: func(cmd *cobra.Command, args []string) error {
		log.SetLevel(log.InfoLevel)
		return fmt.Errorf("Not implemented.")
	},
}

func init() {
	rootCmd.AddCommand(tov1beta1Cmd)

	tov1beta1Cfg.SetConfigName("conversion")
	tov1beta1Cfg.SetConfigType("yaml")

	tov1beta1Cmd.Flags().StringP("out", "o", "",
		"Path to write converted KfDef. If not set, the original file will be overriden.")
	if err := tov1beta1Cfg.BindPFlag("out", tov1beta1Cmd.Flags().Lookup("out")); err != nil {
		log.Errorf("couldn't set flag --out: %v", err)
		return
	}
}
