#!/bin/bash

yq eval -i ".updates[].assignees = $(yq eval -j -I=0 '.approvers' ./OWNERS)" .github/base_dependabot.yml.tmp

rm .github/dependabot.yml
cp .github/base_dependabot.yml.tmp .github/dependabot.yml


for directory in $(dirname $(find . -type f -name "*ockerfile*" -not -path './*node_modules*') | sort -u | cut -c2-); do
     for owners in $(find ./*/ -type f -name "OWNERS" | sort -u); do
          if [[ ${directory} == *"$(dirname ${owners} | cut -c2-)"* ]]; then
               assignees=$(yq eval -j -I=0 '.approvers' ${owners})
               yq eval -i ".updates += {\"package-ecosystem\":\"docker\",\"directory\":\"${directory}\",\"schedule\":{\"interval\":\"daily\"},\"open-pull-requests-limit\":10,\"assignees\":${assignees}}" .github/dependabot.yml
          fi
     done
done

for directory in $(dirname $(find . -type f -name "package*.json" -not -path "./*node_modules*") | sort -u | cut -c2-); do
     if [[ ${directory} != *"dist"* ]]; then
          for owners in $(find ./*/ -type f -name "OWNERS" | sort -u); do
               if [[ ${directory} == *"$(dirname ${owners} | cut -c2-)"* ]]; then
                  assignees=$(yq eval -j -I=0 '.approvers' ${owners})
                  yq eval -i ".updates += {\"package-ecosystem\":\"npm\",\"directory\":\"${directory}\",\"schedule\":{\"interval\":\"daily\"},\"open-pull-requests-limit\":10,\"assignees\":${assignees}}" .github/dependabot.yml
               fi
          done
     fi
done

for directory in $(dirname $(find . -type f -name "*requirements.txt" -not -path "./*node_modules*") | sort -u | cut -c2-); do
     for owners in $(find ./*/ -type f -name "OWNERS" | sort -u); do
          if [[ ${directory} == *"$(dirname ${owners} | cut -c2-)"* ]]; then
               assignees=$(yq eval -j -I=0 '.approvers' ${owners})
               yq eval -i ".updates += {\"package-ecosystem\":\"pip\",\"directory\":\"${directory}\",\"schedule\":{\"interval\":\"daily\"},\"open-pull-requests-limit\":10,\"assignees\":${assignees}}" .github/dependabot.yml
          fi
     done
done

for directory in $(dirname $(find . -type f -name "go.*" -not -path "./*node_modules*") | sort -u | cut -c2-); do
     for owners in $(find ./*/ -type f -name "OWNERS" | sort -u); do
          if [[ ${directory} == *"$(dirname ${owners} | cut -c2-)"* ]]; then
               assignees=$(yq eval -j -I=0 '.approvers' ${owners})
               yq eval -i ".updates += {\"package-ecosystem\":\"gomod\",\"directory\":\"${directory}\",\"schedule\":{\"interval\":\"daily\"},\"open-pull-requests-limit\":10,\"assignees\":${assignees}}" .github/dependabot.yml
          fi
     done
done
