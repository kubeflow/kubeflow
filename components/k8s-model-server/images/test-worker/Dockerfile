# Docker image for running E2E tests using Argo.

FROM gcr.io/kubeflow-ci/test-worker:latest
MAINTAINER Jeremy Lewi

# Install tensorflow dependencies to run tf serving client.
RUN pip2.7 install grpcio tensorflow tensorflow-serving-api
