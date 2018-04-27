#!/usr/bin/env bash

# Shortcut script to run ks apply from within cluster
ks apply default --token=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
