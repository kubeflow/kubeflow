// Copyright 2018 The ksonnet authors
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

package github

import (
	"context"
	"net/http"
	"os"

	"github.com/google/go-github/github"
	"github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
)

var (
	// DefaultClient is the default GitHub client.
	DefaultClient = &defaultGitHub{}
)

// Repo is a GitHub repo
type Repo struct {
	Org  string
	Repo string
}

// GitHub is an interface for communicating with GitHub.
type GitHub interface {
	CommitSHA1(ctx context.Context, repo Repo, refSpec string) (string, error)
	Contents(ctx context.Context, repo Repo, path, sha1 string) (*github.RepositoryContent, []*github.RepositoryContent, error)
}

type defaultGitHub struct{}

var _ GitHub = (*defaultGitHub)(nil)

func (dg *defaultGitHub) CommitSHA1(ctx context.Context, repo Repo, refSpec string) (string, error) {
	if refSpec == "" {
		refSpec = "master"
	}

	logrus.Debugf("github: fetching SHA1 for %s/%s - %s", repo.Org, repo.Repo, refSpec)
	sha, _, err := dg.client().Repositories.GetCommitSHA1(ctx, repo.Org, repo.Repo, refSpec, "")
	return sha, err
}

func (dg *defaultGitHub) Contents(ctx context.Context, repo Repo, path, sha1 string) (*github.RepositoryContent, []*github.RepositoryContent, error) {
	logrus.Debugf("github: fetching contents for %s/%s/%s - %s", repo.Org, repo.Repo, path, sha1)
	opts := &github.RepositoryContentGetOptions{Ref: sha1}

	file, dir, _, err := dg.client().Repositories.GetContents(ctx, repo.Org, repo.Repo, path, opts)
	return file, dir, err
}

func (dg *defaultGitHub) client() *github.Client {
	var hc *http.Client

	ght := os.Getenv("GITHUB_TOKEN")
	if len(ght) > 0 {
		ctx := context.Background()
		ts := oauth2.StaticTokenSource(
			&oauth2.Token{AccessToken: ght},
		)
		hc = oauth2.NewClient(ctx, ts)
	}

	return github.NewClient(hc)
}
