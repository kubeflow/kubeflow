package app

import (
	"fmt"
	"github.com/cenkalti/backoff"
	"github.com/otiai10/copy"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/sourcerepo/v1"
	"gopkg.in/src-d/go-git.v4"
	"os"
	"os/exec"
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
		log.Infof("Directory %v exists; checking if its a git repository", localDir)
	} else {
		return nil, errors.WithStack(fmt.Errorf("Directory %v does not exit", localDir))
	}

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

	r, err := git.PlainOpen(path.Join(localDir, ".git"))

	if err != nil {
		log.Errorf("Error opening the git repository; error %v", err)
		return nil, errors.WithStack(err)
	}

	return &SourceRepo{
		project:  project,
		localDir: localDir,
		repoName: repoName,
		ts:       ts,
		r:        r,
	}, nil
}

func isGitRepo(repoDir string) bool {

	gitDir := path.Join(repoDir, ".git")

	if _, err := os.Stat(gitDir); err != nil {
		return true
	}

	return false
}

// CloneRepoToLocal clones the repo.
// The repo is created if it doesn't already exist.
func (s *SourceRepo) CloneRepoToLocal(ctx context.Context) (string, error) {
	repoDir, name := path.Split(s.localDir)

	if name == "" {
		return "", fmt.Errorf("%v is invalid got empty name trying to split the path", s.localDir)
	}

	if err := os.MkdirAll(repoDir, os.ModePerm); err != nil {
		return "", err
	}

	sourcerepoService, err := sourcerepo.New(oauth2.NewClient(ctx, s.ts))
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(2*time.Second), 10)
	err = backoff.Retry(func() error {
		_, err = sourcerepoService.Projects.Repos.Get(fmt.Sprintf("projects/%s/repos/%s", s.project, s.repoName)).Do()
		if err != nil {
			// repo does't exist in target project, create one
			log.Infof("Creating repository")
			_, err = sourcerepoService.Projects.Repos.Create(fmt.Sprintf("projects/%s", s.project), &sourcerepo.Repo{
				Name: fmt.Sprintf("projects/%s/repos/%s", s.project, s.repoName),
			}).Do()

			if err == nil {
				log.Infof("Repo created successfully")
			} else {
				log.Errorf("Failed to create repo.")
				return errors.Wrapf(err, "repo %v doesn't exist and create repo request failed", s.repoName)
			}
		}
		return nil
	}, bo)
	if err != nil {
		log.Errorf("Failed to create repo: %v. Error: %v", s.repoName, err)
		return "", errors.WithStack(err)
	}
	err = os.Chdir(repoDir)
	if err != nil {
		return "", err
	}

	token, err := s.ts.Token()
	if err != nil {
		log.Errorf("Could not get an OAuth token; error %v", err)
		return "", errors.WithStack(err)
	}

	cloneCmd := fmt.Sprintf("git clone https://%s:%s@source.developers.google.com/p/%s/r/%s",
		"user1", token.AccessToken, s.project, s.repoName)

	if err := runCmd(cloneCmd); err != nil {
		log.Errorf("Failed to clone directory; %v", err)
		return "", fmt.Errorf("Failed to clone from source repo: %s", s.repoName)
	}
	return repoDir, nil
}

// CommitAndPush repo commits any changes and pushes them.
//
// Not thread safe, be aware when call it.
func (s *SourceRepo) CommitAndPushRepo(email string) error {
	//repoPath := path.Join(repoDir, GetRepoName(project))
	err := os.Chdir(s.localDir)
	if err != nil {
		return err
	}
	cmds := []string{
		fmt.Sprintf("git config user.email '%s'", email),
		"git config user.name 'auto-commit'",
		"git add .",
		"git commit -m 'auto commit from deployment'",
	}
	for _, cmd := range cmds {
		if err = runCmd(cmd); err != nil {
			return err
		}
	}
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(2*time.Second), 10)
	return backoff.Retry(func() error {
		// TODO(jlewi): How should we deal with the local repo being out of sync with the remote repo?
		// Should we just add "-f" and force push it?
		pushcmd := exec.Command("sh", "-c", "git push origin master")
		result, err := pushcmd.CombinedOutput()
		if err != nil {
			pullcmd := exec.Command("sh", "-c", "git pull --rebase")
			pullResult, _ := pullcmd.CombinedOutput()
			return fmt.Errorf("Error occrued during git push. Error: %v; try rebase: %v", string(result), string(pullResult))
		}
		return nil
	}, bo)
}

// CopyAndPushSource copies the specified directory to the repository directory
// and then commits and pushes it.
func (s *SourceRepo) CopyAndPushSource(ctx context.Context, srcDir string, email string) error {
	copy.Copy(srcDir, s.localDir)
	// Clone the repo.
	// TODO(jlewi): What if they don't have the source repos API enabled then this will
	// fail. Creating the KFApp is when the API should be turned on.
	if _, err := s.CloneRepoToLocal(ctx); err != nil {
		log.Errorf("Error creating or cloning the repo; error %v", err)
		return errors.WithStack(err)
	}

	// TODO(jlewi): Should we commit and push the repo here?
	// Maybe we should run commits and pushes in a back ground thread?
	err := s.CommitAndPushRepo(email)

	if err != nil {
		log.Errorf("There was a problem commiting and pushing the repo; %err", err)
		return errors.WithStack(err)
	}

	return nil
}
