package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

var rootCmd = &cobra.Command{
	Use:   "kfdef-converter",
	Short: "A simple CLI to convert KfDef from v1alpha1 to v1beta1.",
	Long:  "A simple CLI to convert KfDef from v1alpha1 to v1beta1",
}

var (
	// VERSION is set during build.
	VERSION string
)

func Execute(version string) {
	VERSION = version

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)
}

func initConfig() {
}
