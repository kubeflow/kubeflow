package app

import (
	"fmt"
	"github.com/cenkalti/backoff"
	"io/ioutil"
	//"github.com/otiai10/copy"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/sourcerepo/v1"
	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/config"
	"gopkg.in/src-d/go-git.v4/plumbing/object"
	"os"
	"path"
	"time"
)

// SourceRepo manages a local clone of a source repo.
type SourceRepo struct {
	// The GCP project
	project string

	// Local path for the repo
	localDir string

	repoName string

	ts oauth2.TokenSource
	r  *git.Repository
}

const (
	RemoteName = "gcpsourcerepo"
)

// NewSourceRepo initializes a repo object for the specified local directory.
// If the directory doesn't exist an error is raised.
//
//
// If the remote repo doesn't exist it is created.
//
// TODO(jlewi): What if the repo exists but the directory doesn't? In that case should
// we clone the repo to the local directory?
// What if the local directory exists but the repo doesn't?
//
// In the current use cases with kfctl server the directory will always exist because it is created
// out of band by the kfctl server. So for now the code only handles the case where the repository exists.
func NewSourceRepo(ctx context.Context, project string, localDir string, repoName string, ts oauth2.TokenSource) (*SourceRepo, error) {
	if project == "" {
		return nil, errors.WithStack(fmt.Errorf("project can't be an empty string"))
	}

	if localDir == "" {
		return nil, errors.WithStack(fmt.Errorf("localDir can't be an empty string"))
	}

	if repoName == "" {
		return nil, errors.WithStack(fmt.Errorf("repoName can't be an empty string"))
	}

	if ts == nil {
		return nil, errors.WithStack(fmt.Errorf("ts must be an oauth2.TokenSource; not nil"))
	}

	if _, err := os.Stat(localDir); err != nil {
		return nil, errors.WithStack(fmt.Errorf("Directory %v does not exit", localDir))
	}

	log.Infof("Directory %v exists; checking if its a git repository", localDir)
	if isGitRepo(localDir) {
		log.Infof("%v is already a git repository", localDir)
	} else {
		log.Infof("Initiliazing %v as a git repository", localDir)
		// TODO(jlewi): Can we use  the git client library to initialize the directory
		// I think we can just do something like
		//	r, err := git.Init(...)
		if err := runCmdFromDir("git init", localDir); err != nil {
			log.Errorf("Failed to initialize git repository; error %v", err)
			return nil, errors.Wrapf(err, "Failed to initialize git repository")
		}
	}
	sourcerepoService, err := sourcerepo.New(oauth2.NewClient(ctx, ts))
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(2*time.Second), 10)
	err = backoff.Retry(func() error {
		_, err = sourcerepoService.Projects.Repos.Get(fmt.Sprintf("projects/%s/repos/%s", project, repoName)).Do()
		if err != nil {
			log.Infof("Creating repository in source repository")
			_, err = sourcerepoService.Projects.Repos.Create(fmt.Sprintf("projects/%s", project), &sourcerepo.Repo{
				Name: fmt.Sprintf("projects/%s/repos/%s", project, repoName),
			}).Do()

			if err == nil {
				log.Infof("Repo created successfully")
			} else {
				log.Errorf("Failed to create repo.")
				return errors.Wrapf(err, "repo %v doesn't exist and create repo request failed", repoName)
			}
		} else {
			log.Info("Repository already exists in source repos")
		}
		return nil
	}, bo)

	r, err := git.PlainOpen(path.Join(localDir))

	if err != nil {
		log.Errorf("Error opening the git repository; error %v", err)
		return nil, errors.WithStack(err)
	}

	remotes, err := r.Remotes()

	if err != nil {
		log.Errorf("Could not get remotes; error %v", err)
		return nil, errors.WithStack(err)
	}

	hasRemote := false
	for _, remote := range remotes {
		if remote.Config().Name == RemoteName {
			hasRemote = true
			break
		}
	}

	s := &SourceRepo{
		project:  project,
		localDir: localDir,
		repoName: repoName,
		ts:       ts,
		r:        r,
	}

	url, err := s.remoteUrl()

	if err != nil {
		log.Errorf("Could not build the URL; error %v", err)
		return nil, errors.WithStack(err)
	}
	if !hasRemote {
		_, err := r.CreateRemote(&config.RemoteConfig{
			Name: RemoteName,
			URLs: []string{
				url,
			},
		})

		if err != nil {
			return nil, errors.WithStack(err)
		}

	}
	return s, nil
}

// Name returns the name of the repository as expected by Google APIs.
func (s *SourceRepo) Name() string {
	return fmt.Sprintf("projects/%s/repos/%s", s.project, s.repoName)
}

func isGitRepo(repoDir string) bool {
	gitDir := path.Join(repoDir, ".git")

	if _, err := os.Stat(gitDir); err == nil {
		return true
	}

	return false
}

func (s *SourceRepo) remoteUrl() (string, error) {
	token, err := s.ts.Token()
	if err != nil {
		log.Errorf("Could not get an OAuth token; error %v", err)
		return "", errors.WithStack(err)
	}

	return fmt.Sprintf("https://%s:%s@source.developers.google.com/p/%s/r/%s",
		"kfctl", token.AccessToken, s.project, s.repoName), nil
}

// CommitAndPush repo commits any changes and pushes them.
//
// Not thread safe, be aware when call it.
func (s *SourceRepo) CommitAndPushRepo(email string) error {
	w, err := s.r.Worktree()

	if err != nil {
		return errors.WithStack(err)
	}

	files, err := ioutil.ReadDir(s.localDir)

	if err != nil {
		return errors.WithStack(err)
	}

	excludes := map[string]bool{
		".git":   true,
		".cache": true,
	}

	for _, f := range files {
		if _, ok := excludes[f.Name()]; ok {
			continue
		}

		_, err := w.Add(f.Name())
		if err != nil {
			return errors.WithStack(err)
		}
	}

	_, err = w.Commit("Latest changes", &git.CommitOptions{
		Author: &object.Signature{
			Name:  "kfctl agent",
			Email: email,
			When:  time.Now(),
		},
	})

	if err != nil {
		return errors.WithStack(err)
	}

	if err := s.r.Push(&git.PushOptions{
		RemoteName: RemoteName,
	}); err != nil {
		return errors.WithStack(err)
	}

	return nil
}
