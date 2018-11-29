#
# kfctl client
#

all: build

create:
	go get github.com/spf13/cobra/cobra
	cobra init github.com/kubeflow/kubeflow/kfctl
	cobra add add
	cobra add apply
	cobra add completion
	cobra add delete
	cobra add generate
	cobra add get
	cobra add remove
	cobra add version

fmt:
	go fmt ./...

vet:
	go vet ./...

build: fmt vet
	GO111MODULE=on go build -gcflags 'all=-N -l' -o bin/kfctl main.go
