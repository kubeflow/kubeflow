package app

import (
	"context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/sourcerepo/v1"
	"io/ioutil"
	"os"
	"path"
	"strings"
	"testing"
)

// cleanup the test.
//
// Delete the repository if one was created.
func cleanup(ctx context.Context, ts oauth2.TokenSource, repoUrl string, t *testing.T) {
	sourcerepoService, err := sourcerepo.New(oauth2.NewClient(ctx, ts))

	if err != nil {
		t.Errorf("Could not create a sourcerepo client; error %v", err)
		return
	}

	t.Logf("Deleting repository %v", repoUrl)
	_, err = sourcerepoService.Projects.Repos.Delete(repoUrl).Do()
	if err != nil {
		t.Errorf("Could not delete repo %v; error %v", repoUrl, err)
		return
	}
	t.Logf("Deleted repository %v", repoUrl)
}

// TestSourceRepos_test uses GCP therefore by default it will be skipped.
// To enable the test set the environment variable:
//   KUBEFLOW_RUN_MANUAL_TESTS = true
func TestSourceRepos_test(t *testing.T) {
	if strings.TrimSpace(strings.ToLower(os.Getenv("KUBEFLOW_RUN_MANUAL_TESTS"))) != "true" {
		t.Skip("Skipping TestSourceRepos_test because environment variable KUBEFLOW_RUN_MANUAL_TEST not set to true")
	}

	project := "kubeflow-ci-deployment"
	if os.Getenv("KUBEFLOW_GCP_TEST_PROJECT") != "" {
		project = os.Getenv("KUBEFLOW_GCP_TEST_PROJECT")
	}

	t.Logf("Using GCP project: %v", project)
	localDir, err := ioutil.TempDir("", "kfctl-test-")

	if err != nil {
		t.Fatalf("Could not create temporary directory; error %v", err)
	}

	repoName := path.Base(localDir)

	ts, err := google.DefaultTokenSource(context.Background(), sourcerepo.CloudPlatformScope)

	if err != nil {
		t.Fatalf("Could not create default token source; error %v", err)
	}

	s, err := NewSourceRepo(context.Background(), project, localDir, repoName, ts)

	if err != nil {
		t.Fatalf("Could not create source repo; %v", err)
	}

	cleanupFunc := func() {
		cleanup(context.Background(), ts, s.Name(), t)
	}
	defer cleanupFunc()

	ioutil.WriteFile(path.Join(localDir, "README.txt"), []byte("hello world"), os.ModePerm)

	email := "test@kubeflow.org"

	if errNew := s.CommitAndPushRepo(email); errNew != nil {
		t.Fatalf("Error copying and pushing the repo; %v", errNew)
	}
}
