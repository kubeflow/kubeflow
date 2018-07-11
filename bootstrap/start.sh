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
    cd /kubeflow
    # Remove fake kubeconfig and start k8s proxy
    rm ~/.kube/config
    kubectl proxy --port=8111 &

    # Recreate env since we have proper k8s creds
    # TODO (inc0): Replace this with bootstrapper when we confirm that it works inside cluster
    ks env rm default
    ks env add default --server=http://127.0.0.1:8111
    ks env set default --namespace ${NAMESPACE}

    if [ ! -d /opt/kubeflow/app/kubeflow ]; then
        ks generate kubeflow-core kubeflow-core
        cp -R /kubeflow /opt/kubeflow/app
    fi
    cd /opt/kubeflow/app/kubeflow
    tail -f /dev/null
fi
groupadd -g ${GROUP_ID} ${GROUP}
useradd -r -u ${USER_ID} -g ${GROUP} --shell=/bin/bash ${USER}
cd /home/${USER}
su ${USER}
