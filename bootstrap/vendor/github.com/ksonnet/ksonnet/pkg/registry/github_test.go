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

package registry

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/google/go-github/github"
	"github.com/ksonnet/ksonnet/metadata/app"
	amocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/ksonnet/ksonnet/pkg/parts"
	ghutil "github.com/ksonnet/ksonnet/pkg/util/github"
	"github.com/ksonnet/ksonnet/pkg/util/github/mocks"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func makeGh(t *testing.T, u, sha1 string) (*GitHub, *mocks.GitHub) {
	fs := afero.NewMemMapFs()
	appMock := &amocks.App{}
	appMock.On("Fs").Return(fs)
	appMock.On("Root").Return("/app")
	appMock.On("LibPath", mock.AnythingOfType("string")).Return(filepath.Join("/app", "lib", "v1.8.7"), nil)

	ghMock := &mocks.GitHub{}
	ghMock.On("CommitSHA1", mock.Anything, ghutil.Repo{Org: "ksonnet", Repo: "parts"}, "master").
		Return(sha1, nil)

	optGh := GitHubClient(ghMock)

	spec := &app.RegistryRefSpec{
		Name:     "incubator",
		Protocol: ProtocolGitHub,
		URI:      "github.com/ksonnet/parts/tree/master/incubator",
	}

	g, err := NewGitHub(appMock, spec, optGh)
	require.NoError(t, err)

	return g, ghMock
}

func buildContent(t *testing.T, name string) *github.RepositoryContent {
	path := name
	if !strings.HasPrefix(name, "testdata") {
		path = filepath.Join("testdata", name)
	}
	data, err := ioutil.ReadFile(path)
	require.NoError(t, err)

	path = strings.TrimPrefix(path, "testdata/part/")

	rc := &github.RepositoryContent{
		Type:    github.String("file"),
		Content: github.String(string(data)),
		Path:    github.String(path),
	}

	return rc
}

func buildContentDir(t *testing.T, name string) []*github.RepositoryContent {
	path := name
	if !strings.HasPrefix(name, "testdata") {
		path = filepath.Join("testdata", name)
	}
	fi, err := os.Stat(path)
	require.NoError(t, err)
	require.True(t, fi.IsDir())

	rcs := make([]*github.RepositoryContent, 0)

	fis, err := ioutil.ReadDir(path)
	require.NoError(t, err)

	for _, fi = range fis {
		childPath := filepath.Join(strings.TrimPrefix(path, "testdata/"), fi.Name())

		if fi.IsDir() {
			rc := &github.RepositoryContent{
				Type: github.String("dir"),
				Path: github.String(strings.TrimPrefix(childPath, "part/")),
			}
			rcs = append(rcs, rc)
			continue
		}
		rc := buildContent(t, childPath)
		rcs = append(rcs, rc)
	}

	return rcs
}

func TestGithub_Name(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, _ := makeGh(t, u, "12345")

	assert.Equal(t, "incubator", g.Name())
}

func TestGithub_Protocol(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, _ := makeGh(t, u, "12345")

	assert.Equal(t, ProtocolGitHub, g.Protocol())
}

func TestGithub_URI(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, _ := makeGh(t, u, "12345")

	assert.Equal(t, u, g.URI())
}

func TestGithub_RegistrySpecDir(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, _ := makeGh(t, u, "12345")

	assert.Equal(t, "incubator", g.RegistrySpecDir())
}

func TestGithub_RegistrySpecFilePath(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, _ := makeGh(t, u, "12345")

	assert.Equal(t, "incubator/12345.yaml", g.RegistrySpecFilePath())
}

func TestGithub_RegistrySpecFilePath_no_sha1(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, _ := makeGh(t, u, "")

	assert.Equal(t, "incubator/master.yaml", g.RegistrySpecFilePath())
}

func TestGithub_FetchRegistrySpec(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, ghMock := makeGh(t, u, "12345")

	file := buildContent(t, "registry.yaml")

	ghMock.On(
		"Contents",
		mock.Anything,
		ghutil.Repo{Org: "ksonnet", Repo: "parts"},
		"incubator/registry.yaml",
		"12345",
	).Return(file, nil, nil)

	spec, err := g.FetchRegistrySpec()
	require.NoError(t, err)

	expected := &Spec{
		APIVersion: "0.1.0",
		Kind:       "ksonnet.io/registry",
		GitVersion: &app.GitVersionSpec{
			CommitSHA: "12345",
			RefSpec:   "master",
		},
		Libraries: LibraryRefSpecs{
			"apache": &LibraryRef{
				Path:    "apache",
				Version: "master",
			},
		},
	}

	assert.Equal(t, expected, spec)
}

func TestGithub_FetchRegistrySpec_invalid_manifest(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, ghMock := makeGh(t, u, "12345")

	file := buildContent(t, "invalid-registry.yaml")

	ghMock.On(
		"Contents",
		mock.Anything,
		ghutil.Repo{Org: "ksonnet", Repo: "parts"},
		"incubator/registry.yaml",
		"12345",
	).Return(file, nil, nil)

	_, err := g.FetchRegistrySpec()
	require.Error(t, err)
}

func TestGithub_MakeRegistryRefSpec(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, _ := makeGh(t, u, "12345")

	expected := &app.RegistryRefSpec{
		Name:     "incubator",
		Protocol: ProtocolGitHub,
		URI:      "github.com/ksonnet/parts/tree/master/incubator",
		GitVersion: &app.GitVersionSpec{
			CommitSHA: "12345",
			RefSpec:   "master",
		},
	}

	assert.Equal(t, expected, g.MakeRegistryRefSpec())
}

func TestGithub_ResolveLibrarySpec(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, ghMock := makeGh(t, u, "12345")

	repo := ghutil.Repo{Org: "ksonnet", Repo: "parts"}

	ghMock.On("CommitSHA1", mock.Anything, repo, "54321").Return("54321", nil)

	file := buildContent(t, "apache-part.yaml")

	ghMock.On("Contents", mock.Anything, repo, "incubator/apache/parts.yaml", "54321").
		Return(file, nil, nil)

	spec, err := g.ResolveLibrarySpec("apache", "54321")
	require.NoError(t, err)

	expected := &parts.Spec{
		APIVersion:  "0.0.1",
		Kind:        "ksonnet.io/parts",
		Name:        "apache",
		Description: "part description",
		Author:      "author",
		Contributors: parts.ContributorSpecs{
			&parts.ContributorSpec{Name: "author 1", Email: "email@example.com"},
			&parts.ContributorSpec{Name: "author 2", Email: "email@example.com"},
		},
		Repository: parts.RepositorySpec{
			Type: "git",
			URL:  "https://github.com/ksonnet/mixins",
		},
		Bugs: &parts.BugSpec{
			URL: "https://github.com/ksonnet/mixins/issues",
		},
		Keywords: []string{"apache", "server", "http"},
		QuickStart: &parts.QuickStartSpec{
			Prototype:     "io.ksonnet.pkg.apache-simple",
			ComponentName: "apache",
			Flags: map[string]string{
				"name":      "apache",
				"namespace": "default",
			},
			Comment: "Run a simple Apache server",
		},
		License: "Apache 2.0",
	}

	assert.Equal(t, expected, spec)
}

func mockPartFs(t *testing.T, repo ghutil.Repo, ghMock *mocks.GitHub, name, sha1 string) {
	root := filepath.Join("testdata", "part", name)
	_, err := os.Stat(root)
	require.NoError(t, err)

	err = filepath.Walk(root, func(path string, fi os.FileInfo, err error) error {
		require.NoError(t, err)

		if fi.IsDir() {
			rcs := buildContentDir(t, path)
			path = strings.TrimPrefix(path, filepath.Join("testdata", "part"))
			path = strings.TrimPrefix(path, "/")

			ghMock.On("Contents", mock.Anything, repo, path, sha1).Return(nil, rcs, nil)
			return nil
		}

		rc := buildContent(t, path)
		path = strings.TrimPrefix(path, "testdata/part/")
		ghMock.On("Contents", mock.Anything, repo, path, sha1).Return(rc, nil, nil)
		return nil
	})

	require.NoError(t, err)
}

func TestGithub_ResolveLibrary(t *testing.T) {
	u := "github.com/ksonnet/parts/tree/master/incubator"
	g, ghMock := makeGh(t, u, "12345")

	repo := ghutil.Repo{Org: "ksonnet", Repo: "parts"}

	ghMock.On("CommitSHA1", mock.Anything, repo, "54321").Return("54321", nil)

	partName := filepath.Join("incubator", "apache")
	mockPartFs(t, repo, ghMock, partName, "54321")

	var files []string
	onFile := func(relPath string, contents []byte) error {
		files = append(files, relPath)
		return nil
	}

	var directories []string
	onDir := func(relPath string) error {
		directories = append(directories, relPath)
		return nil
	}

	spec, libRefSpec, err := g.ResolveLibrary("apache", "alias", "54321", onFile, onDir)
	require.NoError(t, err)

	expectedSpec := &parts.Spec{
		APIVersion:  "0.0.1",
		Kind:        "ksonnet.io/parts",
		Name:        "apache",
		Description: "part description",
		Author:      "author",
		Contributors: parts.ContributorSpecs{
			&parts.ContributorSpec{Name: "author 1", Email: "email@example.com"},
			&parts.ContributorSpec{Name: "author 2", Email: "email@example.com"},
		},
		Repository: parts.RepositorySpec{
			Type: "git",
			URL:  "https://github.com/ksonnet/mixins",
		},
		Bugs: &parts.BugSpec{
			URL: "https://github.com/ksonnet/mixins/issues",
		},
		Keywords: []string{"apache", "server", "http"},
		QuickStart: &parts.QuickStartSpec{
			Prototype:     "io.ksonnet.pkg.apache-simple",
			ComponentName: "apache",
			Flags: map[string]string{
				"name":      "apache",
				"namespace": "default",
			},
			Comment: "Run a simple Apache server",
		},
		License: "Apache 2.0",
	}
	assert.Equal(t, expectedSpec, spec)

	expectedLibRefSpec := &app.LibraryRefSpec{
		Name:     "alias",
		Registry: "incubator",
		GitVersion: &app.GitVersionSpec{
			RefSpec:   "54321",
			CommitSHA: "54321",
		},
	}
	assert.Equal(t, expectedLibRefSpec, libRefSpec)

	expectedFiles := []string{
		"incubator/apache/README.md",
		"incubator/apache/apache.libsonnet",
		"incubator/apache/examples/apache.jsonnet",
		"incubator/apache/examples/generated.yaml",
		"incubator/apache/parts.yaml",
		"incubator/apache/prototypes/apache-simple.jsonnet",
	}
	assert.Equal(t, expectedFiles, files)

	expectedDirs := []string{
		"incubator/apache/examples",
		"incubator/apache/prototypes",
	}
	assert.Equal(t, expectedDirs, directories)
}

func Test_parseGitHubURI(t *testing.T) {
	tests := []struct {
		// Specification to parse.
		uri string

		// Optional error to check.
		targetErr error

		// Optional results to verify.
		targetOrg                  string
		targetRepo                 string
		targetRefSpec              string
		targetRegistryRepoPath     string
		targetRegistrySpecRepoPath string
	}{
		//
		// `parseGitHubURI` should correctly parse org, repo, and refspec. Does not
		// test path parsing.
		//
		{
			uri: "github.com/exampleOrg1/exampleRepo1",

			targetOrg:                  "exampleOrg1",
			targetRepo:                 "exampleRepo1",
			targetRefSpec:              "master",
			targetRegistryRepoPath:     "",
			targetRegistrySpecRepoPath: "registry.yaml",
		},
		{
			uri: "github.com/exampleOrg2/exampleRepo2/tree/master",

			targetOrg:                  "exampleOrg2",
			targetRepo:                 "exampleRepo2",
			targetRefSpec:              "master",
			targetRegistryRepoPath:     "",
			targetRegistrySpecRepoPath: "registry.yaml",
		},
		{
			uri: "github.com/exampleOrg3/exampleRepo3/tree/exampleBranch1",

			targetOrg:                  "exampleOrg3",
			targetRepo:                 "exampleRepo3",
			targetRefSpec:              "exampleBranch1",
			targetRegistryRepoPath:     "",
			targetRegistrySpecRepoPath: "registry.yaml",
		},
		{
			// Fails because `blob` refers to a file, but this refers to a directory.
			uri:       "github.com/exampleOrg4/exampleRepo4/blob/master",
			targetErr: errInvalidURI,
		},
		{
			uri: "github.com/exampleOrg4/exampleRepo4/tree/exampleBranch2",

			targetOrg:                  "exampleOrg4",
			targetRepo:                 "exampleRepo4",
			targetRefSpec:              "exampleBranch2",
			targetRegistryRepoPath:     "",
			targetRegistrySpecRepoPath: "registry.yaml",
		},

		//
		// Parsing URIs with paths.
		//
		{
			// Fails because referring to a directory requires a URI with
			// `tree/{branchName}` prepending the path.
			uri:       "github.com/exampleOrg6/exampleRepo6/path/to/some/registry",
			targetErr: errInvalidURI,
		},
		{
			uri: "github.com/exampleOrg5/exampleRepo5/tree/master/path/to/some/registry",

			targetOrg:                  "exampleOrg5",
			targetRepo:                 "exampleRepo5",
			targetRefSpec:              "master",
			targetRegistryRepoPath:     "path/to/some/registry",
			targetRegistrySpecRepoPath: "path/to/some/registry/registry.yaml",
		},
		{
			uri: "github.com/exampleOrg6/exampleRepo6/tree/exampleBranch3/path/to/some/registry",

			targetOrg:                  "exampleOrg6",
			targetRepo:                 "exampleRepo6",
			targetRefSpec:              "exampleBranch3",
			targetRegistryRepoPath:     "path/to/some/registry",
			targetRegistrySpecRepoPath: "path/to/some/registry/registry.yaml",
		},
		{
			// Fails because `blob` refers to a file, but this refers to a directory.
			uri:       "github.com/exampleOrg7/exampleRepo7/blob/master",
			targetErr: errInvalidURI,
		},
		{
			// Fails because `blob` refers to a file, but this refers to a directory.
			uri:       "github.com/exampleOrg5/exampleRepo5/blob/exampleBranch2",
			targetErr: errInvalidURI,
		},
	}

	prefixes := []string{"http://", "https://", "http://www.", "https://www.", "www.", ""}
	suffixes := []string{"/", ""}

	for _, test := range tests {
		for _, prefix := range prefixes {
			for _, suffix := range suffixes {
				uri := prefix + test.uri + suffix

				t.Run(uri, func(t *testing.T) {
					hd, err := parseGitHubURI(uri)
					if test.targetErr != nil {
						require.Equal(t, test.targetErr, err)
						return
					}

					require.NoError(t, err)

					assert.Equal(t, test.targetOrg, hd.org)
					assert.Equal(t, test.targetRepo, hd.repo)
					assert.Equal(t, test.targetRefSpec, hd.refSpec)
					assert.Equal(t, test.targetRegistryRepoPath, hd.regRepoPath)
					assert.Equal(t, test.targetRegistrySpecRepoPath, hd.regSpecRepoPath)
				})
			}
		}
	}
}
