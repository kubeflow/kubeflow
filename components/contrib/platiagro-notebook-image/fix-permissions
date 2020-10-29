#!/bin/bash
# set permissions on a directory
# after any installation, if a directory needs to be (human) user-writable,
# run this script on it.
# It will make everything in the directory owned by the group $NB_GID
# and writable by that group.
# Deployments that want to set a specific user id can preserve permissions
# by adding the `--group-add users` line to `docker run`.

# uses find to avoid touching files that already have the right permissions,
# which would cause massive image explosion

# right permissions are:
# group=$NB_GID
# AND permissions include group rwX (directory-execute)
# AND directories have setuid,setgid bits set

set -e

for d in "$@"; do
  find "$d" \
    ! \( \
      -group $NB_GID \
      -a -perm -g+rwX  \
    \) \
    -exec chgrp $NB_GID {} \; \
    -exec chmod g+rwX {} \;
  # setuid,setgid *on directories only*
  find "$d" \
    \( \
        -type d \
        -a ! -perm -6000  \
    \) \
    -exec chmod +6000 {} \;
done
