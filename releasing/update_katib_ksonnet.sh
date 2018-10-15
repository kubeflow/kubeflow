#!/bin/bash
set -ex
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd ${DIR}/.. && pwd )"

# Assume the testing repo is checkout in git_kubeflow_testing because 
# we depend on the python code in that repo.
export PYTHONPATH=${PYTHONPATH}:${ROOT_DIR}/../git_kubeflow-testing/py

RELEASE=v0.1.2-alpha-34-gb46378c

VALUES="modeldbFrontendImage=gcr.io/kubeflow-images-public/katib/katib-frontend:${RELEASE}"
VALUES="${VALUES},suggestionRandomImage=gcr.io/kubeflow-images-public/katib/suggestion-random:${RELEASE}"
VALUES="${VALUES},suggestionGridImage=gcr.io/kubeflow-images-public/katib/suggestion-grid:${RELEASE}"
VALUES="${VALUES},suggestionHyperbandImage=gcr.io/kubeflow-images-public/katib/suggestion-hyperband:${RELEASE}"
VALUES="${VALUES},suggestionBayesianOptimizationImage=gcr.io/kubeflow-images-public/katib/suggestion-bayesianoptimization:${RELEASE}"
VALUES="${VALUES},vizierCoreImage=gcr.io/kubeflow-images-public/katib/vizier-core:${RELEASE}"
# Update the TFJob operator image
python ${ROOT_DIR}/scripts/update_prototype.py \
	--file=${ROOT_DIR}/kubeflow/katib/prototypes/all.jsonnet \
	--values=${VALUES}
