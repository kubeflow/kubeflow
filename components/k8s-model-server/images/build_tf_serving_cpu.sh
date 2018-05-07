# Script to build TF Serving image.
# Usage:
#   build_tf_serving_cpu.sh VERSION
# or
#    build_tf_serving_cpu.sh VERSION gcr.io/PROJECT TAG
# The VERSION can be 1.4, 1.6, 1.7


set -ex

TF_VERSION=$1
REGISTRY=${2:-"gcr.io/kubeflow-images-staging"}
TAG=${3:-"latest"}

PACKAGE=$(cat versions/$TF_VERSION/version-config.json | python -c "import sys,yaml; print yaml.load(sys.stdin)['package']")

IMAGE="$REGISTRY/tensorflow-serving-$TF_VERSION"

docker build --pull \
       --build-arg "TF_SERVING_PACKAGE=${PACKAGE}" \
       -t "${IMAGE}:${TAG}" \
       -f Dockerfile.cpu .
