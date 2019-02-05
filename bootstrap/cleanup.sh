#!/usr/bin/env bash

if [[ $# == "0" ]]; then
  echo "usage: $0 namespace"
  exit 0
fi

namespace=$1
kubectl get ns|grep kubeflow-admin 1>/dev/null
if [[ $? == "0" ]]; then
  can_i=$(kubectl auth can-i delete namespace)
  case "$can_i" in
    yes)
      echo Removing kubeflow-admin namespace
      kubectl delete ns kubeflow-admin
      ;;
    no)
      echo you do not have RBAC privileges to delete $1
      ;;
  esac
fi
exit 0
