#!/bin/bash
# Util functions to be used by scripts in this directory

function check_install() {
  if ! which "${1}" &>/dev/null; then
    echo "You don't have ${1} installed. Please install ${1}."
    exit 1
  fi
}

function check_variable() {
  if [[ -z "${1}" ]]; then
    echo "'${2}' environment variable is not set. Please set it using export ${2}=value."
    exit 1
  fi
}
