#!/usr/bin/env bash

ALL_FILES=false

usage() {
  echo "run_gofmt [--all]"
  echo ""
  echo "Autoformats .go files tracked by git."
  echo "By default only files relative that are modified to origin/master are formatted"
  echo ""
  echo "Options:"
  echo "    --all : Formats all .go files"
}

# Checkout versions of the code that shouldn't be overwritten
raw=$(git remote)
readarray -t remotes <<<"$raw"

repo_name=''
for r in "${remotes[@]}"; do
  url=$(git remote get-url ${r})
  # Period is in brackets because its a special character.
  if [[ ${url} =~ git@github[.]com:kubeflow/.* ]]; then
    repo_name=${r}
  fi
done

echo using ${repo_name}
if [ -z "$repo_name" ]; then
  echo "Could not find remote repository pointing at git@github.com:kubeflow/kubeflow.git"
  exit 1
fi

while [ "$1" != "" ]; do
  PARAM=$(echo $1 | awk -F= '{print $1}')
  case $PARAM in
    -h | --help)
      usage
      exit
      ;;
    --all)
      ALL_FILES=true
      ;;
    *)
      echo "ERROR: unknown parameter \"$PARAM\""
      usage
      exit 1
      ;;
  esac
  shift
done

if $ALL_FILES; then
  fmt_files=($(git ls-files -- '*.go'))
else
  fmt_files=($(git diff --name-only ${repo_name}/master -- '*.go'))
fi

# 2 spaces vertical indentation
# Use double quotes for strings
# Use // for comments
for f in "${fmt_files[@]}"; do
  if [[ "${f}" =~ "/vendor/" ]]; then
    continue
  fi
  gofmt -w "$f"
  goimports -w "$f"
  echo "Autoformatted $f"
done
