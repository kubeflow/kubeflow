package auth

import (
	"encoding/base64"
	"fmt"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"strings"
	"sync"
	"time"
)

// start with easy case: each server struct only has one valid pair of u/p
type authServer struct {
	username	string
	// password bcrypt hash
	pwhash      string
	// authorized cookies and their expire time (12 hour by default)
	cookies 	map[string]time.Time
	serverMux   sync.Mutex
}
func NewAuthServer() *authServer {
	server := &authServer{
		cookies: make(map[string]time.Time),
	}
	return server
}

func (s *authServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// login page open to everyone; all other path requires auth with Password or cookie
	if r.URL.Path == "login" || s.authpwd(r) == true || s.authCookie(r) == true {
		// TODO: optionally set auth cookie
		// Allowed
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(http.StatusText(http.StatusOK)))
		return
	}

	// redirect to login page
	s.redirectToLogin(w, r)
}

// auth with basic pw
func (s *authServer) authpwd(r *http.Request) bool {
	if s.username == "" || s.pwhash == "" {
		return false
	}

	auth := r.Header.Get("Authorization")
	if !strings.HasPrefix(strings.ToLower(auth), "basic ") {
		return false
	}

	upBytes, err := base64.StdEncoding.DecodeString(auth[len("basic "):])
	if err != nil {
		return false
	}

	namepw := strings.Split(string(upBytes), ":")

	if len(namepw) != 2 {
		return false
	}
	if namepw[0] == s.username && bcrypt.CompareHashAndPassword([]byte(s.pwhash), []byte(namepw[1])) == nil {

		return true
	}
	return false
}

// auth with cookie
func (s *authServer) authCookie(r *http.Request) bool {
	// TODO
	return false
}

// redirect to login page when unauthorized
func (s *authServer) redirectToLogin(w http.ResponseWriter, r *http.Request) {
	// TODO
}

func (s *authServer) Start(port int) {
	if port <= 0 {
		log.Fatal("port must be > 0.")
	}
	http.Handle("/", s)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}

