#!/bin/bash
#
# Startup script. 
# The purpose of this script is to create a unix user
# with the same id as the user on the host system to
# that we can read the user's home directory on the host
# so that we can uss kubeconfig, gcloud config and other things.
set -x
groupadd -g ${GROUP_ID} ${GROUP}
useradd -r -u ${USER_ID} -g ${GROUP} --shell=/bin/bash ${USER}
cd /home/${USER}
su ${USER}