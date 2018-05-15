# Dockerfile used by out prow jobs.
# The sole purpose of this image is to customize the command run.
FROM gcr.io/kubeflow-ci/test-worker:latest
MAINTAINER kubeflow-team

COPY run.sh  /usr/local/bin/run.sh
RUN chmod a+x /usr/local/bin/run.sh
ENTRYPOINT ["/usr/local/bin/run.sh"]
