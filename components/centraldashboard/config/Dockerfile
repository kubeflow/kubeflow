# build prod
FROM golang:alpine
LABEL maintainer="Adhita Selvaraj <adhita.selvaraj@gmail.com>"
ADD . /go/src/github.com/google/kubeflow
RUN go install github.com/google/kubeflow/components/centraldashboard/frontend
ENV PORT_1=8082
WORKDIR /go/src/github.com/google/kubeflow
ENTRYPOINT /go/bin/frontend
EXPOSE 8082
