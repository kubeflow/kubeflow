#!/usr/bin/env bash

cleanup()
{
  if [[ -n $portforwardcommand ]]; then
    echo killing $portforwardcommand
    pkill -f $portforwardcommand
  fi
}
trap cleanup EXIT

waitforpod()
{
  local cmd="kubectl get pods --no-headers -oname --selector=app=kubeflow-bootstrapper --field-selector=status.phase=Running --namespace=kubeflow-admin | sed 's/^pod.*\///'" found=$(eval "$cmd")
  while [[ -z $found ]]; do
    sleep 1
    found=$(eval "$cmd")
  done
  echo $found
}

waitforever()
{
  which gsleep >/dev/null
  if [[ $? == 1 ]]; then
    while true; do
      sleep 1
    done
  else
    gsleep infinity
  fi
}

kubectl apply -f bootstrapper.debug.yaml
echo "Waiting for pod's status == Running"
pod=$(waitforpod)
portforwardcommand="kubectl port-forward $pod 2345 --namespace=kubeflow-admin"
eval "$portfowardcommand >/dev/null &"
