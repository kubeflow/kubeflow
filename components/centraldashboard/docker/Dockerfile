# build stage
FROM golang:alpine AS build-env
ADD . /go/src/github.com/google/kubeflow
RUN go install github.com/google/kubeflow/components/centraldashboard/backend
RUN mv /go/bin/backend /go/bin/centraldashboard
# final stage
FROM alpine
WORKDIR /app
COPY --from=build-env /go/bin/centraldashboard /app/
ENTRYPOINT ./centraldashboard