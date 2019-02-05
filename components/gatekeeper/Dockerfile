FROM golang:1.11.2 as bootstrap_base

RUN mkdir -p /opt/kubeflow
RUN mkdir -p $GOPATH/src/github.com/kubeflow/kubeflow/components/gatekeeper
WORKDIR $GOPATH/src/github.com/kubeflow/kubeflow/components/gatekeeper

ENV PATH /go/bin:/usr/local/go/bin:$PATH
# use go modules
ENV GO111MODULE=on

COPY . .
RUN go mod download
RUN go build -gcflags 'all=-N -l' -o /opt/kubeflow/gatekeeper cmd/gatekeeper/main.go

RUN chmod a+rx /opt/kubeflow/gatekeeper

EXPOSE 8085

CMD ["/opt/kubeflow/gatekeeper"]
