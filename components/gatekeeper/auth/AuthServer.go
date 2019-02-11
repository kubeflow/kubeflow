// Copyright 2019 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package auth

import (
	"encoding/base64"
	"fmt"
	"github.com/kubeflow/kubeflow/components/gatekeeper/cmd/gatekeeper/options"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"math/rand"
	"net/http"
	"path"
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
	allowHttp	bool
}

const CookieName = "KUBEFLOW-AUTH-KEY"
const LoginPagePath = "kflogin"
const LoginPageHeader = "x-from-login"
const WhoAmIPath = "whoami"

func NewAuthServer(opt *options.ServerOption) *authServer {
	data, err := base64.StdEncoding.DecodeString(opt.Pwhash)
	if err != nil {
		log.Fatal("error:", err)
	}
	server := &authServer{
		username: opt.Username,
		pwhash: string(data),
		cookies: make(map[string]time.Time),
		allowHttp: opt.AllowHttp,
	}
	return server
}

// Default auth check service
func (s *authServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/" + WhoAmIPath) {
		// Used for health check
		log.Infof("Allow health check")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(http.StatusText(http.StatusOK)))
		return
	}
	if (!s.allowHttp) && r.Header.Get("X-Forwarded-Proto") != "https" {
		log.Infof("Redirect http traffic.")
		// redirect to login page
		s.redirectToLogin(w, r)
		return
	}
	log.Infof("Path check, url: %v, path: %v", r.URL, r.URL.Path)
	// login page open to everyone; all other path requires auth with Password or cookie
	if strings.HasPrefix(r.URL.Path, "/" + LoginPagePath) || s.authCookie(r) == true {
		// Handle user's re-login
		// They already have auth cookie in browser, so "StatusResetContent" bring them to kubeflow central dashboard.
		if r.Header.Get(LoginPageHeader) != "" {
			w.WriteHeader(http.StatusResetContent)
			w.Write([]byte(http.StatusText(http.StatusResetContent)))
			return
		}
		// Allow browser request
		log.Infof("Allow browser request")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(http.StatusText(http.StatusOK)))
		return
	}

	if s.authpwd(r) == true {
		log.Infof("P/W passed")
		// Handle request from login page
		if r.Header.Get(LoginPageHeader) != "" {
			s.setCookieAndReset(w, r)
			return
		}
		// Allow requst from API call
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(http.StatusText(http.StatusOK)))
		return
	}
	// If unauthorized request comes from login page, we skip redirect, just indicate username / password wrong.
	if r.Header.Get(LoginPageHeader) != "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(http.StatusText(http.StatusUnauthorized)))
		return
	}

	log.Infof("Unauthorized, redirect to %v", "https://" + path.Join(r.Host, LoginPagePath))
	// redirect to login page
	s.redirectToLogin(w, r)
}

// auth with basic pw
func (s *authServer) authpwd(r *http.Request) bool {
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
	err = bcrypt.CompareHashAndPassword([]byte(s.pwhash), []byte(namepw[1]))
	if namepw[0] == s.username && err == nil {

		return true
	}
	return false
}

// auth with cookie
func (s *authServer) authCookie(r *http.Request) bool {
	if cookie, err := r.Cookie(CookieName); err == nil {
		if val, ok := s.cookies[cookie.Value]; ok {
			if time.Now().Before(val) {
				log.Info("cookie auth: passed! %v", cookie.Value)
				return true
			}
			log.Info("cookie auth: cookie value expired!")
			return false
		}
		log.Info("cookie auth: cookie value not found! %v", cookie.Value)
		return false
	}
	log.Info("cookie auth: cookie does't exist in request!")
	return false
}

// redirect to login page when unauthorized
func (s *authServer) redirectToLogin(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "https://" + path.Join(r.Host, LoginPagePath), http.StatusTemporaryRedirect)
}

func generateCookieValue() string {
	chars := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, 20)
	for i := range b {
		b[i] = chars[rand.Intn(len(chars))]
	}
	return string(b)
}

func (s *authServer) addNewCookieValue(cookieVal string) {
	s.serverMux.Lock()
	defer s.serverMux.Unlock()
	// Cookie expire after 12 hours
	log.Info("cookie set: set new cookie value!")
	s.cookies[cookieVal] = time.Now().Add(12 * time.Hour)
}

// Set auth cookie and reset, UI will redirect to kubeflow central dashboard
func (s *authServer) setCookieAndReset(w http.ResponseWriter, r *http.Request) {
	cookieVal := generateCookieValue()
	s.addNewCookieValue(cookieVal)
	cookie := http.Cookie{
		Name: CookieName,
		Value: cookieVal,
		Expires: time.Now().Add(12 * time.Hour),
		Path: "/",
		// prevent cross-origin information leakage.
		SameSite: http.SameSiteStrictMode,
	}
	log.Info("set Cookie And Redirect!")
	http.SetCookie(w, &cookie)
	w.WriteHeader(http.StatusResetContent)
	w.Write([]byte(http.StatusText(http.StatusResetContent)))
}

func (s *authServer) Start(port int) {
	if port <= 0 {
		log.Fatal("port must be > 0.")
	}
	rand.Seed(time.Now().UTC().UnixNano())
	log.Info("Auth Service starts")
	// All request
	http.Handle("/", s)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}

