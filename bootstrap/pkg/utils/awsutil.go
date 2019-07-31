/*
Copyright The Kubeflow Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package utils

import (
	"os/exec"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sts"
	log "github.com/sirupsen/logrus"
)

// CheckAwsStsCallerIdentity runs GetCallIdentity to make sure aws credentials is configured correclty
func CheckAwsStsCallerIdentity(sess *session.Session) error {
	svc := sts.New(sess)
	input := &sts.GetCallerIdentityInput{}

	result, err := svc.GetCallerIdentity(input)
	if err != nil {
		log.Warnf("AWS Credentials seems not correct %v", err.Error())
		return err
	}

	log.Infof("Caller ARN Info: %s", result)
	return nil
}

// CheckCommandExist check if a command can be found in PATH.
func CheckCommandExist(commandName string) error {
	_, err := exec.LookPath(commandName)
	if err != nil {
		return err
	}

	return nil
}

// GetEksctlVersion return eksctl version on user's machine
func GetEksctlVersion() error {
	log.Infof("Running `eksctl version` ...")
	output, err := exec.Command("eksctl", "version").Output()

	if err != nil {
		log.Errorf("Failed to run `eksctl version` command %v", err)
		return err
	}

	log.Infof("output: %v", string(output))
	// [ℹ]  version.Info{BuiltAt:"", GitCommit:"", GitTag:"0.1.32"}
	// We'd like to extract 0.1.32 and compare with minimum version we support.
	return nil
}
