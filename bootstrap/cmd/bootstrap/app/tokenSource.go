package app

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	"sync"
)

// RefreshableTokenSource is a static oauth token source that provides methods for refreshing the static token.
// The point of this token source is to allow a token to be refreshed by HTTP calls.
//
// It is designed to be thread safe and to implement the TokenSource interface.
//
// The TokenSource is scoped to a particular project which is set on construction.
//
// On refresh we do an IAM check to make sure the new credential has access to the same project.
type RefreshableTokenSource struct {
	mu sync.Mutex // guards t
	t  *oauth2.Token

	// Project keeps track of the project this account should be scoped to.
	project string

	// checker is used to ensure a credential is sufficiently valid before refreshing it.
	checker ProjectAccessChecker
}

type TokenRefresher interface {
	Refresh(newToken oauth2.Token) error
	Token() (*oauth2.Token, error)
}

// NewRefreshableTokenSource creates a new RefreshableTokenSource.
func NewRefreshableTokenSource(p string) (*RefreshableTokenSource, error) {

	if p == "" {
		return nil, fmt.Errorf("project is required")
	}
	t := &RefreshableTokenSource{
		project: p,
		checker: CheckProjectAccess,
	}
	return t, nil
}

func (s *RefreshableTokenSource) Refresh(newToken oauth2.Token) error {
	if newToken.AccessToken == "" {
		return fmt.Errorf("No AccessToken specified")
	}

	// Verify that the new token grants access to the project
	ts := oauth2.StaticTokenSource(&newToken)

	isValid, err := s.checker(s.project, ts)
	if err != nil {
		log.Errorf("Error calling TestIam Permissions; error %+v", err)
		return err
	}

	if !isValid {
		// We explicitly don't log the project to avoid leaking information.
		return fmt.Errorf("Could not refresh the TokenSource; token doesn't provide sufficient privileges")
	}

	log.Infof("New token is valid")
	s.mu.Lock()
	defer s.mu.Unlock()
	// Point s.t at the new token this way any reference to the current Token are still valid
	s.t = &newToken

	return nil
}

func (s *RefreshableTokenSource) Token() (*oauth2.Token, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.t, nil
}
