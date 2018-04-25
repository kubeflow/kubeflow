#!/bin/bash
#
# Startup script.
# The purpose of this script is to create a unix user
# with the same id as the user on the host system to
# that we can read the user's home directory on the host
# so that we can uss kubeconfig, gcloud config and other things.
set -x

# If it's run by deployment job, don't switch users
if [ -v "DEPLOY_JOB" ]; then
    # Remove fake kubeconfig and start k8s proxy
    rm ~/.kube/config
    kubectl proxy --port=8111 &

    # Recreate env since we have proper k8s creds
    ks env rm default
    ks env add default --server=http://127.0.0.1:8111

    ks env set default --namespace ${NAMESPACE}
    ks generate kubeflow-core kubeflow-core

    sleep 1000000000
fi
groupadd -g ${GROUP_ID} ${GROUP}
useradd -r -u ${USER_ID} -g ${GROUP} --shell=/bin/bash ${USER}
cd /home/${USER}
su ${USER}
