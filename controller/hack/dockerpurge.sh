#!/usr/bin/env bash

dpurge()
{
  if [ "$#" == "1" ]; then
    echo "Removing $1 images ..."
    docker images | grep "$1" | awk '{print $3}' | xargs docker rmi --force
  else
    docker images --format '{{.Repository}}:{{.Tag}}'|egrep -v 'ubuntu|latest'|xargs -i docker rmi {}
  fi
}

dpurge kubeflow-controller
