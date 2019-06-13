package app

import (
	"fmt"
	"golang.org/x/oauth2"
	"testing"
)

type FakeIAMChecker struct {
	isValid     bool
	resultError error
}

func (c *FakeIAMChecker) Check(p string, ts oauth2.TokenSource) (bool, error) {
	return c.isValid, c.resultError
}

func TestTokenSource(t *testing.T) {
	type testCase struct {
		isValid     bool
		checkError  error
		accessToken string
	}

	testCases := []testCase{
		{
			isValid:     true,
			checkError:  nil,
			accessToken: "firsttoken",
		},
		{
			isValid:     true,
			checkError:  nil,
			accessToken: "secondtoken",
		},
		{
			isValid:     false,
			checkError:  nil,
			accessToken: "thirdtoken",
		},

		{
			// The project is valid but there is a check error so token
			// should not get replaced.
			isValid:     true,
			checkError:  fmt.Errorf("Could not refresh the TokenSource; token doesn't provide sufficient privileges"),
			accessToken: "fourthtoken",
		},
	}
	ts, err := NewRefreshableTokenSource("someproject")

	if err != nil {
		t.Fatalf("Could not create tokensource: %v", err)
	}

	f := FakeIAMChecker{isValid: true}
	ts.checker = f.Check

	for _, c := range testCases {
		f.isValid = c.isValid
		f.resultError = c.checkError

		err = ts.Refresh(oauth2.Token{
			AccessToken: c.accessToken,
		})

		if c.checkError != nil && err == nil {
			t.Fatalf("Refresh didn't return expected error")
		}

		newToken, _ := ts.Token()

		if c.isValid && c.checkError == nil {
			if newToken.AccessToken != c.accessToken {
				t.Fatalf("AccessToken Want %v; Got %v", c.accessToken, newToken.AccessToken)
			}
		} else {
			if newToken.AccessToken == c.accessToken {
				t.Fatalf("AccessToken should not equal %v", c.accessToken)
			}
		}
	}
}
