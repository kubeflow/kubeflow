package app

import (
	"fmt"
	"github.com/cenkalti/backoff"
	"gopkg.in/src-d/go-git.v4/plumbing"
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

	// Local path containing the repo
	localDir string

	repoName string

	ts oauth2.TokenSource
	r  *git.Repository
}

const (
	RemoteName = "origin"
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
func NewSourceRepo(ctx context.Context, project string, appsDir string, repoName string, ts oauth2.TokenSource) (*SourceRepo, error) {
	if project == "" {
		return nil, errors.WithStack(fmt.Errorf("project can't be an empty string"))
	}

	if appsDir == "" {
		return nil, errors.WithStack(fmt.Errorf("appsDir can't be an empty string"))
	}

	if repoName == "" {
		return nil, errors.WithStack(fmt.Errorf("repoName can't be an empty string"))
	}

	if ts == nil {
		return nil, errors.WithStack(fmt.Errorf("ts must be an oauth2.TokenSource; not nil"))
	}

	if _, err := os.Stat(appsDir); err != nil {
		return nil, errors.WithStack(fmt.Errorf("Directory %v does not exit", appsDir))
	}

	// Actual repo directory
	localDir := path.Join(appsDir, repoName)

	// Create source repo first so we can clone
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

	s := &SourceRepo{
		project:  project,
		localDir: localDir,
		repoName: repoName,
		ts:       ts,
	}

	url, err := s.remoteUrl()
	if err != nil {
		log.Errorf("Could not build the URL; error %v", err)
		return nil, errors.WithStack(err)
	}

	log.Infof("Checking if directory %v is a git repository", localDir)
	if isGitRepo(localDir) {
		log.Infof("%v is already a git repository", localDir)
	} else {
		log.Infof("Clone source repo to %v.", localDir)
		if err := runCmdFromDir(fmt.Sprintf("git clone %v", url), appsDir); err != nil {
			log.Errorf("Failed to clone git repository; error %v", err)
			return nil, errors.Wrapf(err, "Failed to initialize git repository")
		}
	}

	s.r, err = git.PlainOpen(path.Join(localDir))
	if err != nil {
		log.Errorf("Error opening the git repository; error %v", err)
		return nil, errors.WithStack(err)
	}

	remotes, err := s.r.Remotes()

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

	if !hasRemote {
		_, err := s.r.CreateRemote(&config.RemoteConfig{
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
	if _, err := os.Stat(repoDir); err != nil {
		// Local repo doesn't exist yet, return false
		return false
	}
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
func (s *SourceRepo) CommitAndPushRepo(email string, commitPath string, branch string) error {
	w, err := s.r.Worktree()

	if err != nil {
		return errors.WithStack(err)
	}

	files, err := ioutil.ReadDir(commitPath)

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

	// Create a new branch
	headRef, err := s.r.Head()
	if err != nil {
		return errors.WithStack(err)
	}

	// Create a new plumbing.HashReference object with the name of the branch
	// and the hash from the HEAD. The reference name should be a full reference
	// name and not an abbreviated one, as is used on the git cli.
	//
	// For tags we should use `refs/tags/%s` instead of `refs/heads/%s` used
	// for branches.
	refName := plumbing.ReferenceName(fmt.Sprintf("refs/heads/%v", branch))
	ref := plumbing.NewHashReference(refName, headRef.Hash())

	// The created reference is saved in the storage.
	err = s.r.Storer.SetReference(ref)
	if err != nil {
		return errors.WithStack(err)
	}

	//Push local branch to remote.
	if err := s.r.Push(&git.PushOptions{
		RemoteName: RemoteName,
		RefSpecs: []config.RefSpec{config.RefSpec(fmt.Sprintf("refs/heads/%v:refs/remotes/origin/%v",
			branch, branch))},
	}); err != nil {
		return errors.WithStack(err)
	}

	return nil
}
