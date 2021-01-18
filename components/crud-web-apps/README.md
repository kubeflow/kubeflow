# Build instructions for docker images
To build the Jupyter and Tensorboards docker images directly (without the Makefile) for development purposes, the following commands can be used from this directory.

## Building the Jupyter Images
`cp jupyter/Dockerfile.dockerignore .dockerignore && docker build --pull -f "jupyter/Dockerfile" -t <image-tag> . && rm .dockerignore`

## Building the Tensorboard Images
`cp tensorboards/Dockerfile.dockerignore .dockerignore && docker build --pull -f "tensorboards/Dockerfile" -t <image-tag> . && rm .dockerignore`
