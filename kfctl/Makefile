#
# kfctl client
#
IMG = bin/kfctl
TAG ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)
PORT = 8080
CMD ?= get
TOKEN ?= $(shell cat $$HOME/.kube/config |grep '^    token:' |awk -F: '{print $$2}'|tr -d '[:space:]')

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

update-version:
	@sed -i 's/Println("\(.*\)"))/Println("'$(TAG)'")/g' cmd/version.go

vet:
	go vet ./...

update:
	hack/goget -p 2016 github.com/kubeflow/kubeflow/bootstrap

build: fmt vet update update-version
	GO111MODULE=on go build -gcflags 'all=-N -l' -a -o bin/kfctl main.go

debug: build
	@echo debugging $(IMG):$(TAG) using port $(PORT)
	@./debug.sh $(IMG) $(PORT) $(CMD) "$(TOKEN)"
