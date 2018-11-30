#
# kfctl client
#

all: build

create:
	go get -u github.com/spf13/cobra/cobra
	cobra init github.com/kubeflow/kubeflow/kfctl
	cobra add add
	cobra add apply
	cobra add completion
	cobra add delete
	cobra add generate
	cobra add get
	cobra add init
	cobra add remove
	cobra add version

fmt:
	go fmt ./...

vet:
	go vet ./...

update:
	hack/goget -p 2016 github.com/kubeflow/kubeflow/controller/pkg/client/kfapi

build: fmt vet update
	git ls-remote -q upstream 'pull/2016/head'|awk '{print $1}'
	GO111MODULE=on go build -gcflags 'all=-N -l' -a -o bin/kfctl main.go
