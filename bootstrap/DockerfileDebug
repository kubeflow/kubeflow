ARG KFCTL_IMAGE

ARG GOLANG_VERSION=1.11.2
FROM golang:${GOLANG_VERSION} as debug_util

# install debugger
RUN go get -u github.com/derekparker/delve/cmd/dlv

FROM ${KFCTL_IMAGE}
COPY --from=debug_util ${GOPATH}/bin/dlv ${GOPATH}/bin/dlv
RUN chmod a+rx ${GOPATH}/bin/dlv
COPY dlv.sh /opt/kubeflow/

EXPOSE 2345
