# Docker image for running E2E tests using Argo.

FROM gcr.io/kubeflow-ci/test-worker/test-worker:v20190116-b7abb8d-e3b0c4
MAINTAINER Jeremy Lewi

# Install tensorflow dependencies to run tf serving client.
RUN pip2.7 install grpcio tensorflow tensorflow-serving-api
