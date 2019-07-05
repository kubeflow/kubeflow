package app

import (
	"context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/sourcerepo/v1"
	"io/ioutil"
	"os"
	"path"
	"testing"
)

// This is a manual test because it actually uses GCP.
// To run it manually change its name to start with test.
// To disable it change its name so it won't match.
//
// TODO(jlewi): Need to come up with a better way of enabling this selectively
// under CI/CD
func TestSourceRepos_test(t *testing.T) {
	project := "jlewi-dev"
	localDir, err := ioutil.TempDir("", "kfctl-test-")

	if err != nil {
		t.Fatalf("Could not create temporary directory; error %v", err)
	}

	repoName := path.Base(localDir)

	ts, err := google.DefaultTokenSource(context.Background(), sourcerepo.CloudPlatformScope)

	if err != nil {
		t.Fatalf("Could not create default token source; error %v", err)
	}

	s, err := NewSourceRepo(project, localDir, repoName, ts)

	if err != nil {
		t.Fatalf("Could not create source repo; %v", err)
	}

	srcDir, err := ioutil.TempDir("", "")
	if err != nil {
		t.Fatalf("Could not create temporary directory; error %v", err)
	}

	ioutil.WriteFile(path.Join(srcDir, "README.txt"), []byte("hello world"), os.ModePerm)

	email := "test@kubeflow.org"

	if err := s.CopyAndPushSource(context.Background(), srcDir, email); err != nil {
		t.Fatalf("Error copying and pushing the repo; %v", err)
	}
}
