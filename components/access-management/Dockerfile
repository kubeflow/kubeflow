FROM golang:1.12.4

RUN mkdir -p /opt/kubeflow
RUN mkdir -p $GOPATH/src/github.com/kubeflow/kubeflow/components/access-management
WORKDIR $GOPATH/src/github.com/kubeflow/kubeflow/components/access-management

ENV PATH /go/bin:/usr/local/go/bin:$PATH
# use go modules
ENV GO111MODULE=on

COPY . .
RUN go mod download
RUN go build -gcflags 'all=-N -l' -o /opt/kubeflow/access-management main.go

RUN chmod a+rx /opt/kubeflow/access-management

EXPOSE 8081

CMD ["/opt/kubeflow/access-management"]
