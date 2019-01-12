package gatekeeper

import (
	"github.com/kubeflow/kubeflow/components/gatekeeper/auth"
)

func main() {
	s := auth.NewAuthServer()
	s.Start(5000)
}