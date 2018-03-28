# build prod
FROM golang:alpine
LABEL maintainer="Adhita Selvaraj <adhita.selvaraj@gmail.com>"
ADD . /go/src/github.com/kubeflow/kubeflow
RUN go install github.com/kubeflow/kubeflow/components/centraldashboard/frontend
ENV PORT_1=8082
WORKDIR /go/src/github.com/kubeflow/kubeflow
ENTRYPOINT /go/bin/frontend
EXPOSE 8082
